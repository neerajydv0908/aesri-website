import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Building, HeartHandshake, Mail, MapPin, Phone, ShieldAlert } from "lucide-react";
import { SchoolCrest } from "@/components/brand/emblems";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { T } from "@/components/i18n";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { ArrowLink } from "@/components/ui/button";
import { FactBi, FactText, SectionIntro } from "@/components/ui/bits";
import { PageHero } from "@/components/ui/page-hero";
import { schools } from "@/content/schools";
import { site } from "@/content/site";
import { isPending } from "@/content/types";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact AESRI or reach Aryavart Public School, Palana and Aadharshila Public School, Udairamsar directly.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: { en: "Home", hi: "मुख्य पृष्ठ" } },
          { href: "/contact", label: { en: "Contact", hi: "संपर्क" } },
        ]}
        eyebrow={<T en="Contact & help" hi="संपर्क एवं सहायता" />}
        title={{ en: "We're here to help.", hi: "हम सहायता के लिए यहाँ हैं।" }}
        lead={
          <T
            en="For admissions, fees or anything about a particular school, contact that school directly — it's the quickest way. For AESRI itself, use the details below."
            hi="प्रवेश, फ़ीस या किसी विशेष विद्यालय से जुड़े विषय के लिए सीधे उसी विद्यालय से संपर्क करें — यह सबसे तेज़ तरीका है। एईएसआरआई से संपर्क के लिए नीचे दिए विवरण देखें।"
          />
        }
      />

      <section className="pb-24">
        <div className="container-x grid gap-5 lg:grid-cols-3">
          {schools.map((s, i) => (
            <Reveal
              key={s.slug}
              delay={i * 0.08}
              className="flex h-full flex-col rounded-[2rem] bg-cream-50 p-8 ring-1 ring-forest-900/[0.07]"
            >
              <div className="flex items-center gap-3 text-forest-700">
                <SchoolCrest school={s.key} className="h-10 w-10" />
                <div>
                  <h2 className="font-display text-2xl leading-tight text-forest-900">
                    <T t={s.name} />
                  </h2>
                  <p className="text-sm text-muted">
                    <T t={s.place} />
                  </p>
                </div>
              </div>
              <ul className="mt-7 space-y-3.5 text-[0.98rem] text-forest-900">
                <li className="flex gap-3">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-forest-600" aria-hidden />
                  <FactBi value={s.address} />
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-forest-600" aria-hidden />
                  {isPending(s.phone) ? <FactText value={s.phone} /> : <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="font-semibold link-underline">{s.phone}</a>}
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-forest-600" aria-hidden />
                  {isPending(s.email) ? <FactText value={s.email} /> : <a href={`mailto:${s.email}`} className="break-all link-underline">{s.email}</a>}
                </li>
              </ul>
              <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-8">
                <ArrowLink href={`/schools/${s.slug}/contact`} className="text-forest-800">
                  <T en="School contact page" hi="विद्यालय संपर्क पृष्ठ" />
                </ArrowLink>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.16} className="dark-surface flex h-full flex-col rounded-[2rem] bg-forest-900 p-8 text-cream-50">
            <div className="flex items-center gap-3">
              <Building className="h-8 w-8 text-sage-300" aria-hidden />
              <h2 className="font-display text-2xl leading-tight">
                <T en="AESRI office" hi="एईएसआरआई कार्यालय" />
              </h2>
            </div>
            <ul className="mt-7 space-y-3.5 text-[0.98rem]">
              {site.contact.address ? (
                <li className="flex gap-3">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-sage-300" aria-hidden />
                  <span>{site.contact.address}</span>
                </li>
              ) : null}
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-sage-300" aria-hidden />
                {isPending(site.contact.phone) ? (
                  <FactText value={site.contact.phone} />
                ) : (
                  <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="font-semibold link-underline">
                    {site.contact.phone}
                  </a>
                )}
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-sage-300" aria-hidden />
                {isPending(site.contact.email) ? (
                  <FactText value={site.contact.email} />
                ) : (
                  <a href={`mailto:${site.contact.email}`} className="break-all link-underline">
                    {site.contact.email}
                  </a>
                )}
              </li>
            </ul>
            <p className="mt-auto pt-8 text-sm text-sage-200">
              <T t={site.contact.hours} />
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x grid gap-5 lg:grid-cols-2">
          <Reveal className="rounded-[2rem] bg-sage-100 p-8 sm:p-10">
            <HeartHandshake className="h-8 w-8 text-forest-700" aria-hidden />
            <h2 className="mt-5 font-display text-[1.8rem] leading-tight text-forest-900">
              <T en="Prefer to come in person?" hi="व्यक्तिगत रूप से आना चाहते हैं?" />
            </h2>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-forest-900/80">
              <T
                en="Every service on this website is also available at the school offices, in Hindi or English. You never have to use the website to get help."
                hi="इस वेबसाइट की हर सेवा विद्यालय कार्यालयों में भी उपलब्ध है, हिंदी या अंग्रेज़ी में। सहायता के लिए वेबसाइट का उपयोग ज़रूरी नहीं है।"
              />
            </p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-[2rem] bg-cream-50 p-8 ring-1 ring-forest-900/[0.07] sm:p-10">
            <ShieldAlert className="h-8 w-8 text-clay-600" aria-hidden />
            <h2 className="mt-5 font-display text-[1.8rem] leading-tight text-forest-900">
              <T en="Worried about a child's safety?" hi="किसी बच्चे की सुरक्षा को लेकर चिंतित हैं?" />
            </h2>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">
              <T
                en="Speak directly to the head of the school, or call the child helpline 1098. Please don't use a web form for urgent concerns."
                hi="सीधे संस्था प्रधान से बात करें या चाइल्ड हेल्पलाइन 1098 पर कॉल करें। तात्कालिक चिंताओं के लिए वेब फ़ॉर्म का उपयोग न करें।"
              />
            </p>
            <Link href="/policies/grievance-redressal" className="mt-6 inline-flex items-center gap-2 font-semibold text-forest-800">
              <T en="How to raise a concern" hi="शिकायत कैसे दर्ज करें" />
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionIntro
              eyebrow={<T en="Write to AESRI" hi="एईएसआरआई को लिखें" />}
              title={<T en="A question for the organisation?" hi="संस्था के लिए कोई प्रश्न?" />}
              lead={
                <T
                  en="Partnerships, research, careers or feedback about this website. For school matters, please use the school's own page."
                  hi="साझेदारी, अनुसंधान, करियर या इस वेबसाइट के बारे में सुझाव। विद्यालय संबंधी विषयों के लिए उस विद्यालय का पृष्ठ उपयोग करें।"
                />
              }
            />
            <Stagger className="mt-8 flex flex-wrap gap-2">
              {schools.map((s) => (
                <Link key={s.slug} href={`/schools/${s.slug}/admissions`} className="inline-block rounded-full bg-cream-50 px-4 py-2 text-sm font-semibold text-forest-900 ring-1 ring-forest-900/10 hover:ring-forest-900/30">
                  <T t={s.short} /> · <T en="admissions" hi="प्रवेश" />
                </Link>
              ))}
            </Stagger>
          </div>
          <Reveal>
            <EnquiryForm school="aesri" kind="general" schoolName="The AESRI office" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
