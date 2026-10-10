import type { Metadata } from "next";
import { Building2, CircleHelp, KeyRound, Landmark, LogIn, ReceiptText, ScrollText, ShieldCheck, Ticket, Users } from "lucide-react";
import { T } from "@/components/i18n";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { PortalLink } from "@/components/portal-link";
import { ButtonLink } from "@/components/ui/button";
import { SectionIntro } from "@/components/ui/bits";
import { PageHero } from "@/components/ui/page-hero";
import type { Bi } from "@/content/types";
import { portalHost } from "@/lib/portal";

export const metadata: Metadata = {
  title: "Campus Portal",
  description:
    "Sign in to the AESRI Campus Portal. Families, teachers and the school offices of Aryavart Public School and Aadharshila Public School use it for attendance, homework, results, fees and notices, in English or Hindi.",
};

const steps: { icon: React.ReactNode; title: Bi; body: Bi }[] = [
  {
    icon: <Ticket className="h-5 w-5" />,
    title: { en: "Get your slip", hi: "अपनी पर्ची लें" },
    body: {
      en: "The school office gives you a slip with your login ID and a one-time code. A family's ID is like Arya7634 (the school and the SR number); a staff ID is like AryaE12. At Aadharshila, IDs start with Aadhar.",
      hi: "विद्यालय कार्यालय आपको एक पर्ची देता है, जिस पर आपका लॉगिन आईडी और एक-बार वाला कोड होता है। परिवार का आईडी Arya7634 जैसा होता है (विद्यालय और एस.आर. नंबर), स्टाफ़ का आईडी AryaE12 जैसा। आधारशिला के आईडी Aadhar से शुरू होते हैं।",
    },
  },
  {
    icon: <KeyRound className="h-5 w-5" />,
    title: { en: "Activate your account", hi: "अपना खाता सक्रिय करें" },
    body: {
      en: "Open the portal (or scan the QR code on the slip) and choose “Activate your account”. Type the login ID and the code, then choose your own password. The code works once, for 14 days.",
      hi: "पोर्टल खोलें (या पर्ची का QR कोड स्कैन करें) और “खाता सक्रिय करें” चुनें। लॉगिन आईडी और कोड लिखें, फिर अपना पासवर्ड चुनें। कोड एक ही बार, 14 दिनों तक काम करता है।",
    },
  },
  {
    icon: <LogIn className="h-5 w-5" />,
    title: { en: "Sign in", hi: "साइन इन करें" },
    body: {
      en: "From then on, sign in with your login ID and password. Principals, office admins, accountants and AESRI administrators also type a code from an authenticator app on their phone.",
      hi: "इसके बाद अपने लॉगिन आईडी और पासवर्ड से साइन इन करें। प्रधानाचार्य, कार्यालय प्रशासक, लेखाकार और एईएसआरआई प्रशासक अपने फ़ोन के ऑथेंटिकेटर ऐप का कोड भी लिखते हैं।",
    },
  },
  {
    icon: <CircleHelp className="h-5 w-5" />,
    title: { en: "Forgot your password?", hi: "पासवर्ड भूल गए?" },
    body: {
      en: "Ask the school office for a new slip. With its code you choose a new password, and the old one stops working.",
      hi: "विद्यालय कार्यालय से नई पर्ची लें। उसके कोड से आप नया पासवर्ड चुनते हैं, और पुराना पासवर्ड काम करना बंद कर देता है।",
    },
  },
];

const roles: { icon: React.ReactNode; title: Bi; who: Bi; items: Bi[] }[] = [
  {
    icon: <Users className="h-6 w-6" />,
    title: { en: "Families", hi: "परिवार" },
    who: { en: "Parents use their child's login", hi: "माता-पिता बच्चे के लॉगिन से" },
    items: [
      { en: "Attendance", hi: "उपस्थिति" },
      { en: "Homework", hi: "गृहकार्य" },
      { en: "Results and report cards", hi: "परिणाम और रिपोर्ट कार्ड" },
      { en: "Fees, receipts and online payment", hi: "फ़ीस, रसीदें और ऑनलाइन भुगतान" },
      { en: "Notices", hi: "सूचनाएँ" },
      { en: "Teachers' remarks", hi: "शिक्षकों की टिप्पणियाँ" },
      { en: "In English or Hindi", hi: "अंग्रेज़ी या हिंदी में" },
    ],
  },
  {
    icon: <ScrollText className="h-6 w-6" />,
    title: { en: "Teachers", hi: "शिक्षक" },
    who: { en: "Class and subject teachers", hi: "कक्षा और विषय अध्यापक" },
    items: [
      { en: "Attendance (class teachers)", hi: "उपस्थिति (कक्षा अध्यापक)" },
      { en: "Homework", hi: "गृहकार्य" },
      { en: "Marks", hi: "अंक" },
      { en: "Remarks", hi: "टिप्पणियाँ" },
      { en: "Class notices", hi: "कक्षा की सूचनाएँ" },
      { en: "Class lists", hi: "कक्षा की सूचियाँ" },
    ],
  },
  {
    icon: <Building2 className="h-6 w-6" />,
    title: { en: "School office", hi: "विद्यालय कार्यालय" },
    who: { en: "Principal and office admins", hi: "प्रधानाचार्य और कार्यालय प्रशासक" },
    items: [
      { en: "Students and staff", hi: "विद्यार्थी और स्टाफ़" },
      { en: "Import from Excel", hi: "एक्सेल से आयात" },
      { en: "Classes and subjects", hi: "कक्षाएँ और विषय" },
      { en: "Sign-in slips", hi: "साइन-इन पर्चियाँ" },
      { en: "Exams and results", hi: "परीक्षाएँ और परिणाम" },
      { en: "Fees", hi: "फ़ीस" },
      { en: "Notices", hi: "सूचनाएँ" },
      { en: "Activity log", hi: "गतिविधि रिकॉर्ड" },
    ],
  },
  {
    icon: <ReceiptText className="h-6 w-6" />,
    title: { en: "Accountant", hi: "लेखाकार" },
    who: { en: "The school's accounts", hi: "विद्यालय का लेखा" },
    items: [
      { en: "Fees and receipts", hi: "फ़ीस और रसीदें" },
      { en: "Looking up a student's record", hi: "विद्यार्थी का रिकॉर्ड देखना" },
    ],
  },
  {
    icon: <Landmark className="h-6 w-6" />,
    title: { en: "AESRI", hi: "एईएसआरआई" },
    who: { en: "AESRI administrators", hi: "एईएसआरआई प्रशासक" },
    items: [
      { en: "Both schools", hi: "दोनों विद्यालय" },
      { en: "How each school is doing today", hi: "हर विद्यालय की आज की स्थिति" },
      { en: "Slips for principals and office admins", hi: "प्रधानाचार्य और कार्यालय प्रशासकों की पर्चियाँ" },
    ],
  },
];

export default function PortalPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: { en: "Home", hi: "मुख्य पृष्ठ" } },
          { href: "/portal", label: { en: "Campus Portal", hi: "कैंपस पोर्टल" } },
        ]}
        eyebrow={<T en="AESRI Campus Portal" hi="एईएसआरआई कैंपस पोर्टल" />}
        title={{ en: "Sign in to the Campus Portal.", hi: "कैंपस पोर्टल में साइन इन करें।" }}
        lead={
          <T
            en="Families, teachers and the school offices of Aryavart Public School and Aadharshila Public School use the portal for attendance, homework, results, fees and notices. It is private: each person sees only what their role allows."
            hi="आर्यवर्त पब्लिक स्कूल और आधारशिला पब्लिक स्कूल के परिवार, शिक्षक और विद्यालय कार्यालय उपस्थिति, गृहकार्य, परिणाम, फ़ीस और सूचनाओं के लिए पोर्टल का उपयोग करते हैं। यह निजी है: हर व्यक्ति केवल वही देखता है जिसकी उसकी भूमिका में अनुमति है।"
          />
        }
        aside={
          <div className="rounded-[1.75rem] bg-forest-900 p-7 text-cream-50 sm:p-8">
            <ShieldCheck className="h-7 w-7 text-sage-300" aria-hidden />
            <h2 className="mt-4 font-display text-2xl leading-tight">
              <T en="Open the portal" hi="पोर्टल खोलें" />
            </h2>
            <p className="mt-1 text-sm text-sage-200">{portalHost}</p>
            <PortalLink
              to="/login"
              className="mt-6 flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-cream-50 px-6 font-semibold text-forest-900 transition-colors duration-300 hover:bg-white"
            >
              <LogIn className="h-5 w-5" aria-hidden />
              <T en="Sign in" hi="साइन इन करें" />
            </PortalLink>
            <PortalLink
              to="/activate"
              className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-cream-50/30 px-5 py-2.5 text-center text-[0.95rem] font-semibold text-cream-50 transition-colors duration-300 hover:border-cream-50/80 hover:bg-cream-50/[0.06]"
            >
              <KeyRound className="h-4 w-4 shrink-0" aria-hidden />
              <span>
                <T en="First time? Activate your account with your slip" hi="पहली बार? अपनी पर्ची से खाता सक्रिय करें" />
              </span>
            </PortalLink>
            <p className="mt-5 flex gap-2.5 text-sm text-sage-200">
              <CircleHelp className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              <span>
                <T en="Forgot your password? Ask the school office for a new slip." hi="पासवर्ड भूल गए? विद्यालय कार्यालय से नई पर्ची लें।" />
              </span>
            </p>
          </div>
        }
      />

      <section className="pb-24">
        <div className="container-x">
          <SectionIntro eyebrow={<T en="How signing in works" hi="साइन इन कैसे होता है" />} title={<T en="It starts with a slip from school." hi="शुरुआत विद्यालय की पर्ची से।" />} />
          <Stagger as="ol" className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" stagger={0.09}>
            {steps.map((s, i) => (
              <div key={s.title.en} className="relative h-full rounded-[1.5rem] bg-cream-50 p-6 ring-1 ring-forest-900/[0.07]">
                <span className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-sage-100 text-forest-700" aria-hidden>
                    {s.icon}
                  </span>
                  <span className="font-display text-sm text-ochre-600">0{i + 1}</span>
                </span>
                <h3 className="mt-5 font-semibold text-forest-900">
                  <T t={s.title} />
                </h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">
                  <T t={s.body} />
                </p>
              </div>
            ))}
          </Stagger>
          <p className="mt-6 max-w-3xl text-[0.95rem] text-muted">
            <T
              en="A family's login is for one child: with two children at school, you get a slip for each. The portal checks on the server, for every page, what each person may see, so a family sees only their own child's records and each school only its own."
              hi="परिवार का लॉगिन एक बच्चे के लिए होता है: विद्यालय में दो बच्चे हों तो हर बच्चे की अलग पर्ची मिलती है। पोर्टल हर पृष्ठ पर सर्वर पर जाँचता है कि कौन क्या देख सकता है, इसलिए परिवार केवल अपने बच्चे का रिकॉर्ड देखता है और हर विद्यालय केवल अपना।"
            />
          </p>
        </div>
      </section>

      <section className="bg-cream-200/50 py-24 sm:py-32">
        <div className="container-x">
          <SectionIntro eyebrow={<T en="What you can do" hi="आप क्या कर सकते हैं" />} title={<T en="Built for each person's job." hi="हर व्यक्ति के काम के अनुसार।" />} />
          <Stagger className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {roles.map((r) => (
              <div key={r.title.en} className="flex h-full flex-col rounded-[1.75rem] bg-cream-50 p-7 ring-1 ring-forest-900/[0.07]">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-forest-800 text-cream-50" aria-hidden>
                  {r.icon}
                </span>
                <h3 className="mt-6 font-display text-[1.45rem] leading-tight text-forest-900">
                  <T t={r.title} />
                </h3>
                <p className="mt-1 text-[0.85rem] font-semibold text-forest-700">
                  <T t={r.who} />
                </p>
                <ul className="mt-4 space-y-2 text-[0.92rem] text-muted">
                  {r.items.map((it) => (
                    <li key={it.en} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sage-400" aria-hidden />
                      <span>
                        <T t={it} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="pt-24">
        <div className="container-x">
          <Reveal className="flex flex-col items-start justify-between gap-8 rounded-[2rem] bg-forest-900 p-10 text-cream-50 sm:p-14 lg:flex-row lg:items-center">
            <p className="max-w-2xl font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-tight">
              <T en="Can't sign in, or need something from school today? The office can help." hi="साइन इन नहीं हो रहा, या आज विद्यालय से कुछ चाहिए? कार्यालय मदद करेगा।" />
            </p>
            <ButtonLink href="/contact" variant="light" size="lg">
              <T en="Contact a school" hi="विद्यालय से संपर्क करें" />
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
