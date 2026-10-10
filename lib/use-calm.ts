"use client";

import { useEffect, useState } from "react";

/**
 * True when the reader asks their device to reduce motion.
 * Hydration-safe: always false on the server and on the first client render,
 * then updates after mount (motion's own hook reads the media query during the
 * first render, which makes server and client markup disagree).
 */
export function useCalm(): boolean {
  const [calm, setCalm] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setCalm(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return calm;
}
