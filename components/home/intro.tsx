"use client";

import { useEffect, useState } from "react";
import { AesriEmblem } from "@/components/brand/emblems";

/**
 * Opening curtain for the home page. It is pure CSS, so it starts painting
 * before JavaScript loads; <html data-intro="skip"> hides it on repeat visits
 * and on every client-side navigation.
 */
export function Intro() {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro === "skip") {
      setMounted(false);
      return;
    }
    const t = window.setTimeout(() => {
      root.dataset.intro = "skip";
      setMounted(false);
    }, 2600);
    return () => window.clearTimeout(t);
  }, []);

  if (!mounted) return null;

  return (
    <div className="intro" aria-hidden="true">
      <div className="flex flex-col items-center gap-6">
        <AesriEmblem className="h-20 w-20 text-sage-200" draw title="" />
        <div className="intro__word text-center">
          <p className="font-display text-4xl tracking-[-0.02em] text-cream-50">AESRI</p>
          <p className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-sage-300">Bikaner · Rajasthan</p>
        </div>
      </div>
    </div>
  );
}
