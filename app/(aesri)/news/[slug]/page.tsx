import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { T } from "@/components/i18n";
import { Reveal } from "@/components/motion/reveal";
import { Photo } from "@/components/ui/bits";
import { PageHero } from "@/components/ui/page-hero";
import { VideoCard } from "@/components/ui/video-card";
import { isClip } from "@/content/media";
import { getSchoolByKey } from "@/content/schools";
import { getStory, stories } from "@/content/stories";

export const dynamicParams = false;

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const story = getStory((await params).slug);
  if (!story) return {};
  return { title: story.title, description: story.summary };
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const story = getStory((await params).slug);
  if (!story) notFound();
  const school = story.school === "aesri" ? null : getSchoolByKey(story.school);
  const others = stories.filter((s) => s.slug !== story.slug).slice(0, 2);

  return (
    <>
      <PageHero
        crumbs={[
          { href: "/news", label: { en: "News & Events", hi: "समाचार एवं कार्यक्रम" } },
          { href: `/news/${story.slug}`, label: { en: story.kicker, hi: story.kicker } },
        ]}
        eyebrow={
          <>
            {story.kicker} · {school ? school.name.en : "AESRI"}
          </>
        }
        title={{ en: story.title, hi: story.title }}
        lead={story.summary}
      />

      <section className="pb-20">
        <div className="container-x grid gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            {isClip(story.media) ? (
              <VideoCard clip={story.media} className="mx-auto aspect-[9/14] w-full max-w-md" />
            ) : (
              <Photo img={story.media} className="aspect-[4/3] rounded-[2rem]" sizes="(min-width: 1024px) 45vw, 100vw" />
            )}
          </Reveal>
          <div>
            <div className="prose-aesri max-w-xl">
              {story.body.map((p, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p className={i === 0 ? "font-display text-[1.5rem] leading-snug text-forest-900" : undefined}>{p}</p>
                </Reveal>
              ))}
            </div>
            {story.gallery?.length ? (
              <div className="mt-14 grid grid-cols-2 gap-4">
                {story.gallery.map((m, i) => (
                  <Reveal key={i} delay={i * 0.06} y={40}>
                    {isClip(m) ? (
                      <VideoCard clip={m} className="aspect-[9/14] w-full" showCaption={false} />
                    ) : (
                      <figure>
                        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem]">
                          <Image src={m.src} alt={m.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" placeholder="blur" className="object-cover" />
                        </div>
                        {m.caption ? <figcaption className="mt-2 text-sm text-muted">{m.caption}</figcaption> : null}
                      </figure>
                    )}
                  </Reveal>
                ))}
              </div>
            ) : null}
            {school ? (
              <Link
                href={`/schools/${school.slug}`}
                className="group mt-14 flex items-center justify-between gap-6 rounded-[1.5rem] bg-cream-50 p-6 ring-1 ring-forest-900/[0.07] transition hover:ring-forest-900/20"
              >
                <span>
                  <span className="text-[0.72rem] font-bold uppercase tracking-[0.15em] text-muted">
                    <T en="From" hi="विद्यालय" />
                  </span>
                  <span className="mt-1 block font-display text-xl text-forest-900">
                    <T t={school.name} />, <T t={school.place} />
                  </span>
                </span>
                <ArrowUpRight className="h-5 w-5 text-forest-700 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section>
        <div className="container-x border-t border-forest-900/10 pt-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/news" className="inline-flex items-center gap-2 font-semibold text-forest-800">
              <ArrowLeft className="h-4 w-4" aria-hidden />
              <T en="All stories" hi="सभी कहानियाँ" />
            </Link>
            <div className="flex flex-wrap gap-3">
              {others.map((o) => (
                <Link key={o.slug} href={`/news/${o.slug}`} className="rounded-full bg-cream-50 px-4 py-2 text-sm font-semibold text-forest-900 ring-1 ring-forest-900/10 hover:ring-forest-900/30">
                  {o.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
