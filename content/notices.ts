/**
 * Notices and calendars.
 *
 * Publishing rules enforced by the helpers below:
 *  - a notice appears only in the sections listed in `scope`
 *  - it is hidden before `publishedAt`
 *  - it moves to the archive after `expiresAt` (so old fee sheets and
 *    admission notices never stay "current" by accident)
 *  - every notice names a content owner and carries a version number
 *
 * In the portal phase, school editors will draft notices and an authorised
 * approver will publish them; this file mirrors that data shape.
 */
import type { CalendarItem, Notice, NoticeCategory, Scope, SchoolKey } from "./types";

export const notices: Notice[] = [
  {
    id: "rte-admissions-portal",
    scope: ["aesri", "aryavart", "aadharshila"],
    category: "admissions",
    title: {
      en: "RTE admissions happen only through the Government of Rajasthan's process",
      hi: "RTE प्रवेश केवल राजस्थान सरकार की प्रक्रिया से होते हैं",
    },
    summary: {
      en: "Seats reserved under the Right to Education Act are allotted only through the government's official online process. Our enquiry forms are not RTE applications — the school office will gladly guide you.",
      hi: "शिक्षा का अधिकार अधिनियम के अंतर्गत आरक्षित सीटें केवल सरकार की आधिकारिक ऑनलाइन प्रक्रिया से आवंटित होती हैं। हमारे पूछताछ फ़ॉर्म RTE आवेदन नहीं हैं — विद्यालय कार्यालय ख़ुशी से मार्गदर्शन करेगा।",
    },
    publishedAt: "2026-09-28",
    owner: "Admissions office",
    version: 1,
    pinned: true,
  },
  {
    id: "new-website",
    scope: ["aesri", "aryavart", "aadharshila"],
    category: "general",
    title: { en: "Each school now has its own pages", hi: "अब हर विद्यालय के अपने पृष्ठ हैं" },
    summary: {
      en: "Admissions, fees, notices and contact details for Aryavart and Aadharshila are now on their own school pages. If you can't find something, please tell the school office.",
      hi: "आर्यवर्त और आधारशिला के प्रवेश, फ़ीस, सूचनाएँ और संपर्क विवरण अब उनके अपने पृष्ठों पर हैं। यदि कोई जानकारी न मिले, तो कृपया विद्यालय कार्यालय को बताएँ।",
    },
    publishedAt: "2026-09-28",
    expiresAt: "2026-12-31",
    owner: "AESRI office",
    version: 1,
  },
  {
    id: "aps-fee-structure",
    scope: ["aadharshila"],
    category: "fees",
    title: { en: "Fee structure by class is now on the Fees page", hi: "कक्षावार फ़ीस संरचना अब फ़ीस पृष्ठ पर" },
    summary: {
      en: "Annual fee per student, per year: Nursery – Class V ₹10,000 · Classes VI – VIII ₹14,000 · Class IX ₹16,000 · Class X ₹18,000. Admission fee ₹2,000, paid once at admission (non-refundable).",
      hi: "वार्षिक फ़ीस (प्रति विद्यार्थी, प्रति वर्ष): नर्सरी – कक्षा 5 ₹10,000 · कक्षा 6 – 8 ₹14,000 · कक्षा 9 ₹16,000 · कक्षा 10 ₹18,000। प्रवेश शुल्क ₹2,000, प्रवेश के समय एक बार (वापसी योग्य नहीं)।",
    },
    publishedAt: "2026-09-30",
    expiresAt: "2027-03-31",
    owner: "Accounts office, Aadharshila",
    version: 2,
  },
  {
    id: "aps-fee-instalments",
    scope: ["aadharshila"],
    category: "fees",
    title: { en: "Fee instalment dates", hi: "फ़ीस किस्तों की तिथियाँ" },
    summary: {
      en: "Fees are deposited at the bank in two instalments using the pay-in-slip provided by the school — Term I: 1–10 April · Term II: 1–15 September.",
      hi: "फ़ीस विद्यालय द्वारा दी गई पे-इन-स्लिप से बैंक में दो किस्तों में जमा होती है — पहली किस्त: 1–10 अप्रैल · दूसरी किस्त: 1–15 सितंबर।",
    },
    publishedAt: "2026-09-30",
    expiresAt: "2027-03-31",
    owner: "Accounts office, Aadharshila",
    version: 3,
  },
  {
    id: "aps-timings",
    scope: ["aadharshila"],
    category: "academic",
    title: { en: "School timings (single shift)", hi: "विद्यालय समय (एक पाली)" },
    summary: {
      en: "Summer: 7:30 am – 1:30 pm · Winter: 9:00 am – 3:00 pm.",
      hi: "ग्रीष्मकाल: प्रातः 7:30 – दोपहर 1:30 · शीतकाल: प्रातः 9:00 – अपराह्न 3:00।",
    },
    publishedAt: "2026-09-28",
    expiresAt: "2027-03-31",
    owner: "Principal's office, Aadharshila",
    version: 1,
  },
  {
    id: "aps-transport",
    scope: ["aadharshila"],
    category: "transport",
    title: { en: "Applying for school transport", hi: "विद्यालय परिवहन हेतु आवेदन" },
    summary: {
      en: "School vans cover every corner of the village. Please apply for transport separately at the school office.",
      hi: "विद्यालय वैन गाँव के हर कोने तक जाती हैं। परिवहन के लिए विद्यालय कार्यालय में अलग से आवेदन करें।",
    },
    publishedAt: "2026-09-28",
    owner: "Transport desk, Aadharshila",
    version: 1,
  },
  {
    id: "aps-winter-break",
    scope: ["aadharshila"],
    category: "holiday",
    title: { en: "Winter break: 31 December – 10 January", hi: "शीतकालीन अवकाश: 31 दिसंबर – 10 जनवरी" },
    summary: {
      en: "The school is closed for the winter break from 31 December 2026 to 10 January 2027, as in the Education Department's calendar. Classes resume on Monday, 11 January.",
      hi: "शिक्षा विभाग के कैलेंडर के अनुसार विद्यालय 31 दिसंबर 2026 से 10 जनवरी 2027 तक शीतकालीन अवकाश हेतु बंद रहेगा। कक्षाएँ सोमवार, 11 जनवरी से पुनः आरंभ होंगी।",
    },
    publishedAt: "2026-09-28",
    expiresAt: "2027-01-15",
    owner: "Principal's office, Aadharshila",
    version: 2,
  },
  {
    id: "aps-term-2-2026",
    scope: ["aadharshila"],
    category: "fees",
    title: { en: "Term II fees: 1–15 September 2026", hi: "द्वितीय सत्र फ़ीस: 1–15 सितंबर 2026" },
    summary: {
      en: "Please deposit the second instalment at the bank using your pay-in-slip between 1 and 15 September.",
      hi: "कृपया द्वितीय किस्त 1 से 15 सितंबर के बीच अपनी पे-इन-स्लिप से बैंक में जमा करें।",
    },
    publishedAt: "2026-08-25",
    expiresAt: "2026-09-15",
    owner: "Accounts office, Aadharshila",
    version: 1,
  },
  {
    id: "apl-fee-structure",
    scope: ["aryavart"],
    category: "fees",
    title: { en: "Fee structure by class is now on the Fees page", hi: "कक्षावार फ़ीस संरचना अब फ़ीस पृष्ठ पर" },
    summary: {
      en: "Annual fee per student, per year: LKG – Class V ₹10,000 · Classes VI – VIII ₹13,000 · Class IX ₹16,000 · Class X ₹18,000 · Classes XI – XII (Arts) ₹25,000. Admission fee ₹2,000, paid once at admission (non-refundable).",
      hi: "वार्षिक फ़ीस (प्रति विद्यार्थी, प्रति वर्ष): एलकेजी – कक्षा 5 ₹10,000 · कक्षा 6 – 8 ₹13,000 · कक्षा 9 ₹16,000 · कक्षा 10 ₹18,000 · कक्षा 11 – 12 (कला) ₹25,000। प्रवेश शुल्क ₹2,000, प्रवेश के समय एक बार (वापसी योग्य नहीं)।",
    },
    publishedAt: "2026-09-30",
    expiresAt: "2027-03-31",
    owner: "Accounts office, Aryavart",
    version: 3,
  },
  {
    id: "apl-transport",
    scope: ["aryavart"],
    category: "transport",
    title: { en: "School transport", hi: "विद्यालय परिवहन" },
    summary: {
      en: "Aryavart runs its own school vans. Ask the school office about routes and apply for transport separately.",
      hi: "आर्यवर्त की अपनी विद्यालय वैन हैं। मार्गों की जानकारी कार्यालय से लें और परिवहन के लिए अलग से आवेदन करें।",
    },
    publishedAt: "2026-09-28",
    owner: "Transport desk, Aryavart",
    version: 1,
  },
];

export const categoryLabels: Record<NoticeCategory, { en: string; hi: string }> = {
  admissions: { en: "Admissions", hi: "प्रवेश" },
  fees: { en: "Fees", hi: "फ़ीस" },
  academic: { en: "Academic", hi: "शैक्षणिक" },
  holiday: { en: "Holidays", hi: "अवकाश" },
  transport: { en: "Transport", hi: "परिवहन" },
  general: { en: "General", hi: "सामान्य" },
  events: { en: "Events", hi: "कार्यक्रम" },
};

/** Today's date in India (YYYY-MM-DD), so expiry follows local school days. */
export function todayIST(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

function sortNotices(a: Notice, b: Notice) {
  if (!!b.pinned !== !!a.pinned) return b.pinned ? 1 : -1;
  return b.publishedAt.localeCompare(a.publishedAt);
}

export function activeNotices(scope: Scope, today = todayIST()): Notice[] {
  return notices
    .filter((n) => n.scope.includes(scope) && n.publishedAt <= today && (!n.expiresAt || n.expiresAt >= today))
    .sort(sortNotices);
}

export function archivedNotices(scope: Scope, today = todayIST()): Notice[] {
  return notices
    .filter((n) => n.scope.includes(scope) && n.publishedAt <= today && !!n.expiresAt && n.expiresAt < today)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

const monthsEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthsHi = ["जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"];

/** Deterministic date formatting (identical on server and in the browser). */
export function formatDate(iso: string, lang: "en" | "hi" = "en"): string {
  const [y, m, d] = iso.split("-").map(Number);
  return lang === "hi" ? `${d} ${monthsHi[m - 1]} ${y}` : `${d} ${monthsEn[m - 1]} ${y}`;
}

export function monthName(index: number, lang: "en" | "hi" = "en"): string {
  return lang === "hi" ? monthsHi[index] : monthsEn[index];
}

/* ------------------------------------------------------------------ */
/* Session calendars                                                   */
/* ------------------------------------------------------------------ */

/**
 * 2026–27, the same for both schools: vacations from the Rajasthan Education Department's
 * calendar (Shivira Panchang), festival holidays from the state's holiday list, and the
 * schools' fee instalments. Exam dates are announced by notice.
 */
const session2026: CalendarItem[] = [
  { month: "2026-04", kind: "event", label: { en: "Session begins", hi: "सत्र आरंभ" }, detail: { en: "1 April", hi: "1 अप्रैल" }, confirmed: true },
  { month: "2026-04", kind: "fees", label: { en: "Term I fees", hi: "पहली किस्त की फ़ीस" }, detail: { en: "1–10 April", hi: "1–10 अप्रैल" }, confirmed: true },
  { month: "2026-05", kind: "holiday", label: { en: "Summer break", hi: "ग्रीष्मावकाश" }, detail: { en: "From 17 May", hi: "17 मई से" }, confirmed: true },
  { month: "2026-06", kind: "holiday", label: { en: "Summer break", hi: "ग्रीष्मावकाश" }, detail: { en: "Until 20 June", hi: "20 जून तक" }, confirmed: true },
  { month: "2026-08", kind: "event", label: { en: "Indepen\u00addence Day", hi: "स्वतंत्रता दिवस" }, detail: { en: "15 August", hi: "15 अगस्त" }, confirmed: true },
  { month: "2026-08", kind: "holiday", label: { en: "Raksha Bandhan", hi: "रक्षाबंधन" }, detail: { en: "28 August", hi: "28 अगस्त" }, confirmed: true },
  { month: "2026-09", kind: "holiday", label: { en: "Janmash\u00adtami", hi: "जन्माष्टमी" }, detail: { en: "4 September", hi: "4 सितंबर" }, confirmed: true },
  { month: "2026-09", kind: "fees", label: { en: "Term II fees", hi: "दूसरी किस्त की फ़ीस" }, detail: { en: "1–15 September", hi: "1–15 सितंबर" }, confirmed: true },
  { month: "2026-10", kind: "holiday", label: { en: "Gandhi Jayanti", hi: "गांधी जयंती" }, detail: { en: "2 October", hi: "2 अक्टूबर" }, confirmed: true },
  { month: "2026-10", kind: "holiday", label: { en: "Dussehra", hi: "दशहरा" }, detail: { en: "20 October", hi: "20 अक्टूबर" }, confirmed: true },
  { month: "2026-10", kind: "exam", label: { en: "Half-yearly exams", hi: "अर्धवार्षिक परीक्षा" }, detail: { en: "Dates by notice", hi: "तिथियाँ सूचना द्वारा" }, confirmed: false },
  { month: "2026-11", kind: "holiday", label: { en: "Diwali break", hi: "दीपावली अवकाश" }, detail: { en: "4–15 November (Diwali 8 November)", hi: "4–15 नवंबर (दीपावली 8 नवंबर)" }, confirmed: true },
  { month: "2026-12", kind: "holiday", label: { en: "Christmas", hi: "क्रिसमस" }, detail: { en: "25 December", hi: "25 दिसंबर" }, confirmed: true },
  { month: "2026-12", kind: "holiday", label: { en: "Winter break", hi: "शीतकालीन अवकाश" }, detail: { en: "From 31 December", hi: "31 दिसंबर से" }, confirmed: true },
  { month: "2027-01", kind: "holiday", label: { en: "Winter break", hi: "शीतकालीन अवकाश" }, detail: { en: "Until 10 January", hi: "10 जनवरी तक" }, confirmed: true },
  { month: "2027-01", kind: "event", label: { en: "Republic Day", hi: "गणतंत्र दिवस" }, detail: { en: "26 January", hi: "26 जनवरी" }, confirmed: true },
  { month: "2027-03", kind: "holiday", label: { en: "Holi", hi: "होली" }, detail: { en: "Dates by notice", hi: "तिथियाँ सूचना द्वारा" }, confirmed: false },
  { month: "2027-03", kind: "holiday", label: { en: "Eid-ul-Fitr", hi: "ईद-उल-फ़ित्र" }, detail: { en: "Date depends on the moon", hi: "तिथि चाँद दिखने पर" }, confirmed: false },
  { month: "2027-03", kind: "exam", label: { en: "Annual exams", hi: "वार्षिक परीक्षा" }, detail: { en: "Dates by notice", hi: "तिथियाँ सूचना द्वारा" }, confirmed: false },
];

export const calendars: Record<SchoolKey, { session: string; items: CalendarItem[] }> = {
  aadharshila: { session: "2026–27", items: session2026 },
  aryavart: { session: "2026–27", items: session2026 },
};
