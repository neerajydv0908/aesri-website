"use client";

import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from "motion/react";
import { useCalm } from "@/lib/use-calm";
import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";

/**
 * School card media with parallax and a soft spotlight that follows the
 * pointer. Content (text, links) is passed in from the server.
 */
export function SchoolCardShell({
  href,
  image,
  alt,
  children,
}: {
  href: string;
  image: import("next/image").StaticImageData;
  alt: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useCalm();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, rgba(246,241,231,0.16), transparent 60%)`;

  return (
    <div
      ref={ref}
      className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-cream-50 shadow-[0_1px_0_rgba(19,39,28,0.06),0_30px_60px_-40px_rgba(19,39,28,0.45)] ring-1 ring-forest-900/[0.06]"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 100);
        my.set(((e.clientY - r.top) / r.height) * 100);
      }}
    >
      <Link href={href} className="relative block aspect-[5/4] overflow-hidden" aria-hidden="true" tabIndex={-1}>
        <motion.div style={reduce ? undefined : { y }} className="absolute -inset-y-[10%] inset-x-0">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            placeholder="blur"
            className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
        </motion.div>
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: spotlight }} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-forest-950/55 to-transparent" />
      </Link>
      {children}
    </div>
  );
}
