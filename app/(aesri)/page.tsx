import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, BookOpenText, Check, LogIn, Sprout, Users } from "lucide-react";
import { DuneLines, SchoolCrest } from "@/components/brand/emblems";
import { HeroMedia } from "@/components/home/hero-media";
import { SchoolCardShell } from "@/components/home/school-card";
import { StackingCards } from "@/components/home/stacking-cards";
import { Bi, DualLabel, T } from "@/components/i18n";
import { PortalLoginLink } from "@/components/portal-link";
import { VelocityMarquee } from "@/components/motion/marquee";
import { HorizontalGallery } from "@/components/motion/horizontal-gallery";
import { ClipReveal, Counter, Magnetic, Parallax, Reveal, RevealWords, ScrollText, Stagger } from "@/components/motion/reveal";
import { RiseText } from "@/components/motion/rise-text";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { Eyebrow, FactBi, FactText, Photo, SectionIntro } from "@/components/ui/bits";
import { VideoCard } from "@/components/ui/video-card";
import { clips, img, isClip } from "@/content/media";
import { citationQuote, site, values } from "@/content/site";
import { schools, uniqueTeacherCount } from "@/content/schools";
import { stories } from "@/content/stories";
import { isPending } from "@/content/types";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ribbon />
      <Statement />
      <SchoolsShowcase />
      <HowItWorks />
      <Approach />
      <CampusLife />
      <Legacy />
      <Happenings />
      <AdmissionsBand />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Hero                                                             */
/* ------------------------------------------------------------------ */
function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-20 pt-32 sm:pt-36 lg:min-h-[100svh] lg:pb-24 lg:pt-40">
      <div aria-hidden className="absolute -right-40 -top-40 -z-10 h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(closest-side,rgba(168,191,165,0.45),transparent)]" />
      <div aria-hidden className="absolute -left-60 top-1/3 -z-10 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(212,192,156,0.35),transparent)]" />
      <DuneLines className="absolute inset-x-0 bottom-0 -z-10 h-40 w-full text-forest-700" />

      <div className="container-x grid items-center gap-16 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10">
        <div className="intro-aware">
          <p className="eyebrow fade-up text-forest-600" style={{ "--d": "0ms" } as CSSProperties}>
            <span className="h-px w-8 bg-forest-600/50" aria-hidden />
            <T en={site.name} hi={site.nameHi} />
          </p>

          <h1 className="text-display-1 mt-7 text-forest-900">
            <span data-l="en">
              <RiseText text="Education with deep roots." emphasis={["roots."]} />
            </span>
            <span data-l="hi" lang="hi">
              <RiseText text="जड़ों से जुड़ी शिक्षा।" emphasis={["शिक्षा।"]} />
            </span>
          </h1>

          <div className="fade-up mt-8 max-w-[36rem]" style={{ "--d": "420ms" } as CSSProperties}>
            <Bi t={site.mission} as="p" className="text-lead text-muted" />
          </div>

          <div className="fade-up mt-10 flex flex-wrap items-center gap-3" style={{ "--d": "560ms" } as CSSProperties}>
            <Magnetic>
              <ButtonLink href="/schools" size="lg">
                <T en="Explore our schools" hi="हमारे विद्यालय देखें" />
              </ButtonLink>
            </Magnetic>
            <PortalLoginLink className="inline-flex h-14 items-center gap-2.5 rounded-full border border-forest-900/20 px-6 font-semibold text-forest-900 transition-colors duration-500 hover:border-forest-900/60 hover:bg-forest-900/[0.04]">
              <LogIn className="h-5 w-5" aria-hidden />
              <T en="Portal login" hi="पोर्टल लॉगिन" />
            </PortalLoginLink>
          </div>

          <dl className="fade-up mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-forest-900/10 pt-6" style={{ "--d": "700ms" } as CSSProperties}>
            <HeroStat value={{ en: "2", hi: "2" }} label={{ en: "schools", hi: "विद्यालय" }} />
            <HeroStat value={{ en: "Bikaner", hi: "बीकानेर" }} label={{ en: "district, Rajasthan", hi: "ज़िला, राजस्थान" }} />
            <HeroStat value={{ en: "English", hi: "अंग्रेज़ी" }} label={{ en: "medium at both schools", hi: "माध्यम, दोनों विद्यालयों में" }} />
          </dl>
        </div>

        <HeroMedia />
      </div>

      <div className="fade-up intro-aware absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block" style={{ "--d": "900ms" } as CSSProperties}>
        <a href="#statement" className="flex flex-col items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.25em] text-forest-700/70">
          <T en="Scroll" hi="आगे देखें" />
          <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden />
        </a>
      </div>
    </section>
  );
}

function HeroStat({ value, label }: { value: { en: string; hi: string }; label: { en: string; hi: string } }) {
  return (
    <div>
      <dt className="sr-only">
        <T t={label} />
      </dt>
      <dd>
        <span className="block font-display text-3xl text-forest-900">
          <T t={value} />
        </span>
        <span className="mt-1 block text-[0.82rem] text-muted">
          <T t={label} />
        </span>
      </dd>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Ribbon of values (EN + HI), speeding up with scroll              */
/* ------------------------------------------------------------------ */
function Ribbon() {
  const words = [
    ["Curiosity", "जिज्ञासा"],
    ["Discipline", "अनुशासन"],
    ["Values", "संस्कार"],
    ["Field learning", "करके सीखना"],
    ["Community", "समुदाय"],
    ["Care", "देखभाल"],
  ];
  return (
    <section aria-label="Our values" className="border-y border-forest-900/10 bg-cream-200/60 py-6">
      <VelocityMarquee baseVelocity={-1.4}>
        {words.map(([en, hi]) => (
          <span key={en} className="flex items-center">
            <span className="px-6 font-display text-[clamp(1.8rem,3.4vw,3rem)] text-forest-900">{en}</span>
            <span className="font-hindi text-[clamp(1.4rem,2.6vw,2.3rem)] text-forest-600" lang="hi">
              {hi}
            </span>
            <span className="px-6 text-ochre-500" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </VelocityMarquee>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Statement + numbers                                              */
/* ------------------------------------------------------------------ */
function Statement() {
  const teachers = uniqueTeacherCount();
  return (
    <section id="statement" className="py-28 sm:py-36">
      <div className="container-x">
        <Eyebrow>
          <T en="Who we are" hi="हम कौन हैं" />
        </Eyebrow>
        <div className="mt-8">
          <div data-l="en">
            <ScrollText
              className="max-w-[58rem] font-display text-[clamp(1.7rem,3.3vw,3.1rem)] leading-[1.18] tracking-[-0.02em] text-forest-900"
              text="AESRI is the family of institutions behind Aryavart Public School in Palana and Aadharshila Public School in Udairamsar — two village schools in Bikaner district with one shared promise: an education that is rigorous, rooted and kind."
            />
          </div>
          <div data-l="hi" lang="hi">
            <ScrollText
              className="max-w-[58rem] font-hindi text-[clamp(1.6rem,3vw,2.8rem)] leading-[1.45] text-forest-900"
              text="एईएसआरआई पलाना के आर्यवर्त पब्लिक स्कूल और उदयरामसर के आधारशिला पब्लिक स्कूल की संचालक संस्था है — बीकानेर ज़िले के गाँवों में दो विद्यालय, और एक साझा संकल्प: ऐसी शिक्षा जो गहन हो, जड़ों से जुड़ी हो और स्नेहपूर्ण हो।"
            />
          </div>
        </div>

        <Stagger className="mt-20 grid gap-px overflow-hidden rounded-[1.75rem] bg-forest-900/10 sm:grid-cols-2 lg:grid-cols-4" itemClassName="bg-cream-100">
          <Stat big={<Counter to={2} />} label={{ en: "schools, in Palana and Udairamsar", hi: "विद्यालय, पलाना और उदयरामसर में" }} />
          <Stat big={<Counter to={teachers} />} label={{ en: "teachers on our two staff lists", hi: "शिक्षक, दोनों विद्यालयों में" }} />
          <Stat big="2000" label={{ en: "Aryavart founded, 25 May · Aadharshila followed in 2017", hi: "आर्यवर्त की स्थापना, 25 मई · आधारशिला 2017 में" }} />
          <Stat
            big={
              <>
                <Counter to={10} />
                <span className="text-[0.55em]"> yrs</span>
              </>
            }
            label={{ en: "of 100% board results, recognised in 2013", hi: "लगातार 100% बोर्ड परिणाम (2013 में सम्मानित)" }}
          />
        </Stagger>
        <p className="mt-4 text-[0.8rem] text-muted">
          <T
            en="Board results as cited by Karuna International Sanstha, Bikaner, in its 2013 felicitation of Shri Deepak Yadav."
            hi="बोर्ड परिणाम — करुणा इंटरनेशनल संस्था, बीकानेर द्वारा 2013 में श्री दीपक यादव के अभिनंदन पत्र के अनुसार।"
          />
        </p>
      </div>
    </section>
  );
}

function Stat({ big, label }: { big: React.ReactNode; label: { en: string; hi: string } }) {
  return (
    <div className="flex h-full flex-col justify-between gap-10 p-8">
      <span className="font-display text-[clamp(3rem,5vw,4.5rem)] leading-none tracking-[-0.04em] text-forest-800">{big}</span>
      <span className="max-w-[16rem] text-[0.95rem] text-muted">
        <T t={label} />
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Two schools, equal billing                                       */
/* ------------------------------------------------------------------ */
function SchoolsShowcase() {
  return (
    <section className="pb-28 sm:pb-36">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionIntro
            eyebrow={<T en="Our schools" hi="हमारे विद्यालय" />}
            title={
              <>
                <span data-l="en">
                  <RevealWords text="Two schools. Two identities. One family." />
                </span>
                <span data-l="hi" lang="hi">
                  <RevealWords text="दो विद्यालय। दो पहचान। एक परिवार।" />
                </span>
              </>
            }
            lead={
              <T
                en="Each school is a complete website of its own — admissions, fees, notices and contact — so families can go straight to what they need."
                hi="हर विद्यालय की अपनी पूरी वेबसाइट है — प्रवेश, फ़ीस, सूचनाएँ और संपर्क — ताकि परिवार सीधे अपनी ज़रूरत की जानकारी तक पहुँच सकें।"
              />
            }
          />
          <Reveal>
            <ArrowLink href="/schools" className="text-forest-800">
              <T en="Compare both schools" hi="दोनों विद्यालयों की तुलना" />
            </ArrowLink>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {schools.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.12} y={60}>
              <SchoolCardShell href={`/schools/${s.slug}`} image={s.card.src} alt={s.card.alt}>
                <div className="flex flex-1 flex-col p-7 sm:p-9">
                  <div className="flex items-center gap-3 text-forest-700">
                    <SchoolCrest school={s.key} className="h-9 w-9" />
                    <span className="text-[0.85rem] font-semibold uppercase tracking-[0.14em]">
                      <T t={s.place} />
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-[clamp(2rem,3.2vw,2.75rem)] leading-[1.02] text-forest-900">
                    <Link href={`/schools/${s.slug}`} className="link-underline">
                      <T t={s.name} />
                    </Link>
                  </h3>
                  <p className="mt-3 text-lg text-muted">
                    <T t={s.tagline} />
                  </p>
                  <dl className="mt-7 grid grid-cols-2 gap-4 border-y border-forest-900/10 py-5 text-sm sm:grid-cols-3">
                    <div>
                      <dt className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-muted">
                        <T en="Classes" hi="कक्षाएँ" />
                      </dt>
                      <dd className="mt-1.5 font-semibold text-forest-900">
                        <FactText value={s.classesShort} />
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-muted">
                        <T en="Medium" hi="माध्यम" />
                      </dt>
                      <dd className="mt-1.5 font-semibold text-forest-900">
                        <FactBi value={s.medium} />
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-muted">
                        <T en="Founded" hi="स्थापना" />
                      </dt>
                      <dd className="mt-1.5 font-semibold text-forest-900">{isPending(s.established) ? <FactText value={s.established} /> : s.established.year}</dd>
                    </div>
                  </dl>
                  <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <ButtonLink href={`/schools/${s.slug}`} size="md">
                      <T en="Visit school" hi="विद्यालय देखें" />
                    </ButtonLink>
                    <ArrowLink href={`/schools/${s.slug}/admissions`} className="text-forest-800">
                      <T en="Admissions" hi="प्रवेश" />
                    </ArrowLink>
                    <ArrowLink href={`/schools/${s.slug}/contact`} className="text-forest-800">
                      <T en="Contact" hi="संपर्क" />
                    </ArrowLink>
                  </div>
                </div>
              </SchoolCardShell>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 5. How AESRI works — shared vs separate                             */
/* ------------------------------------------------------------------ */
function HowItWorks() {
  const shared = [
    { en: "Educational philosophy and values", hi: "शैक्षिक दर्शन एवं मूल्य" },
    { en: "Organisation-wide policies", hi: "संस्था स्तरीय नीतियाँ" },
    { en: "Website, design and technology", hi: "वेबसाइट, डिज़ाइन एवं तकनीक" },
    { en: "Careers and recruitment", hi: "करियर एवं भर्ती" },
    { en: "One secure Campus Portal", hi: "एक सुरक्षित कैंपस पोर्टल" },
  ];
  const separate = [
    { en: "Name, identity and recognition", hi: "नाम, पहचान एवं मान्यता" },
    { en: "Classes, subjects and admissions", hi: "कक्षाएँ, विषय एवं प्रवेश" },
    { en: "Approved fees and receipts", hi: "स्वीकृत फ़ीस एवं रसीदें" },
    { en: "Notices and calendar", hi: "सूचनाएँ एवं कैलेंडर" },
    { en: "Student records and staff", hi: "विद्यार्थी अभिलेख एवं स्टाफ़" },
  ];
  return (
    <section className="dark-surface jaali-light relative overflow-hidden rounded-[2.5rem] bg-forest-900 py-28 text-cream-100 sm:mx-4 sm:rounded-[3rem] sm:py-36">
      <div className="container-x">
        <SectionIntro
          tone="light"
          eyebrow={<T en="How AESRI works" hi="एईएसआरआई कैसे काम करता है" />}
          title={
            <>
              <span data-l="en">
                <RevealWords text="One organisation, two school identities." />
              </span>
              <span data-l="hi" lang="hi">
                <RevealWords text="एक संस्था, दो विद्यालयों की अलग पहचान।" />
              </span>
            </>
          }
          lead={
            <T
              en="AESRI provides the shared foundations. Each school keeps what makes it itself — and its records stay its own, visible only to the people responsible for them."
              hi="एईएसआरआई साझा आधार देता है। हर विद्यालय अपनी पहचान बनाए रखता है — और उसके अभिलेख केवल ज़िम्मेदार व्यक्तियों को ही दिखते हैं।"
            />
          }
        />

        <div className="mt-20 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
          <Reveal className="rounded-[1.75rem] border border-cream-50/10 bg-cream-50/[0.04] p-8 sm:p-10">
            <div className="flex items-center gap-3 text-sage-200">
              <Users className="h-5 w-5" aria-hidden />
              <h3 className="font-sans text-[0.8rem] font-bold uppercase tracking-[0.16em]">
                <T en="Shared across AESRI" hi="एईएसआरआई में साझा" />
              </h3>
            </div>
            <ul className="mt-8 space-y-4">
              {shared.map((x) => (
                <li key={x.en} className="flex items-start gap-3 text-lg text-cream-50">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-sage-300" aria-hidden />
                  <T t={x} />
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="flex items-center justify-center py-4 lg:px-6">
            <div className="relative flex flex-col items-center gap-4">
              <span className="grid h-20 w-20 place-items-center rounded-full bg-cream-50 font-display text-lg text-forest-900">AESRI</span>
              <span className="h-10 w-px bg-cream-50/20" aria-hidden />
              <div className="flex gap-3">
                {schools.map((s) => (
                  <Link key={s.slug} href={`/schools/${s.slug}`} className="flex flex-col items-center gap-2 rounded-2xl border border-cream-50/15 px-4 py-3 text-center transition-colors hover:border-cream-50/40">
                    <SchoolCrest school={s.key} className="h-8 w-8 text-sage-200" />
                    <span className="text-sm font-semibold text-cream-50">
                      <T t={s.short} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="rounded-[1.75rem] border border-cream-50/10 bg-cream-50/[0.04] p-8 sm:p-10">
            <div className="flex items-center gap-3 text-sage-200">
              <Sprout className="h-5 w-5" aria-hidden />
              <h3 className="font-sans text-[0.8rem] font-bold uppercase tracking-[0.16em]">
                <T en="Kept by each school" hi="हर विद्यालय का अपना" />
              </h3>
            </div>
            <ul className="mt-8 space-y-4">
              {separate.map((x) => (
                <li key={x.en} className="flex items-start gap-3 text-lg text-cream-50">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-ochre-400" aria-hidden />
                  <T t={x} />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="mt-14 flex justify-center">
          <ButtonLink href="/governance" variant="outline-light">
            <T en="Governance & accountability" hi="प्रशासन एवं जवाबदेही" />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Approach — stacking cards                                        */
/* ------------------------------------------------------------------ */
function Approach() {
  const media = [clips.surveyBoys, img.aadharshila.nurseryPlay, img.aadharshila.nurseryClass, clips.elder];
  return (
    <section className="py-28 sm:py-36">
      <div className="container-x grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionIntro
            eyebrow={<T en="Our approach" hi="हमारा दृष्टिकोण" />}
            title={
              <>
                <span data-l="en">
                  <RevealWords text="How we like children to learn." />
                </span>
                <span data-l="hi" lang="hi">
                  <RevealWords text="हम बच्चों को कैसे सिखाना चाहते हैं।" />
                </span>
              </>
            }
            lead={
              <T
                en="Four ideas run through both of our schools — from the nursery play room to the geography practical."
                hi="चार विचार हमारे दोनों विद्यालयों में दिखते हैं — नर्सरी के खेल कक्ष से भूगोल के प्रायोगिक कार्य तक।"
              />
            }
          />
          <Reveal className="mt-10">
            <ArrowLink href="/about" className="text-forest-800">
              <T en="More about AESRI" hi="एईएसआरआई के बारे में और" />
            </ArrowLink>
          </Reveal>
        </div>

        <StackingCards
          items={values.map((v, i) => {
            const m = media[i];
            return (
              <article key={v.title} className="grid overflow-hidden rounded-[2rem] bg-cream-50 shadow-[0_30px_60px_-40px_rgba(19,39,28,0.5)] ring-1 ring-forest-900/[0.07] sm:grid-cols-[1.1fr_0.9fr]">
                <div className="flex flex-col justify-between gap-10 p-8 sm:p-10">
                  <span className="font-display text-sm text-ochre-600">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-[clamp(1.7rem,2.6vw,2.4rem)] leading-[1.05] text-forest-900">
                      <T en={v.title} hi={v.titleHi} />
                    </h3>
                    <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">{v.body}</p>
                  </div>
                </div>
                <div className="relative min-h-[16rem] sm:min-h-[22rem]">
                  {isClip(m) ? (
                    <VideoCard clip={m} rounded="rounded-none" className="absolute inset-0 h-full w-full" showCaption={false} />
                  ) : (
                    <Photo img={m} className="absolute inset-0" sizes="(min-width: 1024px) 26vw, 100vw" />
                  )}
                </div>
              </article>
            );
          })}
        />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 7. Campus life — pinned horizontal gallery                          */
/* ------------------------------------------------------------------ */
function CampusLife() {
  const items = [
    { m: clips.surveyGirls, school: "Aryavart" },
    { m: img.aadharshila.nurseryPlay, school: "Aadharshila" },
    { m: clips.exam, school: "Aryavart" },
    { m: img.aadharshila.janmashtami, school: "Aadharshila" },
    { m: clips.elder, school: "AESRI" },
    { m: img.aadharshila.nurseryClass, school: "Aadharshila" },
    { m: clips.surveyBoys, school: "Aryavart" },
    { m: clips.prize, school: "AESRI" },
    { m: img.aadharshila.lunch, school: "Aadharshila" },
  ];
  return (
    <HorizontalGallery
      className="bg-cream-200/50"
      intro={
        <div>
          <Eyebrow>
            <T en="Campus life" hi="विद्यालय जीवन" />
          </Eyebrow>
          <h2 className="text-h2 mt-5 text-forest-900">
            <T en="A year in Palana and Udairamsar." hi="पलाना और उदयरामसर का एक वर्ष।" />
          </h2>
          <p className="text-lead mt-6 max-w-md text-muted">
            <T
              en="Surveys on the sand, exams in the sun, Janmashtami in the nursery. Moments our teachers captured on their phones."
              hi="रेत पर सर्वेक्षण, धूप में परीक्षा, नर्सरी में जन्माष्टमी — हमारे शिक्षकों द्वारा सहेजे गए पल।"
            />
          </p>
          <div className="mt-8">
            <ArrowLink href="/news" className="text-forest-800">
              <T en="Stories from our campuses" hi="हमारे विद्यालयों की कहानियाँ" />
            </ArrowLink>
          </div>
        </div>
      }
    >
      {items.map(({ m, school }, i) => (
        <figure key={i} className="w-[72vw] shrink-0 snap-start sm:w-[20rem] lg:w-[19rem] xl:w-[21rem]">
          {isClip(m) ? (
            <VideoCard clip={m} className="aspect-[9/14] w-full" showCaption={false} />
          ) : (
            <div className="relative aspect-[9/14] overflow-hidden rounded-[var(--radius-card)]">
              <Image src={m.src} alt={m.alt} fill sizes="(min-width: 1024px) 21rem, 72vw" placeholder="blur" className="object-cover" />
            </div>
          )}
          <figcaption className="mt-4 flex items-baseline justify-between gap-4 text-sm">
            <span className="font-semibold text-forest-900">{m.caption}</span>
            <span className="shrink-0 text-muted">{school}</span>
          </figcaption>
        </figure>
      ))}
    </HorizontalGallery>
  );
}

/* ------------------------------------------------------------------ */
/* 8. Legacy — the 2013 citation                                       */
/* ------------------------------------------------------------------ */
function Legacy() {
  return (
    <section className="py-28 sm:py-40">
      <div className="container-x grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <Eyebrow>
            <T en="From our archive · 2013" hi="हमारे संग्रह से · 2013" />
          </Eyebrow>
          <Reveal>
            <blockquote className="mt-8">
              <p lang="hi" className="font-hindi text-[clamp(2rem,4vw,3.6rem)] leading-[1.35] text-forest-900">
                “{citationQuote.hi}”
              </p>
              <p className="mt-6 max-w-2xl font-display text-[clamp(1.2rem,1.8vw,1.6rem)] italic leading-snug text-forest-700">“{citationQuote.en}”</p>
              <footer className="mt-8 text-[0.95rem] text-muted">{citationQuote.source}</footer>
            </blockquote>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <ArrowLink href="/about#story" className="text-forest-800">
              <T en="Read our story" hi="हमारी कहानी पढ़ें" />
            </ArrowLink>
          </Reveal>
        </div>
        <Parallax offset={40}>
          <Reveal y={60}>
            <figure className="relative mx-auto max-w-sm rotate-[-2.5deg] rounded-md bg-cream-50 p-3 shadow-[0_40px_70px_-35px_rgba(19,39,28,0.6)]">
              <span aria-hidden className="absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 rotate-[3deg] bg-sand-400/60" />
              <Image src={img.aesri.citation.src} alt={img.aesri.citation.alt} sizes="24rem" placeholder="blur" className="h-auto w-full rounded-sm" />
              <figcaption className="px-1 pb-1 pt-3 text-[0.8rem] text-muted">{img.aesri.citation.caption}</figcaption>
            </figure>
          </Reveal>
        </Parallax>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 9. Initiatives, news, research                                      */
/* ------------------------------------------------------------------ */
function Happenings() {
  const latest = stories[1];
  return (
    <section className="pb-28 sm:pb-36">
      <div className="container-x">
        <SectionIntro
          eyebrow={<T en="Around AESRI" hi="एईएसआरआई में" />}
          title={<T en="Initiatives, news and research." hi="पहल, समाचार और अनुसंधान।" />}
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <Reveal>
            <HappeningCard
              href="/social-initiatives"
              kicker={{ en: "Social initiatives", hi: "सामाजिक पहल" }}
              title="Girls in every practical, schools close to home."
              body="What we commit to in the villages we serve — and how we'll report it."
              media={<VideoCard clip={clips.surveyGirls} rounded="rounded-none" className="h-full w-full" showCaption={false} />}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <HappeningCard
              href={`/news/${latest.slug}`}
              kicker={{ en: "Latest story", hi: "नवीनतम" }}
              title={latest.title}
              body={latest.summary}
              media={<Photo img={img.aryavart.exam} className="h-full w-full" sizes="(min-width: 1024px) 30vw, 100vw" />}
            />
          </Reveal>
          <Reveal delay={0.2}>
            <Link href="/research" className="jaali-light group flex h-full flex-col justify-between rounded-[2rem] bg-forest-800 p-8 text-cream-50 transition-colors duration-500 hover:bg-forest-700 sm:p-10">
              <div className="flex items-center justify-between">
                <span className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-sage-200">
                  <T en="Research & publications" hi="अनुसंधान एवं प्रकाशन" />
                </span>
                <BookOpenText className="h-6 w-6 text-sage-200" aria-hidden />
              </div>
              <div className="mt-24">
                <h3 className="font-display text-[1.9rem] leading-[1.08]">Research, done carefully.</h3>
                <p className="mt-4 text-sage-200">Our planned areas of study, and the consent and privacy rules we hold ourselves to — before we publish anything.</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
                  <T en="Our approach" hi="हमारा दृष्टिकोण" />
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function HappeningCard({
  href,
  kicker,
  title,
  body,
  media,
}: {
  href: string;
  kicker: { en: string; hi: string };
  title: string;
  body: string;
  media: React.ReactNode;
}) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-cream-50 ring-1 ring-forest-900/[0.07]">
      <div className="relative aspect-[16/11] overflow-hidden">{media}</div>
      <div className="flex flex-1 flex-col p-8">
        <span className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-forest-600">
          <T t={kicker} />
        </span>
        <h3 className="mt-3 font-display text-[1.6rem] leading-[1.12] text-forest-900">
          <Link href={href} className="after:absolute after:inset-0 after:z-10">
            {title}
          </Link>
        </h3>
        <p className="mt-3 text-muted">{body}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-forest-800">
          <T en="Read more" hi="और पढ़ें" />
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* 10. Admissions band (bilingual)                                     */
/* ------------------------------------------------------------------ */
function AdmissionsBand() {
  return (
    <section className="container-x">
      <ClipReveal className="rounded-[2.5rem]">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-sage-100 px-7 py-16 sm:px-14 sm:py-20">
          <div aria-hidden className="jaali absolute inset-0 -z-10 opacity-70" />
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <Eyebrow>
                <DualLabel en="Admissions" hi="प्रवेश" />
              </Eyebrow>
              <h2 className="text-h2 mt-5 text-forest-900">
                <T en="Looking for a school for your child?" hi="अपने बच्चे के लिए विद्यालय खोज रहे हैं?" />
              </h2>
              <p className="text-lead mt-5 max-w-xl text-muted">
                <T
                  en="Choose a school to see its admission steps, documents, fees and how to reach the office. RTE seats are allotted only through the Government of Rajasthan's process."
                  hi="प्रवेश की प्रक्रिया, दस्तावेज़, फ़ीस और कार्यालय से संपर्क की जानकारी के लिए विद्यालय चुनें। RTE सीटें केवल राजस्थान सरकार की प्रक्रिया से आवंटित होती हैं।"
                />
              </p>
            </div>
            <div className="grid gap-3">
              {schools.map((s) => (
                <Link
                  key={s.slug}
                  href={`/schools/${s.slug}/admissions`}
                  className="group flex items-center justify-between gap-4 rounded-2xl bg-cream-50 p-5 ring-1 ring-forest-900/[0.07] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-25px_rgba(19,39,28,0.5)]"
                >
                  <span className="flex items-center gap-4">
                    <SchoolCrest school={s.key} className="h-10 w-10 text-forest-700" />
                    <span>
                      <span className="block font-display text-xl text-forest-900">
                        <T t={s.name} />
                      </span>
                      <span className="text-sm text-muted">
                        <T en="Admissions" hi="प्रवेश" /> · <T t={s.place} />
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-forest-700 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </ClipReveal>
    </section>
  );
}
