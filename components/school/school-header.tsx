"use client";

import clsx from "clsx";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowLeft, ArrowUpRight, LogIn, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AesriEmblem, SchoolCrest } from "@/components/brand/emblems";
import { T } from "@/components/i18n";
import { LangToggle } from "@/components/lang-toggle";
import type { Bi, SchoolKey } from "@/content/types";
import { schoolPages } from "@/lib/school-pages";

export type SchoolNavData = {
  key: SchoolKey;
  slug: string;
  name: Bi;
  short: Bi;
  place: Bi;
  phone: string | null;
  sister: { slug: string; name: Bi };
};


/** Slim bar above each school site: the way back to AESRI and to the sister school. */
export function SchoolTopBar({ school }: { school: SchoolNavData }) {
  return (
    <div className="dark-surface bg-forest-950 text-[0.8rem] text-cream-100">
      <div className="container-x flex h-10 items-center justify-between gap-4">
        <Link href="/" className="group inline-flex min-h-6 items-center gap-2 font-semibold text-cream-100/90 hover:text-cream-50">
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-x-0.5" aria-hidden />
          <AesriEmblem className="h-5 w-5 text-sage-300" title="" />
          <span className="hidden sm:inline">
            <T en="An AESRI school" hi="एईएसआरआई का विद्यालय" />
          </span>
          <span className="sm:hidden">AESRI</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href={`/schools/${school.sister.slug}`} className="hidden min-h-6 items-center gap-1.5 text-cream-100/80 hover:text-cream-50 md:inline-flex">
            <T en="Sister school:" hi="सहयोगी विद्यालय:" /> <T t={school.sister.name} />
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
          <Link href="/portal" className="inline-flex min-h-6 items-center gap-1.5 text-cream-100/80 hover:text-cream-50">
            <LogIn className="h-3.5 w-3.5" aria-hidden />
            <T en="Portal" hi="पोर्टल" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function SchoolHeader({ school }: { school: SchoolNavData }) {
  const pathname = usePathname();
  const base = `/schools/${school.slug}`;
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 48);
    setHidden(y > 320 && y > prev + 2);
    if (y < prev - 2) setHidden(false);
  });

  const current = (page: string) => (page === "" ? pathname === base : pathname === `${base}/${page}` || pathname.startsWith(`${base}/${page}/`));

  // Keep the active tab visible in the horizontally scrolling sub-nav
  useEffect(() => {
    const el = navRef.current?.querySelector<HTMLElement>('[aria-current="page"]');
    el?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [pathname]);

  return (
    <motion.header
      initial={false}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={clsx(
        "sticky top-0 z-50 transition-[background-color,box-shadow] duration-500",
        solid ? "bg-cream-100/90 shadow-[0_1px_0_rgba(19,39,28,0.08)] backdrop-blur-xl backdrop-saturate-150" : "bg-cream-100",
      )}
    >
      <div className="container-x flex h-[72px] items-center justify-between gap-4">
        <Link href={base} className="group flex min-w-0 items-center gap-3" aria-label={`${school.name.en} — overview`}>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-school text-cream-50 transition-transform duration-700 group-hover:rotate-[-8deg]">
            <SchoolCrest school={school.key} className="h-7 w-7" />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-[1.3rem] text-forest-900 sm:text-[1.4rem]">
              <span className="sm:hidden">
                <T t={school.short} />
              </span>
              <span className="hidden sm:inline">
                <T t={school.name} />
              </span>
            </span>
            <span className="block truncate text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted">
              <T t={school.place} />
            </span>
          </span>
        </Link>
        <div className="flex shrink-0 items-center gap-2.5">
          <span className="hidden sm:block">
            <LangToggle />
          </span>
          {school.phone ? (
            <a href={`tel:${school.phone.replace(/\s/g, "")}`} className="hidden h-10 items-center gap-2 rounded-full border border-forest-900/15 px-4 text-sm font-semibold text-forest-900 transition-colors hover:border-forest-900/40 lg:inline-flex">
              <Phone className="h-4 w-4" aria-hidden />
              {school.phone}
            </a>
          ) : null}
          <Link href={`${base}/admissions#enquire`} className="inline-flex h-10 items-center rounded-full bg-school px-4 text-sm font-semibold text-cream-50 transition hover:brightness-110">
            <T en="Enquire" hi="पूछताछ" />
          </Link>
        </div>
      </div>
      <div className="border-t border-forest-900/[0.07]">
        <nav aria-label={`${school.name.en} sections`} className="container-x">
          <div ref={navRef} className="no-scrollbar -mx-2 flex gap-1 overflow-x-auto">
            {schoolPages.map((p) => {
              const active = current(p.page);
              return (
                <Link
                  key={p.page || "overview"}
                  href={p.page ? `${base}/${p.page}` : base}
                  aria-current={active ? "page" : undefined}
                  className={clsx(
                    "relative shrink-0 whitespace-nowrap px-3 py-3 text-[0.88rem] font-semibold transition-colors",
                    active ? "text-forest-900" : "text-forest-900/65 hover:text-forest-900",
                  )}
                >
                  <T t={p.label} />
                  {active ? <motion.span layoutId={`school-tab-${school.key}`} className="absolute inset-x-3 bottom-0 h-[2px] rounded-full bg-school-accent" /> : null}
                </Link>
              );
            })}
            <span className="shrink-0 px-2 sm:hidden">
              <LangToggle />
            </span>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
