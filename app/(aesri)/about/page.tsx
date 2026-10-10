import type { Metadata } from "next";
import Image from "next/image";
import { BookOpen, HeartHandshake, Microscope } from "lucide-react";
import { T } from "@/components/i18n";
import { Reveal, RevealWords, Stagger } from "@/components/motion/reveal";
import { StickyStory } from "@/components/motion/sticky-story";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { Eyebrow, SectionIntro } from "@/components/ui/bits";
import { PageHero } from "@/components/ui/page-hero";
import { clips, img } from "@/content/media";
import { citationQuote, milestone, site, values } from "@/content/site";

export const metadata: Metadata = {
  title: "About AESRI",
  description: "The story, values and approach of Aryavart Educational and Social Research Institute, the organisation behind Aryavart Public School and Aadharshila Public School.",
};

export default function AboutPage() {
  const m2000 = milestone("aryavart-founded");
  const m2013 = milestone("citation-2013");
  const m2017 = milestone("aadharshila-founded");
  const m2026 = milestone("platform-2026");
  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: { en: "Home", hi: "मुख्य पृष्ठ" } },
          { href: "/about", label: { en: "About", hi: "परिचय" } },
        ]}
        eyebrow={<T en="About AESRI" hi="एईएसआरआई परिचय" />}
        title={{ en: "Rooted in the villages of Bikaner.", hi: "बीकानेर के गाँवों से जुड़ी संस्था।" }}
        lead={<T t={site.mission} />}
      />

      {/* Three words in our name */}
      <section className="pb-24 sm:pb-32">
        <div className="container-x">
          <Stagger className="grid gap-5 md:grid-cols-3" stagger={0.1}>
            {[
              {
                icon: <BookOpen className="h-6 w-6" />,
                word: "Educational",
                hi: "शैक्षिक",
                body: "We run two English-medium schools — Aryavart Public School in Palana and Aadharshila Public School in Udairamsar — each with its own identity, staff and records.",
              },
              {
                icon: <HeartHandshake className="h-6 w-6" />,
                word: "Social",
                hi: "सामाजिक",
                body: "We keep good schooling close to home for village families, make room for every child, and welcome the community into our classrooms.",
              },
              {
                icon: <Microscope className="h-6 w-6" />,
                word: "Research",
                hi: "अनुसंधान",
                body: "We want to learn carefully from our own classrooms — with consent, privacy and honesty — and publish only what we can stand behind.",
              },
            ].map((x) => (
              <div key={x.word} className="flex h-full flex-col rounded-[2rem] bg-cream-50 p-8 ring-1 ring-forest-900/[0.07] sm:p-10">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-sage-100 text-forest-700" aria-hidden>
                  {x.icon}
                </span>
                <h2 className="mt-8 font-display text-[2.2rem] leading-none text-forest-900">
                  {x.word}
                  <span lang="hi" className="mt-2 block font-hindi text-xl text-forest-600">
                    {x.hi}
                  </span>
                </h2>
                <p className="mt-5 text-[1.02rem] leading-relaxed text-muted">{x.body}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="scroll-mt-24 bg-cream-200/50 py-24 sm:py-32">
        <div className="container-x">
          <SectionIntro
            eyebrow={<T en="Our story" hi="हमारी कहानी" />}
            title={
              <>
                <span data-l="en">
                  <RevealWords text="A village school in 2000. A decade of trust. Then a foundation stone." />
                </span>
                <span data-l="hi" lang="hi">
                  <RevealWords text="2000 में गाँव का एक विद्यालय। एक दशक का भरोसा। फिर एक आधारशिला।" />
                </span>
              </>
            }
          />
          <div className="mt-8">
            <StickyStory
              steps={[
                {
                  kicker: m2000.year,
                  title: m2000.title,
                  body: (
                    <p>
                      Aryavart Public School was founded in the village of Palana, Bikaner, on 25 May 2000. Today it teaches from LKG to Class XII, with the Arts stream in Classes XI and XII — and learning still steps outside:
                      geography practicals on the school ground, and examinations under the open winter sky.
                    </p>
                  ),
                  media: clips.surveyGirls,
                },
                {
                  kicker: m2013.year,
                  title: m2013.title,
                  body: (
                    <>
                      <p>{m2013.body}</p>
                      <blockquote className="mt-6 border-l-2 border-ochre-500 pl-5">
                        <p lang="hi" className="font-hindi text-xl text-forest-900">
                          “{citationQuote.hi}”
                        </p>
                        <p className="mt-2 font-display italic text-forest-700">“{citationQuote.en}”</p>
                      </blockquote>
                    </>
                  ),
                  media: img.aesri.citation,
                },
                { kicker: m2017.year, title: m2017.title, body: <p>{m2017.body}</p>, media: img.aadharshila.campus },
                { kicker: m2026.year, title: m2026.title, body: <p>{m2026.body}</p>, media: img.aryavart.campusWide },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 sm:py-32">
        <div className="container-x">
          <SectionIntro
            eyebrow={<T en="What we believe" hi="हमारी मान्यताएँ" />}
            title={<T en="Four ideas we hold to." hi="चार विचार जिन पर हम चलते हैं।" />}
          />
          <Stagger className="mt-14 grid gap-px overflow-hidden rounded-[2rem] bg-forest-900/10 sm:grid-cols-2" itemClassName="bg-cream-100">
            {values.map((v, i) => (
              <div key={v.title} className="h-full p-8 sm:p-12">
                <span className="font-display text-sm text-ochre-600">0{i + 1}</span>
                <h3 className="mt-6 font-display text-[clamp(1.7rem,2.4vw,2.2rem)] leading-tight text-forest-900">
                  <T en={v.title} hi={v.titleHi} />
                </h3>
                <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-muted">{v.body}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Founders */}
      <section className="pb-24">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionIntro eyebrow={<T en="Founders" hi="संस्थापक" />} title={<T en="The people who began it." hi="जिन्होंने शुरुआत की।" />} />
            <ArrowLink href="/governance" className="text-forest-800">
              <T en="Governance" hi="प्रशासन" />
            </ArrowLink>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {site.founders.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.1} className="flex flex-col gap-6 rounded-[2rem] bg-cream-50 p-8 ring-1 ring-forest-900/[0.07] sm:flex-row sm:items-center sm:p-10">
                <span className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full ring-8 ring-sage-100">
                  <Image src={f.photo.src} alt={f.photo.alt} fill sizes="128px" className="object-cover grayscale transition duration-700 hover:grayscale-0" />
                </span>
                <div>
                  <h3 className="font-display text-[1.8rem] leading-tight text-forest-900">{f.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-forest-600">
                    <T en={f.role} hi={f.roleHi} />
                  </p>
                  <p className="mt-4 text-[0.98rem] leading-relaxed text-muted">{f.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container-x">
          <Reveal className="flex flex-col items-start justify-between gap-8 rounded-[2rem] bg-forest-900 p-10 text-cream-50 sm:p-14 lg:flex-row lg:items-center">
            <div>
              <Eyebrow tone="light">
                <T en="Next" hi="आगे" />
              </Eyebrow>
              <p className="mt-4 max-w-xl font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-tight">
                <T en="Meet the two schools that carry this work every day." hi="उन दो विद्यालयों से मिलें जो हर दिन यह काम करते हैं।" />
              </p>
            </div>
            <ButtonLink href="/schools" variant="light" size="lg">
              <T en="Our schools" hi="हमारे विद्यालय" />
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
