import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SchoolCrest } from "@/components/brand/emblems";
import { Bi, T } from "@/components/i18n";
import { ClipReveal, Parallax, Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { FactBi, FactText, SectionIntro, Tbc } from "@/components/ui/bits";
import { PageHero } from "@/components/ui/page-hero";
import { feeSchedules, rupees } from "@/content/fees";
import { formatDate } from "@/content/notices";
import { schools } from "@/content/schools";
import { isPending, type SchoolKey } from "@/content/types";
import { schoolPages } from "@/lib/school-pages";

export const metadata: Metadata = {
  title: "Our Schools",
  description: "Aryavart Public School, Palana and Aadharshila Public School, Udairamsar — the two schools of AESRI in Bikaner district.",
};

export default function SchoolsPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: { en: "Home", hi: "मुख्य पृष्ठ" } },
          { href: "/schools", label: { en: "Our Schools", hi: "हमारे विद्यालय" } },
        ]}
        eyebrow={<T en="Our schools" hi="हमारे विद्यालय" />}
        title={{ en: "Two schools, each complete in itself.", hi: "दो विद्यालय, हर एक अपने आप में पूर्ण।" }}
        lead={
          <T
            en="Each school has its own website within AESRI — with its own admissions, fees, notices and contact — so you can go straight to what you need."
            hi="एईएसआरआई के भीतर हर विद्यालय की अपनी वेबसाइट है — अपने प्रवेश, फ़ीस, सूचनाओं और संपर्क के साथ — ताकि आप सीधे अपनी ज़रूरत की जानकारी तक पहुँच सकें।"
          />
        }
      />

      {schools.map((s, i) => (
        <section key={s.slug} className="pb-24 sm:pb-32" style={{ "--school-deep": s.colors.deep, "--school-accent": s.colors.accent, "--school-soft": s.colors.soft } as CSSProperties}>
          <div className={`container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20`}>
            <div className={i % 2 ? "lg:order-2" : undefined}>
              <Parallax offset={36}>
                <ClipReveal className="rounded-[2rem]" from={i % 2 ? "right" : "left"}>
                  <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem]">
                    <Image src={s.card.src} alt={s.card.alt} fill sizes="(min-width: 1024px) 48vw, 100vw" placeholder="blur" className="object-cover" />
                  </div>
                </ClipReveal>
              </Parallax>
            </div>
            <div>
              <Reveal>
                <div className="flex items-center gap-3 text-school">
                  <SchoolCrest school={s.key} className="h-10 w-10" />
                  <span className="text-[0.8rem] font-bold uppercase tracking-[0.16em]">
                    <T t={s.place} />
                  </span>
                </div>
                <h2 className="text-h2 mt-6 text-forest-900">
                  <T t={s.name} />
                </h2>
                <p className="mt-4 font-display text-xl italic text-forest-700">
                  <T t={s.tagline} />
                </p>
                <Bi t={s.intro} as="p" className="mt-5 text-[1.05rem] leading-relaxed text-muted" />
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {schoolPages.slice(1).map((p) => (
                    <li key={p.page}>
                      <Link
                        href={`/schools/${s.slug}/${p.page}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-cream-50 px-3.5 py-2 text-sm font-semibold text-forest-900 ring-1 ring-forest-900/10 transition hover:ring-forest-900/30"
                      >
                        <T t={p.label} />
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-9">
                  <ButtonLink href={`/schools/${s.slug}`} variant="school" size="lg">
                    <T en="Visit" hi="देखें" /> <T t={s.short} />
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* Comparison */}
      <section>
        <div className="container-x">
          <SectionIntro eyebrow={<T en="Side by side" hi="आमने-सामने" />} title={<T en="Compare the two schools." hi="दोनों विद्यालयों की तुलना।" />} />
          <Reveal className="mt-12 overflow-x-auto rounded-[2rem] bg-cream-50 ring-1 ring-forest-900/[0.07]">
            <table className="w-full min-w-[640px] text-left">
              <caption className="sr-only">Comparison of AESRI schools</caption>
              <thead>
                <tr className="border-b border-forest-900/10">
                  <td className="px-7 py-6" />
                  {schools.map((s) => (
                    <th key={s.slug} scope="col" className="px-7 py-6 font-display text-2xl font-normal text-forest-900">
                      <Link href={`/schools/${s.slug}`} className="group inline-flex items-center gap-2">
                        <T t={s.name} />
                        <ArrowUpRight className="h-5 w-5 opacity-50 transition group-hover:opacity-100" aria-hidden />
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-[0.98rem]">
                <Row label={{ en: "Location", hi: "स्थान" }} cells={schools.map((s) => <T key={s.key} t={s.place} />)} />
                <Row
                  label={{ en: "Founded", hi: "स्थापना" }}
                  cells={schools.map((s) => (isPending(s.established) ? <FactText key={s.key} value={s.established} /> : <T key={s.key} en={s.established.label} hi={formatDate(s.established.iso, "hi")} />))}
                />
                <Row label={{ en: "Classes", hi: "कक्षाएँ" }} cells={schools.map((s) => <FactBi key={s.key} value={s.classes} />)} />
                <Row label={{ en: "Medium", hi: "माध्यम" }} cells={schools.map((s) => <FactBi key={s.key} value={s.medium} />)} />
                <Row label={{ en: "Type", hi: "प्रकार" }} cells={schools.map((s) => (isPending(s.coEd) ? <FactText key={s.key} value={s.coEd} /> : <T key={s.key} en="Co-educational" hi="सह-शिक्षा" />))} />
                <Row
                  label={{ en: "Timings", hi: "समय" }}
                  cells={schools.map((s) =>
                    isPending(s.timings) ? (
                      <FactText key={s.key} value={s.timings} />
                    ) : (
                      <span key={s.key}>
                        <T en="Summer" hi="ग्रीष्म" /> <T t={s.timings.summer} /> · <T en="Winter" hi="शीत" /> <T t={s.timings.winter} />
                      </span>
                    ),
                  )}
                />
                <Row label={{ en: "Teachers", hi: "शिक्षक" }} cells={schools.map((s) => s.teachers.length)} />
                <Row label={{ en: "Annual fee (per student)", hi: "वार्षिक शुल्क (प्रति विद्यार्थी)" }} cells={schools.map((s) => <FeeRange key={s.key} schoolKey={s.key} slug={s.slug} />)} />
                <Row label={{ en: "Address", hi: "पता" }} cells={schools.map((s) => <FactBi key={s.key} value={s.address} />)} />
                <Row label={{ en: "Phone", hi: "फ़ोन" }} cells={schools.map((s) => <FactText key={s.key} value={s.phone} />)} />
                <Row label={{ en: "Email", hi: "ईमेल" }} cells={schools.map((s) => <FactText key={s.key} value={s.email} className="break-all" />)} />
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/** Lowest to highest annual fee at a school, with a link to its class-wise fee table. */
function FeeRange({ schoolKey, slug }: { schoolKey: SchoolKey; slug: string }) {
  const amounts = feeSchedules[schoolKey].groups.flatMap((g) => g.heads.map((h) => h.amount)).filter((a): a is number => a !== null);
  if (!amounts.length) return <Tbc what="Annual fee" />;
  const lo = Math.min(...amounts);
  const hi = Math.max(...amounts);
  return (
    <span>
      <span className="font-semibold tabular-nums">{lo === hi ? rupees(lo) : `${rupees(lo)} – ${rupees(hi)}`}</span>
      <Link href={`/schools/${slug}/fees`} className="mt-1 block w-fit text-sm text-forest-700 link-underline">
        <T en="Fees by class" hi="कक्षावार शुल्क" />
      </Link>
    </span>
  );
}

function Row({ label, cells }: { label: { en: string; hi: string }; cells: React.ReactNode[] }) {
  return (
    <tr className="border-t border-forest-900/[0.07] align-top first:border-t-0">
      <th scope="row" className="w-48 px-7 py-5 text-[0.75rem] font-bold uppercase tracking-[0.15em] text-muted">
        <T t={label} />
      </th>
      {cells.map((c, i) => (
        <td key={i} className="px-7 py-5 text-forest-900">
          {c}
        </td>
      ))}
    </tr>
  );
}
