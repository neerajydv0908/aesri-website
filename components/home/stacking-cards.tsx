"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useCalm } from "@/lib/use-calm";
import { useRef, type ReactNode } from "react";

/**
 * Cards that pin one after another and gently recede as the next arrives.
 */
export function StackingCards({ items }: { items: ReactNode[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <div ref={ref} className="relative">
      {items.map((item, i) => (
        <StackCard key={i} index={i} total={items.length} progress={scrollYProgress}>
          {item}
        </StackCard>
      ))}
    </div>
  );
}

function StackCard({ children, index, total, progress }: { children: ReactNode; index: number; total: number; progress: MotionValue<number> }) {
  const reduce = useCalm();
  const start = index / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - index - 1) * 0.04]);
  return (
    <div className="sticky" style={{ top: `calc(7rem + ${index * 1.5}rem)` }}>
      <motion.div style={reduce ? undefined : { scale }} className="mb-8 origin-top will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
