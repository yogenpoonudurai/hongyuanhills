import type { Locale } from "@/content/types";

export function homeHref(locale: Locale): string {
  return locale === "zh" ? "/" : "/en";
}

export function localizedHref(locale: Locale, href: string): string {
  if (/^(https?:|mailto:|tel:)/.test(href)) return href;
  if (href.startsWith("#")) return `${homeHref(locale)}${href}`;
  if (href.startsWith("/")) {
    return locale === "zh" ? href : `/en${href}`;
  }
  return href;
}

export function alternateHref(locale: Locale, pathname: string): string {
  if (locale === "zh") {
    if (pathname === "/") return "/en";
    return `/en${pathname}`;
  }
  return pathname.replace(/^\/en/, "") || "/";
}
