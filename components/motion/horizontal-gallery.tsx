"use client";

import clsx from "clsx";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * On large screens the section pins while its track slides sideways with the
 * vertical scroll. On phones, tablets and for "reduce motion" it becomes a
 * normal swipeable row with scroll-snap.
 */
export function HorizontalGallery({ intro, children, className }: { intro: ReactNode; children: ReactNode; className?: string }) {
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPinned(wide.matches && !calm.matches);
    update();
    wide.addEventListener("change", update);
    calm.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      calm.removeEventListener("change", update);
    };
  }, []);

  if (!pinned) {
    return (
      <section className={clsx("py-24 sm:py-32", className)}>
        <div className="container-x">{intro}</div>
        <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[max(1rem,calc((100vw-1380px)/2+3.25rem))] pb-4">
          {children}
        </div>
      </section>
    );
  }

  return <PinnedTrack intro={intro} className={className}>{children}</PinnedTrack>;
}

function PinnedTrack({ intro, children, className }: { intro: ReactNode; children: ReactNode; className?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 32, restDelta: 0.0005 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const bar = useTransform(smooth, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} className={clsx("relative", className)} style={{ height: `calc(100vh + ${Math.round(distance * 0.8)}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex w-max items-center gap-6 pl-[max(1rem,calc((100vw-1380px)/2+3.25rem))] pr-[8vw] will-change-transform">
          <div className="w-[min(34rem,40vw)] shrink-0 pr-8">{intro}</div>
          {children}
        </motion.div>
        <div className="container-x mt-10">
          <div className="h-px w-full bg-forest-900/10">
            <motion.div style={{ scaleX: bar }} className="h-px origin-left bg-forest-700" />
          </div>
        </div>
      </div>
    </section>
  );
}
