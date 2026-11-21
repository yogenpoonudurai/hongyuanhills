import { ButtonLink } from "@/components/ui/ButtonLink";
import { ChapterNav } from "@/components/ui/ChapterNav";
import { FourGuardians } from "@/components/ui/FourGuardians";
import { Gallery } from "@/components/ui/Gallery";
import { CheckIcon } from "@/components/ui/Icons";
import { PageHero } from "@/components/ui/PageHero";
import { Picture } from "@/components/ui/Picture";
import { groundsCopy, groundsGallery, groundsImages } from "@/content/grounds";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/content/types";
import { waLink } from "@/lib/contact";
import { homeHref, localizedHref } from "@/lib/i18n";
import { jsonLd } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/metadata";

export function GroundsPage({ locale }: { locale: Locale }) {
  const copy = groundsCopy[locale];
  const ui = siteCopy[locale];
  const bookHref = localizedHref(locale, "/#book");
  const home = homeHref(locale);
  const servicesHref = localizedHref(locale, "/#services");
  const whatsappHref = waLink(ui.whatsapp.general);

  const breadcrumbs = [
    { label: locale === "zh" ? "首页" : "Home", href: home },
    {
      label: locale === "zh" ? "服务项目" : "Services",
      href: servicesHref,
    },
    { label: locale === "zh" ? "蓬莱宝地" : "Penglai Blessed Grounds" },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: breadcrumbs[0].label,
        item: `${SITE_URL}${home}`,
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
        name: copy.hero.eyebrow,
        item: `${SITE_URL}${localizedHref(locale, "/services/feng-shui-grounds")}`,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: copy.meta.title,
    description: copy.meta.description,
    serviceType: "Feng Shui burial grounds",
    provider: {
      "@type": "FuneralHome",
      name: "Hong Yuan Hills",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Place",
      name: "Kluang, Johor, Malaysia",
    },
    image: `${SITE_URL}/images/grounds/hero.jpg`,
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
        image={groundsImages.hero}
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
        intro={copy.hero.intro}
        primaryHref={bookHref}
        primaryLabel={copy.hero.book}
        secondaryHref={whatsappHref}
        secondaryLabel={copy.hero.whatsapp}
        breadcrumbs={breadcrumbs}
      />

      <section className="border-b border-line bg-paper py-14">
        <div className="container-page max-w-3xl text-center">
          <p className="font-display text-2xl leading-relaxed text-ink sm:text-3xl">
            “{copy.quote.text}”
          </p>
          <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-stone">
            {copy.quote.attribution}
          </p>
        </div>
      </section>

      <ChapterNav
        items={copy.chapters}
        label={locale === "zh" ? "本页章节" : "On this page"}
      />

      <section id="site-selection" className="scroll-mt-40 md:scroll-mt-48">
        <div className="container-page grid gap-10 py-20 md:grid-cols-2 md:items-center md:py-28">
          <Picture
            src={groundsImages.site.src}
            alt={groundsImages.site.alt[locale]}
            width={groundsImages.site.width}
            height={groundsImages.site.height}
            className="aspect-[4/3] overflow-hidden"
          />
          <div>
            <p className="eyebrow">{copy.siteSelection.eyebrow}</p>
            <h2 className="section-title">{copy.siteSelection.title}</h2>
            <div className="mt-5 space-y-4">
              {copy.siteSelection.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[16px] leading-8 text-ink/75 sm:text-[17px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <ul className="mt-7 space-y-3">
              {copy.siteSelection.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-base text-ink/80"
                >
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        id="landscape"
        className="scroll-mt-40 border-y border-line bg-ivory py-20 md:scroll-mt-48 md:py-28"
      >
        <div className="container-page grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow">{copy.landscape.eyebrow}</p>
            <h2 className="section-title">{copy.landscape.title}</h2>
            <p className="section-copy">{copy.landscape.body}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {copy.landscape.points.map((point) => (
                <div
                  key={point.title}
                  className="border border-line bg-paper p-4"
                >
                  <p className="text-sm font-semibold text-jade">
                    {point.title}
                  </p>
                  <p className="mt-2 text-[15px] leading-7 text-ink/70">
                    {point.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <FourGuardians
              label={
                locale === "zh"
                  ? "四神相应示意图"
                  : "Four celestial guardians diagram"
              }
              labels={copy.landscape.guardians}
            />
            <p className="mt-3 text-center text-[11px] tracking-[0.12em] text-stone">
              {locale === "zh" ? "示意图" : "Diagram"}
            </p>
          </div>
        </div>
      </section>

      <section
        id="orientations"
        className="scroll-mt-40 bg-jade-deep py-20 text-ivory md:scroll-mt-48 md:py-28"
      >
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-light">
              {copy.orientations.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
              {copy.orientations.title}
            </h2>
            <p className="mt-5 text-[16px] leading-8 text-ivory/75 sm:text-[17px]">
              {copy.orientations.intro}
            </p>
          </div>

          <div className="mt-10 hidden overflow-hidden border border-ivory/20 md:block">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-ivory/20 text-[10px] uppercase tracking-[0.18em] text-gold-light">
                  <th scope="col" className="px-5 py-4 font-semibold">
                    {locale === "zh" ? "朝向" : "Orientation"}
                  </th>
                  <th scope="col" className="px-5 py-4 font-semibold">
                    {locale === "zh" ? "传统意涵" : "Traditional meaning"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {copy.orientations.rows.map((row) => (
                  <tr
                    key={row.name}
                    className="border-b border-ivory/10 last:border-0"
                  >
                    <th
                      scope="row"
                      className="w-48 px-5 py-4 font-medium text-ivory"
                    >
                      {row.name}
                    </th>
                    <td className="px-5 py-4 text-ivory/75">{row.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid gap-3 md:hidden">
            {copy.orientations.rows.map((row) => (
              <div key={row.name} className="border border-ivory/20 p-4">
                <p className="text-sm font-semibold text-gold-light">
                  {row.name}
                </p>
                <p className="mt-2 text-[15px] leading-7 text-ivory/75">
                  {row.meaning}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 max-w-3xl text-[15px] leading-7 text-ivory/70">
            {copy.orientations.other}
          </p>
        </div>
      </section>

      <section id="soil" className="scroll-mt-40 md:scroll-mt-48">
        <div className="container-page grid gap-10 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div>
            <p className="eyebrow">{copy.soil.eyebrow}</p>
            <h2 className="section-title">{copy.soil.title}</h2>
            <p className="section-copy">{copy.soil.body}</p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {copy.soil.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 border border-line bg-paper p-4 text-[15px] leading-7 text-ink/75"
                >
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <Picture
            src={groundsImages.landscape.src}
            alt={groundsImages.landscape.alt[locale]}
            width={groundsImages.landscape.width}
            height={groundsImages.landscape.height}
            className="aspect-[4/3] overflow-hidden"
          />
        </div>
      </section>

      <section
        id="pond"
        className="scroll-mt-40 border-y border-line bg-ivory py-20 md:scroll-mt-48 md:py-28"
      >
        <div className="container-page">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <Picture
              src={groundsImages.pond.src}
              alt={groundsImages.pond.alt[locale]}
              width={groundsImages.pond.width}
              height={groundsImages.pond.height}
              className="aspect-[4/3] overflow-hidden"
            />
            <div>
              <p className="eyebrow">{copy.pond.eyebrow}</p>
              <h2 className="section-title">{copy.pond.title}</h2>
              <p className="section-copy">{copy.pond.body}</p>
            </div>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {copy.pond.sections.map((section) => (
              <article
                key={section.title}
                className="border border-line bg-paper p-6"
              >
                <h3 className="font-display text-xl text-ink">
                  {section.title}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-ink/70">
                  {section.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="qualities" className="scroll-mt-40 md:scroll-mt-48">
        <div className="container-page py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="eyebrow">{copy.qualities.eyebrow}</p>
            <h2 className="section-title">{copy.qualities.title}</h2>
            <p className="section-copy">{copy.qualities.intro}</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {copy.qualities.points.map((point, index) => (
              <article key={point} className="border border-line bg-paper p-6">
                <p className="font-display text-3xl text-gold-dark">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 text-[15px] leading-7 text-ink/75">{point}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-ivory py-20 md:py-28">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">{copy.gallery.eyebrow}</p>
            <h2 className="section-title">{copy.gallery.title}</h2>
            <p className="section-copy">{copy.gallery.intro}</p>
          </div>
          <div className="mt-10">
            <Gallery images={groundsGallery} locale={locale} />
          </div>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-40 md:scroll-mt-48">
        <div className="container-page py-20 md:py-28">
          <div className="grid gap-8 border border-line bg-paper p-6 md:grid-cols-[1.2fr_0.8fr] md:items-center md:p-10">
            <div>
              <p className="eyebrow">{copy.pricing.eyebrow}</p>
              <h2 className="font-display text-3xl text-ink sm:text-4xl">
                {copy.pricing.title}
              </h2>
              <p className="mt-4 max-w-2xl text-[16px] leading-8 text-ink/70">
                {copy.pricing.intro}
              </p>
              <p className="mt-4 text-xs leading-6 text-stone">
                {copy.pricing.note}
              </p>
            </div>
            <div className="border-t border-line pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <p className="text-[10px] uppercase tracking-[0.16em] text-stone">
                {locale === "zh" ? "价格" : "Price"}
              </p>
              <p className="mt-2 font-display text-2xl text-jade">
                {ui.cta.priceOnRequest}
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <ButtonLink href={bookHref} variant="primary" showArrow>
                  {copy.pricing.cta}
                </ButtonLink>
                <ButtonLink
                  href={whatsappHref}
                  variant="secondary"
                  target="_blank"
                  rel="noreferrer"
                >
                  {copy.pricing.whatsapp}
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper py-20 md:py-24">
        <div className="container-page max-w-3xl">
          <p className="eyebrow">{copy.faq.eyebrow}</p>
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
            <ButtonLink href={bookHref} variant="primary" showArrow>
              {copy.cta.book}
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
        <div className="container-page mt-10 border-t border-ivory/20 pt-5">
          <p className="text-xs leading-6 text-ivory/60">
            {copy.disclaimer}
          </p>
        </div>
      </section>
    </>
  );
}
