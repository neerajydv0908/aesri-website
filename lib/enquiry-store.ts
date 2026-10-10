/**
 * Where enquiries are kept when they aren't forwarded, and how long: one file
 * per school and month (<school>-<YYYY-MM>.ndjson), readable only by the
 * account that runs the site. A month's file is deleted once its enquiries
 * could be 12 months old, as the privacy policy promises: after each new
 * enquiry, when the server starts, and once a day (instrumentation.ts).
 */
import { appendFile, mkdir, readdir, unlink } from "node:fs/promises";
import path from "node:path";
import { ENQUIRY_SCHOOLS } from "./enquiry-schema";

export const KEEP_MONTHS = 12;

/** ENQUIRY_DATA_DIR (an absolute folder), or data/enquiries in the app folder. */
export function enquiryDataDir(): string {
  const set = process.env.ENQUIRY_DATA_DIR?.trim();
  return set && path.isAbsolute(set) ? set : path.join(process.cwd(), "data", "enquiries");
}

/** Appends one enquiry to its school's file for this month. */
export async function storeEnquiry(school: string, record: object, now: Date): Promise<void> {
  const dir = enquiryDataDir();
  await mkdir(dir, { recursive: true, mode: 0o700 });
  await appendFile(path.join(dir, `${school}-${now.toISOString().slice(0, 7)}.ndjson`), JSON.stringify(record) + "\n", { encoding: "utf8", mode: 0o600 });
}

/** Deletes every school's files from before the current month and the 11 before it. Returns how many went. */
export async function pruneOldEnquiries(now = new Date(), dir = enquiryDataDir()): Promise<number> {
  const oldest = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - (KEEP_MONTHS - 1), 1)).toISOString().slice(0, 7);
  const pattern = new RegExp(`^(?:${ENQUIRY_SCHOOLS.join("|")})-(\\d{4}-\\d{2})\\.ndjson$`);
  let names: string[];
  try {
    names = await readdir(dir);
  } catch {
    return 0; // no enquiries stored yet
  }
  let deleted = 0;
  for (const name of names) {
    const month = pattern.exec(name)?.[1];
    if (month && month < oldest) {
      await unlink(path.join(dir, name));
      deleted++;
    }
  }
  return deleted;
}
