import { ButtonLink } from "@/components/ui/ButtonLink";
import { CheckIcon } from "@/components/ui/Icons";
import { PageHero } from "@/components/ui/PageHero";
import { funeralCopy } from "@/content/funeral";
import { groundsImages } from "@/content/grounds";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/content/types";
import { contact, telHref, waLink } from "@/lib/contact";
import { homeHref, localizedHref } from "@/lib/i18n";
import { jsonLd } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/metadata";

export function FuneralServicesPage({ locale }: { locale: Locale }) {
  const copy = funeralCopy[locale];
  const ui = siteCopy[locale];
  const callHref = telHref(contact.phone24h);
  const whatsappHref = waLink(
    ui.whatsapp.funeral,
    contact.whatsappEmergency,
  );
  const quoteHref = waLink(ui.whatsapp.booking, contact.whatsappBooking);
  const servicesHref = localizedHref(locale, "/#services");

  const breadcrumbs = [
    { label: locale === "zh" ? "首页" : "Home", href: homeHref(locale) },
    {
      label: locale === "zh" ? "服务项目" : "Services",
      href: servicesHref,
    },
    { label: locale === "zh" ? "殡仪服务" : "Funeral Services" },
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
        item: `${SITE_URL}${servicesHref}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: breadcrumbs[2].label,
        item: `${SITE_URL}${localizedHref(
          locale,
          "/services/funeral-services",
        )}`,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: copy.meta.title,
    description: copy.meta.description,
    serviceType: "Funeral services",
    provider: {
      "@type": "FuneralHome",
      name: "Hong Yuan Hills",
      url: SITE_URL,
      telephone: `+${contact.phone24h}`,
    },
    areaServed: { "@type": "Place", name: "Kluang, Johor, Malaysia" },
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
        dangerouslySetInnerHTML={jsonLd(breadcrumbSchema)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(serviceSchema)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(faqSchema)}
      />

      <PageHero
        locale={locale}
        image={groundsImages.landscape}
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
        intro={copy.hero.intro}
        primaryHref={callHref}
        primaryLabel={copy.urgent.call}
        secondaryHref={whatsappHref}
        secondaryLabel={copy.urgent.whatsapp}
        breadcrumbs={breadcrumbs}
      />

      <section className="border-b border-line bg-ivory py-10">
        <div className="container-page flex flex-col justify-between gap-6 border border-gold/40 bg-paper p-6 md:flex-row md:items-center md:p-8">
          <div>
            <h2 className="font-display text-2xl text-ink">
              {copy.urgent.title}
            </h2>
            <p className="mt-2 max-w-2xl text-[15px] leading-7 text-ink/70">
              {copy.urgent.body}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={callHref} variant="primary">
              {copy.urgent.call}
            </ButtonLink>
            <ButtonLink
              href={whatsappHref}
              variant="secondary"
              target="_blank"
              rel="noreferrer"
            >
              {copy.urgent.whatsapp}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="container-page py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow">
            {locale === "zh" ? "服务范围" : "What We Handle"}
          </p>
          <h2 className="section-title">{copy.services.title}</h2>
          <p className="section-copy">{copy.services.intro}</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {copy.services.items.map((item, index) => (
            <article key={item.title} className="border border-line bg-paper p-6">
              <p className="font-display text-3xl text-gold-dark">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-xl text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-[15px] leading-7 text-ink/70">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-ivory py-20 md:py-28">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">
              {locale === "zh" ? "协助流程" : "Process"}
            </p>
            <h2 className="section-title">{copy.process.title}</h2>
            <p className="section-copy">{copy.process.intro}</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {copy.process.steps.map((step, index) => (
              <article key={step.title} className="border border-line bg-paper p-5">
                <p className="font-display text-3xl text-gold-dark">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-lg text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-[14px] leading-6 text-ink/70">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page grid gap-10 py-20 md:grid-cols-2 md:items-start md:py-28">
        <div>
          <p className="eyebrow">
            {locale === "zh" ? "文化与宗教" : "Culture and Faith"}
          </p>
          <h2 className="section-title">{copy.customs.title}</h2>
          <p className="section-copy">{copy.customs.body}</p>
          <ul className="mt-7 space-y-3">
            {copy.customs.points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 text-[15px] leading-7 text-ink/75"
              >
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-line bg-paper p-6 md:p-8">
          <p className="eyebrow">
            {locale === "zh" ? "配套说明" : "Packages"}
          </p>
          <h3 className="mt-3 font-display text-2xl text-ink">
            {copy.packages.title}
          </h3>
          <p className="mt-3 text-[15px] leading-7 text-ink/70">
            {copy.packages.body}
          </p>
          <p className="mt-3 text-xs leading-6 text-stone">
            {copy.packages.note}
          </p>
          <ButtonLink href={quoteHref} variant="secondary" target="_blank" rel="noreferrer" className="mt-6" showArrow>
            {copy.packages.cta}
          </ButtonLink>
        </div>
      </section>

      <section className="border-y border-line bg-ivory py-20 md:py-24">
        <div className="container-page grid gap-8 md:grid-cols-2">
          <div>
            <p className="eyebrow">
              {locale === "zh" ? "准备事项" : "Preparation"}
            </p>
            <h2 className="section-title">{copy.checklist.title}</h2>
            <p className="section-copy">{copy.checklist.intro}</p>
          </div>
          <ul className="space-y-3">
            {copy.checklist.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 border border-line bg-paper p-4 text-[15px] leading-7 text-ink/75"
              >
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page max-w-3xl py-20 md:py-24">
        <p className="eyebrow">
          {locale === "zh" ? "常见问题" : "FAQ"}
        </p>
        <h2 className="section-title">{copy.faq.title}</h2>
        <div className="mt-8">
          {copy.faq.items.map((item) => (
            <details key={item.q} className="group border-b border-line py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-base font-medium text-ink [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="text-lg text-jade transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 pr-8 text-base leading-7 text-ink/70">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-jade-deep py-20 text-ivory md:py-28">
        <div className="container-page flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
              {copy.cta.title}
            </h2>
            <p className="mt-4 text-[16px] leading-8 text-ivory/75">
              {copy.cta.body}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={callHref} variant="primary">
              {copy.cta.call}
            </ButtonLink>
            <ButtonLink
              href={whatsappHref}
              variant="ghost"
              target="_blank"
              rel="noreferrer"
            >
              {copy.cta.whatsapp}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
