import type { StaticImageData } from "next/image";

/** English + Hindi text pair. */
export type Bi = { en: string; hi: string };

/**
 * A fact that must be confirmed from an official document before launch.
 * Rendered on the site as a small "To be confirmed" chip, and listed by
 * `npm run checklist` (see the README).
 */
export type Pending = { pending: true; what: string; source?: string };
export type Fact<T> = T | Pending;

export const tbc = (what: string, source?: string): Pending => ({ pending: true, what, source });

export function isPending(value: unknown): value is Pending {
  return typeof value === "object" && value !== null && (value as Pending).pending === true;
}

export type SchoolKey = "aryavart" | "aadharshila";
export type Scope = "aesri" | SchoolKey;

/**
 * Where a statement came from. Used on the disclosures pages.
 *  - verified:   checked against an official document (recognition order, certificate)
 *  - confirmed:  stated by the school management, not yet checked against a document
 *  - prospectus: taken from the school's own printed material
 *  - pending:    still to be confirmed
 */
export type Provenance = "verified" | "confirmed" | "prospectus" | "pending";

export type Img = {
  src: StaticImageData;
  alt: string;
  caption?: string;
  /** Guardian/staff consent for publishing people in this image. */
  consent: "confirmed" | "pending";
};

export type Clip = {
  video: string;
  poster: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  consent: "confirmed" | "pending";
};

export type Person = {
  name: string;
  role?: string;
  roleHi?: string;
  qualification?: string;
  photo?: Img;
  note?: string;
};

export type NoticeCategory = "admissions" | "fees" | "academic" | "holiday" | "transport" | "general" | "events";

export type Notice = {
  id: string;
  /** Which parts of the site show the notice. */
  scope: Scope[];
  category: NoticeCategory;
  title: Bi;
  summary: Bi;
  /** ISO date (YYYY-MM-DD). Hidden before this date. */
  publishedAt: string;
  /** ISO date (YYYY-MM-DD). Moves to the archive after this date. */
  expiresAt?: string;
  /** Named content owner (a role, not a private individual). */
  owner: string;
  version: number;
  pinned?: boolean;
  attachment?: { label: string; href: string };
};

export type CalendarItem = {
  month: string; // "2026-12"
  label: Bi;
  detail?: Bi;
  kind: "fees" | "holiday" | "exam" | "event" | "admissions";
  confirmed: boolean;
};

export type FeeHead = {
  head: Bi;
  amount: number | null;
  frequency: Bi;
  /** Short condition shown as a badge, e.g. "Non-refundable". */
  condition?: Bi;
};

export type FeeGroup = { classes: Bi; heads: FeeHead[] };

export type FeeSchedule = {
  /**
   * - awaiting-approval: no amounts yet; the page says they will be published
   * - published: amounts supplied by the school management, not yet approved
   *   by the SLFC
   * - approved: the SLFC has approved these amounts; `period` shows the
   *   sessions it covers ("To be confirmed" until added)
   */
  status: "approved" | "published" | "awaiting-approval";
  period: Fact<Bi>;
  /** Class-wise fee heads. Each head becomes a column in the fee table. */
  groups: FeeGroup[];
  /** Charges that are the same for every class, such as the one-time admission fee. */
  common?: FeeHead[];
  instalments: { term: Bi; window: Bi; classes?: Bi }[];
  howToPay: Bi[];
  /** Short notes shown under the fee table (transport, RTE seats…). */
  notes?: Bi[];
  version: number;
  publishedAt: string;
  owner: string;
};

export type DisclosureRow = {
  label: Bi;
  /** A row whose value is still tbc(...) is left off the page until it is filled in. */
  value: Fact<string>;
  /** Where the value comes from. For the team only: the site doesn't show it. */
  provenance: Provenance;
  /** Shown to the public under the value. Put reminders for the team in a "// To check:" comment instead. */
  note?: string;
};

export type Section = {
  name: Bi;
  classes: Bi;
  description: string;
  /** Subjects taught. An empty list means play-based learning (no subject list); tbc(...) shows "To be confirmed". */
  subjects: Fact<string[]>;
};

/** A stage of schooling (used where subject-wise sections aren't published yet). */
export type Stage = { name: Bi; classes: Bi; note?: Bi };

export type Facility = {
  title: string;
  titleHi: string;
  description: string;
  icon: "bus" | "blocks" | "book" | "sun" | "trees" | "shirt" | "compass" | "users" | "notebook" | "shield";
  image?: Img;
};

export type Story = {
  slug: string;
  title: string;
  kicker: string;
  school: Scope;
  summary: string;
  body: string[];
  media: Clip | Img;
  gallery?: (Clip | Img)[];
};

export type FAQ = { q: Bi; a: Bi };
