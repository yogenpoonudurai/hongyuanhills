"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/content/types";
import { alternateHref } from "@/lib/i18n";

export function LanguageSwitchLink({
  locale,
  label,
  className,
}: {
  locale: Locale;
  label: string;
  className?: string;
}) {
  const pathname = usePathname() ?? "/";

  return (
    <a href={alternateHref(locale, pathname)} className={className}>
      {label}
    </a>
  );
}
