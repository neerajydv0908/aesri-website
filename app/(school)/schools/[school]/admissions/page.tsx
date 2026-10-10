import type { Metadata } from "next";
import { ArrowUpRight, Check, Clock, FileText, Phone, Scale } from "lucide-react";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { DualLabel, T } from "@/components/i18n";
import { Reveal, ScrollLine, Stagger } from "@/components/motion/reveal";
import { Accordion } from "@/components/ui/accordion";
import { Eyebrow, FactText, SectionIntro } from "@/components/ui/bits";
import { ArrowLink } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { admissionFee, rupees } from "@/content/fees";
import { getSchool } from "@/content/schools";
import { isPending } from "@/content/types";
import { loadSchool, type SchoolPageProps } from "@/lib/school-page";

export async function generateMetadata({ params }: SchoolPageProps): Promise<Metadata> {
  const s = getSchool((await params).school);
  return { title: "Admissions", description: s ? `Admission steps, age guidelines, documents and enquiries for ${s.name.en}.` : undefined };
}

export default async function AdmissionsPage({ params }: SchoolPageProps) {
  const school = await loadSchool(params);
  const base = `/schools/${school.slug}`;
  const a = school.admissions;
  const fee = admissionFee(school.key);

  return (
    <>
      <PageHero
        offsetHeader={false}
        tone="school"
        crumbs={[
          { href: base, label: school.name },
          { href: `${base}/admissions`, label: { en: "Admissions", hi: "प्रवेश" } },
        ]}
        eyebrow={<DualLabel en="Admissions" hi="प्रवेश" />}
        title={{ en: "Admissions", hi: "प्रवेश" }}
        lead={
          <T
            en={`How to join ${school.name.en}: the steps, age guidelines and documents, in English and Hindi. Questions? The school office is happy to help in person.`}
            hi={`${school.name.hi} में प्रवेश कैसे लें: चरण, आयु और दस्तावेज़ों की जानकारी, हिंदी और अंग्रेज़ी में। कोई प्रश्न? विद्यालय कार्यालय में आकर सहायता लें।`}
          />
        }
        aside={
          <div className="rounded-[1.75rem] bg-cream-50 p-7 ring-1 ring-forest-900/[0.08]">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.15em] text-muted">
              <T en="School office" hi="विद्यालय कार्यालय" />
            </p>
            <p className="mt-3 flex items-center gap-2.5 text-lg font-semibold text-forest-900">
              <Phone className="h-4 w-4 text-school" aria-hidden />
              {isPending(school.phone) ? <FactText value={school.phone} /> : <a href={`tel:${school.phone.replace(/\s/g, "")}`}>{school.phone}</a>}
            </p>
            <p className="mt-2 flex items-start gap-2.5 text-sm text-muted">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-school" aria-hidden />
              <T t={school.officeHours} />
            </p>
            <a href="#enquire" className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-school px-5 text-sm font-semibold text-cream-50 transition hover:brightness-110">
              <T en="Send an enquiry" hi="पूछताछ भेजें" />
            </a>
          </div>
        }
      />

      {/* Steps */}
      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-44 lg:self-start">
            <SectionIntro
              eyebrow={<T en="The process" hi="प्रक्रिया" />}
              title={<T en="Five steps to your first day." hi="पहले दिन तक पाँच चरण।" />}
              lead={
                <T
                  en="Dates for registration and interactions are announced on the notice board and on our Notices page."
                  hi="पंजीकरण और मुलाक़ात की तिथियाँ सूचना पट्ट और हमारे सूचनाएँ पृष्ठ पर घोषित की जाती हैं।"
                />
              }
            />
          </div>
          <ol className="relative">
            <ScrollLine className="bottom-8 left-[1.45rem] top-8 w-px" />
            {a.steps.map((step, i) => (
              <Reveal as="li" key={step.title.en} className="relative flex gap-6 pb-12 last:pb-0" delay={0.05}>
                <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full bg-school font-display text-lg text-cream-50 ring-8 ring-cream-100">
                  {i + 1}
                </span>
                <div className="pt-1.5">
                  <h3 className="font-display text-[1.6rem] leading-tight text-forest-900">
                    <T t={step.title} />
                  </h3>
                  <p className="mt-3 max-w-xl text-[1.02rem] leading-relaxed text-muted">
                    <T t={step.body} />
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Ages + documents */}
      <section className="pb-24">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <Reveal className="rounded-[2rem] bg-cream-50 p-8 ring-1 ring-forest-900/[0.07] sm:p-10">
            <Eyebrow>
              <T en="Age guidelines" hi="आयु मानदंड" />
            </Eyebrow>
            <table className="mt-8 w-full text-left">
              <caption className="sr-only">Age guidelines by class</caption>
              <thead>
                <tr className="border-b border-forest-900/10 text-[0.75rem] uppercase tracking-[0.14em] text-muted">
                  <th scope="col" className="pb-3 font-bold">
                    <T en="Class" hi="कक्षा" />
                  </th>
                  <th scope="col" className="pb-3 font-bold">
                    <T en="Age" hi="आयु" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {a.ages.map((row) => (
                  <tr key={row.level.en} className="border-b border-forest-900/[0.07] last:border-0">
                    <th scope="row" className="py-4 pr-6 font-display text-lg font-normal text-forest-900">
                      <T t={row.level} />
                    </th>
                    <td className="py-4 text-[0.98rem] text-muted">
                      <T t={row.age} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <Reveal delay={0.1} className="rounded-[2rem] bg-cream-50 p-8 ring-1 ring-forest-900/[0.07] sm:p-10">
            <Eyebrow>
              <T en="Documents to bring" hi="आवश्यक दस्तावेज़" />
            </Eyebrow>
            <ul className="mt-8 space-y-4">
              {a.documents.map((d) => (
                <li key={d.en} className="flex gap-3.5 text-[1rem] text-forest-900">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-school-soft text-school">
                    <FileText className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  <T t={d} />
                </li>
              ))}
            </ul>
            {fee?.amount != null ? (
              <div className="mt-8 flex flex-col gap-3 rounded-2xl bg-school-soft p-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[0.98rem] text-forest-900">
                  <strong className="font-semibold">
                    <T en="Admission fee" hi="प्रवेश शुल्क" />: {rupees(fee.amount)}
                  </strong>{" "}
                  <span className="text-forest-900/80">
                    <T en="— paid once, at admission; non-refundable." hi="— प्रवेश के समय एक बार; वापसी योग्य नहीं।" />
                  </span>
                </p>
                <ArrowLink href={`${base}/fees`} className="shrink-0 text-school">
                  <T en="All fees" hi="सभी शुल्क" />
                </ArrowLink>
              </div>
            ) : null}
          </Reveal>
        </div>
      </section>

      {/* RTE */}
      <section className="pb-24">
        <div className="container-x">
          <Reveal className="relative overflow-hidden rounded-[2rem] bg-sage-100 p-8 sm:p-12">
            <div aria-hidden className="jaali absolute inset-0" />
            <div className="relative grid gap-8 lg:grid-cols-[auto_1fr_auto] lg:items-center">
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-cream-50 text-school">
                <Scale className="h-7 w-7" aria-hidden />
              </span>
              <div>
                <h2 className="font-display text-[clamp(1.6rem,2.6vw,2.2rem)] leading-tight text-forest-900">
                  <T en="Right to Education (RTE) seats" hi="शिक्षा का अधिकार (RTE) सीटें" />
                </h2>
                <p className="mt-3 max-w-3xl text-[1.02rem] leading-relaxed text-forest-900/80">
                  <T
                    en="25% of seats at the entry level are reserved for children from disadvantaged groups and weaker sections under the RTE Act. These seats are allotted only through the Government of Rajasthan's online process — the enquiry form on this page is not an RTE application. Our office will gladly help you understand the steps."
                    hi="शिक्षा का अधिकार अधिनियम के अंतर्गत प्रवेश स्तर की 25% सीटें वंचित वर्ग और कमज़ोर वर्ग के बच्चों के लिए आरक्षित हैं। ये सीटें केवल राजस्थान सरकार की ऑनलाइन प्रक्रिया से आवंटित होती हैं — इस पृष्ठ का पूछताछ फ़ॉर्म RTE आवेदन नहीं है। हमारा कार्यालय प्रक्रिया समझने में ख़ुशी से मदद करेगा।"
                  />
                </p>
              </div>
              <a
                href="https://rajpsp.nic.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 justify-self-start rounded-full bg-forest-800 px-6 text-sm font-semibold text-cream-50 transition-colors hover:bg-forest-700"
              >
                <T en="Official RTE portal" hi="आधिकारिक RTE पोर्टल" />
                <ArrowUpRight className="h-4 w-4" aria-hidden />
                <span className="sr-only"> (rajpsp.nic.in, opens in a new tab)</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <SectionIntro eyebrow={<T en="Questions" hi="प्रश्न" />} title={<T en="Good to know." hi="जानने योग्य बातें।" />} />
          <Reveal>
            <Accordion items={a.faqs.map((f) => ({ q: <T t={f.q} />, a: <T t={f.a} /> }))} />
          </Reveal>
        </div>
      </section>

      {/* Enquiry */}
      <section id="enquire" className="scroll-mt-40 pb-8">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionIntro
              eyebrow={<T en="Enquire" hi="पूछताछ" />}
              title={<T en="Ask us anything about admission." hi="प्रवेश के बारे में कुछ भी पूछें।" />}
              lead={
                <T
                  en={`Your enquiry goes only to ${school.name.en}'s office — not to the other school.`}
                  hi={`आपकी पूछताछ केवल ${school.name.hi} के कार्यालय तक जाती है — दूसरे विद्यालय तक नहीं।`}
                />
              }
            />
            <Stagger className="mt-10 space-y-3 text-[0.95rem] text-muted">
              {[
                { en: "The office will call you back on the number you give.", hi: "कार्यालय आपके दिए गए नंबर पर आपसे संपर्क करेगा।" },
                { en: "We ask only for what's needed to reply.", hi: "हम केवल उत्तर के लिए ज़रूरी जानकारी ही माँगते हैं।" },
                { en: "Prefer to visit? Come to the office on any working day.", hi: "मिलना चाहें? किसी भी कार्यदिवस पर कार्यालय आएँ।" },
              ].map((x) => (
                <p key={x.en} className="flex gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-school" aria-hidden />
                  <T t={x} />
                </p>
              ))}
            </Stagger>
          </div>
          <Reveal>
            <EnquiryForm school={school.key} kind="admission" classes={a.classOptions} schoolName={school.name.en} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
