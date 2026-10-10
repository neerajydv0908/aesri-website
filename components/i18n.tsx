import type { ElementType, ReactNode } from "react";
import type { Bi as BiText } from "@/content/types";

/**
 * Inline bilingual text. Both languages are rendered; CSS shows the one that
 * matches <html data-lang>. Works in server and client components alike.
 */
export function T({ en, hi, t }: { en?: ReactNode; hi?: ReactNode; t?: BiText }) {
  const e = t ? t.en : en;
  const h = t ? t.hi : hi;
  return (
    <>
      <span data-l="en">{e}</span>
      <span data-l="hi" lang="hi">
        {h}
      </span>
    </>
  );
}

/** Block-level bilingual content (paragraphs, headings, lists). */
export function Bi({
  en,
  hi,
  t,
  as: Tag = "div",
  className,
}: {
  en?: ReactNode;
  hi?: ReactNode;
  t?: BiText;
  as?: ElementType;
  className?: string;
}) {
  const e = t ? t.en : en;
  const h = t ? t.hi : hi;
  return (
    <>
      <Tag data-l="en" className={className}>
        {e}
      </Tag>
      <Tag data-l="hi" lang="hi" className={className}>
        {h}
      </Tag>
    </>
  );
}

/** "English · हिंदी" label pair (order follows the active language). */
export function DualLabel({ en, hi }: { en: string; hi: string }) {
  return (
    <>
      <span data-l="en">
        {en} · <span lang="hi">{hi}</span>
      </span>
      <span data-l="hi" lang="hi">
        {hi} · {en}
      </span>
    </>
  );
}
