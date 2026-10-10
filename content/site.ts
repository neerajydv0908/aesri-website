/**
 * Organisation-level content for AESRI.
 * Anything wrapped in tbc(...) is shown as "To be confirmed" until it is
 * replaced with the value from the official document.
 */
import { img } from "./media";
import { PORTAL_URL } from "./portal";
import type { Bi, Fact, Person } from "./types";

export const site = {
  name: "Aryavart Educational and Social Research Institute",
  nameHi: "आर्यवर्त शैक्षिक एवं सामाजिक अनुसंधान संस्थान",
  short: "AESRI",
  domain: "aesrischools.org",
  url: "https://aesrischools.org",
  /** The Campus Portal (content/portal.ts; NEXT_PUBLIC_PORTAL_URL overrides it, see lib/portal.ts). */
  portalUrl: PORTAL_URL,
  tagline: {
    en: "Education with deep roots.",
    hi: "जड़ों से जुड़ी शिक्षा।",
  } satisfies Bi,
  mission: {
    en: "AESRI runs two English-medium village schools in Bikaner district — Aryavart Public School in Palana and Aadharshila Public School in Udairamsar — and works to give every child there an education that is rigorous, rooted in values and close to home.",
    hi: "एईएसआरआई बीकानेर ज़िले के दो गाँवों में अंग्रेज़ी माध्यम के दो विद्यालय चलाता है — पलाना में आर्यवर्त पब्लिक स्कूल और उदयरामसर में आधारशिला पब्लिक स्कूल — ताकि हर बच्चे को घर के पास ही गुणवत्तापूर्ण, संस्कारयुक्त शिक्षा मिल सके।",
  } satisfies Bi,
  region: { en: "Bikaner, Rajasthan", hi: "बीकानेर, राजस्थान" } satisfies Bi,
  identity: {
    legalForm: "Registered society" as Fact<string>,
    registrationNumber: "65/BKN/2012-13" as Fact<string>,
  },
  contact: {
    // The same phone and email as both school offices (confirmed by the management).
    phone: "+91 75973 82016" as Fact<string>,
    email: "deepakudairamsar@gmail.com" as Fact<string>,
    // No address: the contact page shows AESRI's phone and email only. Write one here to publish it.
    address: null as string | null,
    hours: { en: "Monday to Saturday, during school office hours", hi: "सोमवार से शनिवार, विद्यालय कार्यालय समय में" } satisfies Bi,
    // Privacy questions and complaints go to the same office phone and email (the management's decision).
    privacyContact: "deepakudairamsar@gmail.com" as Fact<string>,
    grievanceContact: "+91 75973 82016 · deepakudairamsar@gmail.com" as Fact<string>,
  },
  founders: [
    {
      name: "Shri Deepak Yadav",
      role: "Founder",
      roleHi: "संस्थापक",
      photo: img.aesri.deepak,
      note: "Co-founded Aadharshila Public School in 2017. In 2013, Karuna International Sanstha, Bikaner honoured him for ten consecutive years of 100% board examination results and seven consecutive years of students in the merit list.",
    },
    {
      name: "Smt. Anita Yadav",
      role: "Director, Aadharshila Public School",
      roleHi: "निदेशक, आधारशिला पब्लिक स्कूल",
      qualification: "M.A., BSTC, B.Ed.",
      photo: img.aesri.anita,
      note: "Co-founded Aadharshila Public School in 2017 and teaches at Aryavart Public School, Palana.",
    },
  ] satisfies Person[],
} as const;

export type NavItem = { href: string; label: Bi; description?: string };

export const primaryNav: NavItem[] = [
  { href: "/about", label: { en: "About", hi: "परिचय" }, description: "Who we are and how AESRI began" },
  { href: "/governance", label: { en: "Governance", hi: "प्रशासन" }, description: "Governing body, identity and accountability" },
  { href: "/schools", label: { en: "Our Schools", hi: "हमारे विद्यालय" } },
  { href: "/social-initiatives", label: { en: "Initiatives", hi: "सामाजिक पहल" }, description: "Our commitments in the community" },
  { href: "/research", label: { en: "Research", hi: "अनुसंधान" }, description: "Research and publications" },
  { href: "/news", label: { en: "News", hi: "समाचार" }, description: "News, stories and events" },
  { href: "/careers", label: { en: "Careers", hi: "करियर" }, description: "Teach and work with us" },
  { href: "/contact", label: { en: "Contact", hi: "संपर्क" } },
];

export const footerNav = {
  organisation: [
    { href: "/about", label: { en: "About AESRI", hi: "एईएसआरआई परिचय" } },
    { href: "/governance", label: { en: "Governance", hi: "प्रशासन" } },
    { href: "/social-initiatives", label: { en: "Social initiatives", hi: "सामाजिक पहल" } },
    { href: "/research", label: { en: "Research & publications", hi: "अनुसंधान एवं प्रकाशन" } },
    { href: "/news", label: { en: "News & events", hi: "समाचार एवं कार्यक्रम" } },
    { href: "/careers", label: { en: "Careers", hi: "करियर" } },
  ],
  help: [
    { href: "/contact", label: { en: "Contact & help", hi: "संपर्क एवं सहायता" } },
    { href: "/policies/grievance-redressal", label: { en: "Raise a concern", hi: "शिकायत दर्ज करें" } },
    { href: "/policies/privacy-policy", label: { en: "Privacy", hi: "गोपनीयता" } },
    { href: "/policies/accessibility-statement", label: { en: "Accessibility", hi: "सुगम्यता" } },
    { href: "/policies", label: { en: "All policies", hi: "सभी नीतियाँ" } },
    { href: "/portal", label: { en: "Campus Portal", hi: "कैंपस पोर्टल" } },
  ],
} satisfies Record<string, NavItem[]>;

export type Milestone = {
  id: string;
  /** ISO date (YYYY-MM-DD) when the exact day is known. */
  date?: string;
  /** Shown instead of a date when only the year or session is known, e.g. "2012–13". */
  when?: string;
  year: string;
  title: string;
  body: string;
};

/** Milestones used on the About page and News page, oldest first. */
export const milestones: Milestone[] = [
  {
    id: "aryavart-founded",
    date: "2000-05-25",
    year: "2000",
    title: "Aryavart Public School is founded",
    body: "Aryavart Public School is founded in the village of Palana, Bikaner, on 25 May 2000. Today it teaches from LKG to Class XII, with the Arts stream in Classes XI and XII.",
  },
  {
    id: "aesri-registered",
    when: "2012–13",
    year: "2012–13",
    title: "AESRI is registered as a society",
    body: "Aryavart Educational and Social Research Institute is registered as a society, registration number 65/BKN/2012-13.",
  },
  {
    id: "citation-2013",
    date: "2013-02-14",
    year: "2013",
    title: "Recognised for a decade of results",
    body: "On Basant Panchami, Karuna International Sanstha, Gangashahar (Bikaner) honours Shri Deepak Yadav for making Udairamsar a trusted name in school education — citing ten consecutive years of 100% board examination results, state-level records and seven consecutive years of students in the merit list.",
  },
  {
    id: "aadharshila-founded",
    date: "2017-03-21",
    year: "2017",
    title: "Aadharshila Public School is founded",
    body: "Mr. Deepak Yadav and Mrs. Anita Yadav found Aadharshila Public School in Udairamsar on 21 March 2017 — an English-medium, co-educational school. An inauguration function is held the same month.",
  },
  {
    id: "platform-2026",
    date: "2026-09-28",
    year: "2026",
    title: "One platform for both schools",
    body: "AESRI begins building a shared website and campus portal, so each school has its own complete site while records, fees and permissions stay properly separated.",
  },
];

export function milestone(id: string): Milestone {
  const m = milestones.find((x) => x.id === id);
  if (!m) throw new Error(`Unknown milestone ${id}`);
  return m;
}

/** The quotation from the 2013 citation (verbatim Hindi + English translation). */
export const citationQuote = {
  hi: "आप ग्रामीण बालक-बालिकाओं के लिए आदर्श शिक्षक, प्रेरक एवं आशा की एक किरण हैं।",
  en: "You are an ideal teacher, a motivator and a ray of hope for the boys and girls of our villages.",
  source: "Citation to Shri Deepak Yadav, Karuna International Sanstha, Bikaner — Basant Panchami, 14 February 2013",
} as const;

export const values = [
  {
    title: "Learning by doing",
    titleHi: "करके सीखना",
    body: "Children survey their own school ground, sit exams in the open air and learn from guests who visit their classrooms. Understanding comes from doing.",
  },
  {
    title: "Values and discipline",
    titleHi: "संस्कार एवं अनुशासन",
    body: "Discipline, cleanliness and politeness are taught from the very first day of nursery — as Aadharshila's nursery section puts it, “catch them young”.",
  },
  {
    title: "Every child seen",
    titleHi: "हर बच्चे पर ध्यान",
    body: "Teachers keep a close and caring watch on each child's progress, and choose methods that suit how children actually learn.",
  },
  {
    title: "Rooted in the village",
    titleHi: "गाँव से जुड़ाव",
    body: "Our schools serve Palana and Udairamsar. School vans reach families across the village, and elders are welcome in our classrooms.",
  },
] as const;
