import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { AesriEmblem } from "@/components/brand/emblems";
import { T } from "@/components/i18n";
import { FactText } from "@/components/ui/bits";
import { Reveal } from "@/components/motion/reveal";
import { footerNav, site } from "@/content/site";
import { schools, sharedSchoolContact } from "@/content/schools";
import { isPending } from "@/content/types";

export function SiteFooter() {
  const year = new Date().getFullYear();
  // AESRI's own office contact, or — until that is confirmed — the phone and
  // email the two school offices share.
  const shared = sharedSchoolContact();
  const phone = isPending(site.contact.phone) ? (shared?.phone ?? site.contact.phone) : site.contact.phone;
  const email = isPending(site.contact.email) ? (shared?.email ?? site.contact.email) : site.contact.email;
  const viaSchools = isPending(site.contact.phone) && !!shared;
  return (
    <footer className="jaali-light relative mt-24 overflow-hidden rounded-t-[2.5rem] bg-forest-900 text-cream-100 sm:mt-32 sm:rounded-t-[3.5rem]">
      <div className="container-x pt-20 sm:pt-24">
        {/* Call to action */}
        <div className="grid gap-10 border-b border-cream-50/10 pb-16 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <Reveal>
            <p className="eyebrow text-sage-300">
              <span className="h-px w-8 bg-sage-300/60" aria-hidden />
              <T en="Visit us" hi="हमसे मिलें" />
            </p>
            <h2 className="text-h2 mt-5 max-w-[16ch] text-cream-50">
              <T en="Two village schools. One family." hi="गाँव के दो विद्यालय। एक परिवार।" />
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="grid gap-3 sm:grid-cols-2">
            {schools.map((s) => (
              <Link
                key={s.slug}
                href={`/schools/${s.slug}`}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-cream-50/15 px-5 py-4 transition-colors hover:border-cream-50/50 hover:bg-cream-50/[0.04]"
              >
                <span>
                  <span className="block font-display text-xl leading-tight text-cream-50">
                    <T t={s.name} />
                  </span>
                  <span className="text-sm text-sage-200">
                    <T t={s.place} />
                  </span>
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-sage-200 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </Link>
            ))}
          </Reveal>
        </div>

        {/* Link columns */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.3fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3" aria-label="AESRI — home">
              <AesriEmblem className="h-11 w-11 text-sage-200" title="" />
              <span className="font-display text-2xl text-cream-50">AESRI</span>
            </Link>
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-sage-200">
              <T en={site.name} hi={site.nameHi} />
            </p>
            <ul className="mt-6 space-y-3 text-[0.92rem] text-cream-100/90">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sage-300" aria-hidden />
                <span>
                  <T t={site.region} />
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-sage-300" aria-hidden />
                {isPending(phone) ? (
                  <FactText value={phone} />
                ) : (
                  <a href={`tel:${phone.replace(/\s/g, "")}`} className="link-underline hover:text-cream-50">
                    {phone}
                  </a>
                )}
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-sage-300" aria-hidden />
                {isPending(email) ? (
                  <FactText value={email} />
                ) : (
                  <a href={`mailto:${email}`} className="break-all link-underline hover:text-cream-50">
                    {email}
                  </a>
                )}
              </li>
            </ul>
            {viaSchools ? (
              <p className="mt-3 pl-7 text-[0.8rem] text-sage-200">
                <T en="Phone and email of both school offices" hi="दोनों विद्यालय कार्यालयों का फ़ोन व ईमेल" />
              </p>
            ) : null}
          </div>

          <FooterColumn title={{ en: "Organisation", hi: "संस्था" }} links={footerNav.organisation} />

          <div>
            <h3 className="font-sans text-[0.75rem] font-bold uppercase tracking-[0.18em] text-sage-300">
              <T en="Our schools" hi="हमारे विद्यालय" />
            </h3>
            <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {schools.map((s) => (
                <div key={s.slug}>
                  <Link href={`/schools/${s.slug}`} className="font-display text-lg text-cream-50 link-underline">
                    <T t={s.short} />
                  </Link>
                  <ul className="mt-2 space-y-1.5 text-[0.9rem] text-cream-100/80">
                    {[
                      ["admissions", "Admissions", "प्रवेश"],
                      ["fees", "Fees", "फ़ीस"],
                      ["notices", "Notices", "सूचनाएँ"],
                      ["contact", "Contact", "संपर्क"],
                    ].map(([p, en, hi]) => (
                      <li key={p}>
                        <Link href={`/schools/${s.slug}/${p}`} className="link-underline hover:text-cream-50">
                          <T en={en} hi={hi} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <FooterColumn title={{ en: "Help", hi: "सहायता" }} links={footerNav.help} />
        </div>
      </div>

      {/* Giant wordmark */}
      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden">
        <p className="-mb-[0.18em] text-center font-display text-[25vw] leading-[0.8] tracking-[-0.06em] text-cream-50/[0.055]">AESRI</p>
      </div>

      <div className="border-t border-cream-50/10">
        <div className="container-x flex flex-col gap-3 py-6 text-[0.82rem] text-sage-200 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}
            {isPending(site.identity.registrationNumber) ? null : (
              <>
                {" "}
                · <T en="Registered society, Reg. No." hi="पंजीकृत संस्था, पंजीयन संख्या" /> {site.identity.registrationNumber}
              </>
            )}
            . <T en="All rights reserved." hi="सर्वाधिकार सुरक्षित।" />
          </p>
          <p className="flex flex-wrap gap-x-5 gap-y-1">
            <Link href="/policies/privacy-policy" className="link-underline">
              <T en="Privacy" hi="गोपनीयता" />
            </Link>
            <Link href="/policies/accessibility-statement" className="link-underline">
              <T en="Accessibility" hi="सुगम्यता" />
            </Link>
            <Link href="/policies/cookies-and-storage" className="link-underline">
              <T en="No tracking cookies" hi="कोई ट्रैकिंग कुकी नहीं" />
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: { en: string; hi: string }; links: { href: string; label: { en: string; hi: string } }[] }) {
  return (
    <div>
      <h3 className="font-sans text-[0.75rem] font-bold uppercase tracking-[0.18em] text-sage-300">
        <T t={title} />
      </h3>
      <ul className="mt-5 space-y-2.5 text-[0.95rem] text-cream-100/85">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="link-underline hover:text-cream-50">
              <T t={l.label} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
