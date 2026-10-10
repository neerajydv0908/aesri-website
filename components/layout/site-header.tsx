"use client";

import clsx from "clsx";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import { ArrowRight, ChevronDown, LogIn, Menu, X } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { AesriEmblem } from "@/components/brand/emblems";
import { T } from "@/components/i18n";
import { LangToggle } from "@/components/lang-toggle";
import { PortalLoginLink } from "@/components/portal-link";
import type { Bi } from "@/content/types";

export type HeaderSchool = {
  slug: string;
  name: Bi;
  place: Bi;
  classes: string | null;
  image: StaticImageData;
  imageAlt: string;
};

type Link_ = { href: string; label: Bi; description?: string };

const aboutLinks: Link_[] = [
  { href: "/about", label: { en: "About AESRI", hi: "एईएसआरआई परिचय" }, description: "Our story, values and approach" },
  { href: "/governance", label: { en: "Governance", hi: "प्रशासन" }, description: "Governing body and accountability" },
  { href: "/careers", label: { en: "Careers", hi: "करियर" }, description: "Teach and work with us" },
  { href: "/policies", label: { en: "Policies", hi: "नीतियाँ" }, description: "Privacy, fees, grievances, accessibility" },
];

const flatLinks: Link_[] = [
  { href: "/social-initiatives", label: { en: "Initiatives", hi: "सामाजिक पहल" } },
  { href: "/research", label: { en: "Research", hi: "अनुसंधान" } },
  { href: "/news", label: { en: "News", hi: "समाचार" } },
  { href: "/contact", label: { en: "Contact", hi: "संपर्क" } },
];

export function SiteHeader({ schools }: { schools: HeaderSchool[] }) {
  const pathname = usePathname();
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState<null | "about" | "schools">(null);
  const [mobile, setMobile] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuWasOpen = useRef(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 24);
    if (open || mobile) return;
    setHidden(y > 220 && y > prev + 2);
    if (y < prev - 2) setHidden(false);
  });

  // Close menus on navigation
  useEffect(() => {
    setOpen(null);
    setMobile(false);
  }, [pathname]);

  // When the mobile menu closes, put keyboard focus back on the button that opened it.
  useEffect(() => {
    if (menuWasOpen.current && !mobile) menuButton.current?.focus({ preventScroll: true });
    menuWasOpen.current = mobile;
  }, [mobile]);

  // Lock scrolling behind the mobile menu
  useEffect(() => {
    if (mobile) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
  }, [mobile, lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const hoverOpen = (key: "about" | "schools") => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpen(key);
  };
  const hoverClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 160);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50"
        onMouseLeave={hoverClose}
      >
        <div
          className={clsx(
            "transition-[background-color,box-shadow,backdrop-filter] duration-500",
            solid || open ? "bg-cream-100/85 shadow-[0_1px_0_rgba(19,39,28,0.08)] backdrop-blur-xl backdrop-saturate-150" : "bg-transparent",
          )}
        >
          <div className="container-x flex h-[76px] items-center justify-between gap-6">
            <Link href="/" className="group flex items-center gap-3 text-forest-900" aria-label="AESRI — home">
              <AesriEmblem className="h-10 w-10 text-forest-700 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[-8deg]" title="" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-[1.45rem] tracking-[-0.01em]">AESRI</span>
                <span className="mt-1 hidden text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted sm:max-xl:block min-[1360px]:block">
                  <T en="Educational & Social Research Institute" hi="शैक्षिक एवं सामाजिक अनुसंधान संस्थान" />
                </span>
              </span>
            </Link>

            <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
              <DropdownTrigger label={{ en: "About", hi: "परिचय" }} active={open === "about"} current={["/about", "/governance", "/careers", "/policies"].some(isActive)} onEnter={() => hoverOpen("about")} onToggle={() => setOpen(open === "about" ? null : "about")} controls="menu-about" />
              <DropdownTrigger label={{ en: "Our Schools", hi: "हमारे विद्यालय" }} active={open === "schools"} current={isActive("/schools")} onEnter={() => hoverOpen("schools")} onToggle={() => setOpen(open === "schools" ? null : "schools")} controls="menu-schools" />
              {flatLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onMouseEnter={() => setOpen(null)}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={clsx(
                    "relative whitespace-nowrap rounded-full px-3.5 py-2 text-[0.92rem] font-semibold transition-colors",
                    isActive(l.href) ? "text-forest-900" : "text-forest-900/75 hover:text-forest-900",
                  )}
                >
                  <T t={l.label} />
                  {isActive(l.href) ? <motion.span layoutId="nav-dot" className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-ochre-500" /> : null}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2.5">
              <span className="hidden sm:block">
                <LangToggle />
              </span>
              <PortalLoginLink className="hidden h-10 items-center gap-2 whitespace-nowrap rounded-full bg-forest-800 px-4 text-[0.875rem] font-semibold text-cream-50 transition-colors hover:bg-forest-700 md:inline-flex">
                <LogIn className="h-4 w-4" aria-hidden />
                <T en="Portal login" hi="पोर्टल लॉगिन" />
              </PortalLoginLink>
              <button
                ref={menuButton}
                type="button"
                onClick={() => setMobile(true)}
                className="grid h-11 w-11 place-items-center rounded-full bg-forest-900/[0.06] text-forest-900 xl:hidden"
                aria-label="Open menu"
                aria-expanded={mobile}
                aria-controls="mobile-menu"
              >
                <Menu className="h-5 w-5" aria-hidden />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {open ? (
              <motion.div
                key={open}
                id={open === "about" ? "menu-about" : "menu-schools"}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6, transition: { duration: 0.2 } }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="hidden border-t border-forest-900/[0.07] xl:block"
                onMouseEnter={() => closeTimer.current && window.clearTimeout(closeTimer.current)}
              >
                <div className="container-x py-8">
                  {open === "schools" ? <SchoolsPanel schools={schools} /> : <AboutPanel />}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.header>

      <AnimatePresence>{mobile ? <MobileMenu schools={schools} onClose={() => setMobile(false)} /> : null}</AnimatePresence>
    </>
  );
}

function DropdownTrigger({
  label,
  active,
  current,
  onEnter,
  onToggle,
  controls,
}: {
  label: Bi;
  active: boolean;
  current: boolean;
  onEnter: () => void;
  onToggle: () => void;
  controls: string;
}) {
  return (
    <button
      type="button"
      onMouseEnter={onEnter}
      onClick={onToggle}
      aria-expanded={active}
      aria-controls={controls}
      className={clsx(
        "relative inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3.5 py-2 text-[0.92rem] font-semibold transition-colors",
        active || current ? "text-forest-900" : "text-forest-900/75 hover:text-forest-900",
        active && "bg-forest-900/[0.05]",
      )}
    >
      <T t={label} />
      <ChevronDown className={clsx("h-4 w-4 transition-transform duration-300", active && "rotate-180")} aria-hidden />
      {current ? <span className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-ochre-500" /> : null}
    </button>
  );
}

function AboutPanel() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {aboutLinks.map((l, i) => (
        <motion.div key={l.href} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i, duration: 0.5 }}>
          <Link href={l.href} className="group block rounded-2xl border border-forest-900/[0.07] bg-cream-50/70 p-5 transition-colors hover:border-forest-900/20 hover:bg-cream-50">
            <span className="flex items-center justify-between font-display text-xl text-forest-900">
              <T t={l.label} />
              <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" aria-hidden />
            </span>
            <span className="mt-2 block text-sm text-muted">{l.description}</span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

function SchoolsPanel({ schools }: { schools: HeaderSchool[] }) {
  return (
    <div className="grid grid-cols-[1fr_1fr_0.8fr] gap-5">
      {schools.map((s, i) => (
        <motion.div key={s.slug} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i, duration: 0.55 }}>
          <div className="group relative flex h-full gap-5 overflow-hidden rounded-2xl border border-forest-900/[0.07] bg-cream-50/70 p-3 pr-5 transition-colors hover:border-forest-900/20 hover:bg-cream-50">
            <div className="relative aspect-[4/3] w-44 shrink-0 overflow-hidden rounded-xl">
              <Image src={s.image} alt={s.imageAlt} fill sizes="176px" className="object-cover transition-transform duration-700 group-hover:scale-105" placeholder="blur" />
            </div>
            <div className="flex min-w-0 flex-col py-1">
              <Link href={`/schools/${s.slug}`} className="font-display text-[1.35rem] leading-tight text-forest-900 after:absolute after:inset-0">
                <T t={s.name} />
              </Link>
              <span className="mt-1 text-sm text-muted">
                <T t={s.place} />
                {s.classes ? ` · ${s.classes}` : null}
              </span>
              <span className="relative z-10 mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-3 text-[0.82rem] font-semibold text-forest-700">
                <Link href={`/schools/${s.slug}/admissions`} className="link-underline">
                  <T en="Admissions" hi="प्रवेश" />
                </Link>
                <Link href={`/schools/${s.slug}/fees`} className="link-underline">
                  <T en="Fees" hi="फ़ीस" />
                </Link>
                <Link href={`/schools/${s.slug}/notices`} className="link-underline">
                  <T en="Notices" hi="सूचनाएँ" />
                </Link>
                <Link href={`/schools/${s.slug}/contact`} className="link-underline">
                  <T en="Contact" hi="संपर्क" />
                </Link>
              </span>
            </div>
          </div>
        </motion.div>
      ))}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.55 }}>
        <Link href="/schools" className="group flex h-full flex-col justify-between rounded-2xl bg-forest-800 p-6 text-cream-50 transition-colors hover:bg-forest-700">
          <span className="font-display text-2xl leading-tight">
            <T en="Compare both schools" hi="दोनों विद्यालयों की तुलना" />
          </span>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sage-200">
            <T en="Our Schools" hi="हमारे विद्यालय" />
            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" aria-hidden />
          </span>
        </Link>
      </motion.div>
    </div>
  );
}

function MobileMenu({ schools, onClose }: { schools: HeaderSchool[]; onClose: () => void }) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeRef.current?.focus();
  }, []);
  const links: Link_[] = [...aboutLinks.slice(0, 2), { href: "/schools", label: { en: "Our Schools", hi: "हमारे विद्यालय" } }, ...flatLinks, aboutLinks[2]];

  return (
    <motion.div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
      transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
      className="jaali-light fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-forest-900 text-cream-50"
      data-lenis-prevent
    >
      <div className="container-x flex h-[76px] shrink-0 items-center justify-between">
        <span id={titleId} className="flex items-center gap-3">
          <AesriEmblem className="h-10 w-10 text-sage-200" title="" />
          <span className="font-display text-[1.45rem]">AESRI</span>
        </span>
        <button ref={closeRef} type="button" onClick={onClose} className="grid h-11 w-11 place-items-center rounded-full bg-cream-50/10" aria-label="Close menu">
          <X className="h-5 w-5" aria-hidden />
        </button>
      </div>
      <nav aria-label="Mobile" className="container-x flex-1 pb-10 pt-4">
        <ul className="space-y-1">
          {links.map((l, i) => (
            <motion.li key={l.href} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.045, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              <Link href={l.href} onClick={onClose} className="flex items-baseline justify-between border-b border-cream-50/10 py-3 font-display text-[2rem] leading-tight">
                <T t={l.label} />
                <ArrowRight className="h-5 w-5 opacity-50" aria-hidden />
              </Link>
            </motion.li>
          ))}
        </ul>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-8 grid gap-3 sm:grid-cols-2">
          {schools.map((s) => (
            <Link key={s.slug} href={`/schools/${s.slug}`} onClick={onClose} className="flex items-center gap-4 rounded-2xl bg-cream-50/[0.07] p-3">
              <span className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl">
                <Image src={s.image} alt="" fill sizes="80px" className="object-cover" />
              </span>
              <span>
                <span className="block font-display text-lg leading-tight">
                  <T t={s.name} />
                </span>
                <span className="text-sm text-sage-200">
                  <T t={s.place} />
                </span>
              </span>
            </Link>
          ))}
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-8 flex flex-wrap items-center gap-3">
          <LangToggle tone="dark" />
          <PortalLoginLink onClick={onClose} className="inline-flex h-11 items-center gap-2 rounded-full bg-cream-50 px-5 text-sm font-semibold text-forest-900">
            <LogIn className="h-4 w-4" aria-hidden />
            <T en="Portal login" hi="पोर्टल लॉगिन" />
          </PortalLoginLink>
        </motion.div>
      </nav>
    </motion.div>
  );
}
