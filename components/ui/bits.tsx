import clsx from "clsx";
import {
  BookOpen,
  Blocks,
  Bus,
  Compass,
  NotebookPen,
  Shirt,
  ShieldCheck,
  Sun,
  Trees,
  Users,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { isPending, type Bi as BiText, type Facility, type Fact, type Img } from "@/content/types";
import { T } from "@/components/i18n";

/* Small uppercase label with a leading rule */
export function Eyebrow({ children, className, tone = "dark" }: { children: ReactNode; className?: string; tone?: "dark" | "light" }) {
  return (
    <p className={clsx("eyebrow", tone === "dark" ? "text-forest-600" : "text-sage-200", className)}>
      <span className={clsx("h-px w-8 shrink-0", tone === "dark" ? "bg-forest-600/50" : "bg-sage-200/60")} aria-hidden />
      <span>{children}</span>
    </p>
  );
}

/** "To be confirmed" chip for a fact awaiting an official document. */
export function Tbc({ what, className }: { what?: string; className?: string }) {
  return (
    <span className={clsx("tbc", className)} title={what ? `To be confirmed: ${what}` : "To be confirmed"}>
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-ochre-500" />
      <T en="To be confirmed" hi="पुष्टि शेष" />
      {what ? <span className="sr-only">: {what}</span> : null}
    </span>
  );
}

/** Render a Fact<string>: the value, or a TBC chip if pending. */
export function FactText({ value, className }: { value: Fact<string>; className?: string }) {
  if (isPending(value)) return <Tbc what={value.what} className={className} />;
  return <span className={className}>{value}</span>;
}

/** Render a Fact<Bi>: bilingual value, or a TBC chip if pending. */
export function FactBi({ value, className }: { value: Fact<BiText>; className?: string }) {
  if (isPending(value)) return <Tbc what={value.what} className={className} />;
  return (
    <span className={className}>
      <T t={value} />
    </span>
  );
}

/** Responsive photo with a blur-up placeholder. */
export function Photo({
  img,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  fill = true,
  imgClassName,
}: {
  img: Img;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  imgClassName?: string;
}) {
  if (!fill) {
    return <Image src={img.src} alt={img.alt} sizes={sizes} priority={priority} placeholder="blur" className={clsx("h-auto w-full", imgClassName)} />;
  }
  const positioned = /\b(absolute|fixed|sticky)\b/.test(className ?? "");
  return (
    <div className={clsx(!positioned && "relative", "overflow-hidden", className)}>
      <Image src={img.src} alt={img.alt} fill sizes={sizes} priority={priority} placeholder="blur" className={clsx("object-cover", imgClassName)} />
    </div>
  );
}

const facilityIcons: Record<Facility["icon"], LucideIcon> = {
  bus: Bus,
  blocks: Blocks,
  book: BookOpen,
  sun: Sun,
  trees: Trees,
  shirt: Shirt,
  compass: Compass,
  users: Users,
  notebook: NotebookPen,
  shield: ShieldCheck,
};

export function FacilityIcon({ name, className }: { name: Facility["icon"]; className?: string }) {
  const Icon = facilityIcons[name];
  return <Icon className={className} aria-hidden strokeWidth={1.6} />;
}

/** Section heading block: eyebrow, title, optional lead. */
export function SectionIntro({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "dark",
  className,
  titleClassName,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div className={clsx(align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <Eyebrow tone={tone} className={clsx(align === "center" && "justify-center")}>{eyebrow}</Eyebrow> : null}
      <h2 className={clsx("text-h2 mt-5", tone === "dark" ? "text-forest-900" : "text-cream-50", titleClassName)}>{title}</h2>
      {lead ? (
        <div className={clsx("text-lead mt-6 max-w-2xl", align === "center" && "mx-auto", tone === "dark" ? "text-muted" : "text-sage-200")}>{lead}</div>
      ) : null}
    </div>
  );
}
