import { PORTAL_URL } from "@/content/portal";

/**
 * The Campus Portal's address. NEXT_PUBLIC_PORTAL_URL when set (it is built
 * into the pages, so set it before `npm run build`); otherwise
 * https://portal.aesrischools.org (content/portal.ts), or http://localhost:3001
 * while developing, where the portal's own `npm run dev` runs.
 */
export const portalUrl: string = (
  process.env.NEXT_PUBLIC_PORTAL_URL?.trim() || (process.env.NODE_ENV === "development" ? "http://localhost:3001" : PORTAL_URL)
).replace(/\/+$/, "");

/** "portal.aesrischools.org": the address to show (and type). */
export const portalHost: string = portalUrl.replace(/^https?:\/\//, "");

/**
 * A page of the portal in the reader's language: `${portal}/login?lang=hi`.
 * The portal remembers the language and opens the same page without the
 * parameter, so a reader who was reading in Hindi signs in in Hindi.
 */
export function portalHref(path: "/login" | "/activate", lang: "en" | "hi"): string {
  return `${portalUrl}${path}?lang=${lang}`;
}
