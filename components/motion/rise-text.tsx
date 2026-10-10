import clsx from "clsx";
import type { CSSProperties } from "react";

/**
 * Words that rise out of a mask on first paint. Pure CSS (no JavaScript), so
 * large page headings animate immediately and never wait for hydration.
 * The full sentence stays available to screen readers and search engines.
 */
export function RiseText({
  text,
  start = 0,
  className,
  emphasis,
  emphasisClassName = "italic text-forest-600",
}: {
  text: string;
  start?: number;
  className?: string;
  /** Words (exact match, punctuation included) to set in the accent style. */
  emphasis?: string[];
  emphasisClassName?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={i}>
            <span className="rise-word">
              <span style={{ "--i": i + start } as CSSProperties} className={clsx(emphasis?.includes(w) && emphasisClassName)}>
                {w}
              </span>
            </span>
            {i < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </span>
  );
}
