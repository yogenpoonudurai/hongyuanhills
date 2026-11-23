"use client";

import { useSyncExternalStore } from "react";
import type { Locale } from "@/content/types";

type Theme = "imperial" | "ivory";

const labels = {
  zh: { group: "主题", imperial: "御石", ivory: "象牙" },
  en: { group: "Theme", imperial: "Imperial", ivory: "Ivory" },
} as const;

function subscribe(callback: () => void) {
  window.addEventListener("themechange", callback);
  return () => window.removeEventListener("themechange", callback);
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "ivory"
    ? "ivory"
    : "imperial";
}

function getServerSnapshot(): Theme {
  return "imperial";
}

function applyTheme(theme: Theme) {
  if (theme === "ivory") {
    document.documentElement.dataset.theme = "ivory";
  } else {
    delete document.documentElement.dataset.theme;
  }
  try {
    window.localStorage.setItem("theme", theme);
  } catch {
    // Storage can be unavailable in private modes; the theme still applies.
  }
  window.dispatchEvent(new Event("themechange"));
}

export function ThemeSwitch({ locale }: { locale: Locale }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const copy = labels[locale];

  return (
    <div
      role="group"
      aria-label={copy.group}
      className="inline-flex items-center rounded-full border border-ivory/25 p-0.5"
    >
      {(["imperial", "ivory"] as const).map((value) => {
        const active = theme === value;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={active}
            onClick={() => applyTheme(value)}
            className={
              active
                ? "inline-flex min-h-8 items-center rounded-full bg-gold-light px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-jade-deep"
                : "inline-flex min-h-8 items-center rounded-full px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-ivory/70 transition hover:text-ivory"
            }
          >
            {copy[value]}
          </button>
        );
      })}
    </div>
  );
}
