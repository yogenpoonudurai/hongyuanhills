"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  ChevronDownIcon,
  CloseIcon,
  MailIcon,
  MenuIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";
import { nav, servicesMenu, siteCopy } from "@/content/site";
import type { Locale } from "@/content/types";
import { contact, telHref, waLink } from "@/lib/contact";
import { alternateHref, homeHref, localizedHref } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Header({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale];
  const pathname = usePathname() ?? "/";
  const home = homeHref(locale);
  const isHome = pathname === "/" || pathname === "/en" || pathname === "/en/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const transparent = isHome && !scrolled;

  const switchHref = alternateHref(locale, pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header
      className={cn(
        "top-0 z-40 border-b transition-colors duration-300",
        isHome ? "fixed inset-x-0" : "sticky",
        transparent
          ? "border-transparent bg-transparent"
          : "border-line/70 bg-paper/95 backdrop-blur-md",
      )}
    >
      <div
        className={cn(
          "hidden border-b md:block",
          transparent
            ? "border-ivory/15 bg-transparent"
            : "border-line/60 bg-ivory/80",
        )}
      >
        <div
          className={cn(
            "container-page flex h-10 items-center justify-between text-[11px] tracking-[0.12em]",
            transparent ? "text-ivory/70" : "text-stone",
          )}
        >
          <div className="flex items-center gap-6">
            <a
              href={telHref(contact.phone24h)}
              className={cn(
                "flex items-center gap-2 transition",
                transparent ? "hover:text-gold-light" : "hover:text-jade",
              )}
            >
              <PhoneIcon className="h-3.5 w-3.5" />
              <span>
                {copy.labels.phone24}: {contact.phone24hDisplay}
              </span>
            </a>
            <a
              href={`mailto:${contact.email}`}
              className={cn(
                "flex items-center gap-2 transition",
                transparent ? "hover:text-gold-light" : "hover:text-jade",
              )}
            >
              <MailIcon className="h-3.5 w-3.5" />
              <span>{contact.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-5">
            <span>{copy.location}</span>
            <a
              href={switchHref}
              className={cn(
                "font-semibold transition",
                transparent
                  ? "text-gold-light hover:text-ivory"
                  : "text-jade hover:text-gold",
              )}
            >
              {copy.otherLangLabel}
            </a>
          </div>
        </div>
      </div>

      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
        <a href={home} className="group flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-[1.45rem] tracking-[0.16em] transition",
              transparent
                ? "text-ivory group-hover:text-gold-light"
                : "text-ink group-hover:text-jade",
            )}
          >
            {copy.brand.name}
          </span>
          <span
            className={cn(
              "mt-1 text-[9px] font-semibold tracking-[0.38em]",
              transparent ? "text-gold-light" : "text-stone",
            )}
          >
            {copy.brand.latin}
          </span>
        </a>

        <nav
          aria-label={locale === "zh" ? "主导航" : "Main navigation"}
          className="hidden items-center gap-7 lg:flex"
        >
          {nav.map((item) => (
            <a
              key={item.id}
              href={localizedHref(locale, item.href)}
              className={cn(
                "text-[13px] font-medium tracking-[0.08em] transition",
                transparent
                  ? "text-ivory/80 hover:text-gold-light"
                  : "text-ink/80 hover:text-jade",
              )}
            >
              {item.label[locale]}
            </a>
          ))}
          <details className="group relative">
            <summary
              className={cn(
                "flex cursor-pointer list-none items-center gap-1 text-[13px] font-medium tracking-[0.08em] transition [&::-webkit-details-marker]:hidden",
                transparent
                  ? "text-ivory/80 hover:text-gold-light"
                  : "text-ink/80 hover:text-jade",
              )}
            >
              {copy.navServices}
              <ChevronDownIcon className="h-3.5 w-3.5 transition group-open:rotate-180" />
            </summary>
            <div className="absolute left-1/2 top-[calc(100%+0.9rem)] w-64 -translate-x-1/2 border border-line bg-paper p-2 shadow-xl shadow-ink/5">
              {servicesMenu.map((item) => (
                <a
                  key={item.id}
                  href={localizedHref(locale, item.href)}
                  className="block px-3 py-2.5 text-[13px] text-ink/80 transition hover:bg-ivory hover:text-jade"
                >
                  {item.label[locale]}
                </a>
              ))}
            </div>
          </details>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telHref(contact.phone24h)}
            aria-label={copy.labels.phone24}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full border transition md:hidden",
              transparent
                ? "border-ivory/30 text-ivory hover:border-gold-light"
                : "border-line text-jade hover:border-gold",
            )}
          >
            <PhoneIcon className="h-[1.125rem] w-[1.125rem]" />
          </a>
          <a
            href={localizedHref(locale, "/contact#form")}
            className="hidden h-10 items-center rounded-full bg-gold px-5 text-xs font-semibold tracking-[0.08em] text-ink transition hover:bg-gold-light sm:inline-flex"
          >
            {copy.cta.book}
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={copy.cta.menu}
            aria-controls="mobile-menu"
            aria-expanded={open}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full border transition lg:hidden",
              transparent
                ? "border-ivory/30 text-ivory hover:border-gold-light"
                : "border-line text-jade hover:border-gold",
            )}
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label={copy.cta.close}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
          />
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={locale === "zh" ? "菜单" : "Menu"}
            className="absolute right-0 top-0 flex h-dvh w-[min(92vw,380px)] flex-col bg-paper shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <div className="flex flex-col leading-none">
                <span className="font-display text-xl tracking-[0.14em] text-ink">
                  {copy.brand.name}
                </span>
                <span className="mt-1 text-[9px] font-semibold tracking-[0.34em] text-stone">
                  {copy.brand.latin}
                </span>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label={copy.cta.close}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-jade"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <nav
              aria-label={locale === "zh" ? "手机导航" : "Mobile navigation"}
              className="flex-1 overflow-y-auto px-6 py-6"
            >
              <div className="space-y-1">
                {nav.map((item) => (
                  <a
                    key={item.id}
                    href={localizedHref(locale, item.href)}
                    onClick={() => setOpen(false)}
                    className="block border-b border-line/60 py-3.5 text-[15px] font-medium text-ink"
                  >
                    {item.label[locale]}
                  </a>
                ))}
              </div>

              <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.26em] text-stone">
                {copy.navServices}
              </p>
              <div className="mt-2 space-y-1">
                {servicesMenu.map((item) => (
                  <a
                    key={item.id}
                    href={localizedHref(locale, item.href)}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 text-[14px] text-ink/75"
                  >
                    {item.label[locale]}
                  </a>
                ))}
              </div>

              <div className="mt-8 space-y-3 border-t border-line pt-6">
                <a
                  href={telHref(contact.phone24h)}
                  className="flex items-center gap-3 text-sm text-ink"
                >
                  <PhoneIcon className="h-4 w-4 text-jade" />
                  {contact.phone24hDisplay}
                </a>
                <a
                  href={waLink(copy.whatsapp.booking, contact.whatsappBooking)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-sm text-ink"
                >
                  <WhatsAppIcon className="h-4 w-4 text-jade" />
                  {copy.cta.whatsapp}
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 text-sm text-ink"
                >
                  <MailIcon className="h-4 w-4 text-jade" />
                  {contact.email}
                </a>
              </div>
            </nav>

            <div className="border-t border-line px-6 py-5">
              <a
                href={localizedHref(locale, "/contact#form")}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center justify-center rounded-full bg-gold px-5 text-sm font-semibold text-ink"
              >
                {copy.cta.book}
              </a>
              <a
                href={switchHref}
                className="mt-3 flex min-h-11 items-center justify-center rounded-full border border-line text-sm font-medium text-jade"
              >
                {copy.otherLangLabel}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
