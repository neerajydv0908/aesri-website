import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarPlus } from "lucide-react";
import { T } from "@/components/i18n";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { SectionIntro } from "@/components/ui/bits";
import { PageHero } from "@/components/ui/page-hero";
import { VideoCard } from "@/components/ui/video-card";
import { isClip } from "@/content/media";
import { formatDate } from "@/content/notices";
import { getSchoolByKey } from "@/content/schools";
import { milestones } from "@/content/site";
import { stories } from "@/content/stories";
import type { Story } from "@/content/types";

export const metadata: Metadata = {
  title: "News and Events",
  description: "Stories from AESRI's schools in Palana and Udairamsar, milestones and upcoming events.",
};

function schoolLabel(s: Story["school"]) {
  return s === "aesri" ? "AESRI" : getSchoolByKey(s).short.en;
}

export default function NewsPage() {
  const [featured, ...rest] = stories;
  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: { en: "Home", hi: "मुख्य पृष्ठ" } },
          { href: "/news", label: { en: "News & Events", hi: "समाचार एवं कार्यक्रम" } },
        ]}
        eyebrow={<T en="News & events" hi="समाचार एवं कार्यक्रम" />}
        title={{ en: "Stories from our campuses.", hi: "हमारे विद्यालयों की कहानियाँ।" }}
        lead={
          <T
            en="What our students and teachers have been up to — told from what we saw, not what we'd like to claim."
            hi="हमारे विद्यार्थी और शिक्षक क्या कर रहे हैं — वही, जो हमने देखा।"
          />
        }
      />

      {/* Featured */}
      <section className="pb-20">
        <div className="container-x">
          <Reveal className="group grid overflow-hidden rounded-[2rem] bg-cream-50 ring-1 ring-forest-900/[0.07] lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[26rem] bg-forest-900">
              {isClip(featured.media) ? (
                <VideoCard clip={featured.media} rounded="rounded-none" className="absolute inset-0 h-full w-full" showCaption={false} />
              ) : (
                <Image src={featured.media.src} alt={featured.media.alt} fill sizes="45vw" placeholder="blur" className="object-cover" />
              )}
            </div>
            <div className="relative flex flex-col justify-center p-8 sm:p-14">
              <p className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-forest-600">
                {featured.kicker} · {schoolLabel(featured.school)}
              </p>
              <h2 className="text-h2 mt-5 text-forest-900">
                <Link href={`/news/${featured.slug}`} className="after:absolute after:inset-0">
                  {featured.title}
                </Link>
              </h2>
              <p className="text-lead mt-5 text-muted">{featured.summary}</p>
              <span className="mt-8 inline-flex items-center gap-2 font-semibold text-forest-800">
                <T en="Read the story" hi="कहानी पढ़ें" />
                <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-24">
        <div className="container-x">
          <Stagger className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {rest.map((s) => (
              <article key={s.slug} className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-cream-50 ring-1 ring-forest-900/[0.07]">
                <div className="relative aspect-[4/5] overflow-hidden bg-forest-900">
                  <Image
                    src={isClip(s.media) ? s.media.poster : s.media.src}
                    alt={isClip(s.media) ? s.media.alt.replace(/^Video: /, "") : s.media.alt}
                    fill
                    sizes="(min-width: 1280px) 22vw, (min-width: 768px) 45vw, 100vw"
                    className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                  />
                  {isClip(s.media) ? (
                    <span className="absolute left-4 top-4 rounded-full bg-cream-50/90 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-forest-900">
                      <T en="Video" hi="वीडियो" />
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[0.72rem] font-bold uppercase tracking-[0.15em] text-forest-600">
                    {s.kicker} · {schoolLabel(s.school)}
                  </p>
                  <h3 className="mt-3 font-display text-[1.4rem] leading-tight text-forest-900">
                    <Link href={`/news/${s.slug}`} className="after:absolute after:inset-0">
                      {s.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-[0.95rem] text-muted">{s.summary}</p>
                </div>
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Milestones + events */}
      <section className="bg-cream-200/50 py-24 sm:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-2">
          <div>
            <SectionIntro eyebrow={<T en="Milestones" hi="उपलब्धियाँ" />} title={<T en="Dates that matter." hi="महत्वपूर्ण तिथियाँ।" />} />
            <ol className="mt-12 space-y-8 border-l border-forest-900/15 pl-8">
              {milestones.map((m) => (
                <Reveal as="li" key={m.id} className="relative">
                  <span className="absolute -left-[2.35rem] top-1.5 h-3 w-3 rounded-full bg-ochre-500 ring-4 ring-cream-200" aria-hidden />
                  <p className="text-sm font-semibold text-forest-600">{m.date ? formatDate(m.date) : m.when ?? m.year}</p>
                  <h3 className="mt-1 font-display text-[1.5rem] leading-tight text-forest-900">{m.title}</h3>
                  <p className="mt-2 text-[0.98rem] leading-relaxed text-muted">{m.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
          <div>
            <SectionIntro eyebrow={<T en="Events" hi="कार्यक्रम" />} title={<T en="Coming up." hi="आगामी कार्यक्रम।" />} />
            <Reveal className="mt-12 flex flex-col items-start gap-4 rounded-[1.75rem] border border-dashed border-forest-900/20 p-8">
              <CalendarPlus className="h-8 w-8 text-forest-900/40" aria-hidden />
              <p className="font-display text-[1.5rem] leading-snug text-forest-900">
                <T en="No upcoming events are listed right now." hi="अभी कोई आगामी कार्यक्रम सूचीबद्ध नहीं है।" />
              </p>
              <p className="text-muted">
                <T en="School events and holidays are posted on each school's Notices & calendar page." hi="विद्यालय के कार्यक्रम और अवकाश हर विद्यालय के सूचनाएँ एवं कैलेंडर पृष्ठ पर प्रकाशित होते हैं।" />
              </p>
              <div className="mt-2 flex flex-wrap gap-3">
                <Link href="/schools/aryavart-public-school/notices" className="rounded-full bg-cream-50 px-4 py-2 text-sm font-semibold text-forest-900 ring-1 ring-forest-900/10 hover:ring-forest-900/30">
                  Aryavart <T en="notices" hi="सूचनाएँ" />
                </Link>
                <Link href="/schools/aadharshila-public-school/notices" className="rounded-full bg-cream-50 px-4 py-2 text-sm font-semibold text-forest-900 ring-1 ring-forest-900/10 hover:ring-forest-900/30">
                  Aadharshila <T en="notices" hi="सूचनाएँ" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
