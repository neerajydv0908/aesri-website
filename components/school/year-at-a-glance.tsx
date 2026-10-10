import clsx from "clsx";
import { T } from "@/components/i18n";
import { monthName, todayIST } from "@/content/notices";
import type { CalendarItem } from "@/content/types";

const kindStyles: Record<CalendarItem["kind"], string> = {
  fees: "bg-school text-cream-50",
  holiday: "bg-sage-200 text-forest-900",
  exam: "bg-ochre-400/30 text-forest-900",
  event: "bg-cream-300 text-forest-900",
  admissions: "bg-forest-700 text-cream-50",
};

/** A 12-month strip for the session (April → March) with today's month marked. */
export function YearAtAGlance({ session, items }: { session: string; items: CalendarItem[] }) {
  const startYear = Number(session.slice(0, 4));
  const months = Array.from({ length: 12 }, (_, i) => {
    const m = (3 + i) % 12; // April first
    const y = startYear + (3 + i >= 12 ? 1 : 0);
    return { key: `${y}-${String(m + 1).padStart(2, "0")}`, m, y };
  });
  const thisMonth = todayIST().slice(0, 7);

  return (
    // Scrolls sideways on a phone: focusable, so it can be scrolled with the keyboard too.
    <div role="region" aria-label="Session calendar, April to March" tabIndex={0} className="no-scrollbar -mx-4 overflow-x-auto px-4">
      {/* Wide enough that each month's entries fit ("4–15 November", "Independence Day"); narrower screens scroll sideways. */}
      <ol className="grid min-w-[1264px] grid-cols-12 gap-2">
        {months.map(({ key, m, y }) => {
          const here = items.filter((it) => it.month === key);
          const now = key === thisMonth;
          return (
            <li key={key} className={clsx("flex min-h-44 flex-col rounded-2xl p-3", now ? "bg-cream-50 ring-2 ring-school" : "bg-cream-50/60 ring-1 ring-forest-900/[0.07]")}>
              <p className="flex items-baseline justify-between gap-1">
                <span className="font-display text-lg text-forest-900">
                  <T en={monthName(m)} hi={monthName(m, "hi")} />
                </span>
                <span className="text-[0.7rem] text-muted">{y}</span>
              </p>
              {now ? (
                <span className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-school">
                  <T en="Now" hi="अभी" />
                </span>
              ) : null}
              <ul className="mt-3 space-y-2">
                {here.map((it) => (
                  <li key={it.label.en} className={clsx("rounded-xl px-2.5 py-2 text-[0.78rem] leading-snug", kindStyles[it.kind], !it.confirmed && "border border-dashed border-forest-900/25")}>
                    <span className="block font-semibold">
                      <T t={it.label} />
                    </span>
                    {it.detail ? (
                      <span className="block opacity-80">
                        <T t={it.detail} />
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
