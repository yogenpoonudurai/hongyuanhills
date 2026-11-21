import { nav, siteCopy } from "@/content/site";
import type { Locale } from "@/content/types";
import {
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";
import { contact, mapsUrl, telHref, waLink } from "@/lib/contact";
import { homeHref, localizedHref } from "@/lib/i18n";
import { LanguageSwitchLink } from "@/components/layout/LanguageSwitchLink";

export function Footer({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale];
  const home = homeHref(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-jade-deep text-ivory">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 md:py-20 lg:grid-cols-4">
        <div>
          <a href={home} className="inline-flex flex-col leading-none">
            <span className="font-display text-2xl tracking-[0.14em]">
              {copy.brand.name}
            </span>
            <span className="mt-1 text-[9px] font-semibold tracking-[0.38em] text-gold-light">
              {copy.brand.latin}
            </span>
          </a>
          <p className="mt-5 max-w-xs text-sm leading-7 text-ivory/70">
            {copy.tagline}
          </p>
          <LanguageSwitchLink
            locale={locale}
            label={copy.otherLangLabel}
            className="mt-5 inline-flex text-xs font-semibold tracking-[0.14em] text-gold-light transition hover:text-ivory"
          />
        </div>

        <div>
          <h2 className="text-[10px] font-semibold uppercase tracking-[0.26em] text-gold-light">
            {copy.footer.quickLinks}
          </h2>
          <ul className="mt-5 space-y-3">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={localizedHref(locale, item.href)}
                  className="text-sm text-ivory/75 transition hover:text-gold-light"
                >
                  {item.label[locale]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-[10px] font-semibold uppercase tracking-[0.26em] text-gold-light">
            {copy.footer.contact}
          </h2>
          <ul className="mt-5 space-y-3 text-sm text-ivory/75">
            <li>
              <a
                href={telHref(contact.phone24h)}
                className="flex items-start gap-2.5 transition hover:text-gold-light"
              >
                <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-light" />
                <span>
                  {copy.labels.phone24}
                  <br />
                  {contact.phone24hDisplay}
                </span>
              </a>
            </li>
            <li>
              <a
                href={telHref(contact.phoneOffice)}
                className="flex items-start gap-2.5 transition hover:text-gold-light"
              >
                <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-light" />
                <span>
                  {copy.labels.officePhone}
                  <br />
                  {contact.phoneOfficeDisplay}
                </span>
              </a>
            </li>
            <li>
              <a
                href={waLink(copy.whatsapp.general)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 transition hover:text-gold-light"
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0 text-gold-light" />
                {copy.labels.whatsapp}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2.5 transition hover:text-gold-light"
              >
                <MailIcon className="h-4 w-4 shrink-0 text-gold-light" />
                {contact.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-[10px] font-semibold uppercase tracking-[0.26em] text-gold-light">
            {copy.footer.visit}
          </h2>
          <ul className="mt-5 space-y-4 text-sm text-ivory/75">
            {copy.addresses.map((address) => (
              <li key={address.label}>
                <a
                  href={mapsUrl(address.value)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-2.5 transition hover:text-gold-light"
                >
                  <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-light" />
                  <span>
                    <span className="block text-[11px] uppercase tracking-[0.12em] text-ivory/70">
                      {address.label}
                    </span>
                    {address.value}
                  </span>
                </a>
              </li>
            ))}
            <li className="flex items-start gap-2.5">
              <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-light" />
              <span>
                <span className="block text-[11px] uppercase tracking-[0.12em] text-ivory/70">
                  {copy.labels.hours}
                </span>
                {copy.hours.value}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/20">
        <div className="container-page flex flex-col gap-2 py-5 text-[11px] text-ivory/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {copy.brand.name} · {copy.brand.latin}. {copy.footer.rights}.
          </p>
          <p>{copy.footer.legalNote}</p>
        </div>
      </div>
    </footer>
  );
}
