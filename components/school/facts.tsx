import type { ReactNode } from "react";
import { T } from "@/components/i18n";
import { FactBi, FactText } from "@/components/ui/bits";
import { formatDate } from "@/content/notices";
import type { School } from "@/content/schools";
import { isPending, type Bi } from "@/content/types";

function Item({ label, children }: { label: Bi; children: ReactNode }) {
  return (
    <div className="bg-cream-50 p-6">
      <dt className="text-[0.72rem] font-bold uppercase tracking-[0.15em] text-muted">
        <T t={label} />
      </dt>
      <dd className="mt-2 text-[1.05rem] font-semibold leading-snug text-forest-900">{children}</dd>
    </div>
  );
}

/** Key facts about a school; unconfirmed facts show a "To be confirmed" chip. */
export function SchoolFacts({ school }: { school: School }) {
  const t = school.timings;
  return (
    <dl className="grid gap-px overflow-hidden rounded-[1.75rem] bg-forest-900/10 ring-1 ring-forest-900/[0.07] sm:grid-cols-2 lg:grid-cols-3">
      <Item label={{ en: "Founded", hi: "स्थापना" }}>
        {isPending(school.established) ? <FactText value={school.established} /> : <T en={school.established.label} hi={formatDate(school.established.iso, "hi")} />}
      </Item>
      <Item label={{ en: "Classes", hi: "कक्षाएँ" }}>
        <FactBi value={school.classes} />
      </Item>
      <Item label={{ en: "Medium", hi: "माध्यम" }}>
        <FactBi value={school.medium} />
      </Item>
      <Item label={{ en: "Type", hi: "प्रकार" }}>
        {isPending(school.coEd) ? <FactText value={school.coEd} /> : school.coEd ? <T en="Co-educational" hi="सह-शिक्षा" /> : <T en="Single-sex" hi="एकल" />}
      </Item>
      <Item label={{ en: "School timings", hi: "विद्यालय समय" }}>
        {isPending(t) ? (
          <FactText value={t} />
        ) : (
          <span className="block text-[0.98rem]">
            <T en="Summer" hi="ग्रीष्म" /> · <T t={t.summer} />
            <br />
            <T en="Winter" hi="शीत" /> · <T t={t.winter} />
          </span>
        )}
      </Item>
      <Item label={{ en: "Head of school", hi: "संस्था प्रधान" }}>
        <FactText value={school.principal} />
      </Item>
    </dl>
  );
}
