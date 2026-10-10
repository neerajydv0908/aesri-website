import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { T } from "@/components/i18n";
import { Reveal } from "@/components/motion/reveal";
import { Polaroids } from "@/components/school/polaroids";
import { FacilityIcon, Photo, SectionIntro } from "@/components/ui/bits";
import { PageHero } from "@/components/ui/page-hero";
import { VideoCard } from "@/components/ui/video-card";
import { isClip } from "@/content/media";
import { getSchool } from "@/content/schools";
import { stories } from "@/content/stories";
import type { Img } from "@/content/types";
import { loadSchool, type SchoolPageProps } from "@/lib/school-page";

export async function generateMetadata({ params }: SchoolPageProps): Promise<Metadata> {
  const s = getSchool((await params).school);
  return { title: "Facilities and activities", description: s ? `Facilities, transport and school life at ${s.name.en}.` : undefined };
}

export default async function FacilitiesPage({ params }: SchoolPageProps) {
  const school = await loadSchool(params);
  const base = `/schools/${school.slug}`;
  const related = stories.filter((s) => s.school === school.key);
  const photos = school.gallery.filter((m): m is Img => !isClip(m));
  const videos = school.gallery.filter(isClip);

  return (
    <>
      <PageHero
        offsetHeader={false}
        tone="school"
        crumbs={[
          { href: base, label: school.name },
          { href: `${base}/facilities`, label: { en: "Facilities & activities", hi: "सुविधाएँ एवं गतिविधियाँ" } },
        ]}
        eyebrow={<T en="Facilities & activities" hi="सुविधाएँ एवं गतिविधियाँ" />}
        title={{ en: "Where learning happens", hi: "जहाँ सीखना होता है" }}
        lead={
          <T
            en="The spaces, services and everyday rituals that make up a school day — and a few of the moments in between."
            hi="वे स्थान, सुविधाएँ और रोज़ की आदतें जिनसे विद्यालय का दिन बनता है — और बीच के कुछ पल।"
          />
        }
      />

      <section className="pb-24">
        <div className={`container-x grid gap-5 md:grid-cols-2 ${school.facilities.length % 3 === 0 ? "xl:grid-cols-3" : "xl:grid-cols-4"}`}>
          {school.facilities.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.08} className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-cream-50 ring-1 ring-forest-900/[0.07]">
              {f.image ? (
                <Photo img={f.image} className="aspect-[16/10]" imgClassName="transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]" sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw" />
              ) : (
                <div className="jaali grid aspect-[16/10] place-items-center bg-school-soft">
                  <FacilityIcon name={f.icon} className="h-14 w-14 text-school" />
                </div>
              )}
              <div className="flex flex-1 flex-col p-7">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-school-soft text-school">
                  <FacilityIcon name={f.icon} className="h-5 w-5" />
                </span>
                <h2 className="mt-4 font-display text-[1.5rem] leading-tight text-forest-900">
                  <T en={f.title} hi={f.titleHi} />
                </h2>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">{f.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-cream-200/50 py-24 sm:py-32">
        <div className="container-x">
          <SectionIntro eyebrow={<T en="Activities" hi="गतिविधियाँ" />} title={<T en="Moments from the year." hi="वर्ष भर के कुछ पल।" />} />
          {videos.length ? (
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((c, i) => (
                <Reveal key={c.video} delay={i * 0.08} y={50}>
                  <VideoCard clip={c} className="aspect-[9/14] w-full" />
                </Reveal>
              ))}
            </div>
          ) : null}
          {photos.length ? (
            <div className="mt-14">
              <Polaroids items={photos} />
            </div>
          ) : null}
        </div>
      </section>

      {related.length ? (
        <section className="pt-24">
          <div className="container-x">
            <SectionIntro eyebrow={<T en="Stories" hi="कहानियाँ" />} title={<T en="Read more from our campus." hi="हमारे विद्यालय से और पढ़ें।" />} />
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {related.map((s) => (
                <Link key={s.slug} href={`/news/${s.slug}`} className="group flex items-center justify-between gap-6 rounded-[1.5rem] bg-cream-50 p-7 ring-1 ring-forest-900/[0.07] transition-shadow duration-500 hover:shadow-[0_24px_50px_-34px_rgba(19,39,28,0.5)]">
                  <span>
                    <span className="text-[0.72rem] font-bold uppercase tracking-[0.15em] text-school">{s.kicker}</span>
                    <span className="mt-2 block font-display text-[1.45rem] leading-tight text-forest-900">{s.title}</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-forest-700 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
