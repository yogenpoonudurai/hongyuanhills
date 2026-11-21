import type { ComponentType, SVGProps } from "react";
import {
  ArrowRightIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  ClockIcon,
  HallIcon,
  HeartIcon,
  LotusIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Picture } from "@/components/ui/Picture";
import { NewsCard } from "@/components/ui/NewsCard";
import { BookSection } from "@/components/sections/BookSection";
import { SocialSection } from "@/components/sections/SocialSection";
import { halls } from "@/content/halls";
import { homeCopy, type ServiceIcon } from "@/content/home";
import { latestNews, newsCopy } from "@/content/news";
import { getHallPrice } from "@/content/pricing";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/content/types";
import { contact, mapsUrl, telHref, waLink } from "@/lib/contact";
import { jsonLd } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/metadata";
import { localizedHref } from "@/lib/i18n";
import { formatFromPrice } from "@/lib/pricing";
import { cn } from "@/lib/utils";

const serviceIcons: Record<
  ServiceIcon,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  lotus: LotusIcon,
  hall: HallIcon,
  heart: HeartIcon,
  calendar: CalendarIcon,
};


export function HomePage({ locale }: { locale: Locale }) {
  const copy = homeCopy[locale];
  const ui = siteCopy[locale];
  const newsUi = newsCopy[locale];
  const isZh = locale === "zh";

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "FuneralHome",
    name: isZh ? "宏缘宝地" : "Hong Yuan Hills",
    alternateName: isZh ? "Hong Yuan Hills" : "宏缘宝地",
    url: SITE_URL,
    image: `${SITE_URL}/images/hero.jpg`,
    description: copy.meta.description,
    telephone: `+${contact.phone24h}`,
    email: contact.email,
    address: [
      {
        "@type": "PostalAddress",
        streetAddress:
          "Lot 3188, Jalan Peringatan, Belakang, Kampung Mic Kluang",
        addressLocality: "Kluang",
        addressRegion: "Johor",
        postalCode: "86000",
        addressCountry: "MY",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "76 & 76A, Jalan Mersing",
        addressLocality: "Kluang",
        addressRegion: "Johor",
        postalCode: "86000",
        addressCountry: "MY",
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "18:00",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(localBusiness)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(faqSchema)}
      />

      <section id="top" className="relative isolate overflow-hidden bg-jade-deep">
        <Picture
          src="/images/hero"
          alt={copy.hero.imageAlt}
          width={1600}
          height={900}
          priority
          className="absolute inset-0 -z-10"
          imgClassName="h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/70 via-ink/35 to-ink/85" />
        <div className="container-page flex min-h-[78dvh] flex-col justify-end py-16 md:min-h-[86dvh] md:py-28">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-light md:text-xs">
            {copy.hero.eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl leading-[1.08] text-ivory sm:text-5xl md:text-6xl">
            {copy.hero.title}
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-8 text-ivory/80 sm:text-[17px] sm:leading-9">
            {copy.hero.body}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="#book" variant="primary" showArrow>
              {copy.hero.primary}
            </ButtonLink>
            <ButtonLink
              href={waLink(ui.whatsapp.general)}
              variant="ghost"
              target="_blank"
              rel="noreferrer"
            >
              {copy.hero.secondary}
            </ButtonLink>
          </div>
          <p className="mt-7 text-[11px] tracking-[0.22em] text-ivory/60">
            {copy.hero.note}
          </p>
        </div>
      </section>

      <section aria-label={isZh ? "服务概览" : "Service highlights"}>
        <div className="container-page">
          <div className="grid grid-cols-2 border-y border-line bg-paper sm:grid-cols-4">
            {copy.trust.map((item, index) => (
              <div
                key={item.label}
                className={cn(
                  "px-4 py-6 text-center",
                  index > 0 && "sm:border-l sm:border-line",
                  index % 2 === 1 && "border-l border-line",
                  index >= 2 && "border-t border-line sm:border-t-0",
                )}
              >
                <p className="font-display text-2xl text-jade">{item.value}</p>
                <p className="mt-1 text-[11px] tracking-[0.12em] text-stone">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="container-page py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -left-3 -top-3 h-full w-full border border-gold/40"
            />
            <Picture
              src="/images/about"
              alt={copy.about.imageAlt}
              width={1600}
              height={1000}
              className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] md:aspect-[4/5]"
            />
          </div>

          <div>
            <p className="eyebrow">{copy.about.eyebrow}</p>
            <h2 className="section-title">{copy.about.title}</h2>
            <div className="mt-5 space-y-4">
              {copy.about.body.map((paragraph) => (
                <p key={paragraph} className="text-[16px] leading-8 text-ink/75 sm:text-[17px]">
                  {paragraph}
                </p>
              ))}
            </div>
            <ul className="mt-7 space-y-3">
              {copy.about.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-base text-ink/80">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {point}
                </li>
              ))}
            </ul>
            <ButtonLink
              href={localizedHref(locale, "/about")}
              variant="secondary"
              className="mt-8"
              showArrow
            >
              {copy.about.cta}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section id="grounds" className="bg-jade-deep text-ivory">
        <div className="container-page grid gap-12 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-light">
              {copy.grounds.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
              {copy.grounds.title}
            </h2>
            <p className="mt-5 max-w-xl text-[16px] leading-8 text-ivory/75 sm:text-[17px]">
              {copy.grounds.body}
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-1">
              {copy.grounds.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-base text-ivory/80">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {point}
                </li>
              ))}
            </ul>
            <ButtonLink
              href={localizedHref(locale, "/services/feng-shui-grounds")}
              variant="ghost"
              className="mt-8"
              showArrow
            >
              {copy.grounds.cta}
            </ButtonLink>
          </div>
          <Picture
            src="/images/grounds"
            alt={copy.grounds.imageAlt}
            width={1600}
            height={1000}
            className="aspect-[4/3] overflow-hidden"
          />
        </div>
      </section>

      <section id="services" className="container-page py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow">{copy.services.eyebrow}</p>
          <h2 className="section-title">{copy.services.title}</h2>
          <p className="section-copy">{copy.services.intro}</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {copy.services.items.map((item, index) => {
            const Icon = serviceIcons[item.icon];
            return (
              <article
                key={item.title}
                className="group flex flex-col border border-line bg-paper p-6 transition duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-lg hover:shadow-ink/5"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ivory text-jade">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-2xl text-gold-dark">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl text-ink">{item.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-7 text-ink/70">{item.body}</p>
                <a
                  href={localizedHref(locale, item.href)}
                  className="mt-5 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.08em] text-jade transition group-hover:text-gold"
                >
                  {item.cta}
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <section id="halls" className="bg-ivory py-20 md:py-28">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow">{copy.halls.eyebrow}</p>
              <h2 className="section-title">{copy.halls.title}</h2>
              <p className="section-copy">{copy.halls.intro}</p>
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {halls.map((hall) => {
              const price = getHallPrice(hall.slug);
              return (
                <article
                  key={hall.slug}
                  className="group flex flex-col overflow-hidden border border-line bg-paper transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5"
                >
                  <div className="h-1" style={{ backgroundColor: hall.accent }} />
                  <Picture
                    src={hall.image.src}
                    alt={hall.image.alt[locale]}
                    width={hall.image.width}
                    height={hall.image.height}
                    className="aspect-[4/3] overflow-hidden"
                    imgClassName="transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone">
                      {hall.tagline[locale]}
                    </p>
                    <h3 className="mt-2 font-display text-2xl text-ink">
                      {hall.name[locale]}
                    </h3>
                    <p className="mt-3 flex-1 text-[15px] leading-7 text-ink/70">
                      {hall.summary[locale]}
                    </p>
                    <div className="mt-5 flex items-end justify-between gap-3 border-t border-line pt-4">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.14em] text-stone">
                          {ui.cta.priceOnRequest}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-jade">
                          {formatFromPrice(price?.fromPrice ?? null, locale)}
                        </p>
                      </div>
                      <a
                        href={localizedHref(
                          locale,
                          `/services/columbarium/${hall.slug}`,
                        )}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-jade transition hover:text-gold"
                      >
                        {copy.halls.cta}
                        <ArrowRightIcon className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="mt-6 text-xs leading-6 text-stone">{copy.halls.priceNote}</p>
        </div>
      </section>

      <section id="news" className="container-page py-20 md:py-28">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">{newsUi.home.eyebrow}</p>
            <h2 className="section-title">{newsUi.home.title}</h2>
            <p className="section-copy">{newsUi.home.intro}</p>
          </div>
          <ButtonLink
            href={localizedHref(locale, "/news")}
            variant="secondary"
            showArrow
          >
            {newsUi.home.cta}
          </ButtonLink>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {latestNews(3).map((post) => (
            <NewsCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>
      </section>

      <SocialSection locale={locale} />

      <section id="pre-planning" className="container-page py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="eyebrow">{copy.preplanning.eyebrow}</p>
            <h2 className="section-title">{copy.preplanning.title}</h2>
            <p className="section-copy">{copy.preplanning.intro}</p>
            <ButtonLink
              href={localizedHref(locale, "/pre-planning")}
              variant="primary"
              className="mt-8"
              showArrow
            >
              {copy.preplanning.cta}
            </ButtonLink>
            <p className="mt-4 max-w-md text-xs leading-6 text-stone">
              {copy.preplanning.note}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {copy.preplanning.steps.map((step, index) => (
              <article key={step.title} className="border border-line bg-paper p-6">
                <p className="font-display text-3xl text-gold-dark">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-xl text-ink">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-7 text-ink/70">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="border-y border-line bg-paper py-20 md:py-24">
        <div className="container-page max-w-3xl">
          <p className="eyebrow">{copy.faq.eyebrow}</p>
          <h2 className="section-title">{copy.faq.title}</h2>
          <div className="mt-8">
            {copy.faq.items.map((item) => (
              <details key={item.q} className="group border-b border-line py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-base font-medium text-ink [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <ChevronDownIcon className="h-4 w-4 shrink-0 text-jade transition group-open:rotate-180" />
                </summary>
                <p className="mt-4 pr-8 text-base leading-7 text-ink/70">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-jade-deep text-ivory">
        <div className="container-page grid gap-12 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-light">
              {copy.contact.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
              {copy.contact.title}
            </h2>
            <p className="mt-5 max-w-xl text-[16px] leading-8 text-ivory/75 sm:text-[17px]">
              {copy.contact.intro}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink
                href={waLink(ui.whatsapp.booking, contact.whatsappBooking)}
                variant="primary"
                target="_blank"
                rel="noreferrer"
              >
                {copy.contact.bookingCta}
              </ButtonLink>
              <ButtonLink href={telHref(contact.phone24h)} variant="ghost">
                {copy.contact.callCta}
              </ButtonLink>
            </div>

            <div className="mt-8 space-y-3 text-sm text-ivory/75">
              <a
                href={telHref(contact.phone24h)}
                className="flex items-center gap-3 transition hover:text-gold-light"
              >
                <PhoneIcon className="h-4 w-4 text-gold-light" />
                {contact.phone24hDisplay}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 transition hover:text-gold-light"
              >
                <MailIcon className="h-4 w-4 text-gold-light" />
                {contact.email}
              </a>
            </div>

            <p className="mt-6 max-w-md text-xs leading-6 text-ivory/60">
              {copy.contact.note}
            </p>
          </div>

          <div className="space-y-5">
            {ui.addresses.map((address) => (
              <a
                key={address.label}
                href={mapsUrl(address.value)}
                target="_blank"
                rel="noreferrer"
                className="group block border border-ivory/20 p-5 transition hover:border-gold-light/60"
              >
                <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-light">
                  <MapPinIcon className="h-4 w-4" />
                  {address.label}
                </span>
                <p className="mt-3 text-[15px] leading-7 text-ivory/80">
                  {address.value}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs text-ivory/60 transition group-hover:text-gold-light">
                  {ui.labels.viewMap}
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </span>
              </a>
            ))}

            <div className="border border-ivory/20 p-5">
              <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-light">
                <ClockIcon className="h-4 w-4" />
                {ui.labels.hours}
              </span>
              <p className="mt-3 text-[15px] leading-7 text-ivory/80">{ui.hours.value}</p>
              <p className="mt-1 text-xs text-ivory/60">{ui.hours.emergency}</p>
            </div>

            <a
              href={waLink(ui.whatsapp.general)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 border border-gold-light/40 px-5 py-4 text-sm font-semibold text-gold-light transition hover:bg-gold-light hover:text-jade-deep"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {ui.cta.whatsapp}
            </a>
          </div>
        </div>
      </section>

      <BookSection locale={locale} />
    </>
  );
}
