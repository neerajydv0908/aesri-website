"use client";

import { MotionConfig, cancelFrame, frame, type FrameData } from "motion/react";
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/** Jump to the top instantly on every route change (Lenis keeps its own scroll state). */
function RouteScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();
  useEffect(() => {
    if (window.location.hash) return;
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
  }, [pathname, lenis]);
  return null;
}

/**
 * Runs Lenis inside Motion's frame loop, at its first step ("setup"), so the
 * page has already moved when Motion reads the scroll position. With Lenis on
 * its own requestAnimationFrame loop, Motion read the scroll before Lenis
 * moved it, and every scroll-linked animation trailed one frame behind.
 */
function LenisFrameSync() {
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    const tick = ({ timestamp }: FrameData) => lenis.raf(timestamp);
    frame.setup(tick, true);
    return () => cancelFrame(tick);
  }, [lenis]);
  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();

  return (
    <MotionConfig reducedMotion="user" transition={{ ease: [0.16, 1, 0.3, 1] }}>
      <ReactLenis
        root
        options={{
          lerp: 0.085,
          wheelMultiplier: 0.95,
          // Respect "reduce motion": fall back to the browser's native scrolling.
          smoothWheel: !reduced,
          syncTouch: false,
          anchors: { offset: -96 },
          // Driven by LenisFrameSync below instead of its own animation loop.
          autoRaf: false,
        }}
      >
        <LenisFrameSync />
        <RouteScrollReset />
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}
