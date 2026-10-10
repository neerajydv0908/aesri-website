import type { Metadata } from "next";
import { CalendarDays, ClipboardList, Target, Users } from "lucide-react";
import { T } from "@/components/i18n";
import { ClipReveal, Parallax, Reveal, Stagger } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Photo, SectionIntro } from "@/components/ui/bits";
import { PageHero } from "@/components/ui/page-hero";
import { VideoCard } from "@/components/ui/video-card";
import { isClip } from "@/content/media";
import { commitments, initiatives } from "@/content/org";

export const metadata: Metadata = {
  title: "Social Initiatives",
  description: "AESRI's commitments in the villages it serves, and how documented initiatives are reported.",
};

export default function InitiativesPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: { en: "Home", hi: "मुख्य पृष्ठ" } },
          { href: "/social-initiatives", label: { en: "Social Initiatives", hi: "सामाजिक पहल" } },
        ]}
        eyebrow={<T en="Social initiatives" hi="सामाजिक पहल" />}
        title={{ en: "What we commit to, in the villages we serve.", hi: "जिन गाँवों की हम सेवा करते हैं, वहाँ हमारे संकल्प।" }}
        lead={
          <T
            en="We'd rather show you what already happens at our schools than make big claims. Here is what we commit to — and how we'll report new initiatives, with dates, partners and results."
            hi="बड़े दावों की बजाय हम वही दिखाना चाहते हैं जो हमारे विद्यालयों में पहले से होता है। ये हमारे संकल्प हैं — और नई पहलों की जानकारी हम तिथियों, सहयोगियों और परिणामों के साथ देंगे।"
          />
        }
      />

      <section className="pb-24">
        <div className="container-x space-y-24 sm:space-y-32">
          {commitments.map((c, i) => (
            <div key={c.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
              <div className={i % 2 ? "lg:order-2" : undefined}>
                <Parallax offset={30}>
                  <ClipReveal className="rounded-[2rem]" from={i % 2 ? "right" : "left"}>
                    {isClip(c.media) ? (
                      <VideoCard clip={c.media} className="mx-auto aspect-[4/5] w-full max-w-md" rounded="rounded-[2rem]" />
                    ) : (
                      <Photo img={c.media} className="aspect-[4/3] rounded-[2rem]" sizes="(min-width: 1024px) 45vw, 100vw" />
                    )}
                  </ClipReveal>
                </Parallax>
              </div>
              <Reveal>
                <span className="font-display text-sm text-ochre-600">0{i + 1}</span>
                <h2 className="text-h2 mt-4 text-forest-900">
                  <T en={c.title} hi={c.titleHi} />
                </h2>
                <p className="text-lead mt-6 text-muted">{c.body}</p>
                <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-sage-100 px-4 py-2 text-sm font-semibold text-forest-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-forest-600" aria-hidden />
                  {c.evidence}
                </p>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream-200/50 py-24 sm:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionIntro
            eyebrow={<T en="Documented initiatives" hi="दर्ज पहल" />}
            title={<T en="How we'll report them." hi="हम इनकी जानकारी कैसे देंगे।" />}
            lead={
              <T
                en="Every initiative we publish will carry the same four facts, so anyone can check what was done."
                hi="हम जो भी पहल प्रकाशित करेंगे, उसमें ये चार तथ्य होंगे, ताकि कोई भी जाँच सके कि क्या किया गया।"
              />
            }
          />
          <div>
            <Stagger className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: <Target className="h-5 w-5" />, t: "Objective", b: "What we set out to change, and for whom." },
                { icon: <CalendarDays className="h-5 w-5" />, t: "Dates and place", b: "When and where it happened — which school or village." },
                { icon: <Users className="h-5 w-5" />, t: "Partners", b: "Anyone we worked with, named with their permission." },
                { icon: <ClipboardList className="h-5 w-5" />, t: "Outcome", b: "What actually happened — including what didn't work." },
              ].map((x) => (
                <div key={x.t} className="h-full rounded-[1.5rem] bg-cream-50 p-6 ring-1 ring-forest-900/[0.07]">
                  <span className="text-forest-700" aria-hidden>
                    {x.icon}
                  </span>
                  <h3 className="mt-4 font-display text-xl text-forest-900">{x.t}</h3>
                  <p className="mt-2 text-[0.95rem] text-muted">{x.b}</p>
                </div>
              ))}
            </Stagger>
            {initiatives.length === 0 ? (
              <Reveal className="mt-6 rounded-[1.5rem] border border-dashed border-forest-900/20 p-6 text-muted">
                <T
                  en="No documented initiatives have been published yet. The first will appear here once it has been reviewed."
                  hi="अभी तक कोई दर्ज पहल प्रकाशित नहीं हुई है। समीक्षा के बाद पहली पहल यहाँ दिखाई देगी।"
                />
              </Reveal>
            ) : null}
          </div>
        </div>
      </section>

      <section className="pt-24">
        <div className="container-x">
          <Reveal className="flex flex-col items-start justify-between gap-8 rounded-[2rem] bg-forest-900 p-10 text-cream-50 sm:p-14 lg:flex-row lg:items-center">
            <p className="max-w-2xl font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-tight">
              <T en="Want to support a village school, or work with us on something new?" hi="गाँव के विद्यालय का सहयोग करना चाहते हैं, या हमारे साथ कुछ नया करना चाहते हैं?" />
            </p>
            <ButtonLink href="/contact" variant="light" size="lg">
              <T en="Talk to us" hi="हमसे बात करें" />
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
