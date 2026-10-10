import type { Metadata } from "next";
import { BookOpenText, ShieldCheck } from "lucide-react";
import { T } from "@/components/i18n";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { SectionIntro } from "@/components/ui/bits";
import { PageHero } from "@/components/ui/page-hero";
import { publications, researchAreas, researchEthics } from "@/content/org";

export const metadata: Metadata = {
  title: "Research and Publications",
  description: "AESRI's approach to classroom research, the rules it holds itself to, and its publications.",
};

export default function ResearchPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: { en: "Home", hi: "मुख्य पृष्ठ" } },
          { href: "/research", label: { en: "Research", hi: "अनुसंधान" } },
        ]}
        eyebrow={<T en="Research & publications" hi="अनुसंधान एवं प्रकाशन" />}
        title={{ en: "Research, done carefully.", hi: "सावधानी से किया गया अनुसंधान।" }}
        lead={
          <T
            en="“Research” is in our name, so we want to be clear about what it means. We are a small organisation running two village schools. Our research will be modest, practical and honest — and we will publish only what we can stand behind."
            hi="‘अनुसंधान’ हमारे नाम में है, इसलिए हम इसका अर्थ स्पष्ट रखना चाहते हैं। हम गाँव के दो विद्यालय चलाने वाली एक छोटी संस्था हैं। हमारा अनुसंधान सीमित, व्यावहारिक और ईमानदार होगा — और हम केवल वही प्रकाशित करेंगे जिस पर हम पूरी तरह भरोसा कर सकें।"
          />
        }
      />

      <section className="pb-24">
        <div className="container-x">
          <SectionIntro eyebrow={<T en="Areas of interest" hi="रुचि के क्षेत्र" />} title={<T en="Questions we want to study." hi="जिन प्रश्नों का हम अध्ययन करना चाहते हैं।" />} />
          <Stagger className="mt-12 grid gap-5 lg:grid-cols-3">
            {researchAreas.map((r, i) => (
              <div key={r.title} className="flex h-full flex-col rounded-[1.75rem] bg-cream-50 p-8 ring-1 ring-forest-900/[0.07]">
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm text-ochre-600">0{i + 1}</span>
                  <span className="rounded-full bg-sage-100 px-3 py-1 text-[0.75rem] font-semibold text-forest-800">{r.status}</span>
                </div>
                <h3 className="mt-8 font-display text-[1.6rem] leading-tight text-forest-900">{r.title}</h3>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">{r.body}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="dark-surface relative overflow-hidden rounded-[2.5rem] bg-forest-900 py-24 text-cream-50 sm:mx-4 sm:py-32">
        <div aria-hidden className="jaali-light absolute inset-0" />
        <div className="container-x relative grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <ShieldCheck className="h-10 w-10 text-sage-300" aria-hidden />
            <h2 className="text-h2 mt-6">
              <T en="Rules we hold ourselves to." hi="नियम जिनका हम पालन करते हैं।" />
            </h2>
            <p className="text-lead mt-6 text-sage-200">
              <T en="Children's data deserves more care, not less. These rules come before any study begins." hi="बच्चों की जानकारी को अधिक सावधानी चाहिए। ये नियम किसी भी अध्ययन से पहले लागू होते हैं।" />
            </p>
          </div>
          <Stagger as="ol" className="space-y-4" stagger={0.08}>
            {researchEthics.map((e, i) => (
              <div key={e} className="flex gap-5 rounded-[1.5rem] border border-cream-50/10 bg-cream-50/[0.04] p-6">
                <span className="font-display text-2xl text-sage-300">{i + 1}</span>
                <p className="text-[1.02rem] leading-relaxed text-cream-100">{e}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionIntro eyebrow={<T en="Publications" hi="प्रकाशन" />} title={<T en="What we've published." hi="हमारे प्रकाशन।" />} />
          {publications.length ? (
            <ul className="space-y-4">
              {publications.map((p) => (
                <li key={p.title} className="rounded-[1.5rem] bg-cream-50 p-7 ring-1 ring-forest-900/[0.07]">
                  <h3 className="font-display text-xl text-forest-900">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {p.authors} · {p.date}
                  </p>
                  <p className="mt-3 text-muted">{p.summary}</p>
                </li>
              ))}
            </ul>
          ) : (
            <Reveal className="flex flex-col items-start gap-5 rounded-[1.75rem] border border-dashed border-forest-900/20 p-8">
              <BookOpenText className="h-8 w-8 text-forest-900/40" aria-hidden />
              <p className="font-display text-[1.6rem] leading-snug text-forest-900">
                <T en="Nothing published yet — and that's deliberate." hi="अभी कुछ प्रकाशित नहीं — और यह सोच-समझकर है।" />
              </p>
              <p className="text-muted">
                <T
                  en="When we publish, each piece will list its authors, date, method and any funding, with a plain-language summary for families."
                  hi="जब हम प्रकाशित करेंगे, हर लेख में लेखक, तिथि, पद्धति और वित्त-पोषण की जानकारी होगी, साथ ही परिवारों के लिए सरल भाषा में सारांश।"
                />
              </p>
              <ButtonLink href="/contact" variant="secondary">
                <T en="Propose a collaboration" hi="सहयोग का प्रस्ताव दें" />
              </ButtonLink>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
