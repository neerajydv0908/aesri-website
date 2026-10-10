/**
 * Runs once when the website's server starts (Next.js instrumentation hook).
 * Enquiries kept on this server's disk are deleted after 12 months even when
 * no new enquiry arrives: once at start-up and then every day
 * (lib/enquiry-store.ts). Nothing to do when enquiries are forwarded.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs" || process.env.ENQUIRY_FORWARD_URL?.trim()) return;
  const { pruneOldEnquiries } = await import("./lib/enquiry-store");
  const prune = () =>
    pruneOldEnquiries().catch((err) => console.error("[enquiry] could not delete old enquiries:", err instanceof Error ? err.message : err));
  await prune();
  setInterval(prune, 24 * 60 * 60 * 1000).unref();
}
