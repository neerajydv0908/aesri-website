"use client";

import { motion } from "motion/react";
import { useCalm } from "@/lib/use-calm";
import Image from "next/image";
import type { Img } from "@/content/types";

const tilts = [-4, 3, -2, 5, -3, 2, -5, 4];

/**
 * Small archive photos (scanned from the school prospectus) shown as a
 * scattered set of polaroids — the frame makes modest resolution feel
 * intentional. Each settles into place as it scrolls into view.
 */
export function Polaroids({ items }: { items: Img[] }) {
  const reduce = useCalm();
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((m, i) => (
        <motion.li
          key={m.caption ?? i}
          initial={reduce ? false : { opacity: 0, y: 50, rotate: tilts[i % tilts.length] * 2.2 }}
          whileInView={{ opacity: 1, y: 0, rotate: tilts[i % tilts.length] }}
          whileHover={reduce ? undefined : { rotate: 0, scale: 1.04, y: -6, zIndex: 10 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 120, damping: 16, delay: (i % 4) * 0.06 }}
          className="relative"
        >
          <figure className="bg-cream-50 p-2.5 pb-3 shadow-[0_22px_40px_-26px_rgba(19,39,28,0.6)] ring-1 ring-forest-900/[0.06]">
            <div className="relative aspect-[4/3] overflow-hidden bg-cream-200">
              <Image src={m.src} alt={m.alt} fill sizes="(min-width: 1024px) 20vw, 45vw" placeholder="blur" className="object-cover" />
            </div>
            <figcaption className="mt-2.5 px-1 text-center font-display text-[0.95rem] italic text-forest-800">{m.caption}</figcaption>
          </figure>
        </motion.li>
      ))}
    </ul>
  );
}
