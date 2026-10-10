"use client";

import clsx from "clsx";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Clip } from "@/content/types";

/**
 * A silent looping video that only plays while on screen. Every card has a
 * visible pause/play control (WCAG 2.2.2), and nothing autoplays for people
 * who ask their device to reduce motion.
 */
export function VideoCard({
  clip,
  className,
  rounded = "rounded-[var(--radius-card)]",
  showCaption = true,
  priority = false,
  tone = "light",
}: {
  clip: Clip;
  className?: string;
  rounded?: string;
  showCaption?: boolean;
  priority?: boolean;
  tone?: "light" | "dark";
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    if (mq.matches) setUserPaused(true);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused) {
          v.play().catch(() => undefined);
        } else {
          v.pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [userPaused]);

  function toggle() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      setUserPaused(false);
      v.play().catch(() => undefined);
    } else {
      setUserPaused(true);
      v.pause();
    }
  }

  return (
    <figure className={clsx("group relative isolate overflow-hidden bg-forest-900", rounded, className)}>
      <video
        ref={ref}
        className="h-full w-full object-cover"
        src={clip.video}
        poster={clip.poster}
        muted
        loop
        playsInline
        preload={priority ? "auto" : "none"}
        aria-label={clip.alt}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        width={clip.width}
        height={clip.height}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-forest-950/70 to-transparent" />
      {showCaption && clip.caption ? (
        <figcaption className="absolute bottom-4 left-4 right-16 text-[0.8rem] font-semibold leading-snug text-cream-50/95">{clip.caption}</figcaption>
      ) : null}
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause video" : "Play video"}
        className={clsx(
          "absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full backdrop-blur-md transition-all duration-300",
          tone === "light" ? "bg-cream-50/85 text-forest-900 hover:bg-cream-50" : "bg-forest-900/70 text-cream-50 hover:bg-forest-900",
          reduce || !playing ? "opacity-100" : "opacity-70 group-hover:opacity-100 focus-visible:opacity-100",
        )}
      >
        {playing ? <Pause className="h-4 w-4" aria-hidden /> : <Play className="h-4 w-4 translate-x-[1px]" aria-hidden />}
      </button>
    </figure>
  );
}
