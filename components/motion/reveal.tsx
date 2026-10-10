"use client";

import clsx from "clsx";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useCalm } from "@/lib/use-calm";
import { Children, useEffect, useRef, useState, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/* Fade-and-rise when scrolled into view                               */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  x = 0,
  amount = 0.2,
  duration = 1,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  amount?: number;
  duration?: number;
  as?: "div" | "li" | "section" | "article" | "span" | "p" | "figure";
}) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

/* ------------------------------------------------------------------ */
/* Stagger a list of children                                          */
/* ------------------------------------------------------------------ */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  y = 28,
  amount = 0.15,
  as = "div",
  itemClassName,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  y?: number;
  amount?: number;
  as?: "div" | "ul" | "ol";
  itemClassName?: string;
}) {
  const Comp = motion[as] as typeof motion.div;
  const Item = (as === "div" ? motion.div : motion.li) as typeof motion.div;
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {Children.toArray(children).map((child, i) => (
        <Item
          key={i}
          className={itemClassName}
          variants={{
            hidden: { opacity: 0, y },
            show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
          }}
        >
          {child}
        </Item>
      ))}
    </Comp>
  );
}

/* ------------------------------------------------------------------ */
/* Headline words rising out of a mask when in view                    */
/* ------------------------------------------------------------------ */
export function RevealWords({
  text,
  className,
  emphasis,
  emphasisClassName = "italic text-forest-600",
  delay = 0,
  stagger = 0.045,
  as = "span",
}: {
  text: string;
  className?: string;
  /** Words (exact match, punctuation included) to set in the accent style. */
  emphasis?: string[];
  emphasisClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const words = text.split(" ");
  const Tag = as;
  return (
    <Tag ref={ref as never} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={i} className="word-mask inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
            <motion.span
              className={clsx("inline-block will-change-transform", emphasis?.includes(w) && emphasisClassName)}
              initial={{ y: "108%" }}
              animate={inView ? { y: "0%" } : undefined}
              transition={{ duration: 1.05, ease: EASE, delay: delay + i * stagger }}
            >
              {w}
            </motion.span>
            {i < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Paragraph whose words light up as you scroll through it             */
/* ------------------------------------------------------------------ */
function ScrollWord({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="transition-none">
      {children}
    </motion.span>
  );
}

export function ScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useCalm();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {reduce ? (
        text
      ) : (
        <>
          <span className="sr-only">{text}</span>
          <span aria-hidden="true">
            {words.map((w, i) => (
              <span key={i}>
                <ScrollWord progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                  {w}
                </ScrollWord>{" "}
              </span>
            ))}
          </span>
        </>
      )}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Parallax: move a child at a different speed from the page          */
/* ------------------------------------------------------------------ */
export function Parallax({
  children,
  className,
  offset = 60,
  scale,
}: {
  children: ReactNode;
  className?: string;
  offset?: number;
  scale?: [number, number];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useCalm();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const s = useTransform(scrollYProgress, [0, 1], scale ?? [1, 1]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y, scale: s }} className="h-full w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Image/panel reveal: a clip-path wipe with a gentle zoom-out         */
/* ------------------------------------------------------------------ */
export function ClipReveal({
  children,
  className,
  delay = 0,
  from = "bottom",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "bottom" | "left" | "right";
}) {
  const start = from === "bottom" ? "inset(100% 0% 0% 0%)" : from === "left" ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)";
  // The outer element is observed (a fully clipped element never "intersects"),
  // and the inner one is wiped open.
  return (
    <motion.div className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <motion.div
        className="h-full w-full overflow-hidden rounded-[inherit]"
        variants={{ hidden: { clipPath: start }, show: { clipPath: "inset(0% 0% 0% 0%)" } }}
        transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1], delay }}
      >
        <motion.div
          className="h-full w-full"
          variants={{ hidden: { scale: 1.18 }, show: { scale: 1 } }}
          transition={{ duration: 1.8, ease: EASE, delay }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Count up to a number when in view                                   */
/* ------------------------------------------------------------------ */
export function Counter({ to, className, duration = 1.8 }: { to: number; className?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);
  const reduce = useCalm();
  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, { duration, ease: EASE, onUpdate: (v) => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [inView, to, duration, reduce]);
  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{value}</span>
      <span className="sr-only">{to}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Magnetic hover for primary calls to action (fine pointers only)     */
/* ------------------------------------------------------------------ */
export function Magnetic({ children, strength = 0.25, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });
  const reduce = useCalm();

  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }
  return (
    <motion.div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} style={{ x: sx, y: sy }} className={clsx("inline-block", className)}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* A vertical line that draws itself as you scroll past               */
/* ------------------------------------------------------------------ */
export function ScrollLine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.55"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <div ref={ref} className={clsx("absolute", className)} aria-hidden="true">
      <div className="absolute inset-0 bg-forest-900/10" />
      <motion.div style={{ scaleY }} className="absolute inset-0 origin-top bg-forest-600" />
    </div>
  );
}
