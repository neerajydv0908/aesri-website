"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useId, useState, type ReactNode } from "react";

export type AccordionItem = { q: ReactNode; a: ReactNode };

/** Accessible accordion (button + region) with a smooth height animation. */
export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return (
    <div className={clsx("divide-y divide-forest-900/10 border-y border-forest-900/10", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <h3>
              <button
                type="button"
                id={`${id}-q-${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="font-display text-[1.2rem] leading-snug text-forest-900 sm:text-[1.35rem]">{item.q}</span>
                <span
                  className={clsx(
                    "grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500",
                    isOpen ? "rotate-45 border-forest-800 bg-forest-800 text-cream-50" : "border-forest-900/15 text-forest-900 group-hover:border-forest-900/40",
                  )}
                  aria-hidden
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={`${id}-a-${i}`}
                  role="region"
                  aria-labelledby={`${id}-q-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="max-w-3xl pb-7 text-[1.02rem] leading-relaxed text-muted">{item.a}</div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
