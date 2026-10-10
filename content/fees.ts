/**
 * Fee schedules — one per school.
 *
 * Under the Rajasthan Schools (Regulation of Fee) Act, 2016 the fee must be
 * shown on the school notice board and on its website, in Hindi and English,
 * with separate fee heads. Keep this file and the portal's billing
 * configuration on the SAME version.
 *
 * Amounts below are per student, per year (each class in a group such as
 * "LKG – Class V" has that fee; it is not shared between the classes), paid
 * in two instalments, as supplied by the school management, and are
 * approved by each school's School Level Fee Committee (SLFC). Fill in
 * `period` (the sessions covered) from the SLFC decision. Never add a
 * routine annual percentage increase here. The instalment names match the
 * portal's fee lines: Term I / पहली किस्त, Term II / दूसरी किस्त.
 */
import type { Bi, FeeHead, FeeSchedule, SchoolKey } from "./types";

/** The annual fee: what each student pays in a year (not one fee shared by the classes of a group). */
const annual = (amount: number, frequency: Bi = { en: "Per year, in two instalments", hi: "प्रति वर्ष, दो किस्तों में" }): FeeHead[] => [
  { head: { en: "Annual fee (per student)", hi: "वार्षिक शुल्क (प्रति विद्यार्थी)" }, amount, frequency },
];

/** One-time admission fee — the same at both schools. */
const admissionFeeHead: FeeHead = {
  head: { en: "Admission fee", hi: "प्रवेश शुल्क" },
  amount: 2000,
  frequency: { en: "Once, at the time of admission", hi: "प्रवेश के समय एक बार" },
  condition: { en: "Non-refundable", hi: "वापसी योग्य नहीं" },
};

const rteNote: Bi = {
  en: "Children admitted to RTE-reserved seats through the Government's process study free of charge, as the RTE Act provides.",
  hi: "सरकारी प्रक्रिया से RTE आरक्षित सीटों पर प्रवेश पाने वाले बच्चे शिक्षा का अधिकार अधिनियम के प्रावधानों के अनुसार निःशुल्क पढ़ते हैं।",
};

const perStudentNote: Bi = {
  en: "The annual fee is for each student. A row such as “LKG – Class V” means every one of those classes has this fee — not one fee shared between them.",
  hi: "वार्षिक शुल्क हर विद्यार्थी के लिए है। “एलकेजी – कक्षा 5” जैसी पंक्ति का अर्थ है कि उनमें से हर कक्षा की यही फ़ीस है — सब कक्षाओं की मिलाकर एक फ़ीस नहीं।",
};

const transportNote: Bi = {
  en: "School transport is optional. Apply at the school office, which will tell you the route and any charge for it.",
  hi: "विद्यालय परिवहन वैकल्पिक है। इसके लिए विद्यालय कार्यालय में आवेदन करें — मार्ग और उसके शुल्क की जानकारी वहीं से मिलेगी।",
};

/** The session these approved fees apply to. An SLFC approval can cover up to three academic years; widen this if it does. */
const feePeriod: Bi = { en: "Session 2026–27", hi: "सत्र 2026–27" };

export const feeSchedules: Record<SchoolKey, FeeSchedule> = {
  aadharshila: {
    status: "approved",
    period: feePeriod,
    groups: [
      { classes: { en: "Nursery – Class V", hi: "नर्सरी – कक्षा 5" }, heads: annual(10000) },
      { classes: { en: "Classes VI – VIII", hi: "कक्षा 6 – 8" }, heads: annual(14000) },
      { classes: { en: "Class IX", hi: "कक्षा 9" }, heads: annual(16000) },
      { classes: { en: "Class X", hi: "कक्षा 10" }, heads: annual(18000) },
    ],
    common: [admissionFeeHead],
    instalments: [
      { term: { en: "Term I", hi: "पहली किस्त" }, window: { en: "1 – 10 April", hi: "1 – 10 अप्रैल" } },
      { term: { en: "Term II", hi: "दूसरी किस्त" }, window: { en: "1 – 15 September", hi: "1 – 15 सितंबर" } },
    ],
    howToPay: [
      {
        en: "The school gives every student a pay-in-slip for each instalment, to deposit the fee at the designated bank.",
        hi: "विद्यालय प्रत्येक विद्यार्थी को हर किस्त के लिए पे-इन-स्लिप देता है, जिससे निर्धारित बैंक में फ़ीस जमा की जाती है।",
      },
      {
        en: "Fee information is available at the school reception during office hours on any working day (except Sundays and holidays).",
        hi: "फ़ीस की जानकारी किसी भी कार्यदिवस (रविवार व अवकाश को छोड़कर) कार्यालय समय में विद्यालय के स्वागत कक्ष से ली जा सकती है।",
      },
      {
        en: "Only the approved fee heads shown on this page may be charged. Keep every receipt.",
        hi: "केवल इस पृष्ठ पर दर्शाए गए स्वीकृत शुल्क मद ही लिए जा सकते हैं। हर रसीद संभाल कर रखें।",
      },
    ],
    notes: [perStudentNote, transportNote, rteNote],
    version: 2,
    publishedAt: "2026-09-29",
    owner: "Accounts office, Aadharshila",
  },
  aryavart: {
    status: "approved",
    period: feePeriod,
    groups: [
      { classes: { en: "LKG – Class V", hi: "एलकेजी – कक्षा 5" }, heads: annual(10000) },
      { classes: { en: "Classes VI – VIII", hi: "कक्षा 6 – 8" }, heads: annual(13000) },
      { classes: { en: "Class IX", hi: "कक्षा 9" }, heads: annual(16000) },
      { classes: { en: "Class X", hi: "कक्षा 10" }, heads: annual(18000) },
      { classes: { en: "Classes XI – XII (Arts)", hi: "कक्षा 11 – 12 (कला संकाय)" }, heads: annual(25000) },
    ],
    common: [admissionFeeHead],
    // The same as Aadharshila's, as the management confirmed.
    instalments: [
      { term: { en: "Term I", hi: "पहली किस्त" }, window: { en: "1 – 10 April", hi: "1 – 10 अप्रैल" } },
      { term: { en: "Term II", hi: "दूसरी किस्त" }, window: { en: "1 – 15 September", hi: "1 – 15 सितंबर" } },
    ],
    howToPay: [
      {
        en: "Fee information is available at the school office during office hours on working days.",
        hi: "फ़ीस की जानकारी कार्यदिवसों में कार्यालय समय पर विद्यालय कार्यालय से ली जा सकती है।",
      },
      {
        en: "Only the approved fee heads shown on this page may be charged. Keep every receipt.",
        hi: "केवल इस पृष्ठ पर दर्शाए गए स्वीकृत शुल्क मद ही लिए जा सकते हैं। हर रसीद संभाल कर रखें।",
      },
    ],
    notes: [perStudentNote, transportNote, rteNote],
    version: 2,
    publishedAt: "2026-09-29",
    owner: "Accounts office, Aryavart",
  },
};

export const feeLawNote: Bi = {
  en: "Under the Rajasthan Schools (Regulation of Fee) Act, 2016, the school management proposes its fee and the School Level Fee Committee — which includes parents' representatives — approves it. The approved fee is displayed on the school notice board and on this website, and remains in force for three academic years.",
  hi: "राजस्थान विद्यालय (फ़ीस विनियमन) अधिनियम, 2016 के अंतर्गत विद्यालय प्रबंधन फ़ीस प्रस्तावित करता है और विद्यालय स्तरीय फ़ीस समिति — जिसमें अभिभावकों के प्रतिनिधि शामिल हैं — उसे स्वीकृत करती है। स्वीकृत फ़ीस विद्यालय के सूचना पट्ट और इस वेबसाइट पर प्रदर्शित की जाती है तथा तीन शैक्षणिक वर्षों तक लागू रहती है।",
};

/** Indian rupee format: 25000 → "₹25,000". */
export const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/** The one-time admission fee for a school, if published. */
export function admissionFee(key: SchoolKey): FeeHead | undefined {
  return feeSchedules[key].common?.find((h) => h.head.en === "Admission fee" && h.amount !== null);
}
