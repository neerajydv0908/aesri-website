"use client";

import clsx from "clsx";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useMemo, useState } from "react";
import { T } from "@/components/i18n";
import { NoticeCard } from "@/components/school/notice-list";
import { categoryLabels } from "@/content/notices";
import type { Notice, NoticeCategory } from "@/content/types";

/** Filterable notice board with an archive of expired notices. */
export function NoticeBoard({ active, archived }: { active: Notice[]; archived: Notice[] }) {
  const [filter, setFilter] = useState<NoticeCategory | "all">("all");
  const [showArchive, setShowArchive] = useState(false);
  const categories = useMemo(() => Array.from(new Set(active.map((n) => n.category))), [active]);
  const list = filter === "all" ? active : active.filter((n) => n.category === filter);

  return (
    <div>
      <LayoutGroup>
        <div role="group" aria-label="Filter notices by category" className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {(["all", ...categories] as const).map((c) => {
            const on = filter === c;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(c)}
                className={clsx(
                  "relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  on ? "text-cream-50" : "text-forest-900/75 ring-1 ring-forest-900/15 hover:text-forest-900 hover:ring-forest-900/35",
                )}
              >
                {on ? <motion.span layoutId="notice-filter" className="absolute inset-0 rounded-full bg-school" transition={{ type: "spring", stiffness: 380, damping: 32 }} /> : null}
                <span className="relative">{c === "all" ? <T en="All" hi="सभी" /> : <T t={categoryLabels[c]} />}</span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      <motion.ul layout className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-live="polite">
        <AnimatePresence mode="popLayout">
          {list.map((n) => (
            <motion.li
              key={n.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <NoticeCard notice={n} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      {list.length === 0 ? (
        <p className="mt-8 text-muted">
          <T en="No current notices in this category." hi="इस श्रेणी में कोई वर्तमान सूचना नहीं है।" />
        </p>
      ) : null}

      {archived.length ? (
        <div className="mt-14 border-t border-forest-900/10 pt-8">
          <button
            type="button"
            aria-expanded={showArchive}
            onClick={() => setShowArchive((v) => !v)}
            className="text-sm font-semibold text-forest-800 underline underline-offset-4 hover:text-forest-900"
          >
            {showArchive ? <T en="Hide archived notices" hi="पुरानी सूचनाएँ छिपाएँ" /> : <T en={`Show archived notices (${archived.length})`} hi={`पुरानी सूचनाएँ देखें (${archived.length})`} />}
          </button>
          <AnimatePresence initial={false}>
            {showArchive ? (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 grid gap-5 overflow-hidden md:grid-cols-2 xl:grid-cols-3"
              >
                {archived.map((n) => (
                  <li key={n.id}>
                    <NoticeCard notice={n} archived />
                  </li>
                ))}
              </motion.ul>
            ) : null}
          </AnimatePresence>
        </div>
      ) : null}
    </div>
  );
}
