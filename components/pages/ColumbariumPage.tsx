import { ArrowRightIcon } from "@/components/ui/Icons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageHero } from "@/components/ui/PageHero";
import { Picture } from "@/components/ui/Picture";
import { columbariumCopy } from "@/content/columbarium";
import { halls } from "@/content/halls";
import { getHallPrice } from "@/content/pricing";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/content/types";
import { waLink } from "@/lib/contact";
import { homeHref, localizedHref } from "@/lib/i18n";
import { jsonLd } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/metadata";
import { formatFromPrice } from "@/lib/pricing";

export function ColumbariumPage({ locale }: { locale: Locale }) {
  const copy = columbariumCopy[locale];
  const ui = siteCopy[locale];
  const bookHref = localizedHref(locale, "/#book");
  const home = homeHref(locale);
  const servicesHref = localizedHref(locale, "/#services");
  const whatsappHref = waLink(ui.whatsapp.general);

  const breadcrumbs = [
    { label: locale === "zh" ? "首页" : "Home", href: home },
    { label: locale === "zh" ? "服务项目" : "Services", href: servicesHref },
    { label: locale === "zh" ? "骨灰殿" : "Columbarium" },
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
        name: breadcrumbs[2].label,
        item: `${SITE_URL}${localizedHref(locale, "/services/columbarium")}`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: copy.meta.title,
    itemListElement: halls.map((hall, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: hall.name[locale],
      url: `${SITE_URL}${localizedHref(
        locale,
        `/services/columbarium/${hall.slug}`,
      )}`,
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
        dangerouslySetInnerHTML={jsonLd(itemListSchema)}
      />

      <PageHero
        locale={locale}
        image={halls[0].heroImage}
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
        intro={copy.hero.intro}
        primaryHref={bookHref}
        primaryLabel={copy.hero.book}
        secondaryHref={whatsappHref}
        secondaryLabel={copy.hero.whatsapp}
        breadcrumbs={breadcrumbs}
      />

      <section className="border-b border-line bg-paper py-16 md:py-20">
        <div className="container-page grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <div>
            <p className="eyebrow">
              {locale === "zh" ? "四座殿堂" : "Four Halls"}
            </p>
            <h2 className="section-title">{copy.intro.title}</h2>
          </div>
          <div className="space-y-4">
            {copy.intro.body.map((paragraph) => (
              <p
                key={paragraph}
                className="text-[16px] leading-8 text-ink/75 sm:text-[17px]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20 md:py-28">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">{copy.comparison.eyebrow}</p>
            <h2 className="section-title">{copy.comparison.title}</h2>
            <p className="section-copy">{copy.comparison.intro}</p>
          </div>

          <div className="mt-10 hidden overflow-hidden border border-line md:block">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-line bg-paper text-[10px] uppercase tracking-[0.16em] text-stone">
                  <th scope="col" className="px-5 py-4 font-semibold">
                    {copy.comparison.labels.hall}
                  </th>
                  <th scope="col" className="px-5 py-4 font-semibold">
                    {copy.comparison.labels.focus}
                  </th>
                  <th scope="col" className="px-5 py-4 font-semibold">
                    {copy.comparison.labels.design}
                  </th>
                  <th scope="col" className="px-5 py-4 font-semibold">
                    {copy.comparison.labels.price}
                  </th>
                </tr>
              </thead>
              <tbody>
                {halls.map((hall) => (
                  <tr
                    key={hall.slug}
                    className="border-b border-line bg-paper last:border-0"
                  >
                    <th scope="row" className="px-5 py-4">
                      <a
                        href={localizedHref(
                          locale,
                          `/services/columbarium/${hall.slug}`,
                        )}
                        className="font-display text-lg text-ink transition hover:text-jade"
                      >
                        {hall.name[locale]}
                      </a>
                    </th>
                    <td className="px-5 py-4 text-ink/70">
                      {hall.deity?.name[locale] ?? hall.tagline[locale]}
                    </td>
                    <td className="px-5 py-4 text-ink/70">
                      {hall.panelDetails[0]?.name[locale]}
                    </td>
                    <td className="px-5 py-4 font-semibold text-jade">
                      {formatFromPrice(
                        getHallPrice(hall.slug)?.fromPrice ?? null,
                        locale,
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid gap-3 md:hidden">
            {halls.map((hall) => (
              <a
                key={hall.slug}
                href={localizedHref(
                  locale,
                  `/services/columbarium/${hall.slug}`,
                )}
                className="border border-line bg-paper p-5 transition hover:border-gold/60"
              >
                <p className="font-display text-xl text-ink">
                  {hall.name[locale]}
                </p>
                <dl className="mt-3 space-y-2 text-[14px] leading-6">
                  <div className="flex gap-2">
                    <dt className="w-24 shrink-0 text-stone">
                      {copy.comparison.labels.focus}
                    </dt>
                    <dd className="text-ink/75">
                      {hall.deity?.name[locale] ?? hall.tagline[locale]}
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-24 shrink-0 text-stone">
                      {copy.comparison.labels.design}
                    </dt>
                    <dd className="text-ink/75">
                      {hall.panelDetails[0]?.name[locale]}
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-24 shrink-0 text-stone">
                      {copy.comparison.labels.price}
                    </dt>
                    <dd className="font-semibold text-jade">
                      {formatFromPrice(
                        getHallPrice(hall.slug)?.fromPrice ?? null,
                        locale,
                      )}
                    </dd>
                  </div>
                </dl>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow">
                {locale === "zh" ? "殿堂" : "The Halls"}
              </p>
              <h2 className="section-title">
                {locale === "zh"
                  ? "走进四座殿堂。"
                  : "Step inside the four halls."}
              </h2>
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {halls.map((hall) => (
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
                  className="aspect-[16/10] overflow-hidden"
                  imgClassName="transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone">
                    {hall.tagline[locale]}
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-ink">
                    {hall.name[locale]}
                  </h3>
                  <p className="mt-3 flex-1 text-[15px] leading-7 text-ink/70">
                    {hall.summary[locale]}
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-4 border-t border-line pt-4">
                    <span className="text-sm font-semibold text-jade">
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
                      {locale === "zh" ? "查看殿堂" : "View hall"}
                      <ArrowRightIcon className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-6 text-xs leading-6 text-stone">{copy.notice}</p>
        </div>
      </section>

      <section className="border-y border-line bg-ivory py-20 md:py-28">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">{copy.howToChoose.eyebrow}</p>
            <h2 className="section-title">{copy.howToChoose.title}</h2>
            <p className="section-copy">{copy.howToChoose.intro}</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {copy.howToChoose.points.map((point, index) => (
              <article key={point.title} className="border border-line bg-paper p-6">
                <p className="font-display text-3xl text-gold-dark">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-xl text-ink">
                  {point.title}
                </h3>
                <p className="mt-2 text-[15px] leading-7 text-ink/70">
                  {point.body}
                </p>
              </article>
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
      </section>
    </>
  );
}
