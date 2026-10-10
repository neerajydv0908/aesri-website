import type { Metadata } from "next";
import { Briefcase, HeartHandshake, ShieldCheck, Sprout } from "lucide-react";
import { T } from "@/components/i18n";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { FactText, SectionIntro } from "@/components/ui/bits";
import { PageHero } from "@/components/ui/page-hero";
import { hiringSteps, vacancies } from "@/content/org";
import { getSchoolByKey } from "@/content/schools";
import { site } from "@/content/site";
import { isPending } from "@/content/types";

export const metadata: Metadata = {
  title: "Careers",
  description: "Teach and work at AESRI's schools in Palana and Udairamsar, Bikaner.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: { en: "Home", hi: "मुख्य पृष्ठ" } },
          { href: "/careers", label: { en: "Careers", hi: "करियर" } },
        ]}
        eyebrow={<T en="Careers" hi="करियर" />}
        title={{ en: "Teach where it matters.", hi: "वहाँ पढ़ाएँ, जहाँ सबसे ज़्यादा ज़रूरत है।" }}
        lead={
          <T
            en="Our teachers are the reason families in Palana and Udairamsar trust us. If you'd like to join them, we'd love to hear from you."
            hi="हमारे शिक्षकों की वजह से ही पलाना और उदयरामसर के परिवार हम पर भरोसा करते हैं। यदि आप उनसे जुड़ना चाहते हैं, तो हमें बताएँ।"
          />
        }
      />

      <section className="pb-24">
        <div className="container-x">
          <Stagger className="grid gap-5 md:grid-cols-3">
            {[
              { icon: <Sprout className="h-6 w-6" />, t: "Real responsibility", b: "Small schools mean you'll know every child in your class — and see the difference you make." },
              { icon: <HeartHandshake className="h-6 w-6" />, t: "A caring staffroom", b: "Two teams, one family. Colleagues across both schools share ideas, materials and support." },
              { icon: <Briefcase className="h-6 w-6" />, t: "Your school, clearly named", b: "Every vacancy names the school it belongs to. If you teach at both, your two roles are kept clearly separate." },
            ].map((x) => (
              <div key={x.t} className="h-full rounded-[1.75rem] bg-cream-50 p-8 ring-1 ring-forest-900/[0.07]">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-sage-100 text-forest-700" aria-hidden>
                  {x.icon}
                </span>
                <h2 className="mt-6 font-display text-[1.55rem] leading-tight text-forest-900">{x.t}</h2>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">{x.b}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-cream-200/50 py-24 sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionIntro eyebrow={<T en="Openings" hi="रिक्तियाँ" />} title={<T en="Current vacancies." hi="वर्तमान रिक्तियाँ।" />} />
          {vacancies.length ? (
            <ul className="space-y-4">
              {vacancies.map((v) => (
                <li key={v.id} className="rounded-[1.5rem] bg-cream-50 p-7 ring-1 ring-forest-900/[0.07]">
                  <p className="text-[0.72rem] font-bold uppercase tracking-[0.15em] text-forest-600">
                    {v.school === "aesri" ? "AESRI" : getSchoolByKey(v.school).name.en} · {v.type}
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-forest-900">{v.title}</h3>
                  <p className="mt-2 text-muted">{v.summary}</p>
                  <p className="mt-3 text-sm text-muted">
                    {v.qualification} · closes {v.closesOn}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <Reveal className="rounded-[1.75rem] border border-dashed border-forest-900/20 bg-cream-50/50 p-8">
              <p className="font-display text-[1.6rem] leading-snug text-forest-900">
                <T en="There are no open positions right now." hi="अभी कोई रिक्ति नहीं है।" />
              </p>
              <p className="mt-3 text-muted">
                <T
                  en="You're welcome to leave your CV at either school office, and we'll get in touch if a suitable role opens."
                  hi="आप अपना बायोडाटा किसी भी विद्यालय कार्यालय में दे सकते हैं; उपयुक्त पद खुलने पर हम संपर्क करेंगे।"
                />
              </p>
              <p className="mt-5 flex flex-wrap items-center gap-2 text-sm text-muted">
                <T en="Email for applications:" hi="आवेदन हेतु ईमेल:" />{" "}
                {isPending(site.contact.email) ? (
                  <FactText value={site.contact.email} />
                ) : (
                  <a href={`mailto:${site.contact.email}`} className="break-all font-semibold text-forest-800 underline underline-offset-2">
                    {site.contact.email}
                  </a>
                )}
              </p>
            </Reveal>
          )}
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-x">
          <SectionIntro eyebrow={<T en="How we hire" hi="भर्ती प्रक्रिया" />} title={<T en="Four simple steps." hi="चार सरल चरण।" />} />
          <Stagger className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {hiringSteps.map((s, i) => (
              <div key={s.title} className="h-full rounded-[1.75rem] bg-cream-50 p-7 ring-1 ring-forest-900/[0.07]">
                <span className="font-display text-4xl text-ochre-500">{i + 1}</span>
                <h3 className="mt-5 font-display text-xl text-forest-900">{s.title}</h3>
                <p className="mt-2 text-[0.97rem] text-muted">{s.body}</p>
              </div>
            ))}
          </Stagger>
          <Reveal className="mt-8 flex gap-4 rounded-[1.5rem] bg-sage-100 p-6 text-forest-900">
            <ShieldCheck className="h-6 w-6 shrink-0 text-forest-700" aria-hidden />
            <p className="text-[0.98rem]">
              <T
                en="Everyone who works with children in our schools goes through reference and background checks before starting. When someone leaves, their access to school systems is removed."
                hi="हमारे विद्यालयों में बच्चों के साथ काम करने वाले हर व्यक्ति की कार्यभार ग्रहण से पहले संदर्भ एवं पृष्ठभूमि जाँच होती है। किसी के जाने पर विद्यालय प्रणालियों की उसकी पहुँच समाप्त कर दी जाती है।"
              />
            </p>
          </Reveal>
          <div className="mt-10">
            <ButtonLink href="/contact">
              <T en="Contact us" hi="संपर्क करें" />
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
