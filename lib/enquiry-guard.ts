/**
 * Abuse protection for the enquiry API (app/api/enquiry/route.ts), kept apart
 * so it can be checked on its own.
 *
 * - Only same-origin JSON requests: another site's page can't make visitors'
 *   browsers submit enquiries (a cross-site JSON POST needs a CORS preflight,
 *   which this site never answers, and browsers label it Sec-Fetch-Site).
 * - The body is read with a hard size limit, before any parsing.
 * - Rate limits per connection (an IPv6 visitor's whole /64, and a looser
 *   one per /48) and for the whole site, in memory, with the memory they use
 *   bounded: once a limit is reached, further requests aren't even recorded.
 *
 * The visitor's address is read the same way as in the portal: the entry
 * TRUSTED_PROXY_HOPS places from the right of X-Forwarded-For (default 1:
 * nginx on the same machine, which appends the address it received the
 * request from). Entries further left can be typed by anyone. Keep the
 * site's own port closed to the internet so requests always come through
 * nginx (README, "Enquiry forms").
 */
import { isIP } from "node:net";

export const MAX_BODY_BYTES = 16 * 1024;
export const WINDOW_MS = 10 * 60 * 1000;
export const MAX_PER_CLIENT = 5;
export const MAX_PER_NETWORK = 15;
export const MAX_PER_SITE = 120;
const MAX_TRACKED = 10_000;

/** Why a request is refused before its content is read, or null when it may go on. */
export function requestProblem(request: Request): { status: number; error: string } | null {
  const site = request.headers.get("sec-fetch-site");
  if (site && site !== "same-origin" && site !== "none") return { status: 403, error: "Please use the form on this website." };
  const type = (request.headers.get("content-type") ?? "").split(";")[0].trim().toLowerCase();
  if (type !== "application/json") return { status: 415, error: "Invalid request." };
  const length = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(length) && length > MAX_BODY_BYTES) return { status: 413, error: "The enquiry is too long." };
  return null;
}

/** The request body as JSON, refusing anything over MAX_BODY_BYTES even without a Content-Length. */
export async function readJsonBody(request: Request): Promise<{ ok: true; value: unknown } | { ok: false; status: number }> {
  if (!request.body) return { ok: false, status: 400 };
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY_BYTES) {
      await reader.cancel().catch(() => undefined);
      return { ok: false, status: 413 };
    }
    chunks.push(value);
  }
  try {
    return { ok: true, value: JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(Buffer.concat(chunks))) };
  } catch {
    return { ok: false, status: 400 };
  }
}

let warned = false;
function trustedHops(env: Record<string, string | undefined>): number {
  const raw = env.TRUSTED_PROXY_HOPS?.trim();
  if (!raw) return 1;
  if (/^\d{1,2}$/.test(raw) && Number(raw) <= 10) return Number(raw);
  if (!warned) {
    warned = true;
    console.warn("[enquiry] TRUSTED_PROXY_HOPS must be a whole number from 0 to 10; using 1.");
  }
  return 1;
}

/** A plain IP address, or null: "1.2.3.4", "1.2.3.4:5678", "2001:db8::1", "[2001:db8::1]:443", "::ffff:1.2.3.4". */
export function normalizeIp(value: string): string | null {
  let s = value.trim();
  if (!s || s.length > 100) return null;
  const bracketed = /^\[([^\]]+)\](?::\d+)?$/.exec(s);
  if (bracketed) s = bracketed[1];
  else if (/^\d{1,3}(\.\d{1,3}){3}:\d+$/.test(s)) s = s.slice(0, s.lastIndexOf(":"));
  s = s.replace(/%.*$/, "");
  const mapped = /^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/i.exec(s);
  if (mapped) s = mapped[1];
  const kind = isIP(s);
  return kind === 4 ? s : kind === 6 ? s.toLowerCase() : null;
}

/** The first `groups` 16-bit groups of an IPv6 address ("2001:db8:0:1"). */
function ipv6Prefix(ip: string, groups: number): string {
  const [head, tail = ""] = ip.split("::");
  const left = head ? head.split(":") : [];
  const right = tail ? tail.split(":") : [];
  const all = [...left, ...Array(Math.max(0, 8 - left.length - right.length)).fill("0"), ...right];
  return all.slice(0, groups).map((g) => g.replace(/^0+(?=.)/, "")).join(":");
}

/** The rate-limit keys for this request: the visitor's address (IPv6: its /64), and its wider network (IPv6: /48). */
export function clientKeys(request: Request, env: Record<string, string | undefined> = process.env): { client: string; network: string } {
  const entries = (request.headers.get("x-forwarded-for") ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  const fromRight = Math.max(1, trustedHops(env));
  const ip = entries.length >= fromRight ? normalizeIp(entries[entries.length - fromRight]) : null;
  if (!ip) return { client: "unknown", network: "unknown" };
  if (isIP(ip) === 4) return { client: ip, network: ip };
  return { client: `${ipv6Prefix(ip, 4)}::/64`, network: `${ipv6Prefix(ip, 3)}::/48` };
}

const hits = new Map<string, number[]>();
let siteHits: number[] = [];

function recent(key: string, now: number): number[] {
  const times = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.set(key, times);
  return times;
}

/** Counts this request; true when it is over a limit (per connection, per network, or for the whole site). */
export function rateLimited(keys: { client: string; network: string }, now = Date.now()): boolean {
  siteHits = siteHits.filter((t) => now - t < WINDOW_MS);
  if (hits.size > MAX_TRACKED) {
    for (const [k, times] of hits) if (!times.some((t) => now - t < WINDOW_MS)) hits.delete(k);
    if (hits.size > MAX_TRACKED) hits.clear();
  }
  const client = recent(`c:${keys.client}`, now);
  const network = recent(`n:${keys.network}`, now);
  // Over a limit: refuse without recording, so a flood can't grow these lists.
  if (client.length >= MAX_PER_CLIENT || network.length >= MAX_PER_NETWORK || siteHits.length >= MAX_PER_SITE) return true;
  client.push(now);
  network.push(now);
  siteHits.push(now);
  return false;
}

/** For tests. */
export function resetRateLimits() {
  hits.clear();
  siteHits = [];
}
