"use client";

import clsx from "clsx";
import { AnimatePresence, motion, useInView } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { VideoCard } from "@/components/ui/video-card";
import type { Clip, Img } from "@/content/types";

export type StoryStep = {
  kicker: string;
  title: string;
  body: ReactNode;
  media: Img | Clip;
};

const isClip = (m: Img | Clip): m is Clip => (m as Clip).video !== undefined;

/**
 * Scrollytelling: text steps scroll on the left while the media on the right
 * stays pinned and cross-fades to match the step in view.
 */
export function StickyStory({ steps }: { steps: StoryStep[] }) {
  const [active, setActive] = useState(0);
  const current = steps[active];

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
      <div>
        {steps.map((s, i) => (
          <Step key={s.title} index={i} onActive={setActive} active={active === i}>
            <p className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-none tracking-[-0.04em] text-ochre-600">{s.kicker}</p>
            <h3 className="mt-5 font-display text-[clamp(1.7rem,2.6vw,2.4rem)] leading-tight text-forest-900">{s.title}</h3>
            <div className="mt-5 text-[1.05rem] leading-relaxed text-muted">{s.body}</div>
            {/* Inline media on small screens */}
            <div className="mt-8 lg:hidden">
              <Media m={s.media} />
            </div>
          </Step>
        ))}
      </div>
      <div className="hidden lg:block">
        <div className="sticky top-28 h-[calc(100vh-9rem)]">
          <div className="relative h-full overflow-hidden rounded-[2rem] bg-cream-200">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.06, clipPath: "inset(12% 0% 0% 0%)" }}
                animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Media m={current.media} fill />
              </motion.div>
            </AnimatePresence>
            <div className="pointer-events-none absolute right-5 top-5 flex gap-1.5">
              {steps.map((_, i) => (
                <span key={i} className={clsx("h-1.5 rounded-full transition-all duration-500", i === active ? "w-8 bg-cream-50" : "w-1.5 bg-cream-50/50")} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step({ children, index, onActive, active }: { children: ReactNode; index: number; onActive: (i: number) => void; active: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);
  return (
    <div ref={ref} className="py-10 lg:flex lg:min-h-[70vh] lg:flex-col lg:justify-center">
      <div className={clsx("border-l-2 pl-6 transition-colors duration-700 sm:pl-8", active ? "border-ochre-500" : "border-forest-900/10")}>{children}</div>
    </div>
  );
}

function Media({ m, fill }: { m: Img | Clip; fill?: boolean }) {
  if (isClip(m)) {
    return <VideoCard clip={m} className={fill ? "h-full w-full" : "aspect-[4/5] w-full"} rounded={fill ? "rounded-none" : undefined} />;
  }
  return (
    <figure className={clsx("relative overflow-hidden", fill ? "h-full w-full" : "aspect-[4/3] w-full rounded-[1.5rem]")}>
      <Image src={m.src} alt={m.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" placeholder="blur" className={clsx(fill && m.src.height > m.src.width ? "object-contain bg-cream-200 p-6" : "object-cover")} />
      {m.caption ? <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-forest-950/70 to-transparent p-5 pt-12 text-sm font-semibold text-cream-50">{m.caption}</figcaption> : null}
    </figure>
  );
}
