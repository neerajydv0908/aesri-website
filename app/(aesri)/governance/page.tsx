import type { Metadata } from "next";
import Image from "next/image";
import { Building2, Eye, FileLock2, KeyRound, ListChecks, UserCheck } from "lucide-react";
import { T } from "@/components/i18n";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { ArrowLink } from "@/components/ui/button";
import { FactText, SectionIntro } from "@/components/ui/bits";
import { PageHero } from "@/components/ui/page-hero";
import { site } from "@/content/site";
import { isPending, type Fact } from "@/content/types";

export const metadata: Metadata = {
  title: "Governance",
  description: "AESRI's legal identity, the people responsible for it, and how it protects its two schools' records.",
};

const identity: { label: { en: string; hi: string }; value: Fact<string> }[] = [
  { label: { en: "Registered name", hi: "पंजीकृत नाम" }, value: site.name },
  { label: { en: "Legal form", hi: "वैधानिक स्वरूप" }, value: site.identity.legalForm },
  { label: { en: "Registration number", hi: "पंजीकरण संख्या" }, value: site.identity.registrationNumber },
  { label: { en: "Privacy contact", hi: "गोपनीयता संपर्क" }, value: site.contact.privacyContact },
  { label: { en: "Complaints", hi: "शिकायत" }, value: site.contact.grievanceContact },
];

const principles = [
  { icon: <Building2 className="h-5 w-5" />, title: "One organisation, two identities", body: "AESRI provides shared foundations. Each school keeps its own name, recognition, fees, notices and records." },
  { icon: <KeyRound className="h-5 w-5" />, title: "Access by school and by role", body: "A school selector is a convenience, never a permission. Access is checked on the server for every record." },
  { icon: <FileLock2 className="h-5 w-5" />, title: "Private by default", body: "Marksheets, addresses, documents and fee balances never appear on the public website." },
  { icon: <UserCheck className="h-5 w-5" />, title: "Verified guardians", body: "A parent's access to a child's records is set up only after staff verify the relationship." },
  { icon: <ListChecks className="h-5 w-5" />, title: "Named owners, dated content", body: "Every notice and document has an owner, a version and, where relevant, an expiry date." },
  { icon: <Eye className="h-5 w-5" />, title: "History, not overwrites", body: "Transfers, promotions and corrections create new records with an audit trail — they never erase the old ones." },
];

export default function GovernancePage() {
  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: { en: "Home", hi: "मुख्य पृष्ठ" } },
          { href: "/governance", label: { en: "Governance", hi: "प्रशासन" } },
        ]}
        eyebrow={<T en="Governance" hi="प्रशासन" />}
        title={{ en: "Clear identity. Clear accountability.", hi: "स्पष्ट पहचान। स्पष्ट जवाबदेही।" }}
        lead={
          <T
            en="Who AESRI is in law, who runs it, and how it protects two schools' records."
            hi="एईएसआरआई की वैधानिक पहचान, इसका संचालन कौन करता है, और यह दो विद्यालयों के अभिलेख कैसे सुरक्षित रखता है।"
          />
        }
      />

      {/* Identity */}
      <section className="pb-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionIntro
            eyebrow={<T en="Institutional identity" hi="संस्थागत पहचान" />}
            title={<T en="Who we are, on paper." hi="दस्तावेज़ों में हमारी पहचान।" />}
            lead={<T en="AESRI is a registered society." hi="एईएसआरआई एक पंजीकृत संस्था (सोसाइटी) है।" />}
          />
          <Reveal className="overflow-hidden rounded-[2rem] bg-cream-50 ring-1 ring-forest-900/[0.07]">
            <dl>
              {/* A contact still waiting to be named stays off the page until it is filled in. */}
              {identity.filter((row) => !isPending(row.value)).map((row) => (
                <div key={row.label.en} className="grid gap-2 border-t border-forest-900/[0.07] px-7 py-5 first:border-t-0 sm:grid-cols-[0.8fr_1.2fr] sm:gap-6">
                  <dt className="font-semibold text-forest-900">
                    <T t={row.label} />
                  </dt>
                  <dd className="text-forest-900/85">
                    <FactText value={row.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Governing body */}
      <section className="bg-cream-200/50 py-24 sm:py-32">
        <div className="container-x">
          <SectionIntro
            eyebrow={<T en="Governing body" hi="शासी निकाय" />}
            title={<T en="The people responsible." hi="ज़िम्मेदार व्यक्ति।" />}
            lead={
              <T
                en="AESRI management and technical administration are kept as separate roles — the everyday management account is never a technical superuser."
                hi="एईएसआरआई प्रबंधन और तकनीकी प्रशासन अलग-अलग भूमिकाएँ हैं — रोज़मर्रा का प्रबंधन खाता कभी तकनीकी सुपरयूज़र नहीं होता।"
              />
            }
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {site.founders.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.08} className="rounded-[2rem] bg-cream-50 p-8 ring-1 ring-forest-900/[0.07]">
                <span className="relative block h-24 w-24 overflow-hidden rounded-full ring-8 ring-sage-100">
                  <Image src={f.photo.src} alt={f.photo.alt} fill sizes="96px" className="object-cover grayscale" />
                </span>
                <h3 className="mt-6 font-display text-2xl text-forest-900">{f.name}</h3>
                <p className="mt-1 text-sm font-semibold text-forest-600">
                  <T en={f.role} hi={f.roleHi} />
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-24 sm:py-32">
        <div className="container-x">
          <SectionIntro
            eyebrow={<T en="Principles" hi="सिद्धांत" />}
            title={<T en="How we protect two schools' records." hi="हम दो विद्यालयों के अभिलेख कैसे सुरक्षित रखते हैं।" />}
          />
          <Stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {principles.map((p) => (
              <div key={p.title} className="h-full rounded-[1.75rem] bg-cream-50 p-8 ring-1 ring-forest-900/[0.07]">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-sage-100 text-forest-700" aria-hidden>
                  {p.icon}
                </span>
                <h3 className="mt-6 font-display text-[1.45rem] leading-tight text-forest-900">{p.title}</h3>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">{p.body}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Policies and concerns */}
      <section className="pb-12">
        <div className="container-x flex flex-wrap gap-x-8 gap-y-3">
          <ArrowLink href="/policies" className="text-forest-800">
            <T en="Policies" hi="नीतियाँ" />
          </ArrowLink>
          <ArrowLink href="/policies/grievance-redressal" className="text-forest-800">
            <T en="Raise a concern" hi="शिकायत दर्ज करें" />
          </ArrowLink>
        </div>
      </section>
    </>
  );
}
