import type { Metadata } from "next";
import { BookMarked, CalendarRange, Clock, NotebookPen } from "lucide-react";
import { T } from "@/components/i18n";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { ArrowLink } from "@/components/ui/button";
import { FactBi, SectionIntro, Tbc } from "@/components/ui/bits";
import { PageHero } from "@/components/ui/page-hero";
import { VideoCard } from "@/components/ui/video-card";
import { clips } from "@/content/media";
import { getSchool } from "@/content/schools";
import { isPending } from "@/content/types";
import { loadSchool, type SchoolPageProps } from "@/lib/school-page";

export async function generateMetadata({ params }: SchoolPageProps): Promise<Metadata> {
  const s = getSchool((await params).school);
  return { title: "Academics", description: s ? `Sections, subjects, timings and session at ${s.name.en}.` : undefined };
}

export default async function AcademicsPage({ params }: SchoolPageProps) {
  const school = await loadSchool(params);
  const base = `/schools/${school.slug}`;

  return (
    <>
      <PageHero
        offsetHeader={false}
        tone="school"
        crumbs={[
          { href: base, label: school.name },
          { href: `${base}/academics`, label: { en: "Academics", hi: "शिक्षण" } },
        ]}
        eyebrow={<T en="Academics" hi="शिक्षण" />}
        title={{ en: "What and how we teach", hi: "हम क्या और कैसे पढ़ाते हैं" }}
        lead={
          school.key === "aadharshila" ? (
            <T
              en="Four sections, from the first day of nursery to Class X — taught in English, with RBSE textbooks."
              hi="नर्सरी के पहले दिन से कक्षा 10 तक चार अनुभाग — अंग्रेज़ी माध्यम में, आरबीएसई पाठ्यपुस्तकों के साथ।"
            />
          ) : (
            <T
              en="From LKG to Class XII, taught in English — with the Arts stream in Classes XI and XII, and learning that regularly steps out of the classroom."
              hi="एलकेजी से कक्षा 12 तक, अंग्रेज़ी माध्यम में — कक्षा 11 व 12 में कला संकाय, और ऐसी पढ़ाई जो अक्सर कक्षा से बाहर निकलती है।"
            />
          )
        }
      />

      {/* Sections */}
      <section className="pb-24">
        <div className="container-x">
          {school.sections.length ? (
            <div className="space-y-6">
              {school.sections.map((sec, i) => (
                <Reveal key={sec.name.en} className="grid gap-8 rounded-[2rem] bg-cream-50 p-8 ring-1 ring-forest-900/[0.07] sm:p-10 lg:grid-cols-[0.9fr_1.1fr]">
                  <div>
                    <span className="font-display text-sm text-school-accent">0{i + 1}</span>
                    <h2 className="mt-4 font-display text-[clamp(1.9rem,3vw,2.6rem)] leading-tight text-forest-900">
                      <T t={sec.name} />
                    </h2>
                    <p className="mt-2 font-semibold text-school">
                      <T t={sec.classes} />
                    </p>
                    <p className="mt-5 text-[1.02rem] leading-relaxed text-muted">{sec.description}</p>
                  </div>
                  <div>
                    {isPending(sec.subjects) ? (
                      <div className="rounded-2xl border border-dashed border-forest-900/15 p-6">
                        <p className="text-[0.72rem] font-bold uppercase tracking-[0.15em] text-muted">
                          <T en="Subjects" hi="विषय" />
                        </p>
                        <div className="mt-4 flex flex-wrap items-center gap-3">
                          <Tbc what={sec.subjects.what} />
                          <span className="text-[0.95rem] text-muted">
                            <T en="The subject list will be added here." hi="विषयों की सूची यहाँ जोड़ी जाएगी।" />
                          </span>
                        </div>
                      </div>
                    ) : sec.subjects.length ? (
                      <>
                        <p className="text-[0.72rem] font-bold uppercase tracking-[0.15em] text-muted">
                          <T en="Subjects" hi="विषय" />
                        </p>
                        <Stagger as="ul" className="mt-4 flex flex-wrap gap-2.5" stagger={0.04} y={12}>
                          {sec.subjects.map((sub) => (
                            <span key={sub} className="inline-block rounded-full bg-school-soft px-4 py-2 text-[0.92rem] font-semibold text-forest-900">
                              {sub}
                            </span>
                          ))}
                        </Stagger>
                      </>
                    ) : (
                      <p className="rounded-2xl bg-school-soft p-6 font-display text-xl italic leading-snug text-forest-900">
                        “Catch them young.” <span className="mt-2 block font-sans text-sm not-italic text-muted">Play-based learning with routines for discipline, cleanliness and politeness.</span>
                      </p>
                    )}
                  </div>
                </Reveal>
              ))}
              {school.sectionsNote ? <p className="text-sm text-muted">{school.sectionsNote}</p> : null}
            </div>
          ) : (
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <Reveal className="rounded-[2rem] bg-cream-50 p-8 ring-1 ring-forest-900/[0.07] sm:p-10">
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.15em] text-muted">
                  <T en="Classes" hi="कक्षाएँ" />
                </p>
                <p className="mt-3 text-balance font-display text-[clamp(1.9rem,3.2vw,2.7rem)] leading-tight text-forest-900">
                  <FactBi value={school.classes} />
                </p>
                {school.stages?.length ? (
                  <ol className="mt-8 grid gap-3 sm:grid-cols-2 sm:[&>li:last-child:nth-child(odd)]:col-span-2">
                    {school.stages.map((st, i) => (
                      <li key={st.name.en} className="rounded-2xl bg-school-soft p-5">
                        <span className="font-display text-sm text-school">0{i + 1}</span>
                        <p className="mt-2 font-display text-[1.35rem] leading-tight text-forest-900">
                          <T t={st.name} />
                        </p>
                        <p className="mt-1 text-[0.95rem] font-semibold text-school">
                          <T t={st.classes} />
                        </p>
                        {st.note ? (
                          <p className="mt-3 inline-flex rounded-full bg-cream-50 px-3 py-1 text-[0.8rem] font-semibold text-forest-900">
                            <T t={st.note} />
                          </p>
                        ) : null}
                      </li>
                    ))}
                  </ol>
                ) : null}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Tbc what="Subjects taught in each class" />
                  <span className="text-[0.95rem] text-muted">
                    <T en="Subjects for each class will be listed here. For now, the school office can tell you." hi="हर कक्षा के विषय यहाँ दिए जाएँगे। अभी के लिए विद्यालय कार्यालय से जानकारी लें।" />
                  </span>
                </div>
              </Reveal>
              <div className="grid grid-cols-2 gap-4">
                <Reveal y={60}>
                  <VideoCard clip={clips.surveyGirls} className="aspect-[9/14] w-full" showCaption={false} />
                </Reveal>
                <Reveal y={100} delay={0.1} className="mt-12">
                  <VideoCard clip={clips.surveyBoys} className="aspect-[9/14] w-full" showCaption={false} />
                </Reveal>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Day and year */}
      <section className="pb-20">
        <div className="container-x">
          <SectionIntro eyebrow={<T en="The school day & year" hi="विद्यालय का दिन एवं वर्ष" />} title={<T en="Timings and session." hi="समय एवं सत्र।" />} />
          <Stagger className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <InfoCard icon={<Clock className="h-5 w-5" />} title={{ en: "Timings", hi: "समय" }}>
              {isPending(school.timings) ? (
                <Tbc what={school.timings.what} />
              ) : (
                <ul className="space-y-1.5">
                  <li>
                    <T t={school.timings.shift} />
                  </li>
                  <li>
                    <strong className="font-semibold text-forest-900">
                      <T en="Summer" hi="ग्रीष्मकाल" />
                    </strong>{" "}
                    · <T t={school.timings.summer} />
                  </li>
                  <li>
                    <strong className="font-semibold text-forest-900">
                      <T en="Winter" hi="शीतकाल" />
                    </strong>{" "}
                    · <T t={school.timings.winter} />
                  </li>
                </ul>
              )}
            </InfoCard>
            <InfoCard icon={<CalendarRange className="h-5 w-5" />} title={{ en: "Session & vacations", hi: "सत्र एवं अवकाश" }}>
              {isPending(school.session) ? (
                <Tbc what={school.session.what} />
              ) : (
                <ul className="space-y-2">
                  {school.session.map((x) => (
                    <li key={x.en}>
                      <T t={x} />
                    </li>
                  ))}
                </ul>
              )}
            </InfoCard>
            <InfoCard icon={<BookMarked className="h-5 w-5" />} title={{ en: "Textbooks & medium", hi: "पाठ्यपुस्तकें एवं माध्यम" }}>
              <p>
                <FactBi value={school.medium} />
              </p>
              {school.textbooks ? (
                <p className="mt-2">
                  <FactBi value={school.textbooks} />
                </p>
              ) : null}
            </InfoCard>
            <InfoCard icon={<NotebookPen className="h-5 w-5" />} title={{ en: "Almanac & homework", hi: "अल्मनैक एवं गृहकार्य" }}>
              <T
                en="Students note their homework in the school almanac (student diary). Parents are asked to read it regularly."
                hi="विद्यार्थी गृहकार्य विद्यालय अल्मनैक (छात्र डायरी) में लिखते हैं। अभिभावक इसे नियमित रूप से पढ़ें।"
              />
            </InfoCard>
          </Stagger>
          <div className="mt-10">
            <ArrowLink href={`${base}/notices`} className="text-school">
              <T en="Calendar and notices" hi="कैलेंडर एवं सूचनाएँ" />
            </ArrowLink>
          </div>
        </div>
      </section>
    </>
  );
}

function InfoCard({ icon, title, children }: { icon: React.ReactNode; title: { en: string; hi: string }; children: React.ReactNode }) {
  return (
    <div className="h-full rounded-[1.75rem] bg-cream-50 p-7 ring-1 ring-forest-900/[0.07]">
      <span className="grid h-11 w-11 place-items-center rounded-full bg-school-soft text-school" aria-hidden>
        {icon}
      </span>
      <h3 className="mt-5 font-display text-xl text-forest-900">
        <T t={title} />
      </h3>
      <div className="mt-3 text-[0.97rem] leading-relaxed text-muted">{children}</div>
    </div>
  );
}
