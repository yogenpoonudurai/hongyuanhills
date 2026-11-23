import { ButtonLink } from "@/components/ui/ButtonLink";
import {
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";
import { PageHero } from "@/components/ui/PageHero";
import { contactCopy } from "@/content/contact";
import { groundsImages } from "@/content/grounds";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/content/types";
import { contact, mapsUrl, telHref, waLink } from "@/lib/contact";
import { homeHref } from "@/lib/i18n";
import { jsonLd } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/metadata";

export function ContactPage({ locale }: { locale: Locale }) {
  const copy = contactCopy[locale];
  const ui = siteCopy[locale];
  const whatsappHref = waLink(ui.whatsapp.general);

  const breadcrumbs = [
    { label: locale === "zh" ? "首页" : "Home", href: homeHref(locale) },
    { label: locale === "zh" ? "联系我们" : "Contact Us" },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: breadcrumbs[0].label,
        item: `${SITE_URL}${homeHref(locale)}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: breadcrumbs[1].label,
        item: `${SITE_URL}${locale === "zh" ? "/contact" : "/en/contact"}`,
      },
    ],
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: copy.meta.title,
    description: copy.meta.description,
    url: `${SITE_URL}${locale === "zh" ? "/contact" : "/en/contact"}`,
    about: {
      "@type": "FuneralHome",
      name: "Hong Yuan Hills",
      url: SITE_URL,
      telephone: `+${contact.phone24h}`,
      email: contact.email,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbSchema)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(contactSchema)}
      />

      <PageHero
        locale={locale}
        image={groundsImages.landscape}
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
        intro={copy.hero.intro}
        primaryHref={whatsappHref}
        primaryLabel={ui.cta.whatsapp}
        primaryExternal
        secondaryHref={telHref(contact.phone24h)}
        secondaryLabel={locale === "zh" ? "拨打 24 小时热线" : "Call the 24-Hour Hotline"}
        breadcrumbs={breadcrumbs}
      />

      <section className="border-b border-line bg-ivory py-12 md:py-16">
        <div className="container-page grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <a
            href={telHref(contact.phone24h)}
            className="border border-line bg-paper p-5 transition hover:border-gold/60"
          >
            <PhoneIcon className="h-5 w-5 text-jade" />
            <p className="mt-4 text-[10px] uppercase tracking-[0.16em] text-stone">
              {ui.labels.phone24}
            </p>
            <p className="mt-1 text-sm font-semibold text-ink">
              {contact.phone24hDisplay}
            </p>
          </a>
          <a
            href={telHref(contact.phoneOffice)}
            className="border border-line bg-paper p-5 transition hover:border-gold/60"
          >
            <PhoneIcon className="h-5 w-5 text-jade" />
            <p className="mt-4 text-[10px] uppercase tracking-[0.16em] text-stone">
              {ui.labels.officePhone}
            </p>
            <p className="mt-1 text-sm font-semibold text-ink">
              {contact.phoneOfficeDisplay}
            </p>
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="border border-line bg-paper p-5 transition hover:border-gold/60"
          >
            <WhatsAppIcon className="h-5 w-5 text-jade" />
            <p className="mt-4 text-[10px] uppercase tracking-[0.16em] text-stone">
              {ui.labels.whatsapp}
            </p>
            <p className="mt-1 text-sm font-semibold text-ink">
              {locale === "zh" ? "在线咨询" : "Chat with us"}
            </p>
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="border border-line bg-paper p-5 transition hover:border-gold/60"
          >
            <MailIcon className="h-5 w-5 text-jade" />
            <p className="mt-4 text-[10px] uppercase tracking-[0.16em] text-stone">
              {ui.labels.email}
            </p>
            <p className="mt-1 break-all text-sm font-semibold text-ink">
              {contact.email}
            </p>
          </a>
        </div>
      </section>

      <section className="container-page grid gap-10 py-20 md:grid-cols-2 md:py-28">
        <div>
          <p className="eyebrow">
            {locale === "zh" ? "到访" : "Visit"}
          </p>
          <h2 className="section-title">{copy.directions.title}</h2>
          <p className="section-copy">{copy.directions.body}</p>
          <ul className="mt-7 space-y-3">
            {copy.directions.points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 text-[15px] leading-7 text-ink/75"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-6 border border-line bg-paper p-5">
            <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-stone">
              <ClockIcon className="h-4 w-4" />
              {ui.labels.hours}
            </p>
            <p className="mt-2 text-sm text-ink/75">{ui.hours.value}</p>
            <p className="mt-1 text-xs text-stone">{ui.hours.emergency}</p>
          </div>
          <p className="mt-5 text-xs leading-6 text-stone">{copy.note}</p>
        </div>

        <div className="space-y-4">
          {ui.addresses.map((address) => (
            <a
              key={address.label}
              href={mapsUrl(address.value)}
              target="_blank"
              rel="noreferrer"
              className="group block border border-line bg-paper p-5 transition hover:border-gold/60"
            >
              <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-jade">
                <MapPinIcon className="h-4 w-4" />
                {address.label}
              </span>
              <p className="mt-3 text-[15px] leading-7 text-ink/75">
                {address.value}
              </p>
              <span className="mt-3 inline-flex text-xs font-semibold text-jade transition group-hover:text-gold">
                {ui.labels.viewMap} →
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-ivory py-20 md:py-28">
        <div className="container-page max-w-3xl text-center">
          <p className="eyebrow">{ui.labels.whatsapp}</p>
          <h2 className="section-title">{copy.whatsapp.title}</h2>
          <p className="section-copy mx-auto max-w-xl">{copy.whatsapp.intro}</p>
          <ButtonLink
            href={whatsappHref}
            variant="primary"
            target="_blank"
            rel="noreferrer"
            className="mt-8"
          >
            {ui.cta.whatsapp}
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
