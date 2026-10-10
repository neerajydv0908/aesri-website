import clsx from "clsx";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outline-light" | "school";

const styles: Record<Variant, string> = {
  primary: "bg-forest-800 text-cream-50 hover:bg-forest-700 shadow-[0_10px_30px_-12px_rgba(19,39,28,0.55)]",
  secondary: "border border-forest-900/20 text-forest-900 hover:border-forest-900/60 hover:bg-forest-900/[0.04]",
  ghost: "text-forest-900 hover:bg-forest-900/[0.06]",
  light: "bg-cream-50 text-forest-900 hover:bg-white",
  "outline-light": "border border-cream-50/30 text-cream-50 hover:border-cream-50/80 hover:bg-cream-50/[0.06]",
  school: "bg-school text-cream-50 hover:brightness-110 shadow-[0_10px_30px_-14px_rgba(19,39,28,0.6)]",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  external,
  icon = "arrow",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  className?: string;
  external?: boolean;
  icon?: "arrow" | "external" | "none";
}) {
  const Icon = icon === "external" ? ArrowUpRight : ArrowRight;
  const cls = clsx(
    "group relative inline-flex items-center justify-center gap-2.5 rounded-full font-semibold tracking-[-0.005em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
    size === "sm" && "h-10 px-4 text-[0.875rem]",
    size === "md" && "h-12 px-6 text-[0.95rem]",
    size === "lg" && "h-14 px-7 text-base",
    styles[variant],
    className,
  );
  const content = (
    <>
      <span className="relative">{children}</span>
      {icon !== "none" ? (
        <span className="relative -mr-1 inline-flex h-5 w-5 overflow-hidden" aria-hidden="true">
          <Icon className="h-5 w-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[140%]" />
          <Icon className="absolute inset-0 h-5 w-5 -translate-x-[140%] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
        </span>
      ) : null}
    </>
  );
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {content}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}

/** Text link with an animated arrow — for "Read more" style actions. */
export function ArrowLink({ href, children, className, external }: { href: string; children: ReactNode; className?: string; external?: boolean }) {
  const cls = clsx("group inline-flex items-center gap-2 font-semibold", className);
  const inner = (
    <>
      <span className="link-underline">{children}</span>
      <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" aria-hidden />
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
