import type { Metadata } from "next";
import { T } from "@/components/i18n";
import { Reveal } from "@/components/motion/reveal";
import { ArrowLink } from "@/components/ui/button";
import { FactText } from "@/components/ui/bits";
import { PageHero } from "@/components/ui/page-hero";
import { getSchool } from "@/content/schools";
import { isPending } from "@/content/types";
import { loadSchool, type SchoolPageProps } from "@/lib/school-page";

export async function generateMetadata({ params }: SchoolPageProps): Promise<Metadata> {
  const s = getSchool((await params).school);
  return { title: "School information and disclosures", description: s ? `Key facts about ${s.name.en}.` : undefined };
}

export default async function DisclosuresPage({ params }: SchoolPageProps) {
  const school = await loadSchool(params);
  const base = `/schools/${school.slug}`;
  // A row still waiting for its value stays off the page until it is filled in.
  const rows = school.disclosures.filter((row) => !isPending(row.value));

  return (
    <>
      <PageHero
        offsetHeader={false}
        tone="school"
        crumbs={[
          { href: base, label: school.name },
          { href: `${base}/disclosures`, label: { en: "Information & disclosures", hi: "विद्यालय जानकारी" } },
        ]}
        eyebrow={<T en="Information & disclosures" hi="विद्यालय जानकारी" />}
        title={{ en: "School information and disclosures", hi: "विद्यालय जानकारी एवं प्रकटीकरण" }}
        lead={
          <T
            en="Key facts about the school, at a glance."
            hi="विद्यालय से जुड़ी मुख्य जानकारी, एक नज़र में।"
          />
        }
      />

      <section className="pb-10">
        <div className="container-x">
          <Reveal className="overflow-hidden rounded-[2rem] bg-cream-50 ring-1 ring-forest-900/[0.07]">
            <table className="w-full text-left">
              <caption className="sr-only">School information for {school.name.en}</caption>
              <thead className="hidden bg-cream-200/60 text-[0.72rem] uppercase tracking-[0.15em] text-muted md:table-header-group">
                <tr>
                  <th scope="col" className="px-7 py-4 font-bold">
                    <T en="Item" hi="विवरण" />
                  </th>
                  <th scope="col" className="px-7 py-4 font-bold">
                    <T en="Information" hi="जानकारी" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label.en} className="grid gap-2 border-t border-forest-900/[0.07] px-6 py-5 first:border-t-0 md:table-row md:px-0 md:py-0">
                    <th scope="row" className="font-semibold text-forest-900 md:w-[32%] md:px-7 md:py-5 md:align-top">
                      <T t={row.label} />
                    </th>
                    <td className="text-[0.98rem] text-forest-900 md:px-7 md:py-5 md:align-top">
                      <FactText value={row.value} />
                      {row.note ? <span className="mt-1 block text-[0.82rem] text-muted">{row.note}</span> : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <section className="pb-12">
        <div className="container-x flex flex-wrap gap-x-8 gap-y-3">
          <ArrowLink href={`${base}/fees`} className="text-school">
            <T en="Approved fee structure" hi="स्वीकृत शुल्क संरचना" />
          </ArrowLink>
          <ArrowLink href="/governance" className="text-school">
            <T en="AESRI governance" hi="एईएसआरआई प्रशासन" />
          </ArrowLink>
        </div>
      </section>
    </>
  );
}
