import type { Metadata } from "next";
import Link from "next/link";
import { Ban, CalendarClock, Info, Landmark, ReceiptText, ShieldCheck } from "lucide-react";
import { DualLabel, T } from "@/components/i18n";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { ArrowLink } from "@/components/ui/button";
import { Eyebrow, FactBi, SectionIntro, Tbc } from "@/components/ui/bits";
import { PageHero } from "@/components/ui/page-hero";
import { feeLawNote, feeSchedules, rupees as rupee } from "@/content/fees";
import { formatDate } from "@/content/notices";
import { getSchool } from "@/content/schools";
import { isPending, type Bi, type FeeGroup, type FeeHead } from "@/content/types";
import { loadSchool, type SchoolPageProps } from "@/lib/school-page";

export async function generateMetadata({ params }: SchoolPageProps): Promise<Metadata> {
  const s = getSchool((await params).school);
  if (!s) return { title: "Fees" };
  const approved = feeSchedules[s.key].status === "approved";
  return {
    title: approved ? "Fees and approved fee structure" : "Fees and fee structure",
    description: `Class-wise fees, the admission fee, instalments and payment information for ${s.name.en}, in Hindi and English.`,
  };
}

/** Every fee head that appears in any class group, in order — one table column each. */
function feeColumns(groups: FeeGroup[]): Pick<FeeHead, "head" | "frequency">[] {
  const seen = new Map<string, Pick<FeeHead, "head" | "frequency">>();
  for (const g of groups) for (const h of g.heads) if (!seen.has(h.head.en)) seen.set(h.head.en, { head: h.head, frequency: h.frequency });
  return [...seen.values()];
}

/** Both languages side by side — the Act requires fee details in Hindi and English. */
function Dual({ t, className }: { t: Bi; className?: string }) {
  return (
    <span className={className}>
      <span className="block">{t.en}</span>
      <span lang="hi" className="block text-[0.92em] text-muted">
        {t.hi}
      </span>
    </span>
  );
}

export default async function FeesPage({ params }: SchoolPageProps) {
  const school = await loadSchool(params);
  const base = `/schools/${school.slug}`;
  const fee = feeSchedules[school.key];
  const awaiting = fee.status === "awaiting-approval";
  const approved = fee.status === "approved";
  const columns = feeColumns(fee.groups);

  const summary: { icon: React.ReactNode; label: Bi; value: React.ReactNode }[] = [
    { icon: <Landmark className="h-5 w-5" />, label: { en: "School", hi: "विद्यालय" }, value: <Dual t={school.name} /> },
    { icon: <CalendarClock className="h-5 w-5" />, label: { en: "Applicable period", hi: "लागू अवधि" }, value: <FactBi value={fee.period} /> },
    {
      icon: <ReceiptText className="h-5 w-5" />,
      label: { en: "Fee queries", hi: "फ़ीस संबंधी प्रश्न" },
      value: (
        <span>
          {fee.owner}
          {isPending(school.phone) ? null : (
            <a href={`tel:${school.phone.replace(/\s/g, "")}`} className="mt-1 block w-fit font-normal link-underline">
              {school.phone}
            </a>
          )}
        </span>
      ),
    },
  ];

  return (
    <>
      <PageHero
        offsetHeader={false}
        tone="school"
        crumbs={[
          { href: base, label: school.name },
          { href: `${base}/fees`, label: { en: "Fees", hi: "फ़ीस" } },
        ]}
        eyebrow={<DualLabel en="Fees" hi="फ़ीस" />}
        title={approved ? { en: "Fees and approved fee structure", hi: "फ़ीस एवं स्वीकृत शुल्क संरचना" } : { en: "Fees and fee structure", hi: "फ़ीस एवं शुल्क संरचना" }}
        lead={
          <span className="block">
            <span className="block">{feeLawNote.en}</span>
            <span lang="hi" className="mt-4 block text-[0.95em]">
              {feeLawNote.hi}
            </span>
          </span>
        }
      />

      {awaiting ? (
        <section className="pb-12">
          <div className="container-x">
            <Reveal className="flex flex-col gap-4 rounded-[1.5rem] border border-dashed border-ochre-500/60 bg-ochre-400/10 p-6 sm:flex-row sm:items-start sm:p-8">
              <Info className="h-6 w-6 shrink-0 text-ochre-600" aria-hidden />
              <div className="text-forest-900">
                <p className="font-semibold">
                  Amounts will be published here from the SLFC-approved fee schedule.
                  <span lang="hi" className="mt-1 block font-normal">
                    राशि विद्यालय स्तरीय फ़ीस समिति द्वारा स्वीकृत शुल्क सूची से यहाँ प्रकाशित की जाएगी।
                  </span>
                </p>
                <p className="mt-3 text-[0.95rem] text-muted">
                  Until then, please ask the school office for the current approved fee — it is also displayed on the school notice board.
                  <span lang="hi" className="mt-1 block">
                    तब तक वर्तमान स्वीकृत फ़ीस की जानकारी विद्यालय कार्यालय से लें — यह विद्यालय के सूचना पट्ट पर भी प्रदर्शित है।
                  </span>
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* Summary */}
      <section className="pb-20">
        <div className="container-x">
          <Stagger className="grid gap-px overflow-hidden rounded-[1.75rem] bg-forest-900/10 ring-1 ring-forest-900/[0.07] md:grid-cols-3" itemClassName="bg-cream-50">
            {summary.map((s) => (
              <div key={s.label.en} className="h-full p-6">
                <span className="text-school" aria-hidden>
                  {s.icon}
                </span>
                <p className="mt-4 text-[0.72rem] font-bold uppercase tracking-[0.15em] text-muted">
                  {s.label.en} · <span lang="hi">{s.label.hi}</span>
                </p>
                <div className="mt-2 font-semibold leading-snug text-forest-900">{s.value}</div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Fee table */}
      <section className="pb-20">
        <div className="container-x">
          <SectionIntro
            eyebrow={<T en="Fee by class" hi="कक्षावार शुल्क" />}
            title={approved ? <T en="Approved fee structure" hi="स्वीकृत शुल्क संरचना" /> : awaiting ? <T en="Approved fee heads" hi="स्वीकृत शुल्क मद" /> : <T en="Fee structure" hi="शुल्क संरचना" />}
          />
          {fee.groups.length ? (
            <>
              <div className={fee.common?.length ? "mt-12 grid items-start gap-6 lg:grid-cols-[1.45fr_0.55fr]" : "mt-12"}>
                <Reveal className="overflow-hidden rounded-[1.75rem] bg-cream-50 ring-1 ring-forest-900/[0.07]">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[18rem] text-left">
                      <caption className="sr-only">
                        Fee per student, by class, {school.name.en}
                      </caption>
                      <thead>
                        <tr className="bg-school text-cream-50">
                          <th scope="col" className="px-5 py-5 align-bottom font-normal sm:px-8">
                            <span className="block font-display text-xl leading-tight">Class</span>
                            <span lang="hi" className="block text-sm text-cream-100/80">
                              कक्षा
                            </span>
                          </th>
                          {columns.map((c) => (
                            <th key={c.head.en} scope="col" className="px-5 py-5 text-right align-bottom font-normal sm:px-8">
                              <span className="block font-display text-xl leading-tight">{c.head.en}</span>
                              <span lang="hi" className="block text-sm text-cream-100/80">
                                {c.head.hi}
                              </span>
                              <span className="mt-1.5 block text-[0.78rem] text-cream-100/75">
                                {c.frequency.en} · <span lang="hi">{c.frequency.hi}</span>
                              </span>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {fee.groups.map((g) => (
                          <tr key={g.classes.en} className="border-t border-forest-900/[0.07] first:border-t-0">
                            <th scope="row" className="px-5 py-5 font-normal sm:px-8">
                              <Dual t={g.classes} className="font-semibold text-forest-900" />
                            </th>
                            {columns.map((c) => {
                              const h = g.heads.find((x) => x.head.en === c.head.en);
                              return (
                                <td key={c.head.en} className="whitespace-nowrap px-5 py-5 text-right font-display text-[1.55rem] tabular-nums leading-none text-forest-900 sm:px-8">
                                  {h?.amount == null ? (
                                    <span className="text-muted">
                                      —<span className="sr-only">{awaiting ? " (awaiting approval)" : " (not applicable)"}</span>
                                    </span>
                                  ) : (
                                    rupee(h.amount)
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Reveal>

                {fee.common?.length ? (
                  <div className="grid gap-6">
                    {fee.common.map((h, i) => (
                      <Reveal key={h.head.en} delay={0.1 + i * 0.08} className="rounded-[1.75rem] bg-school-soft p-7 sm:p-8">
                        <p className="text-[0.72rem] font-bold uppercase tracking-[0.15em] text-forest-900/75">
                          All classes · <span lang="hi">सभी कक्षाएँ</span>
                        </p>
                        <h3 className="mt-4 font-display text-[1.7rem] leading-tight text-forest-900">
                          {h.head.en}
                          <span lang="hi" className="block text-lg text-forest-900/75">
                            {h.head.hi}
                          </span>
                        </h3>
                        <p className="mt-5 font-display text-[2.6rem] leading-none tabular-nums text-forest-900">{h.amount == null ? "—" : rupee(h.amount)}</p>
                        <Dual t={h.frequency} className="mt-3 block text-[0.95rem] text-forest-900/85" />
                        {h.condition ? (
                          <p className="mt-5 inline-flex flex-wrap items-center gap-x-1.5 gap-y-0.5 rounded-full bg-clay-600 px-3.5 py-1.5 text-[0.82rem] font-semibold text-cream-50">
                            <Ban className="h-3.5 w-3.5" aria-hidden />
                            {h.condition.en} · <span lang="hi">{h.condition.hi}</span>
                          </p>
                        ) : null}
                      </Reveal>
                    ))}
                  </div>
                ) : null}
              </div>

              {fee.notes?.length ? (
                <Stagger as="ul" className="mt-6 grid gap-4 md:grid-cols-2" y={16}>
                  {fee.notes.map((n) => (
                    <span key={n.en} className="flex h-full gap-3.5 rounded-2xl bg-cream-50 p-5 ring-1 ring-forest-900/[0.07] sm:p-6">
                      <Info className="mt-0.5 h-5 w-5 shrink-0 text-school" aria-hidden />
                      <Dual t={n} className="text-[0.95rem] leading-relaxed text-forest-900" />
                    </span>
                  ))}
                </Stagger>
              ) : null}
            </>
          ) : (
            <Reveal className="mt-10 rounded-[1.75rem] bg-cream-50 p-8 ring-1 ring-forest-900/[0.07]">
              <p className="flex flex-wrap items-center gap-3 text-forest-900">
                <Tbc what="Class-wise fee heads for this school" />
                <span>
                  The class-wise schedule will appear here once the approved fee is supplied.
                  <span lang="hi" className="block text-muted">
                    स्वीकृत फ़ीस प्राप्त होने पर कक्षावार सूची यहाँ दिखाई देगी।
                  </span>
                </span>
              </p>
            </Reveal>
          )}
        </div>
      </section>

      {/* Instalments + how to pay */}
      <section className="pb-20">
        <div className="container-x grid gap-6 lg:grid-cols-[1fr_1fr]">
          <Reveal className="rounded-[2rem] bg-cream-50 p-8 ring-1 ring-forest-900/[0.07] sm:p-10">
            <Eyebrow>
              <T en="Payment schedule" hi="भुगतान अनुसूची" />
            </Eyebrow>
            {fee.instalments.length ? (
              <ol className="mt-8 grid gap-4 sm:grid-cols-2">
                {fee.instalments.map((ins, i) => (
                  <li key={ins.term.en} className="rounded-2xl bg-school-soft p-6">
                    <p className="font-display text-sm text-school">0{i + 1}</p>
                    <p className="mt-3 font-display text-[1.6rem] leading-tight text-forest-900">{ins.window.en}</p>
                    <p lang="hi" className="text-forest-900/80">
                      {ins.window.hi}
                    </p>
                    <p className="mt-3 text-sm text-muted">
                      {ins.term.en} · <span lang="hi">{ins.term.hi}</span>
                      {ins.classes ? <> — {ins.classes.en}</> : null}
                    </p>
                  </li>
                ))}
              </ol>
            ) : (
              <div className="mt-8 rounded-2xl border border-dashed border-forest-900/15 p-6">
                <Tbc what="Instalment dates" />
                <Dual
                  t={{ en: "Instalment dates will be listed here. Until then, the school office will tell you when each payment is due.", hi: "किस्तों की तिथियाँ यहाँ दी जाएँगी। तब तक हर भुगतान की तिथि विद्यालय कार्यालय से जानें।" }}
                  className="mt-4 block text-[0.95rem] text-forest-900"
                />
              </div>
            )}
          </Reveal>
          <Reveal delay={0.1} className="rounded-[2rem] bg-cream-50 p-8 ring-1 ring-forest-900/[0.07] sm:p-10">
            <Eyebrow>
              <T en="How to pay" hi="भुगतान कैसे करें" />
            </Eyebrow>
            <ul className="mt-8 space-y-5">
              {fee.howToPay.map((h) => (
                <li key={h.en} className="flex gap-3.5">
                  <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-school" aria-hidden />
                  <Dual t={h} className="text-[0.98rem] text-forest-900" />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Policy + version */}
      <section>
        <div className="container-x flex flex-col justify-between gap-6 border-t border-forest-900/10 pt-10 sm:flex-row sm:items-center">
          <p className="text-sm text-muted">
            Version {fee.version} · published {formatDate(fee.publishedAt)} · owner: {fee.owner}
            <span lang="hi" className="block">
              संस्करण {fee.version} · प्रकाशित {formatDate(fee.publishedAt, "hi")}
            </span>
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <ArrowLink href="/policies/fee-and-refund-policy" className="text-school">
              <T en="Fee payment & refund policy" hi="फ़ीस भुगतान एवं वापसी नीति" />
            </ArrowLink>
            <ArrowLink href="/policies/grievance-redressal" className="text-school">
              <T en="Question about a fee?" hi="फ़ीस संबंधी प्रश्न?" />
            </ArrowLink>
          </div>
        </div>
        <p className="container-x mt-6 text-sm text-muted">
          <Link href={`${base}/notices`} className="underline underline-offset-2">
            <T en="Fee notices and due dates" hi="फ़ीस सूचनाएँ एवं देय तिथियाँ" />
          </Link>
        </p>
      </section>
    </>
  );
}
