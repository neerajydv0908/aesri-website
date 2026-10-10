import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone, Quote } from "lucide-react";
import { SchoolCrest } from "@/components/brand/emblems";
import { Bi, DualLabel, T } from "@/components/i18n";
import { ClipReveal, Parallax, Reveal, RevealWords, Stagger } from "@/components/motion/reveal";
import { RiseText } from "@/components/motion/rise-text";
import { SchoolFacts } from "@/components/school/facts";
import { NoticeCard } from "@/components/school/notice-list";
import { Polaroids } from "@/components/school/polaroids";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { Eyebrow, FactBi, FactText, Photo, SectionIntro } from "@/components/ui/bits";
import { VideoCard } from "@/components/ui/video-card";
import { clips, img, isClip } from "@/content/media";
import { activeNotices } from "@/content/notices";
import { isPending, type Img } from "@/content/types";
import { loadSchool, type SchoolPageProps } from "@/lib/school-page";

export const revalidate = 3600;

/** One row of stage cards on large screens (class names written out so Tailwind keeps them). */
const stageColumns: Record<number, string> = { 3: "lg:grid-cols-3", 4: "lg:grid-cols-4", 5: "lg:grid-cols-5" };

export default async function SchoolOverview({ params }: SchoolPageProps) {
  const school = await loadSchool(params);
  const base = `/schools/${school.slug}`;
  const notices = activeNotices(school.key).slice(0, 3);
  const isAry = school.key === "aryavart";

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden pb-20 pt-12 sm:pt-16">
        <div aria-hidden className="absolute -right-40 -top-40 -z-10 h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(closest-side,var(--school-soft),transparent)]" />
        <div className="container-x grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="eyebrow fade-up text-school" style={{ "--d": "0ms" } as CSSProperties}>
              <span className="h-px w-8 bg-school/50" aria-hidden />
              <span>
                <T en="An AESRI school" hi="एईएसआरआई का विद्यालय" /> · <T t={school.place} />
              </span>
            </p>
            <h1 className="text-display-1 mt-6 text-forest-900">
              <span data-l="en">
                <RiseText text={school.name.en} emphasisClassName="italic text-school" emphasis={[school.name.en.split(" ")[0]]} />
              </span>
              <span data-l="hi" lang="hi">
                <RiseText text={school.name.hi} emphasisClassName="text-school" emphasis={[school.name.hi.split(" ")[0]]} />
              </span>
            </h1>
            <p className="fade-up mt-6 font-display text-[clamp(1.3rem,2vw,1.75rem)] italic text-forest-700" style={{ "--d": "380ms" } as CSSProperties}>
              <T t={school.tagline} />
            </p>
            <div className="fade-up mt-5 max-w-xl" style={{ "--d": "460ms" } as CSSProperties}>
              <Bi t={school.intro} as="p" className="text-lead text-muted" />
            </div>
            <div className="fade-up mt-9 flex flex-wrap gap-3" style={{ "--d": "560ms" } as CSSProperties}>
              <ButtonLink href={`${base}/admissions`} variant="school" size="lg">
                <T en="Admissions" hi="प्रवेश" />
              </ButtonLink>
              <ButtonLink href={`${base}/contact`} variant="secondary" size="lg">
                <T en="Contact the office" hi="कार्यालय से संपर्क" />
              </ButtonLink>
            </div>
          </div>

          <div className="fade-up relative" style={{ "--d": "300ms" } as CSSProperties}>
            {isAry ? <AryavartHeroMedia /> : <AadharshilaHeroMedia />}
          </div>
        </div>
      </section>

      {/* Key facts */}
      <section className="pb-24">
        <div className="container-x">
          <Reveal>
            <SchoolFacts school={school} />
          </Reveal>
        </div>
      </section>

      {/* Notices */}
      <section className="pb-28">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionIntro eyebrow={<T en="Notices" hi="सूचनाएँ" />} title={<T en="What's current." hi="वर्तमान सूचनाएँ।" />} />
            <ArrowLink href={`${base}/notices`} className="text-school">
              <T en="All notices & calendar" hi="सभी सूचनाएँ एवं कैलेंडर" />
            </ArrowLink>
          </div>
          <Stagger className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {notices.map((n) => (
              <NoticeCard key={n.id} notice={n} compact />
            ))}
          </Stagger>
        </div>
      </section>

      {/* Motto / approach */}
      {school.motto ? (
        <section className="relative overflow-hidden py-28 sm:py-36">
          <div aria-hidden className="jaali absolute inset-0 -z-10 opacity-60" />
          <div className="container-x grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Quote className="h-10 w-10 text-school-accent" aria-hidden />
              <p className="mt-6 font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.95] tracking-[-0.03em] text-forest-900">
                <span data-l="en">
                  <RevealWords text={school.motto.text.en} emphasis={["young."]} emphasisClassName="italic text-school" />
                </span>
                <span data-l="hi" lang="hi">
                  <RevealWords text={school.motto.text.hi} />
                </span>
              </p>
              <Reveal delay={0.2}>
                <p className="text-lead mt-8 max-w-lg text-muted">{school.motto.context}</p>
              </Reveal>
            </div>
            <Parallax offset={50}>
              <ClipReveal className="rounded-[2rem]">
                <Photo img={img.aadharshila.nurseryPlay} className="aspect-[4/3] rounded-[2rem]" sizes="(min-width: 1024px) 40vw, 100vw" />
              </ClipReveal>
            </Parallax>
          </div>
        </section>
      ) : (
        <section className="relative overflow-hidden py-28 sm:py-36">
          <div className="container-x grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="grid grid-cols-2 gap-4">
              <Reveal y={70}>
                <VideoCard clip={clips.surveyBoys} className="aspect-[9/14] w-full" showCaption={false} />
              </Reveal>
              <Reveal y={120} delay={0.1} className="mt-16">
                <VideoCard clip={clips.surveyGirls} className="aspect-[9/14] w-full" showCaption={false} />
              </Reveal>
            </div>
            <div>
              <Eyebrow>
                <T en="Learning by doing" hi="करके सीखना" />
              </Eyebrow>
              <h2 className="text-h2 mt-5 text-forest-900">
                <span data-l="en">
                  <RevealWords text="Geography, on our own ground." />
                </span>
                <span data-l="hi" lang="hi">
                  <RevealWords text="भूगोल, अपने ही मैदान पर।" />
                </span>
              </h2>
              <Reveal delay={0.15}>
                <p className="text-lead mt-6 text-muted">{school.story[1]}</p>
              </Reveal>
              <Reveal delay={0.25} className="mt-8">
                <ArrowLink href={`${base}/facilities`} className="text-school">
                  <T en="Facilities & activities" hi="सुविधाएँ एवं गतिविधियाँ" />
                </ArrowLink>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* Academics preview */}
      <section className="pb-28">
        <div className="container-x">
          <SectionIntro
            eyebrow={<T en="Academics" hi="शिक्षण" />}
            title={<T en="Learning, section by section." hi="हर अनुभाग में सीखना।" />}
            lead={school.sectionsNote}
          />
          {school.sections.length ? (
            <Stagger className="mt-12 grid gap-5 lg:grid-cols-3">
              {school.sections.map((sec, i) => (
                <Link
                  key={sec.name.en}
                  href={`${base}/academics`}
                  className="group flex h-full flex-col rounded-[1.75rem] bg-cream-50 p-7 ring-1 ring-forest-900/[0.07] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_50px_-36px_rgba(19,39,28,0.55)]"
                >
                  <span className="font-display text-sm text-school-accent">0{i + 1}</span>
                  <span className="mt-6 font-display text-[1.7rem] leading-tight text-forest-900">
                    <T t={sec.name} />
                  </span>
                  <span className="mt-1 text-sm font-semibold text-school">
                    <T t={sec.classes} />
                  </span>
                  <span className="mt-4 text-[0.97rem] text-muted">{sec.description}</span>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-forest-800">
                    <T en="Subjects & more" hi="विषय एवं अधिक" />
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              ))}
            </Stagger>
          ) : (
            <>
              {school.stages?.length ? (
                <Stagger
                  as="ol"
                  className={`mt-12 grid gap-5 sm:grid-cols-2 sm:[&>li:last-child:nth-child(odd)]:col-span-2 lg:[&>li:last-child:nth-child(odd)]:col-span-1 ${stageColumns[school.stages.length] ?? "lg:grid-cols-4"}`}
                >
                  {school.stages.map((st, i) => (
                    <Link
                      key={st.name.en}
                      href={`${base}/academics`}
                      className="group flex h-full flex-col rounded-[1.75rem] bg-cream-50 p-7 ring-1 ring-forest-900/[0.07] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_50px_-36px_rgba(19,39,28,0.55)]"
                    >
                      <span className="font-display text-sm text-school">0{i + 1}</span>
                      <span className="mt-6 font-display text-[1.6rem] leading-tight text-forest-900">
                        <T t={st.name} />
                      </span>
                      <span className="mt-1 text-sm font-semibold text-school">
                        <T t={st.classes} />
                      </span>
                      {st.note ? (
                        <span className="mt-3 w-fit rounded-full bg-school-soft px-3 py-1 text-[0.8rem] font-semibold text-forest-900">
                          <T t={st.note} />
                        </span>
                      ) : null}
                    </Link>
                  ))}
                </Stagger>
              ) : null}
              <Reveal className="mt-10">
                <ArrowLink href={`${base}/academics`} className="text-school">
                  <T en="See academics" hi="शिक्षण देखें" />
                </ArrowLink>
              </Reveal>
            </>
          )}
        </div>
      </section>

      {/* Life at school */}
      <section className="bg-cream-200/50 py-28 sm:py-32">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionIntro eyebrow={<T en="Life at school" hi="विद्यालय जीवन" />} title={<T en="Moments from our year." hi="हमारे वर्ष के कुछ पल।" />} />
            <ArrowLink href={`${base}/facilities`} className="text-school">
              <T en="Facilities & activities" hi="सुविधाएँ एवं गतिविधियाँ" />
            </ArrowLink>
          </div>
          <div className="mt-14">
            {isAry ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {school.gallery.slice(0, 4).map((m, i) => (
                  <Reveal key={i} delay={i * 0.08} y={50}>
                    {isClip(m) ? (
                      <VideoCard clip={m} className="aspect-[9/14] w-full" />
                    ) : (
                      <figure>
                        <Photo img={m} className="aspect-[9/14] rounded-[var(--radius-card)]" sizes="(min-width: 1024px) 25vw, 50vw" />
                      </figure>
                    )}
                  </Reveal>
                ))}
              </div>
            ) : (
              <Polaroids items={school.gallery.filter((m): m is Img => !isClip(m)).slice(0, 4)} />
            )}
          </div>
        </div>
      </section>

      {/* Admissions + contact */}
      <section className="py-28">
        <div className="container-x grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal className="relative overflow-hidden rounded-[2rem] bg-school p-8 text-cream-50 sm:p-12">
            <div aria-hidden className="jaali-light absolute inset-0" />
            <div className="relative">
              <p className="eyebrow text-cream-100/80">
                <span className="h-px w-8 bg-cream-100/50" aria-hidden />
                <DualLabel en="Admissions" hi="प्रवेश" />
              </p>
              <h2 className="text-h2 mt-5 max-w-[18ch]">
                <T en="Start with a visit or an enquiry." hi="मुलाक़ात या पूछताछ से शुरुआत करें।" />
              </h2>
              <p className="text-lead mt-5 max-w-xl text-cream-100/85">
                <T
                  en="See the steps, age guidelines and documents — in English and Hindi — and send us an enquiry online."
                  hi="प्रवेश के चरण, आयु और दस्तावेज़ों की जानकारी — हिंदी और अंग्रेज़ी में — देखें और ऑनलाइन पूछताछ भेजें।"
                />
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href={`${base}/admissions`} variant="light">
                  <T en="Admission steps" hi="प्रवेश के चरण" />
                </ButtonLink>
                <ButtonLink href={`${base}/fees`} variant="outline-light">
                  <T en="Fees" hi="फ़ीस" />
                </ButtonLink>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col rounded-[2rem] bg-cream-50 p-8 ring-1 ring-forest-900/[0.07] sm:p-10">
            <div className="flex items-center gap-3 text-school">
              <SchoolCrest school={school.key} className="h-9 w-9" />
              <h2 className="font-display text-2xl text-forest-900">
                <T en="Visit the school" hi="विद्यालय आएँ" />
              </h2>
            </div>
            <ul className="mt-7 space-y-4 text-[0.98rem]">
              <li className="flex gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-school" aria-hidden />
                <FactBi value={school.address} />
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-school" aria-hidden />
                {isPending(school.phone) ? (
                  <FactText value={school.phone} />
                ) : (
                  <a href={`tel:${school.phone.replace(/\s/g, "")}`} className="font-semibold text-forest-900 link-underline">
                    {school.phone}
                  </a>
                )}
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-school" aria-hidden />
                {isPending(school.email) ? (
                  <FactText value={school.email} />
                ) : (
                  <a href={`mailto:${school.email}`} className="break-all text-forest-900 link-underline">
                    {school.email}
                  </a>
                )}
              </li>
            </ul>
            <p className="mt-5 text-sm text-muted">
              <T t={school.officeHours} />
            </p>
            <div className="mt-auto pt-8">
              <ArrowLink href={`${base}/contact`} className="text-school">
                <T en="Contact & directions" hi="संपर्क एवं रास्ता" />
              </ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function AryavartHeroMedia() {
  return (
    <div className="relative mx-auto aspect-[5/5.4] w-full max-w-[36rem]">
      <div className="absolute right-0 top-0 h-[86%] w-[60%]">
        <VideoCard clip={clips.exam} priority showCaption={false} className="h-full w-full shadow-[0_40px_80px_-35px_rgba(13,28,20,0.6)]" />
        <span className="absolute left-4 top-4 rounded-full bg-cream-50/90 px-3 py-1.5 text-[0.75rem] font-semibold text-forest-900 backdrop-blur">Exams under an open sky</span>
      </div>
      <figure className="absolute bottom-0 left-0 w-[62%] overflow-hidden rounded-[1.4rem] border-[6px] border-cream-50 bg-cream-50 shadow-[0_30px_60px_-30px_rgba(13,28,20,0.55)]">
        <div className="relative aspect-[3/2]">
          <Image src={img.aryavart.campusWide.src} alt={img.aryavart.campusWide.alt} fill priority sizes="(min-width: 1024px) 22rem, 62vw" placeholder="blur" className="object-cover" />
        </div>
        <figcaption className="px-3 pb-1.5 pt-2.5 text-[0.78rem] font-semibold text-forest-800">The school ground, Palana</figcaption>
      </figure>
    </div>
  );
}

function AadharshilaHeroMedia() {
  return (
    <div className="relative mx-auto aspect-[5/4.6] w-full max-w-[38rem]">
      <div className="absolute right-0 top-0 w-[88%] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-35px_rgba(13,28,20,0.6)]">
        <div className="relative aspect-[4/3]">
          <Image src={img.aadharshila.campus.src} alt={img.aadharshila.campus.alt} fill priority sizes="(min-width: 1024px) 34rem, 88vw" placeholder="blur" className="object-cover" />
        </div>
      </div>
      <figure className="absolute bottom-0 left-0 w-[46%] rotate-[-3deg] bg-cream-50 p-2.5 pb-3 shadow-[0_30px_60px_-30px_rgba(13,28,20,0.6)]">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image src={img.aadharshila.nurseryClass.src} alt={img.aadharshila.nurseryClass.alt} fill sizes="(min-width: 1024px) 18rem, 46vw" placeholder="blur" className="object-cover" />
        </div>
        <figcaption className="mt-2 text-center font-display text-sm italic text-forest-800">Our nursery classroom</figcaption>
      </figure>
    </div>
  );
}
