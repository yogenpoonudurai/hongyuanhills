import { ButtonLink } from "@/components/ui/ButtonLink";
import { LotusIcon } from "@/components/ui/Icons";
import { LeadForm } from "@/components/forms/LeadForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { siteCopy } from "@/content/site";
import { tabletsCopy } from "@/content/tablets";
import type { Locale } from "@/content/types";
import { waLink } from "@/lib/contact";
import { homeHref, localizedHref } from "@/lib/i18n";
import { jsonLd } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/metadata";

export function TabletsPage({ locale }: { locale: Locale }) {
  const copy = tabletsCopy[locale];
  const ui = siteCopy[locale];
  const whatsappHref = waLink(ui.whatsapp.general);
  const servicesHref = localizedHref(locale, "/#services");
  const contactHref = localizedHref(locale, "/contact");

  const breadcrumbs = [
    { label: locale === "zh" ? "首页" : "Home", href: homeHref(locale) },
    { label: locale === "zh" ? "服务项目" : "Services", href: servicesHref },
    { label: locale === "zh" ? "神主牌" : "Ancestral Tablets" },
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
          "/services/ancestral-tablets",
        )}`,
      },
    ],
  };

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: copy.meta.title,
    description: copy.meta.description,
    url: `${SITE_URL}${localizedHref(
      locale,
      "/services/ancestral-tablets",
    )}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbSchema)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(pageSchema)}
      />

      <PageHeader
        locale={locale}
        eyebrow={copy.header.eyebrow}
        title={copy.header.title}
        intro={copy.header.intro}
        badge={copy.header.badge}
        breadcrumbs={breadcrumbs}
      />

      <section className="container-page grid gap-10 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-28">
        <div>
          <p className="eyebrow">
            {locale === "zh" ? "祖先灵位" : "Ancestral Tablets"}
          </p>
          <h2 className="section-title">{copy.what.title}</h2>
          <div className="mt-5 space-y-4">
            {copy.what.body.map((paragraph) => (
              <p
                key={paragraph}
                className="text-[16px] leading-8 text-ink/75 sm:text-[17px]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <div className="flex min-h-72 flex-col items-center justify-center border border-gold/40 bg-jade-deep p-8 text-center text-ivory">
          <LotusIcon className="h-12 w-12 text-gold-light" />
          <p className="mt-5 font-display text-3xl">
            {locale === "zh" ? "神主牌" : "Ancestral Tablets"}
          </p>
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-gold-light">
            {copy.header.badge}
          </p>
        </div>
      </section>

      <section className="border-y border-line bg-ivory py-20 md:py-28">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">
              {locale === "zh" ? "规划方向" : "What to Expect"}
            </p>
            <h2 className="section-title">{copy.expect.title}</h2>
            <p className="section-copy">{copy.expect.intro}</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {copy.expect.items.map((item) => (
              <article key={item.title} className="border border-line bg-paper p-6">
                <LotusIcon className="h-5 w-5 text-gold-dark" />
                <h3 className="mt-4 font-display text-xl text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-[15px] leading-7 text-ink/70">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="notify" className="scroll-mt-40 py-20 md:scroll-mt-48 md:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="eyebrow">
              {locale === "zh" ? "开放通知" : "Launch Notification"}
            </p>
            <h2 className="section-title">{copy.form.title}</h2>
            <p className="section-copy">{copy.form.intro}</p>
            <p className="mt-6 text-xs leading-6 text-stone">{copy.note}</p>
          </div>
          <div className="border border-line bg-paper p-5 sm:p-8">
            <LeadForm
              locale={locale}
              mode="notify"
              submitLabel={copy.form.submit}
              notifyMessage={copy.form.message}
              successOverride={{
                title: copy.form.successTitle,
                body: copy.form.successBody,
              }}
              showUrgent={false}
            />
          </div>
        </div>
      </section>

      <section className="bg-jade-deep py-20 text-ivory md:py-24">
        <div className="container-page flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              {copy.cta.title}
            </h2>
            <p className="mt-4 text-[16px] leading-8 text-ivory/75">
              {copy.cta.body}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink
              href={whatsappHref}
              variant="primary"
              target="_blank"
              rel="noreferrer"
            >
              {copy.cta.whatsapp}
            </ButtonLink>
            <ButtonLink href={contactHref} variant="ghost" showArrow>
              {locale === "zh" ? "联络方式" : "Contact Us"}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
