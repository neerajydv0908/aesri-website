import type { Metadata } from "next";
import { ArrowUpRight, Clock, HeartHandshake, Mail, MapPin, Phone, ShieldAlert } from "lucide-react";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { DualLabel, T } from "@/components/i18n";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { ArrowLink } from "@/components/ui/button";
import { FactBi, FactText, SectionIntro } from "@/components/ui/bits";
import { PageHero } from "@/components/ui/page-hero";
import { getSchool } from "@/content/schools";
import { isPending } from "@/content/types";
import { loadSchool, type SchoolPageProps } from "@/lib/school-page";

export async function generateMetadata({ params }: SchoolPageProps): Promise<Metadata> {
  const s = getSchool((await params).school);
  return { title: "Contact", description: s ? `Address, phone, office hours and directions for ${s.name.en}.` : undefined };
}

export default async function ContactPage({ params }: SchoolPageProps) {
  const school = await loadSchool(params);
  const base = `/schools/${school.slug}`;
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(school.mapQuery)}`;

  return (
    <>
      <PageHero
        offsetHeader={false}
        tone="school"
        crumbs={[
          { href: base, label: school.name },
          { href: `${base}/contact`, label: { en: "Contact", hi: "संपर्क" } },
        ]}
        eyebrow={<DualLabel en="Contact" hi="संपर्क" />}
        title={{ en: "Contact the school", hi: "विद्यालय से संपर्क करें" }}
        lead={
          <T
            en="Call, visit or write to us. Every service on this website is also available in person at the school office."
            hi="फ़ोन करें, मिलने आएँ या लिखें। इस वेबसाइट की हर सेवा विद्यालय कार्यालय में व्यक्तिगत रूप से भी उपलब्ध है।"
          />
        }
      />

      <section className="pb-20">
        <div className="container-x">
          <Stagger className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <ContactCard icon={<MapPin className="h-5 w-5" />} title={{ en: "Address", hi: "पता" }}>
              <FactBi value={school.address} />
              <a href={maps} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-school underline-offset-4 hover:underline">
                <T en="Directions in Google Maps" hi="गूगल मैप्स में रास्ता" />
                <ArrowUpRight className="h-4 w-4" aria-hidden />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </ContactCard>
            <ContactCard icon={<Phone className="h-5 w-5" />} title={{ en: "Phone", hi: "फ़ोन" }}>
              {isPending(school.phone) ? (
                <FactText value={school.phone} />
              ) : (
                <a href={`tel:${school.phone.replace(/\s/g, "")}`} className="font-display text-2xl text-forest-900 link-underline">
                  {school.phone}
                </a>
              )}
            </ContactCard>
            <ContactCard icon={<Mail className="h-5 w-5" />} title={{ en: "Email", hi: "ईमेल" }}>
              {isPending(school.email) ? (
                <FactText value={school.email} />
              ) : (
                <a href={`mailto:${school.email}`} className="link-underline">
                  {school.email}
                </a>
              )}
            </ContactCard>
            <ContactCard icon={<Clock className="h-5 w-5" />} title={{ en: "Office hours", hi: "कार्यालय समय" }}>
              <T t={school.officeHours} />
            </ContactCard>
          </Stagger>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-x grid gap-5 lg:grid-cols-2">
          <Reveal className="rounded-[2rem] bg-sage-100 p-8 sm:p-10">
            <HeartHandshake className="h-8 w-8 text-school" aria-hidden />
            <h2 className="mt-5 font-display text-[1.8rem] leading-tight text-forest-900">
              <T en="Help for families" hi="परिवारों के लिए सहायता" />
            </h2>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-forest-900/80">
              <T
                en="You never have to use the website. For admissions, fees, certificates or any question, the school office will help you in person — in Hindi or English."
                hi="वेबसाइट का उपयोग ज़रूरी नहीं है। प्रवेश, फ़ीस, प्रमाण पत्र या किसी भी प्रश्न के लिए विद्यालय कार्यालय आपकी व्यक्तिगत रूप से सहायता करेगा — हिंदी या अंग्रेज़ी में।"
              />
            </p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-[2rem] bg-cream-50 p-8 ring-1 ring-forest-900/[0.07] sm:p-10">
            <ShieldAlert className="h-8 w-8 text-clay-600" aria-hidden />
            <h2 className="mt-5 font-display text-[1.8rem] leading-tight text-forest-900">
              <T en="Raise a concern" hi="शिकायत या चिंता" />
            </h2>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">
              <T
                en="If a child may be at risk, speak directly to the head of school or call the child helpline 1098 — don't use a form. For anything else, see how our grievance process works."
                hi="यदि किसी बच्चे की सुरक्षा को ख़तरा हो, तो सीधे संस्था प्रधान से बात करें या चाइल्ड हेल्पलाइन 1098 पर कॉल करें — फ़ॉर्म का उपयोग न करें। अन्य विषयों के लिए हमारी शिकायत प्रक्रिया देखें।"
              />
            </p>
            <div className="mt-6">
              <ArrowLink href="/policies/grievance-redressal" className="text-school">
                <T en="Grievance process" hi="शिकायत प्रक्रिया" />
              </ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="write" className="scroll-mt-40">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionIntro
            eyebrow={<T en="Write to us" hi="हमें लिखें" />}
            title={<T en="Send a message to the office." hi="कार्यालय को संदेश भेजें।" />}
            lead={
              <T
                en={`For admission questions, use the form on the Admissions page. Messages here go only to ${school.name.en}.`}
                hi={`प्रवेश संबंधी प्रश्नों के लिए प्रवेश पृष्ठ का फ़ॉर्म उपयोग करें। यहाँ के संदेश केवल ${school.name.hi} तक जाते हैं।`}
              />
            }
          />
          <Reveal>
            <EnquiryForm school={school.key} kind="general" schoolName={school.name.en} />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ContactCard({ icon, title, children }: { icon: React.ReactNode; title: { en: string; hi: string }; children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col rounded-[1.75rem] bg-cream-50 p-7 ring-1 ring-forest-900/[0.07]">
      <span className="grid h-11 w-11 place-items-center rounded-full bg-school-soft text-school" aria-hidden>
        {icon}
      </span>
      <h2 className="mt-5 text-[0.75rem] font-bold uppercase tracking-[0.15em] text-muted">
        <T t={title} />
      </h2>
      <div className="mt-2 flex flex-1 flex-col text-[1.02rem] leading-relaxed text-forest-900">{children}</div>
    </div>
  );
}
