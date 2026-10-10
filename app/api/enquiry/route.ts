import { randomBytes } from "node:crypto";
import { enquirySchema } from "@/lib/enquiry-schema";
import { clientKeys, rateLimited, readJsonBody, requestProblem } from "@/lib/enquiry-guard";
import { pruneOldEnquiries, storeEnquiry } from "@/lib/enquiry-store";

/**
 * Receives admission and general enquiries.
 *
 * Phase 1 behaviour: validate on the server, drop spam, and append each
 * enquiry to a per-school, per-month file (lib/enquiry-store.ts) so the two
 * schools' enquiries are never mixed, deleting each month's file once its
 * enquiries could be 12 months old, as the privacy policy promises. In the portal phase this
 * handler will forward to the portal's admissions module instead (set
 * ENQUIRY_FORWARD_URL). The public website never holds database credentials
 * for student records.
 *
 * Abuse protection (same-origin JSON only, size limit, rate limits) is in
 * lib/enquiry-guard.ts.
 */

export const runtime = "nodejs";

const prefix: Record<string, string> = { aryavart: "ARY", aadharshila: "AAD", aesri: "AESRI" };
const FORWARD_TIMEOUT_MS = 10_000;

async function forward(url: string, record: object) {
  const token = process.env.ENQUIRY_FORWARD_TOKEN?.trim();
  if (!token) throw new Error("ENQUIRY_FORWARD_TOKEN is not set");
  if (process.env.NODE_ENV === "production" && !url.startsWith("https://")) throw new Error("ENQUIRY_FORWARD_URL must start with https://");
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
    body: JSON.stringify(record),
    // A login page or other redirect must not look like a saved enquiry.
    redirect: "error",
    signal: AbortSignal.timeout(FORWARD_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Forward failed: ${res.status}`);
}

export async function POST(request: Request) {
  const problem = requestProblem(request);
  if (problem) return Response.json({ ok: false, error: problem.error }, { status: problem.status });

  if (rateLimited(clientKeys(request))) {
    return Response.json({ ok: false, error: "Too many enquiries from this connection. Please try again later or call the school office." }, { status: 429 });
  }

  const body = await readJsonBody(request);
  if (!body.ok) {
    return Response.json({ ok: false, error: body.status === 413 ? "The enquiry is too long." : "Invalid request." }, { status: body.status });
  }

  const parsed = enquirySchema.safeParse(body.value);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return Response.json({ ok: false, fieldErrors }, { status: 422 });
  }

  const data = parsed.data;
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, "");
  const reference = `${prefix[data.school]}-${date}-${randomBytes(2).toString("hex").toUpperCase()}`;

  // Honeypot filled: pretend success, store nothing.
  if (data.website) return Response.json({ ok: true, reference });

  const record = {
    reference,
    receivedAt: now.toISOString(),
    school: data.school,
    kind: data.kind,
    parentName: data.parentName,
    phone: data.phone,
    email: data.email || null,
    childName: data.childName || null,
    classSought: data.classSought || null,
    replyLanguage: data.replyLanguage,
    message: data.message || null,
    consent: true,
  };

  try {
    const url = process.env.ENQUIRY_FORWARD_URL?.trim();
    if (url) {
      await forward(url, record);
    } else {
      await storeEnquiry(data.school, record, now);
      await pruneOldEnquiries(now).catch((err) => console.error("[enquiry] could not delete old enquiries:", err instanceof Error ? err.message : err));
    }
  } catch (err) {
    // The reason only (never the enquiry itself: it holds a family's details).
    console.error("[enquiry] could not store enquiry:", err instanceof Error ? err.message : String(err));
    return Response.json({ ok: false, error: "We couldn't save your enquiry just now. Please call the school office." }, { status: 500 });
  }

  return Response.json({ ok: true, reference });
}
