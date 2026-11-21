"use client";

import { useSyncExternalStore } from "react";
import type { Locale } from "@/content/types";

type Theme = "ivory" | "sanctuary";

const labels = {
  zh: { group: "主题", ivory: "经典", sanctuary: "静谧" },
  en: { group: "Theme", ivory: "Ivory", sanctuary: "Sanctuary" },
} as const;

function subscribe(callback: () => void) {
  window.addEventListener("themechange", callback);
  return () => window.removeEventListener("themechange", callback);
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "sanctuary"
    ? "sanctuary"
    : "ivory";
}

function getServerSnapshot(): Theme {
  return "ivory";
}

function applyTheme(theme: Theme) {
  if (theme === "sanctuary") {
    document.documentElement.dataset.theme = "sanctuary";
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
      {(["ivory", "sanctuary"] as const).map((value) => {
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
