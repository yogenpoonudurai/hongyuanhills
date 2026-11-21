import type { Locale } from "@/content/types";

export function homeHref(locale: Locale): string {
  return locale === "zh" ? "/" : "/en/";
}

function ensureTrailingSlash(pathname: string): string {
  if (pathname === "/" || pathname.endsWith("/")) return pathname;
  return `${pathname}/`;
}

export function localizedHref(locale: Locale, href: string): string {
  if (/^(https?:|mailto:|tel:)/.test(href)) return href;
  if (href.startsWith("#")) return `${homeHref(locale)}${href}`;

  const [pathPart, hashPart] = href.split("#");
  const base = ensureTrailingSlash(pathPart || "/");
  const localized = locale === "zh" ? base : base === "/" ? "/en/" : `/en${base}`;
  return hashPart ? `${localized}#${hashPart}` : localized;
}

export function alternateHref(locale: Locale, pathname: string): string {
  const normalized = ensureTrailingSlash(pathname || "/");

  if (locale === "zh") {
    return normalized === "/" ? "/en/" : `/en${normalized}`;
  }

  const withoutPrefix = normalized.replace(/^\/en/, "") || "/";
  return ensureTrailingSlash(withoutPrefix);
}
