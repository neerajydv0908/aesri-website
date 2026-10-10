"use client";

import clsx from "clsx";
import { useSyncExternalStore } from "react";

export type Lang = "en" | "hi";
const EVENT = "aesri:lang";

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

const getSnapshot = (): Lang => (document.documentElement.dataset.lang === "hi" ? "hi" : "en");
const getServerSnapshot = (): Lang => "en";

export function useLang(): Lang {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function setLang(lang: Lang) {
  const root = document.documentElement;
  root.dataset.lang = lang;
  root.lang = lang === "hi" ? "hi" : "en";
  try {
    localStorage.setItem("aesri-lang", lang);
  } catch {
    /* storage unavailable (private mode) — the choice still applies to this page */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function LangToggle({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const lang = useLang();
  const options: { value: Lang; label: string; aria: string }[] = [
    { value: "en", label: "EN", aria: "English" },
    { value: "hi", label: "हिं", aria: "हिंदी (Hindi)" },
  ];

  return (
    <div
      role="group"
      aria-label="Language / भाषा"
      className={clsx(
        "relative inline-flex items-center rounded-full p-1 text-[0.8rem] font-semibold",
        tone === "light" ? "bg-forest-900/[0.06] text-forest-900" : "bg-cream-50/10 text-cream-50",
        className,
      )}
    >
      {options.map((o) => {
        const active = lang === o.value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={active}
            aria-label={o.aria}
            lang={o.value}
            onClick={() => setLang(o.value)}
            className={clsx(
              "relative z-10 min-w-[2.6rem] rounded-full px-2.5 py-1.5 leading-none transition-colors duration-300",
              active
                ? tone === "light"
                  ? "bg-forest-800 text-cream-50 shadow-sm"
                  : "bg-cream-50 text-forest-900 shadow-sm"
                : "opacity-75 hover:opacity-100",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
