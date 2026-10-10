/**
 * Policy pages, written to match what this website actually does. AESRI
 * approved all of them on 1 October 2026 (version 1.0). When a policy
 * changes, update its `status`, `version` and `updated`.
 */

export type PolicySection = { heading: string; paragraphs?: string[]; bullets?: string[] };

export type Policy = {
  slug: string;
  title: string;
  titleHi: string;
  summary: string;
  status: "Draft for approval" | "Approved";
  version: string;
  updated: string;
  owner: string;
  sections: PolicySection[];
};

export const policies: Policy[] = [
  {
    slug: "privacy-policy",
    title: "Privacy policy",
    titleHi: "गोपनीयता नीति",
    summary: "What this website collects, why, how long we keep it, and how to ask us about your data.",
    status: "Approved",
    version: "1.0",
    updated: "2026-10-01",
    owner: "AESRI office",
    sections: [
      {
        heading: "Who we are",
        paragraphs: [
          "This website is run by Aryavart Educational and Social Research Institute (AESRI), which manages Aryavart Public School, Palana and Aadharshila Public School, Udairamsar. AESRI decides how personal information submitted through this website is used.",
        ],
      },
      {
        heading: "What we collect",
        bullets: [
          "Admission enquiries: the parent or guardian's name and phone number, an optional email address, the child's name, the class sought and your message.",
          "General enquiries: your name, phone or email, and your message.",
          "Nothing else. This website does not use advertising trackers, social-media pixels or third-party analytics.",
        ],
      },
      {
        heading: "Why we use it",
        paragraphs: [
          "Only to reply to your enquiry and, for admissions, to guide you through the school's admission process. We do not sell or share enquiries for marketing, and we never use them to build profiles of children.",
          "Enquiries go only to the school you choose. Staff at the other school cannot see them.",
        ],
      },
      {
        heading: "How long we keep it",
        paragraphs: [
          "Enquiries are deleted after 12 months unless they lead to an admission, in which case the details become part of the admission record and are kept for as long as the law requires school records to be kept.",
        ],
      },
      {
        heading: "Children's information",
        paragraphs: [
          "We collect the minimum needed about a child to answer an admission enquiry. Photographs of children appear on this website only with a parent or guardian's separate, optional consent — see our photo and media consent policy.",
        ],
      },
      {
        heading: "Your choices",
        bullets: [
          "Ask what information we hold about you or your child.",
          "Ask us to correct it, or to delete an enquiry you no longer want us to keep.",
          "Withdraw consent for optional uses, such as photographs, at any time.",
        ],
      },
      {
        heading: "Security",
        paragraphs: [
          "The website is served only over HTTPS. Enquiry data is stored with restricted access, and school records are never stored on the public website. We are preparing our systems for India's Digital Personal Data Protection Act, 2023 and its Rules.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: ["Questions or requests about personal data: email AESRI at deepakudairamsar@gmail.com, or ask at any school office."],
      },
    ],
  },
  {
    slug: "fee-and-refund-policy",
    title: "Fee payment and refund policy",
    titleHi: "फ़ीस भुगतान एवं वापसी नीति",
    summary: "How fees are approved, published and paid at AESRI schools, and how refunds and fee questions are handled.",
    status: "Approved",
    version: "1.0",
    updated: "2026-10-01",
    owner: "AESRI accounts",
    sections: [
      {
        heading: "Approved fees only",
        paragraphs: [
          "Each school's fee is proposed by the management and approved by its School Level Fee Committee under the Rajasthan Schools (Regulation of Fee) Act, 2016. Only the approved fee heads and amounts may be charged.",
          "The approved schedule is shown on each school's notice board and on its Fees page on this website, in Hindi and English, with the academic years it covers.",
        ],
      },
      {
        heading: "Paying fees",
        bullets: [
          "Fees are paid in the instalments shown on the school's Fees page.",
          "At present, fees are deposited at the bank using the pay-in-slip provided by the school.",
          "A receipt is issued for every payment. Please keep your receipts.",
          "Online payments will be added only after the school's billing and receipting are fully tested.",
        ],
      },
      {
        heading: "Refunds",
        paragraphs: [
          "The admission fee (₹2,000 at both schools, paid once at the time of admission) is non-refundable.",
          "Other refunds follow the conditions approved alongside the fee schedule. Where a refund is due — for example, a payment made twice — it is returned to the person who paid, by the original method, with a written record.",
        ],
      },
      {
        heading: "Questions and disputes",
        paragraphs: [
          "Speak first to the school's accounts office. If the matter isn't resolved, raise it through our grievance process. Parents may also approach the fee committees and authorities set up under the Act.",
        ],
      },
    ],
  },
  {
    slug: "grievance-redressal",
    title: "Raising a concern",
    titleHi: "शिकायत निवारण",
    summary: "How parents, students, staff and neighbours can raise a concern with a school or with AESRI — and what happens next.",
    status: "Approved",
    version: "1.0",
    updated: "2026-10-01",
    owner: "AESRI office",
    sections: [
      {
        heading: "If a child may be at risk",
        paragraphs: [
          "Don't wait and don't use a general form. Speak directly to the head of the school, or call the child helpline 1098. The head of the school handles concerns about a child's safety separately and in confidence.",
        ],
      },
      {
        heading: "Everything else",
        bullets: [
          "Start with the class teacher or the school office — most things are resolved quickly there.",
          "If not, write to the head of school, in person or through the school's contact page.",
          "If you're still not satisfied, contact AESRI on +91 75973 82016 or at deepakudairamsar@gmail.com.",
        ],
      },
      {
        heading: "What you can expect",
        bullets: [
          "An acknowledgement within 3 working days.",
          "A response within 15 working days, or an explanation of why more time is needed.",
          "Fair treatment — raising a concern will never count against a student.",
        ],
      },
    ],
  },
  {
    slug: "accessibility-statement",
    title: "Accessibility statement",
    titleHi: "सुगम्यता विवरण",
    summary: "Our commitment to a website everyone can use, and how to tell us when something doesn't work for you.",
    status: "Approved",
    version: "1.0",
    updated: "2026-10-01",
    owner: "AESRI office",
    sections: [
      {
        heading: "Our aim",
        paragraphs: ["We are building this website to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA."],
      },
      {
        heading: "What we've done",
        bullets: [
          "Every page works with a keyboard alone, with a visible focus outline and a “skip to content” link.",
          "Text and background colours are chosen for readable contrast.",
          "Animations switch off automatically if your device is set to reduce motion.",
          "Key information — admissions, fees, notices and help — is available in Hindi and English.",
          "Forms have clear labels and explain errors in words, not colour alone.",
          "Videos play silently and have text descriptions; they never carry information that isn't also in the text.",
        ],
      },
      {
        heading: "Known limitations",
        bullets: ["Some older documents, such as scanned notices, may not be fully accessible yet. Ask us and we'll provide the information another way."],
      },
      {
        heading: "Prefer to talk to someone?",
        paragraphs: ["Every service on this website is also available in person at the school office. You never have to use the website to get help."],
      },
    ],
  },
  {
    slug: "photo-and-media-consent",
    title: "Photo and media consent",
    titleHi: "फ़ोटो एवं मीडिया सहमति",
    summary: "When we publish photos or videos of students, and how parents can say yes, no, or change their mind.",
    status: "Approved",
    version: "1.0",
    updated: "2026-10-01",
    owner: "AESRI office",
    sections: [
      {
        heading: "Separate, optional consent",
        paragraphs: [
          "Permission to publish a child's photograph is asked for separately from admission and is always optional. Saying no never affects a child's admission or treatment.",
        ],
        bullets: ["Website photographs", "Social media", "Printed prospectus and newsletters"],
      },
      {
        heading: "How we publish",
        bullets: [
          "We don't put children's full names next to their photographs.",
          "We don't publish images that show a child's home, route to school or other identifying details.",
          "Report cards, marks and personal records are never published.",
        ],
      },
      {
        heading: "Changing your mind",
        paragraphs: ["Tell the school office and we will remove the image from this website within a reasonable time, and stop using it in new material."],
      },
    ],
  },
  {
    slug: "website-terms",
    title: "Website terms of use",
    titleHi: "वेबसाइट उपयोग की शर्तें",
    summary: "The basics of using this website, and which information is official.",
    status: "Approved",
    version: "1.0",
    updated: "2026-10-01",
    owner: "AESRI office",
    sections: [
      {
        heading: "Official information",
        paragraphs: [
          "Notices on this website carry a publication date, a named owner and, where relevant, an expiry date. If a notice here ever differs from a signed notice issued by the school, the signed notice applies — and please tell us so we can correct the website.",
        ],
      },
      {
        heading: "Government processes",
        paragraphs: [
          "This website is not a government portal. RTE admissions and official submissions are made only through the relevant Government of Rajasthan systems.",
        ],
      },
      {
        heading: "Content",
        paragraphs: ["Text, photographs and videos on this website belong to AESRI and its schools. Please ask before reusing them."],
      },
    ],
  },
  {
    slug: "cookies-and-storage",
    title: "Cookies and storage",
    titleHi: "कुकीज़ एवं स्टोरेज",
    summary: "The small amount of information this website stores in your browser, and why.",
    status: "Approved",
    version: "1.0",
    updated: "2026-10-01",
    owner: "AESRI office",
    sections: [
      {
        heading: "What we store",
        bullets: [
          "Your language choice (English or Hindi), so the site remembers it on your next visit.",
          "A note that you've seen the opening animation this session, so it doesn't play again.",
        ],
      },
      {
        heading: "What we don't",
        paragraphs: ["No advertising cookies, no tracking pixels and no third-party analytics. If this ever changes, we will update this page and ask for your consent first."],
      },
    ],
  },
];

export function getPolicy(slug: string) {
  return policies.find((p) => p.slug === slug);
}
