import type { Locale } from "@/content/types";

export function formatNewsDate(date: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "zh" ? "zh-MY" : "en-MY", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
