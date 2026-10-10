"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useCalm } from "@/lib/use-calm";
import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { VideoCard } from "@/components/ui/video-card";
import { T } from "@/components/i18n";
import { clips, img } from "@/content/media";

/** The layered photo/video collage in the home hero, with gentle parallax. */
export function HeroMedia() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useCalm();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yVideo = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const yPhoto = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const yBadge = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <div ref={ref} className="relative mx-auto aspect-[4/5] w-full max-w-[34rem] lg:mx-0 lg:ml-auto">
      {/* Tall video card */}
      <motion.div style={reduce ? undefined : { y: yVideo }} className="absolute right-0 top-0 h-[88%] w-[64%]">
        <div className="fade-up intro-aware relative h-full w-full" style={{ "--d": "250ms" } as CSSProperties}>
          <VideoCard clip={clips.surveyGirls} priority showCaption={false} className="h-full w-full shadow-[0_40px_80px_-30px_rgba(13,28,20,0.55)]" />
          <span className="absolute left-4 top-4 rounded-full bg-cream-50/90 px-3 py-1.5 text-[0.75rem] font-semibold text-forest-900 backdrop-blur">
            <T en="Plane-table survey · Aryavart, Palana" hi="प्लेन-टेबल सर्वेक्षण · आर्यवर्त, पलाना" />
          </span>
        </div>
      </motion.div>

      {/* Campus photo */}
      <motion.div style={reduce ? undefined : { y: yPhoto }} className="absolute bottom-0 left-0 w-[58%]">
        <div className="fade-up intro-aware" style={{ "--d": "450ms" } as CSSProperties}>
          <figure className="overflow-hidden rounded-[1.4rem] border-[6px] border-cream-50 bg-cream-50 shadow-[0_30px_60px_-28px_rgba(13,28,20,0.5)]">
            <div className="relative aspect-[4/3]">
              <Image
                src={img.aadharshila.campus.src}
                alt={img.aadharshila.campus.alt}
                fill
                priority
                sizes="(min-width: 1024px) 20rem, 58vw"
                className="object-cover"
                placeholder="blur"
              />
            </div>
            <figcaption className="px-3 pb-1.5 pt-2.5 text-[0.78rem] font-semibold text-forest-800">
              <T en="Aadharshila · Udairamsar" hi="आधारशिला · उदयरामसर" />
            </figcaption>
          </figure>
        </div>
      </motion.div>

      {/* Rotating seal */}
      <motion.div style={reduce ? undefined : { y: yBadge }} className="absolute left-[6%] top-[8%] w-[30%] max-w-[9.5rem]">
        <div className="fade-up intro-aware" style={{ "--d": "650ms" } as CSSProperties}>
          <div className="relative aspect-square rounded-full bg-cream-50 shadow-[0_20px_40px_-24px_rgba(13,28,20,0.45)]">
            <motion.div style={reduce ? undefined : { rotate }} className="absolute inset-0">
              {/* The slow spin turns this wrapper rather than the <svg>: spinning the svg
                  itself made the browser re-lay-out the curved text on every frame. */}
              <div className="h-full w-full animate-spin-slow">
                <svg viewBox="0 0 200 200" className="h-full w-full text-forest-800" aria-hidden="true">
                  <defs>
                    <path id="seal-circle" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
                  </defs>
                  <text className="fill-current text-[15.5px] font-bold uppercase tracking-[0.32em]">
                    <textPath href="#seal-circle">Palana · Udairamsar · Bikaner ·</textPath>
                  </text>
                </svg>
              </div>
            </motion.div>
            <svg viewBox="0 0 64 64" className="absolute inset-[31%] text-forest-700" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14.5 28.5C14.5 19 22.4 12.5 32 12.5S49.5 19 49.5 28.5c-3.4-1.9-6.6-2.3-9.4-1.1-2.5-2.7-5.3-3.8-8.1-3.8s-5.6 1.1-8.1 3.8c-2.8-1.2-6-.8-9.4 1.1Z" />
              <path d="M32 45V27.5M32 37c-2.8-2.1-4.9-4.7-6-8.3M32 33.5c2.4-1.7 4.3-3.9 5.3-7" />
              <path d="M17.5 45.5c5-2.4 9.8-2.4 14.5 0 4.7-2.4 9.5-2.4 14.5 0v4c-5-2.4-9.8-2.4-14.5 0-4.7-2.4-9.5-2.4-14.5 0v-4Z" />
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
