import {
  ArrowRightIcon,
  ChevronDownIcon,
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Picture } from "@/components/ui/Picture";
import { SocialSection } from "@/components/sections/SocialSection";
import { aboutImages } from "@/content/about";
import { groundsImages } from "@/content/grounds";
import { halls } from "@/content/halls";
import { homeCopy } from "@/content/home";
import { latestNews, newsCopy } from "@/content/news";
import { getHallPrice } from "@/content/pricing";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/content/types";
import { contact, mapsUrl, telHref, waLink } from "@/lib/contact";
import { formatNewsDate } from "@/lib/date";
import { localizedHref } from "@/lib/i18n";
import { jsonLd } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/metadata";
import { formatFromPrice } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export function HomePage({ locale }: { locale: Locale }) {
  const copy = homeCopy[locale];
  const ui = siteCopy[locale];
  const newsUi = newsCopy[locale];
  const isZh = locale === "zh";
  const bookHref = waLink(ui.whatsapp.booking, contact.whatsappBooking);
  const whatsappHref = waLink(ui.whatsapp.booking, contact.whatsappBooking);
  const phoneHref = telHref(contact.phone24h);

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

      <section
        id="top"
        className="relative isolate flex min-h-[100dvh] flex-col justify-end overflow-hidden bg-jade-deep"
      >
        <Picture
          src="/images/hero"
          alt={copy.hero.imageAlt}
          width={1600}
          height={900}
          priority
          className="absolute inset-0 -z-10"
          imgClassName="h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/80 via-ink/30 to-jade-deep/95" />
        <span aria-hidden="true" className="absolute right-6 top-1/3 hidden [writing-mode:vertical-rl] text-[9px] tracking-[0.4em] text-ivory/55 md:block">
          HONG YUAN HILLS · KLUANG
        </span>

        <div className="container-page pb-14 pt-40 md:pb-24">
          <div className="flex items-center gap-3">
            <img src="/images/client-logo.avif" alt="" aria-hidden="true" className="h-8 w-8 shrink-0 object-contain" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-light">
              {copy.hero.eyebrow}
            </p>
          </div>
          <h1 className="mt-8 max-w-5xl font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.98] text-ivory">
            {copy.hero.title}
          </h1>
          <p className="mt-8 max-w-xl text-[17px] leading-8 text-ivory/75">
            {copy.hero.body}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <ButtonLink href={bookHref} variant="primary" target="_blank" rel="noreferrer" showArrow>
              {copy.hero.primary}
            </ButtonLink>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-ivory/80 underline decoration-gold/40 underline-offset-8 transition hover:text-gold-light"
            >
              {copy.hero.secondary}
            </a>
          </div>

          <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-ivory/15 pt-5 text-[10px] tracking-[0.14em] text-ivory/55">
            {copy.trust.map((item) => (
              <span key={item.label}>
                {item.value} · {item.label}
              </span>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-3 text-[9px] uppercase tracking-[0.22em] text-ivory/60">
            <span className="h-8 w-px bg-ivory/20" />
            {isZh ? "向下探索" : "Scroll"}
          </div>
        </div>
      </section>

      <section id="about" className="relative overflow-hidden py-24 md:py-40">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 top-16 hidden font-display text-[22rem] leading-none text-ink/[0.035] md:block"
        >
          缘
        </span>
        <div className="container-page grid gap-14 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="eyebrow">{copy.about.eyebrow}</p>
            <h2 className="mt-5 max-w-4xl font-display text-[clamp(2.6rem,5vw,4.8rem)] leading-[1.04] text-ink">
              {copy.about.title}
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {copy.about.body.slice(0, 2).map((paragraph) => (
                <p key={paragraph} className="text-[16px] leading-8 text-ink/75">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {copy.about.points.map((point) => (
                <span
                  key={point}
                  className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-jade"
                >
                  <span className="h-1 w-1 rounded-full bg-seal" />
                  {point}
                </span>
              ))}
            </div>
            <a
              href={localizedHref(locale, "/about")}
              className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-jade transition hover:text-gold"
            >
              {copy.about.cta}
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </div>

          <div className="md:col-span-5">
            <Picture
              src={aboutImages.hero.src}
              alt={aboutImages.hero.alt[locale]}
              width={aboutImages.hero.width}
              height={aboutImages.hero.height}
              className="aspect-[4/3] overflow-hidden"
            />
            <p className="mt-3 text-[9px] uppercase tracking-[0.2em] text-stone">
              Hong Yuan Hills · Kluang
            </p>
          </div>
        </div>
      </section>

      <section
        id="grounds"
        className="relative isolate flex min-h-[70vh] items-end overflow-hidden bg-jade-deep text-ivory md:min-h-[80vh]"
      >
        <Picture
          src={groundsImages.pond.src}
          alt={groundsImages.pond.alt[locale]}
          width={groundsImages.pond.width}
          height={groundsImages.pond.height}
          className="absolute inset-0 -z-10"
          imgClassName="h-full w-full object-cover opacity-75"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-jade-deep/95 via-jade-deep/25 to-transparent" />
        <div className="container-page grid gap-8 pb-16 pt-40 md:grid-cols-[0.7fr_0.3fr] md:items-end md:pb-24">
          <div>
            <p className="eyebrow text-gold-light">{copy.grounds.eyebrow}</p>
            <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02]">
              {copy.grounds.title}
            </h2>
            <p className="mt-6 max-w-xl text-[16px] leading-8 text-ivory/75">
              {copy.grounds.body}
            </p>
            <a
              href={localizedHref(locale, "/services/feng-shui-grounds")}
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold-light transition hover:text-ivory"
            >
              {copy.grounds.cta}
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </div>
          <ul className="space-y-3 text-[10px] uppercase tracking-[0.14em] text-ivory/60 md:text-right">
            {copy.grounds.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="services" className="py-24 md:py-36">
        <div className="container-page grid gap-10 md:grid-cols-[0.6fr_1.4fr]">
          <div>
            <p className="eyebrow">{copy.services.eyebrow}</p>
            <h2 className="mt-4 font-display text-[clamp(2.4rem,4.5vw,4rem)] leading-[1.04] text-ink">
              {copy.services.title}
            </h2>
            <p className="mt-5 max-w-sm text-[16px] leading-8 text-ink/70">
              {copy.services.intro}
            </p>
          </div>

          <div className="grid border-t border-line md:grid-cols-2">
            {copy.services.items.map((item, index) => (
              <a
                key={item.title}
                href={localizedHref(locale, item.href)}
                className={cn(
                  "group border-b border-line py-8 md:px-8",
                  index % 2 === 0 && "md:border-r",
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[10px] uppercase tracking-[0.16em] text-stone">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <ArrowRightIcon className="h-4 w-4 text-jade transition group-hover:translate-x-1" />
                </div>
                <h3 className="mt-4 font-display text-3xl text-ink sm:text-4xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-sm text-[15px] leading-7 text-ink/70">
                  {item.body}
                </p>
                <span className="mt-4 inline-block text-[10px] uppercase tracking-[0.16em] text-jade">
                  {item.cta}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="halls" className="border-y border-line bg-ivory py-24 md:py-36">
        <div className="container-page grid gap-12 md:grid-cols-[0.55fr_1.45fr]">
          <div className="md:sticky md:top-32 md:self-start">
            <p className="eyebrow">{copy.halls.eyebrow}</p>
            <h2 className="mt-4 font-display text-[clamp(2.6rem,5vw,4.8rem)] leading-[1.02] text-ink">
              {copy.halls.title}
            </h2>
            <p className="mt-5 max-w-sm text-[16px] leading-8 text-ink/70">
              {copy.halls.intro}
            </p>
            <a
              href={localizedHref(locale, "/services/columbarium")}
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-jade transition hover:text-gold"
            >
              {isZh ? "查看全部殿堂" : "All halls"}
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </div>

          <div>
            {halls.map((hall, index) => (
              <article
                key={hall.slug}
                className={cn(
                  "grid gap-6 border-t border-line py-10 md:grid-cols-[0.45fr_0.55fr] md:items-center md:gap-10",
                  index === 0 && "border-t-0 pt-0",
                )}
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span
                      className="h-px w-8"
                      style={{ backgroundColor: hall.accent }}
                    />
                    <span className="text-[10px] uppercase tracking-[0.16em] text-stone">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-4xl leading-none text-ink sm:text-5xl">
                    {hall.name[locale]}
                  </h3>
                  <p className="mt-3 text-[10px] uppercase tracking-[0.14em] text-jade">
                    {hall.tagline[locale]}
                  </p>
                  <p className="mt-4 max-w-md text-[15px] leading-7 text-ink/70">
                    {hall.summary[locale]}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-5">
                    <span className="text-xs text-stone">
                      {formatFromPrice(
                        getHallPrice(hall.slug)?.fromPrice ?? null,
                        locale,
                      )}
                    </span>
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

                <a
                  href={localizedHref(
                    locale,
                    `/services/columbarium/${hall.slug}`,
                  )}
                  className="group block overflow-hidden"
                >
                  <Picture
                    src={hall.heroImage.src}
                    alt={hall.heroImage.alt[locale]}
                    width={hall.heroImage.width}
                    height={hall.heroImage.height}
                    className="aspect-[4/3]"
                    imgClassName="transition duration-700 group-hover:scale-[1.03]"
                  />
                </a>
              </article>
            ))}
            <p className="mt-6 text-xs leading-6 text-stone">
              {copy.halls.priceNote}
            </p>
          </div>
        </div>
      </section>

      <section id="pre-planning" className="py-24 md:py-36">
        <div className="container-page grid gap-12 md:grid-cols-[0.7fr_1.3fr]">
          <div className="md:sticky md:top-32 md:self-start">
            <p className="eyebrow">{copy.preplanning.eyebrow}</p>
            <h2 className="mt-4 font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.04] text-ink">
              {copy.preplanning.title}
            </h2>
            <p className="mt-5 max-w-sm text-[16px] leading-8 text-ink/70">
              {copy.preplanning.intro}
            </p>
            <ButtonLink
              href={localizedHref(locale, "/pre-planning")}
              variant="secondary"
              className="mt-8"
              showArrow
            >
              {copy.preplanning.cta}
            </ButtonLink>
            <p className="mt-4 max-w-sm text-xs leading-6 text-stone">
              {copy.preplanning.note}
            </p>
          </div>

          <ol className="border-l border-line">
            {copy.preplanning.steps.map((step, index) => (
              <li key={step.title} className="relative pb-10 pl-8 last:pb-0">
                <span className="absolute -left-[4px] top-2 h-2 w-2 rounded-full bg-seal" />
                <span className="text-[10px] uppercase tracking-[0.16em] text-stone">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-2xl text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-lg text-[15px] leading-7 text-ink/70">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="news" className="border-y border-line bg-ivory py-20 md:py-28">
        <div className="container-page grid gap-10 md:grid-cols-[0.5fr_1.5fr]">
          <div>
            <p className="eyebrow">{newsUi.home.eyebrow}</p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.05] text-ink">
              {newsUi.home.title}
            </h2>
            <p className="mt-4 max-w-xs text-[16px] leading-8 text-ink/70">
              {newsUi.home.intro}
            </p>
            <a
              href={localizedHref(locale, "/news")}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-jade transition hover:text-gold"
            >
              {newsUi.home.cta}
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </div>

          <div className="border-t border-line">
            {latestNews(3).map((post) => (
              <a
                key={post.slug}
                href={localizedHref(locale, `/news/${post.slug}`)}
                className="group grid gap-3 border-b border-line py-6 sm:grid-cols-[7rem_1fr_auto] sm:items-baseline"
              >
                <time
                  dateTime={post.date}
                  className="text-[10px] uppercase tracking-[0.14em] text-stone"
                >
                  {formatNewsDate(post.date, locale)}
                </time>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.14em] text-jade">
                    {post.category[locale]}
                  </span>
                  <h3 className="mt-1 font-display text-xl text-ink transition group-hover:text-jade">
                    {post.title[locale]}
                  </h3>
                </div>
                <ArrowRightIcon className="hidden h-4 w-4 text-jade sm:block" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <SocialSection locale={locale} />

      <section id="faq" className="py-20 md:py-28">
        <div className="container-page grid gap-10 md:grid-cols-[0.5fr_1.5fr]">
          <div>
            <p className="eyebrow">{copy.faq.eyebrow}</p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.05] text-ink">
              {copy.faq.title}
            </h2>
          </div>
          <div>
            {copy.faq.items.map((item) => (
              <details key={item.q} className="group border-b border-line py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-base font-medium text-ink [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <ChevronDownIcon className="h-4 w-4 shrink-0 text-jade transition group-open:rotate-180" />
                </summary>
                <p className="mt-4 max-w-2xl pr-8 text-[15px] leading-7 text-ink/70">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden bg-jade-deep text-ivory">
        <div className="container-page grid gap-12 py-24 md:grid-cols-[1.2fr_0.8fr] md:py-32">
          <div>
            <p className="eyebrow text-gold-light">{copy.contact.eyebrow}</p>
            <h2 className="mt-4 max-w-4xl font-display text-[clamp(2.8rem,6vw,5.5rem)] leading-[1.02]">
              {copy.contact.title}
            </h2>
            <p className="mt-6 max-w-xl text-[16px] leading-8 text-ivory/70">
              {copy.contact.intro}
            </p>
            <a
              href={phoneHref}
              className="mt-10 block font-display text-3xl text-gold-light transition hover:text-ivory md:text-4xl"
            >
              {contact.phone24hDisplay}
            </a>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <ButtonLink href={bookHref} variant="primary" target="_blank" rel="noreferrer" showArrow>
                {isZh ? "预约参观" : "Book a Visit"}
              </ButtonLink>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-ivory/75 underline decoration-gold/40 underline-offset-8 transition hover:text-gold-light"
              >
                {ui.cta.whatsapp}
              </a>
            </div>
            <p className="mt-6 max-w-md text-xs leading-6 text-ivory/65">
              {copy.contact.note}
            </p>
          </div>

          <div className="space-y-6 border-t border-ivory/15 pt-6 md:border-l md:border-t-0 md:pl-10 md:pt-0">
            {ui.addresses.map((address) => (
              <a
                key={address.label}
                href={mapsUrl(address.value)}
                target="_blank"
                rel="noreferrer"
                className="group block"
              >
                <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-gold-light">
                  <MapPinIcon className="h-3.5 w-3.5" />
                  {address.label}
                </span>
                <p className="mt-2 text-[15px] leading-7 text-ivory/70 transition group-hover:text-ivory">
                  {address.value}
                </p>
              </a>
            ))}
            <div>
              <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-gold-light">
                <ClockIcon className="h-3.5 w-3.5" />
                {ui.labels.hours}
              </span>
              <p className="mt-2 text-[15px] leading-7 text-ivory/70">
                {ui.hours.value}
              </p>
              <p className="mt-1 text-xs text-ivory/65">
                {ui.hours.emergency}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-5 text-xs text-ivory/60">
              <a
                href={phoneHref}
                className="inline-flex items-center gap-1.5 hover:text-gold-light"
              >
                <PhoneIcon className="h-3.5 w-3.5" />
                {contact.phone24hDisplay}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-1.5 hover:text-gold-light"
              >
                <MailIcon className="h-3.5 w-3.5" />
                {contact.email}
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-gold-light"
              >
                <WhatsAppIcon className="h-3.5 w-3.5" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
