import type { Locale } from "@/content/types";

export function formatFromPrice(
  fromPrice: number | null,
  locale: Locale,
): string {
  if (fromPrice === null) {
    return locale === "zh" ? "价格请咨询" : "Price on request";
  }

  const formatted = new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
    maximumFractionDigits: 0,
  }).format(fromPrice);

  return locale === "zh" ? `${formatted} 起` : `From ${formatted}`;
}

export function priceDisclaimer(locale: Locale): string {
  return locale === "zh"
    ? "价格为参考起价，实际价格视选择、供应情况及条款而定。"
    : "Indicative starting price only. Actual price depends on selection, availability and terms.";
}

export function instalmentNote(locale: Locale): string {
  return locale === "zh"
    ? "0% 利息分期付款须符合条款。"
    : "0% interest instalment available, subject to terms.";
}
