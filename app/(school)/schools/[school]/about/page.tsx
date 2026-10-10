import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { T } from "@/components/i18n";
import { ClipReveal, Parallax, Reveal, Stagger } from "@/components/motion/reveal";
import { ArrowLink } from "@/components/ui/button";
import { Eyebrow, FactText, SectionIntro } from "@/components/ui/bits";
import { PageHero } from "@/components/ui/page-hero";
import { getSchool, schools } from "@/content/schools";
import { loadSchool, type SchoolPageProps } from "@/lib/school-page";

export async function generateMetadata({ params }: SchoolPageProps): Promise<Metadata> {
  const s = getSchool((await params).school);
  return { title: "About the school", description: s?.intro.en };
}

function initials(name: string) {
  return name
    .replace(/^(Mrs?\.|Miss|Shri|Smt\.)\s+/i, "")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default async function AboutSchoolPage({ params }: SchoolPageProps) {
  const school = await loadSchool(params);
  const base = `/schools/${school.slug}`;
  const sister = schools.find((s) => s.key !== school.key)!;

  return (
    <>
      <PageHero
        offsetHeader={false}
        tone="school"
        crumbs={[
          { href: base, label: school.name },
          { href: `${base}/about`, label: { en: "About", hi: "परिचय" } },
        ]}
        eyebrow={<T en="About the school" hi="विद्यालय परिचय" />}
        title={school.name}
        lead={<T t={school.intro} />}
      />

      {/* Story */}
      <section className="pb-24 sm:pb-32">
        <div className="container-x grid items-start gap-14 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-6">
            <Eyebrow>
              <T en="Our story" hi="हमारी कहानी" />
            </Eyebrow>
            {school.story.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className={i === 0 ? "font-display text-[clamp(1.4rem,2.2vw,1.9rem)] leading-snug text-forest-900" : "text-lead text-muted"}>{p}</p>
              </Reveal>
            ))}
          </div>
          <Parallax offset={40}>
            <ClipReveal className="rounded-[2rem]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
                <Image src={school.hero.src} alt={school.hero.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" placeholder="blur" className="object-cover" />
              </div>
            </ClipReveal>
            <p className="mt-3 text-sm text-muted">{school.hero.caption}</p>
          </Parallax>
        </div>
      </section>

      {/* Focus */}
      {school.focus ? (
        <section className="dark-surface relative overflow-hidden rounded-[2.5rem] bg-school py-24 text-cream-50 sm:mx-4 sm:py-32">
          <div aria-hidden className="jaali-light absolute inset-0" />
          <div className="container-x relative">
            <p className="eyebrow text-cream-100/80">
              <span className="h-px w-8 bg-cream-100/50" aria-hidden />
              <T en="Our focus" hi="हमारा ध्येय" />
            </p>
            <Stagger className="mt-10 grid gap-10 lg:grid-cols-3" stagger={0.12}>
              {school.focus.map((f, i) => (
                <div key={i} className="border-t border-cream-50/20 pt-6">
                  <span className="font-display text-sm text-cream-100/60">0{i + 1}</span>
                  <p className="mt-4 font-display text-[1.35rem] leading-snug">{f}</p>
                </div>
              ))}
            </Stagger>
          </div>
        </section>
      ) : null}

      {/* Leadership */}
      <section className="py-24 sm:py-32">
        <div className="container-x">
          <SectionIntro eyebrow={<T en="Leadership" hi="नेतृत्व" />} title={<T en="The people responsible." hi="ज़िम्मेदार व्यक्ति।" />} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {school.leadership.map((p) => (
              <Reveal key={p.name} className="flex items-center gap-5 rounded-[1.75rem] bg-cream-50 p-6 ring-1 ring-forest-900/[0.07]">
                {p.photo ? (
                  <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-4 ring-school-soft">
                    <Image src={p.photo.src} alt={p.photo.alt} fill sizes="80px" className="object-cover grayscale transition duration-700 hover:grayscale-0" />
                  </span>
                ) : null}
                <span>
                  <span className="block font-display text-xl text-forest-900">{p.name}</span>
                  <span className="text-sm font-semibold text-school">
                    <T en={p.role} hi={p.roleHi} />
                  </span>
                </span>
              </Reveal>
            ))}
            <Reveal className="flex items-center gap-5 rounded-[1.75rem] border border-dashed border-forest-900/20 p-6">
              <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-cream-200 font-display text-xl text-forest-900/50">?</span>
              <span>
                <span className="block font-display text-xl text-forest-900">
                  <T en="Head of school" hi="संस्था प्रधान" />
                </span>
                <FactText value={school.principal} className="mt-1" />
              </span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Teachers */}
      <section className="pb-24">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionIntro
              eyebrow={<T en="Our teachers" hi="हमारे शिक्षक" />}
              title={
                <T en={`${school.teachers.length} teachers, one staffroom.`} hi={`${school.teachers.length} शिक्षक, एक परिवार।`} />
              }
            />
          </div>
          <Stagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" stagger={0.04}>
            {school.teachers.map((t) => (
              <div key={t.name} className="flex h-full items-center gap-4 rounded-2xl bg-cream-50 p-4 ring-1 ring-forest-900/[0.06]">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-school-soft font-display text-base text-school">{initials(t.name)}</span>
                <span className="min-w-0">
                  <span className="block truncate font-semibold text-forest-900">{t.name}</span>
                  <span className="block text-[0.85rem] text-muted">
                    {t.qualification}
                    {t.role ? ` · ${t.role}` : ""}
                  </span>
                </span>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Part of AESRI */}
      <section>
        <div className="container-x grid gap-5 md:grid-cols-2">
          <Link href="/about" className="group rounded-[2rem] bg-cream-200/70 p-8 transition-colors hover:bg-cream-200 sm:p-10">
            <span className="flex items-center justify-between text-[0.75rem] font-bold uppercase tracking-[0.16em] text-muted">
              <T en="Our organisation" hi="हमारी संस्था" />
              <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </span>
            <span className="mt-10 block font-display text-[1.9rem] leading-tight text-forest-900">
              <T en="Part of Aryavart Educational and Social Research Institute" hi="आर्यवर्त शैक्षिक एवं सामाजिक अनुसंधान संस्थान का अंग" />
            </span>
          </Link>
          <Link href={`/schools/${sister.slug}`} className="group rounded-[2rem] bg-cream-200/70 p-8 transition-colors hover:bg-cream-200 sm:p-10">
            <span className="flex items-center justify-between text-[0.75rem] font-bold uppercase tracking-[0.16em] text-muted">
              <T en="Sister school" hi="सहयोगी विद्यालय" />
              <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </span>
            <span className="mt-10 block font-display text-[1.9rem] leading-tight text-forest-900">
              <T t={sister.name} />, <T t={sister.place} />
            </span>
          </Link>
        </div>
        <div className="container-x mt-10">
          <ArrowLink href={`${base}/disclosures`} className="text-school">
            <T en="Recognition and school information" hi="मान्यता एवं विद्यालय जानकारी" />
          </ArrowLink>
        </div>
      </section>
    </>
  );
}
