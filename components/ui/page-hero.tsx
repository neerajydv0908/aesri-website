import clsx from "clsx";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { T } from "@/components/i18n";
import { RiseText } from "@/components/motion/rise-text";
import { DuneLines } from "@/components/brand/emblems";
import type { Bi } from "@/content/types";

export type Crumb = { href: string; label: Bi };

/**
 * Top-of-page hero used by inner pages. Title words rise on first paint
 * (pure CSS), so there's no blank moment while JavaScript loads.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  aside,
  tone = "cream",
  className,
  offsetHeader = true,
}: {
  eyebrow?: ReactNode;
  title: Bi;
  lead?: ReactNode;
  crumbs?: Crumb[];
  aside?: ReactNode;
  tone?: "cream" | "school";
  className?: string;
  offsetHeader?: boolean;
}) {
  return (
    <section className={clsx("relative isolate overflow-hidden", offsetHeader ? "pt-36 sm:pt-40" : "pt-14 sm:pt-20", "pb-16 sm:pb-20", className)}>
      <div
        aria-hidden
        className={clsx(
          "absolute -right-40 -top-48 -z-10 h-[40rem] w-[40rem] rounded-full",
          tone === "school" ? "bg-[radial-gradient(closest-side,var(--school-soft),transparent)]" : "bg-[radial-gradient(closest-side,rgba(168,191,165,0.4),transparent)]",
        )}
      />
      <DuneLines className="absolute inset-x-0 bottom-0 -z-10 h-28 w-full text-forest-700" />
      <div className="container-x">
        {crumbs && crumbs.length ? (
          <nav aria-label="Breadcrumb" className="fade-up mb-8" style={{ "--d": "0ms" } as CSSProperties}>
            <ol className="flex flex-wrap items-center gap-1.5 text-[0.82rem] font-semibold text-muted">
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-1.5">
                  {i > 0 ? <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden /> : null}
                  <Link href={c.href} className="link-underline hover:text-forest-900">
                    <T t={c.label} />
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <div className={clsx("grid gap-12", aside && "lg:grid-cols-[1.25fr_0.75fr] lg:items-end")}>
          <div>
            {eyebrow ? (
              <p className="eyebrow fade-up text-forest-600" style={{ "--d": "60ms" } as CSSProperties}>
                <span className="h-px w-8 shrink-0 bg-forest-600/50" aria-hidden />
                <span>{eyebrow}</span>
              </p>
            ) : null}
            <h1 className="text-h1 mt-6 max-w-[18ch] text-forest-900">
              <span data-l="en">
                <RiseText text={title.en} />
              </span>
              <span data-l="hi" lang="hi">
                <RiseText text={title.hi} />
              </span>
            </h1>
            {lead ? (
              <div className="fade-up text-lead mt-7 max-w-2xl text-muted" style={{ "--d": "300ms" } as CSSProperties}>
                {lead}
              </div>
            ) : null}
          </div>
          {aside ? (
            <div className="fade-up" style={{ "--d": "380ms" } as CSSProperties}>
              {aside}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
