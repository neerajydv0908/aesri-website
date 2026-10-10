/**
 * The two AESRI schools. Each school owns its own identity, facts, staff,
 * admissions process and disclosures. Values wrapped in tbc(...) render as
 * "To be confirmed" until replaced from the school's official documents.
 *
 * Sources used so far:
 *  - Aadharshila prospectus (introduction, focus, sections, session, timings,
 *    almanac & uniform, conveyance, admission procedure, fee instalments)
 *  - Aadharshila registration-cum-admission form
 *  - Handwritten teacher lists for both schools (spellings to be verified)
 *  - Photos and videos from both campuses
 *  - School management (29 Sep 2026): Aryavart's founding date, classes and
 *    address; classes IX–X at Aadharshila; shared phone and email; fees
 */
import { clips, img } from "./media";
import {
  tbc,
  type Bi,
  type Clip,
  type DisclosureRow,
  type Facility,
  type Fact,
  type FAQ,
  type Img,
  type Person,
  type SchoolKey,
  type Section,
  type Stage,
} from "./types";

/** Both school offices share one phone number and one email address. */
const OFFICE_PHONE = "+91 75973 82016";
const OFFICE_EMAIL = "deepakudairamsar@gmail.com";

export type School = {
  key: SchoolKey;
  slug: string;
  name: Bi;
  short: Bi;
  place: Bi;
  address: Fact<Bi>;
  phone: Fact<string>;
  email: Fact<string>;
  officeHours: Bi;
  established: Fact<{ iso: string; label: string; year: string }>;
  classes: Fact<Bi>;
  classesShort: Fact<string>;
  medium: Fact<Bi>;
  coEd: Fact<boolean>;
  tagline: Bi;
  motto?: { text: Bi; context: string };
  intro: Bi;
  story: string[];
  focus?: string[];
  colors: { deep: string; accent: string; soft: string };
  hero: Img;
  heroClip?: Clip;
  card: Img;
  leadership: Person[];
  principal: Fact<string>;
  teachers: Person[];
  sections: Section[];
  /** Stages of schooling, shown when subject-wise sections aren't published yet. */
  stages?: Stage[];
  sectionsNote?: string;
  textbooks?: Fact<Bi>;
  timings: Fact<{ shift: Bi; summer: Bi; winter: Bi }>;
  session: Fact<Bi[]>;
  facilities: Facility[];
  gallery: (Img | Clip)[];
  admissions: {
    steps: { title: Bi; body: Bi }[];
    ages: { level: Bi; age: Bi }[];
    documents: Bi[];
    faqs: FAQ[];
    /** Classes a parent can pick in the admission enquiry form. */
    classOptions: string[];
  };
  disclosures: DisclosureRow[];
  mapQuery: string;
};

/** "Class I" … "Class X" style labels for the enquiry form. */
const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
const classRange = (from: number, to: number, suffix = "") => roman.slice(from - 1, to).map((r) => `Class ${r}${suffix}`);

/** The School Level Fee Committee row, the same at both schools. */
const slfcRow = (): DisclosureRow => ({
  label: { en: "School Level Fee Committee", hi: "विद्यालय स्तरीय फ़ीस समिति" },
  value: "The current fees are approved by the committee",
  provenance: "confirmed",
});

/* ------------------------------------------------------------------ */
/* Shared admissions content (identical process at both schools)       */
/* ------------------------------------------------------------------ */

const admissionSteps: School["admissions"]["steps"] = [
  {
    title: { en: "Enquire", hi: "पूछताछ" },
    body: {
      en: "Visit the school office or send an enquiry from this page. We'll share the prospectus and let you know which classes have seats.",
      hi: "विद्यालय कार्यालय आएँ या इसी पृष्ठ से पूछताछ भेजें। हम विवरणिका देंगे और बताएँगे कि किन कक्षाओं में सीटें उपलब्ध हैं।",
    },
  },
  {
    title: { en: "Register", hi: "पंजीकरण" },
    body: {
      en: "Fill in the registration form that comes with the prospectus and submit it at the school reception within the notified dates. Registration alone does not confirm admission — it depends on seats available.",
      hi: "विवरणिका के साथ मिला पंजीकरण फ़ॉर्म भरकर निर्धारित तिथियों में विद्यालय के स्वागत कक्ष पर जमा करें। केवल पंजीकरण से प्रवेश पक्का नहीं होता — यह उपलब्ध सीटों पर निर्भर है।",
    },
  },
  {
    title: { en: "Meet us", hi: "मुलाक़ात" },
    body: {
      en: "We meet the child and both parents on a date we share with you. For the youngest children this is a relaxed, play-based interaction with blocks, puzzles and games.",
      hi: "हम आपको बताई गई तिथि पर बच्चे और माता-पिता दोनों से मिलते हैं। छोटे बच्चों के लिए यह ब्लॉक, पहेलियों और खेलों के साथ एक सहज, खेल-आधारित बातचीत होती है।",
    },
  },
  {
    title: { en: "Documents & confirmation", hi: "दस्तावेज़ एवं पुष्टि" },
    body: {
      en: "When a seat is offered, complete the admission form neatly and submit the documents listed below. Admission is confirmed once they are verified.",
      hi: "सीट मिलने पर प्रवेश फ़ॉर्म साफ़-साफ़ भरें और नीचे दिए दस्तावेज़ जमा करें। सत्यापन के बाद प्रवेश की पुष्टि हो जाती है।",
    },
  },
  {
    title: { en: "Welcome to school", hi: "विद्यालय में स्वागत" },
    body: {
      en: "Collect the school almanac (student diary), uniform details and the transport form, and meet your child's class teacher.",
      hi: "विद्यालय अल्मनैक (छात्र डायरी), गणवेश की जानकारी और परिवहन फ़ॉर्म प्राप्त करें तथा अपने बच्चे के कक्षा अध्यापक से मिलें।",
    },
  },
];

const admissionDocuments: Bi[] = [
  {
    en: "Birth certificate issued by the municipal body or gram panchayat — original and photocopy (pre-primary classes)",
    hi: "नगर निकाय या ग्राम पंचायत द्वारा जारी जन्म प्रमाण पत्र — मूल एवं छायाप्रति (पूर्व-प्राथमिक कक्षाएँ)",
  },
  {
    en: "Transfer certificate from the school last attended, countersigned as required (Class I and above)",
    hi: "पिछले विद्यालय का स्थानांतरण प्रमाण पत्र, आवश्यकतानुसार प्रतिहस्ताक्षरित (कक्षा 1 व ऊपर)",
  },
  { en: "Marksheet of the last class passed (Class I and above)", hi: "पिछली उत्तीर्ण कक्षा की अंकतालिका (कक्षा 1 व ऊपर)" },
  { en: "Five recent passport-size photographs of the child", hi: "बच्चे के पाँच नवीनतम पासपोर्ट आकार के फ़ोटो" },
  { en: "Passport-size photographs of the parents", hi: "माता-पिता के पासपोर्ट आकार के फ़ोटो" },
];

const rteFaq: FAQ = {
  q: { en: "Can I apply for an RTE seat through this website?", hi: "क्या मैं इस वेबसाइट से RTE सीट के लिए आवेदन कर सकता/सकती हूँ?" },
  a: {
    en: "No. Seats reserved under the Right to Education Act are allotted only through the Government of Rajasthan's official online process. Our office will gladly help you understand the steps, but the enquiry form on this site is not an RTE application.",
    hi: "नहीं। शिक्षा का अधिकार अधिनियम के अंतर्गत आरक्षित सीटें केवल राजस्थान सरकार की आधिकारिक ऑनलाइन प्रक्रिया से आवंटित होती हैं। हमारा कार्यालय प्रक्रिया समझने में ख़ुशी से मदद करेगा, पर इस साइट का पूछताछ फ़ॉर्म RTE आवेदन नहीं है।",
  },
};

const registrationFaq: FAQ = {
  q: { en: "Is registration the same as admission?", hi: "क्या पंजीकरण और प्रवेश एक ही हैं?" },
  a: {
    en: "No. Registration puts your child's name forward. Admission depends on the seats available and is confirmed only after your documents are verified.",
    hi: "नहीं। पंजीकरण से आपके बच्चे का नाम विचार में आता है। प्रवेश उपलब्ध सीटों पर निर्भर है और दस्तावेज़ों के सत्यापन के बाद ही पक्का होता है।",
  },
};

const documentsFaq: FAQ = {
  q: { en: "What if I don't have one of the documents?", hi: "अगर कोई दस्तावेज़ मेरे पास न हो तो?" },
  a: {
    en: "Talk to the school office — we'll work it out with you. Under the RTE Act, a child cannot be denied admission for lack of age proof, and a delay in getting a transfer certificate should not hold up admission.",
    hi: "विद्यालय कार्यालय से बात करें — हम मिलकर समाधान निकालेंगे। शिक्षा का अधिकार अधिनियम के अनुसार आयु प्रमाण के अभाव में किसी बच्चे को प्रवेश से मना नहीं किया जा सकता, और स्थानांतरण प्रमाण पत्र में देरी से प्रवेश नहीं रुकना चाहिए।",
  },
};

/* ------------------------------------------------------------------ */
/* Aryavart Public School, Palana                                      */
/* ------------------------------------------------------------------ */

/** Both schools follow the Rajasthan Education Department's calendar for 2026–27 (Shivira Panchang); the year view is in notices.ts. */
const sessionAndVacations: Bi[] = [
  {
    en: "The session runs from April to March and follows the Rajasthan Education Department's calendar (Shivira Panchang).",
    hi: "सत्र अप्रैल से मार्च तक चलता है और राजस्थान शिक्षा विभाग के कैलेंडर (शिविरा पंचांग) के अनुसार चलता है।",
  },
  {
    en: "Vacations in 2026–27: summer, 17 May – 20 June 2026; Diwali, 4 – 15 November 2026; winter, 31 December 2026 – 10 January 2027.",
    hi: "2026–27 के अवकाश: ग्रीष्मावकाश 17 मई – 20 जून 2026; दीपावली अवकाश 4 – 15 नवंबर 2026; शीतकालीन अवकाश 31 दिसंबर 2026 – 10 जनवरी 2027।",
  },
  {
    en: "Examination dates are announced by notice. Festivals and national days are marked on the Notices & calendar page.",
    hi: "परीक्षाओं की तिथियाँ सूचना द्वारा घोषित की जाती हैं। त्योहार और राष्ट्रीय पर्व ‘सूचनाएँ एवं कैलेंडर’ पृष्ठ पर दिए गए हैं।",
  },
];

const aryavart: School = {
  key: "aryavart",
  slug: "aryavart-public-school",
  name: { en: "Aryavart Public School", hi: "आर्यवर्त पब्लिक स्कूल" },
  short: { en: "Aryavart", hi: "आर्यवर्त" },
  place: { en: "Palana, Bikaner", hi: "पलाना, बीकानेर" },
  address: {
    en: "Near Sati Dadi Mata Mandir, Palana, Bikaner, Rajasthan",
    hi: "सती दादी माता मंदिर के पास, पलाना, बीकानेर, राजस्थान",
  },
  phone: OFFICE_PHONE,
  email: OFFICE_EMAIL,
  officeHours: {
    en: "Working days during office hours · closed on Sundays and holidays",
    hi: "कार्यदिवसों में कार्यालय समय पर · रविवार व अवकाश के दिन बंद",
  },
  established: { iso: "2000-05-25", label: "25 May 2000", year: "2000" },
  classes: { en: "LKG to Class XII (Arts in XI–XII)", hi: "एलकेजी से कक्षा 12 (11–12 में कला संकाय)" },
  classesShort: "LKG – XII",
  medium: { en: "English medium", hi: "अंग्रेज़ी माध्यम" },
  coEd: true,
  tagline: { en: "Curious minds, open horizons.", hi: "जिज्ञासु मन, खुले क्षितिज।" },
  intro: {
    en: "Founded on 25 May 2000, Aryavart Public School is AESRI's English-medium school in the village of Palana, Bikaner, teaching from LKG to Class XII with the Arts stream in Classes XI and XII. Our students learn by doing — surveying their own school ground in geography practicals and sitting examinations under the open winter sky.",
    hi: "25 मई 2000 को स्थापित आर्यवर्त पब्लिक स्कूल पलाना (बीकानेर) में एईएसआरआई का अंग्रेज़ी माध्यम विद्यालय है, जहाँ एलकेजी से कक्षा 12 तक पढ़ाई होती है — कक्षा 11 व 12 में कला संकाय। यहाँ विद्यार्थी करके सीखते हैं — भूगोल के प्रायोगिक कार्य में अपने ही विद्यालय मैदान का सर्वेक्षण करते हैं और सर्दियों में खुले आसमान के नीचे परीक्षा देते हैं।",
  },
  story: [
    "Aryavart Public School was founded on 25 May 2000 in the village of Palana, Bikaner district. It is an English-medium school — the words are painted proudly on the side of our yellow school vans — and today it teaches from LKG to Class XII, with the Arts stream in Classes XI and XII.",
    "Learning at Aryavart leaves the classroom whenever it can. In geography practicals, girls and boys set up plane tables on the school ground, sight their landmarks and map the campus themselves. On winter mornings, examinations have been held under the open sky, with desks spread across the sand.",
    "Aryavart and Aadharshila are sister schools under AESRI. They share one approach to education while keeping their own identity, records and staff.",
  ],
  colors: { deep: "#1c3d2b", accent: "#b7832f", soft: "#efe4cc" },
  hero: img.aryavart.campusWide,
  heroClip: clips.exam,
  card: img.aryavart.campusWide,
  leadership: [],
  principal: "Mrs. Anita Yadav",
  teachers: [
    { name: "Mrs. Anita Yadav", qualification: "M.A., BSTC, B.Ed." },
    { name: "Mrs. Anusuiya Suthar", qualification: "M.A., B.Ed." },
    { name: "Mrs. Mahesh Sharma", qualification: "B.Sc., B.Ed." },
    { name: "Mrs. Anju Khatri", qualification: "M.A., B.Ed." },
    { name: "Mrs. Jayshree", qualification: "M.A., B.Ed." },
    { name: "Mrs. Manju Yadav", qualification: "M.A., B.Ed." },
    { name: "Miss Mamta Sharma", qualification: "M.A., B.Ed." },
    { name: "Miss Nairasi Yadav", qualification: "M.Sc., B.Ed." },
    { name: "Mrs. Manita Yadav", qualification: "M.A." },
    { name: "Miss Suman Yadav", qualification: "B.A., LL.B., LL.M." },
    { name: "Miss Sumita", qualification: "B.A.", role: "Mother teacher" },
    { name: "Miss Suman Sharma", qualification: "B.A.", role: "Mother teacher" },
    { name: "Mrs. Manisha", qualification: "B.A.", role: "Mother teacher" },
    { name: "Miss Vansika", qualification: "B.A." },
    { name: "Miss Kaushalya", qualification: "B.A." },
    { name: "Miss Manisha", qualification: "B.A." },
  ],
  sections: [],
  stages: [
    { name: { en: "Pre-primary", hi: "पूर्व-प्राथमिक" }, classes: { en: "LKG · UKG", hi: "एलकेजी · यूकेजी" } },
    { name: { en: "Primary", hi: "प्राथमिक" }, classes: { en: "Classes I – V", hi: "कक्षा 1 – 5" } },
    { name: { en: "Upper primary", hi: "उच्च प्राथमिक" }, classes: { en: "Classes VI – VIII", hi: "कक्षा 6 – 8" } },
    { name: { en: "Secondary", hi: "माध्यमिक" }, classes: { en: "Classes IX – X", hi: "कक्षा 9 – 10" } },
    {
      name: { en: "Senior secondary", hi: "उच्च माध्यमिक" },
      classes: { en: "Classes XI – XII", hi: "कक्षा 11 – 12" },
      note: { en: "Arts stream", hi: "कला संकाय" },
    },
  ],
  sectionsNote: "Aryavart teaches from LKG to Class XII, with the Arts stream in Classes XI and XII.",
  // The same as Aadharshila's, as the management confirmed.
  timings: {
    shift: { en: "Single shift", hi: "एक पाली" },
    summer: { en: "7:30 am – 1:30 pm", hi: "प्रातः 7:30 – दोपहर 1:30" },
    winter: { en: "9:00 am – 3:00 pm", hi: "प्रातः 9:00 – अपराह्न 3:00" },
  },
  session: sessionAndVacations,
  facilities: [
    {
      title: "School transport",
      titleHi: "विद्यालय परिवहन",
      description: "Aryavart's yellow school vans — ‘English medium’ painted on the side — bring children in from across the area. Ask the office about routes.",
      icon: "bus",
      image: img.aryavart.van,
    },
    {
      title: "Field practicals",
      titleHi: "प्रायोगिक क्षेत्र कार्य",
      description: "Geography comes alive with plane-table surveying: students sight, measure and plot the school ground themselves.",
      icon: "compass",
      image: img.aryavart.surveyGirls,
    },
    {
      title: "Open grounds",
      titleHi: "खुला मैदान",
      description: "Wide sandy grounds for assembly, games and events — and, on bright winter mornings, open-air examinations.",
      icon: "sun",
      image: img.aryavart.exam2,
    },
    {
      title: "Co-education",
      titleHi: "सह-शिक्षा",
      description: "Girls and boys learn side by side and take part equally in every practical and activity.",
      icon: "users",
      image: img.aryavart.surveyBoys,
    },
  ],
  gallery: [clips.surveyGirls, clips.exam, clips.surveyBoys, img.aryavart.exam2, img.aryavart.van],
  admissions: {
    steps: admissionSteps,
    ages: [
      { level: { en: "LKG to Class XII", hi: "एलकेजी से कक्षा 12" }, age: { en: "As per Education Department norms — ask the office", hi: "शिक्षा विभाग के मानदंडों के अनुसार — कार्यालय से पूछें" } },
    ],
    documents: admissionDocuments,
    classOptions: ["LKG", "UKG", ...classRange(1, 10), ...classRange(11, 12, " (Arts)")],
    faqs: [
      registrationFaq,
      {
        q: { en: "What is the medium of instruction?", hi: "शिक्षा का माध्यम क्या है?" },
        a: { en: "English.", hi: "अंग्रेज़ी।" },
      },
      {
        q: { en: "Which stream is offered in Classes XI and XII?", hi: "कक्षा 11 और 12 में कौन-सा संकाय उपलब्ध है?" },
        a: { en: "Arts. It is the only stream Aryavart offers in Classes XI and XII.", hi: "कला संकाय। आर्यवर्त में कक्षा 11 और 12 में केवल यही संकाय उपलब्ध है।" },
      },
      {
        q: { en: "Is there school transport?", hi: "क्या विद्यालय परिवहन उपलब्ध है?" },
        a: {
          en: "Yes — Aryavart runs school vans. Please ask the office about routes and apply for transport separately.",
          hi: "हाँ — आर्यवर्त की विद्यालय वैन चलती हैं। मार्गों की जानकारी कार्यालय से लें और परिवहन के लिए अलग से आवेदन करें।",
        },
      },
      rteFaq,
      documentsFaq,
    ],
  },
  disclosures: [
    // To check: Name as painted on the school vans; confirm exact spelling from the recognition order.
    { label: { en: "School name", hi: "विद्यालय का नाम" }, value: "Aryavart Public School", provenance: "prospectus" },
    { label: { en: "Managed by", hi: "संचालक संस्था" }, value: "Aryavart Educational and Social Research Institute (AESRI), a registered society — Reg. No. 65/BKN/2012-13", provenance: "confirmed" },
    { label: { en: "Address", hi: "पता" }, value: "Near Sati Dadi Mata Mandir, Palana, Bikaner, Rajasthan", provenance: "confirmed" },
    { label: { en: "Established", hi: "स्थापना" }, value: "25 May 2000", provenance: "confirmed" },
    { label: { en: "Classes", hi: "कक्षाएँ" }, value: "LKG to Class XII, with the Arts stream in Classes XI and XII", provenance: "verified" },
    { label: { en: "Medium of instruction", hi: "शिक्षा का माध्यम" }, value: "English", provenance: "prospectus" },
    { label: { en: "Board affiliation", hi: "बोर्ड संबद्धता" }, value: "RBSE (Board of Secondary Education, Rajasthan)", provenance: "confirmed" },
    { label: { en: "Head of school", hi: "संस्था प्रधान" }, value: "Mrs. Anita Yadav", provenance: "confirmed" },
    slfcRow(),
    { label: { en: "Teaching staff", hi: "शिक्षण स्टाफ़" }, value: "16 teachers — listed on the About page", provenance: "verified" },
    { label: { en: "Complaints", hi: "शिकायत" }, value: OFFICE_EMAIL, provenance: "confirmed" },
  ],
  mapQuery: "Aryavart Public School, Palana, Bikaner, Rajasthan",
};

/* ------------------------------------------------------------------ */
/* Aadharshila Public School, Udairamsar                               */
/* ------------------------------------------------------------------ */

const aadharshila: School = {
  key: "aadharshila",
  slug: "aadharshila-public-school",
  name: { en: "Aadharshila Public School", hi: "आधारशिला पब्लिक स्कूल" },
  short: { en: "Aadharshila", hi: "आधारशिला" },
  place: { en: "Udairamsar, Bikaner", hi: "उदयरामसर, बीकानेर" },
  address: {
    en: "Ambasar Road, Kala Bhairav Mandir Gali, Udairamsar, Bikaner, Rajasthan",
    hi: "अम्बासर रोड, काला भैरव मंदिर गली, उदयरामसर, बीकानेर, राजस्थान",
  },
  phone: OFFICE_PHONE,
  email: OFFICE_EMAIL,
  officeHours: {
    en: "Working days during office hours · closed on Sundays and holidays",
    hi: "कार्यदिवसों में कार्यालय समय पर · रविवार व अवकाश के दिन बंद",
  },
  established: { iso: "2017-03-21", label: "21 March 2017", year: "2017" },
  classes: { en: "Nursery to Class X", hi: "नर्सरी से कक्षा 10" },
  classesShort: "Nursery – X",
  medium: { en: "English medium", hi: "अंग्रेज़ी माध्यम" },
  coEd: true,
  tagline: { en: "A strong foundation, from the very first step.", hi: "पहले कदम से ही मज़बूत नींव।" },
  motto: {
    text: { en: "Catch them young.", hi: "बचपन से ही सँवारें।" },
    context: "The motto of our Nursery section — where habits of discipline, cleanliness and politeness begin.",
  },
  intro: {
    en: "Aadharshila — the ‘foundation stone’ — was founded in Udairamsar on 21 March 2017. It is a co-educational, English-medium school from Nursery to Class X, built on the belief that good habits and a love of learning start young.",
    hi: "‘आधारशिला’ की स्थापना 21 मार्च 2017 को उदयरामसर में हुई। यह नर्सरी से कक्षा 10 तक का सह-शिक्षा, अंग्रेज़ी माध्यम विद्यालय है, जिसकी सोच है कि अच्छी आदतें और सीखने की ललक बचपन से ही शुरू होती है।",
  },
  story: [
    "Aadharshila Public School was founded on 21 March 2017 by Mr. Deepak Yadav and his wife Mrs. Anita Yadav, who serves as the school's Director. The school is recognised by the education authority of Rajasthan.",
    "From the beginning, the school's team has shaped its work around the needs of students and their guardians — keeping a close and caring watch on every child's progress, and bringing in teaching techniques and methods suited to how children learn.",
  ],
  focus: [
    "Education should be motivating from the learner's point of view. We aim for an environment that is attractive but purposeful, where teachers use methods that awaken curiosity and let children think through what is right and wrong for themselves.",
    "Under the dynamic supervision of dedicated teachers, we prepare students to live fully in a competitive world — and orient every child towards values, self-reliance and a sense of duty to society and the nation.",
    "We want our students to appreciate the democratic way of life: to live peacefully, and to let others live.",
  ],
  colors: { deep: "#28462f", accent: "#a95f3c", soft: "#ede3d3" },
  hero: img.aadharshila.campus,
  card: img.aadharshila.campus,
  leadership: [
    { name: "Mrs. Anita Yadav", role: "Director", roleHi: "निदेशक", photo: img.aesri.anita },
    { name: "Mr. Deepak Yadav", role: "Co-founder", roleHi: "सह-संस्थापक", photo: img.aesri.deepak },
  ],
  principal: "Mr. Aanand Yadav",
  teachers: [
    { name: "Mrs. Priyanka Yadav", qualification: "M.A., B.Ed." },
    { name: "Mrs. Sonu Yadav", qualification: "M.A., B.Ed." },
    { name: "Mrs. Neha Khatri", qualification: "B.Sc., B.Ed." },
    { name: "Mr. Vinod Kumar", qualification: "M.A., B.Ed." },
    { name: "Mr. Jugal Kishore", qualification: "M.Com., B.Ed." },
    { name: "Miss Kusum Sharma", qualification: "M.A., B.Ed." },
    { name: "Miss Shivani Sharma", qualification: "M.A. (Sanskrit)" },
    { name: "Miss Basanti", qualification: "B.A." },
    { name: "Mr. Dinesh Garg", qualification: "M.A." },
    { name: "Mr. Dheeraj", qualification: "B.Sc." },
  ],
  sections: [
    {
      name: { en: "Nursery section", hi: "नर्सरी अनुभाग" },
      classes: { en: "Nursery · LKG · UKG (ages 3+, 4+, 5+)", hi: "नर्सरी · एलकेजी · यूकेजी (आयु 3+, 4+, 5+)" },
      description: "Our motto here is “catch them young”. Through play and gentle routine, children build aptitudes for discipline, cleanliness and politeness — the habits that everything else rests on.",
      subjects: [],
    },
    {
      name: { en: "Primary section", hi: "प्राथमिक अनुभाग" },
      classes: { en: "Classes I – V", hi: "कक्षा 1 – 5" },
      description: "Strong foundations in languages and numbers, widened by environmental education, computers, art and physical education.",
      subjects: ["Hindi", "English", "Mathematics", "Environmental Education", "Computer Science", "General Knowledge", "Art & Drawing", "Physical Health & Education"],
    },
    {
      name: { en: "Middle section", hi: "उच्च प्राथमिक अनुभाग" },
      classes: { en: "Classes VI – VIII", hi: "कक्षा 6 – 8" },
      description: "Sanskrit joins the languages, and Socially Useful and Productive Work brings learning into everyday life.",
      subjects: ["Hindi", "English", "Sanskrit", "Mathematics", "Computer Science", "General Knowledge", "Socially Useful & Productive Work"],
    },
    {
      name: { en: "Secondary section", hi: "माध्यमिक अनुभाग" },
      classes: { en: "Classes IX – X", hi: "कक्षा 9 – 10" },
      description: "The secondary years, Classes IX and X, with the same subjects as at Aryavart: the six RBSE board subjects.",
      subjects: ["Hindi", "English", "Sanskrit", "Mathematics", "Science", "Social Science"],
    },
  ],
  sectionsNote: "Subjects for Nursery to Class VIII are as listed in the school prospectus; Classes IX and X study the same subjects as at Aryavart.",
  textbooks: { en: "Books recommended are RBSE publications.", hi: "अनुशंसित पुस्तकें आरबीएसई (RBSE) प्रकाशन की हैं।" },
  timings: {
    shift: { en: "Single shift", hi: "एक पाली" },
    summer: { en: "7:30 am – 1:30 pm", hi: "प्रातः 7:30 – दोपहर 1:30" },
    winter: { en: "9:00 am – 3:00 pm", hi: "प्रातः 9:00 – अपराह्न 3:00" },
  },
  session: sessionAndVacations,
  facilities: [
    {
      title: "School transport",
      titleHi: "विद्यालय परिवहन",
      description: "School vans reach every corner of the village. Parents apply for transport separately at the office.",
      icon: "bus",
      image: img.aadharshila.campus,
    },
    {
      title: "Nursery play room",
      titleHi: "नर्सरी खेल कक्ष",
      description: "A soft, colourful room with slides and ride-on toys where our youngest learn through play.",
      icon: "blocks",
      image: img.aadharshila.nurseryPlay,
    },
    {
      title: "Child-sized classrooms",
      titleHi: "बच्चों के अनुरूप कक्षाएँ",
      description: "Nursery classrooms with individual desks and built-in slates, sized for small hands.",
      icon: "book",
      image: img.aadharshila.nurseryClass,
    },
    {
      title: "The school almanac",
      titleHi: "विद्यालय अल्मनैक",
      description: "Every student receives the almanac — a diary with all school information — and uses it daily to note homework. Parents are asked to read it thoroughly.",
      icon: "notebook",
    },
    {
      title: "Uniform, every day",
      titleHi: "प्रतिदिन गणवेश",
      description: "Students come to school in full, proper uniform on all occasions — a small daily practice in pride and discipline.",
      icon: "shirt",
    },
    {
      title: "Open ground",
      titleHi: "खुला मैदान",
      description: "A wide ground in front of the school, edged with green shrubs, for assembly, games and celebrations.",
      icon: "trees",
    },
  ],
  gallery: [
    img.aadharshila.janmashtami,
    img.aadharshila.cultural,
    img.aadharshila.lunch,
    img.aadharshila.prayer,
    img.aadharshila.festival,
    img.aadharshila.group,
    img.aadharshila.parents,
  ],
  admissions: {
    steps: admissionSteps,
    ages: [
      { level: { en: "Nursery", hi: "नर्सरी" }, age: { en: "3+ years", hi: "3+ वर्ष" } },
      { level: { en: "LKG", hi: "एलकेजी" }, age: { en: "4+ years", hi: "4+ वर्ष" } },
      { level: { en: "UKG", hi: "यूकेजी" }, age: { en: "5+ years", hi: "5+ वर्ष" } },
      { level: { en: "Class I – X", hi: "कक्षा 1 – 10" }, age: { en: "Age-appropriate, as on 1 April of the year of admission", hi: "प्रवेश वर्ष की 1 अप्रैल को कक्षा के अनुरूप आयु" } },
    ],
    documents: admissionDocuments,
    classOptions: ["Nursery", "LKG", "UKG", ...classRange(1, 10)],
    faqs: [
      registrationFaq,
      {
        q: { en: "What is the medium of instruction?", hi: "शिक्षा का माध्यम क्या है?" },
        a: { en: "English, in every class.", hi: "सभी कक्षाओं में अंग्रेज़ी।" },
      },
      {
        q: { en: "Is there school transport?", hi: "क्या विद्यालय परिवहन उपलब्ध है?" },
        a: {
          en: "Yes. School vans cover every corner of the village. Please apply for transport separately at the school office.",
          hi: "हाँ। विद्यालय वैन गाँव के हर कोने तक जाती हैं। परिवहन के लिए विद्यालय कार्यालय में अलग से आवेदन करें।",
        },
      },
      rteFaq,
      documentsFaq,
    ],
  },
  disclosures: [
    { label: { en: "School name", hi: "विद्यालय का नाम" }, value: "Aadharshila Public School", provenance: "prospectus" },
    { label: { en: "Managed by", hi: "संचालक संस्था" }, value: "Aryavart Educational and Social Research Institute (AESRI), a registered society — Reg. No. 65/BKN/2012-13", provenance: "confirmed" },
    { label: { en: "Address", hi: "पता" }, value: "Ambasar Road, Kala Bhairav Mandir Gali, Udairamsar, Bikaner, Rajasthan", provenance: "prospectus" },
    { label: { en: "Established", hi: "स्थापना" }, value: "21 March 2017", provenance: "prospectus" },
    { label: { en: "Recognition", hi: "मान्यता" }, value: "Recognised by the education authority of Rajasthan", provenance: "prospectus" },
    { label: { en: "Classes", hi: "कक्षाएँ" }, value: "Nursery to Class X", provenance: "verified" },
    { label: { en: "Medium of instruction", hi: "शिक्षा का माध्यम" }, value: "English", provenance: "prospectus" },
    { label: { en: "Board affiliation", hi: "बोर्ड संबद्धता" }, value: "RBSE (Board of Secondary Education, Rajasthan)", provenance: "confirmed" },
    { label: { en: "Type", hi: "प्रकार" }, value: "Co-educational", provenance: "prospectus" },
    { label: { en: "Textbooks", hi: "पाठ्यपुस्तकें" }, value: "RBSE publications", provenance: "prospectus" },
    { label: { en: "Director", hi: "निदेशक" }, value: "Mrs. Anita Yadav", provenance: "prospectus" },
    { label: { en: "Head of school", hi: "संस्था प्रधान" }, value: "Mr. Aanand Yadav", provenance: "confirmed" },
    slfcRow(),
    { label: { en: "Teaching staff", hi: "शिक्षण स्टाफ़" }, value: "10 teachers — listed on the About page", provenance: "verified" },
    { label: { en: "Transport", hi: "परिवहन" }, value: "School vans across the village (apply at the office)", provenance: "prospectus" },
    { label: { en: "Complaints", hi: "शिकायत" }, value: OFFICE_EMAIL, provenance: "confirmed" },
  ],
  mapQuery: "Aadharshila Public School, Ambasar Road, Udairamsar, Bikaner, Rajasthan",
};

export const schools: School[] = [aryavart, aadharshila];

export function getSchool(slug: string): School | undefined {
  return schools.find((s) => s.slug === slug);
}

export function getSchoolByKey(key: SchoolKey): School {
  const s = schools.find((x) => x.key === key);
  if (!s) throw new Error(`Unknown school ${key}`);
  return s;
}

export function schoolHref(school: School, page = ""): string {
  return `/schools/${school.slug}${page ? `/${page}` : ""}`;
}

/**
 * The phone and email shared by both school offices, or null if the schools
 * have different (or unconfirmed) contacts.
 */
export function sharedSchoolContact(): { phone: string; email: string } | null {
  const phones = new Set(schools.map((s) => s.phone));
  const emails = new Set(schools.map((s) => s.email));
  const [phone] = phones;
  const [email] = emails;
  if (phones.size !== 1 || emails.size !== 1 || typeof phone !== "string" || typeof email !== "string") return null;
  return { phone, email };
}

/** Unique people across both teacher lists (a person teaching at both counts once). */
export function uniqueTeacherCount(): number {
  const names = new Set(schools.flatMap((s) => s.teachers.map((t) => t.name.trim().toLowerCase())));
  return names.size;
}
