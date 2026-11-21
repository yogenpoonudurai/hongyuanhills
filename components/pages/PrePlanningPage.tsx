import { ButtonLink } from "@/components/ui/ButtonLink";
import { CheckIcon } from "@/components/ui/Icons";
import { PageHero } from "@/components/ui/PageHero";
import { LeadForm } from "@/components/forms/LeadForm";
import { groundsImages } from "@/content/grounds";
import { prePlanningCopy } from "@/content/preplanning";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/content/types";
import { waLink } from "@/lib/contact";
import { homeHref } from "@/lib/i18n";
import { jsonLd } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/metadata";

export function PrePlanningPage({ locale }: { locale: Locale }) {
  const copy = prePlanningCopy[locale];
  const ui = siteCopy[locale];
  const whatsappHref = waLink(ui.whatsapp.general);
  const formHref = "#form";

  const breadcrumbs = [
    { label: locale === "zh" ? "首页" : "Home", href: homeHref(locale) },
    { label: locale === "zh" ? "生前规划" : "Pre-Planning" },
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
        item: `${SITE_URL}${locale === "zh" ? "/pre-planning" : "/en/pre-planning"}`,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: copy.meta.title,
    description: copy.meta.description,
    serviceType: "Memorial pre-planning",
    provider: {
      "@type": "FuneralHome",
      name: "Hong Yuan Hills",
      url: SITE_URL,
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
        image={groundsImages.site}
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
        intro={copy.hero.intro}
        primaryHref={formHref}
        primaryLabel={copy.form.title}
        secondaryHref={whatsappHref}
        secondaryLabel={locale === "zh" ? "WhatsApp 咨询" : "WhatsApp Us"}
        breadcrumbs={breadcrumbs}
      />

      <section className="container-page py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow">
            {locale === "zh" ? "提前规划的好处" : "Benefits"}
          </p>
          <h2 className="section-title">{copy.benefits.title}</h2>
          <p className="section-copy">{copy.benefits.intro}</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {copy.benefits.items.map((item) => (
            <article key={item.title} className="border border-line bg-paper p-6">
              <CheckIcon className="h-5 w-5 text-gold-dark" />
              <h3 className="mt-4 font-display text-xl text-ink">
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
              {locale === "zh" ? "规划流程" : "Process"}
            </p>
            <h2 className="section-title">{copy.steps.title}</h2>
            <p className="section-copy">{copy.steps.intro}</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {copy.steps.items.map((step, index) => (
              <article key={step.title} className="border border-line bg-paper p-6">
                <p className="font-display text-3xl text-gold-dark">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-xl text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-[15px] leading-7 text-ink/70">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20 md:py-28">
        <div className="grid gap-8 border border-gold/40 bg-paper p-6 md:grid-cols-[1.1fr_0.9fr] md:items-center md:p-10">
          <div>
            <p className="eyebrow">
              {locale === "zh" ? "付款方式" : "Payment"}
            </p>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              {copy.payment.title}
            </h2>
            <p className="mt-4 max-w-xl text-[16px] leading-8 text-ink/75">
              {copy.payment.body}
            </p>
            <p className="mt-4 text-xs leading-6 text-stone">
              {copy.payment.note}
            </p>
          </div>
          <div className="border-t border-line pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <p className="font-display text-5xl text-jade">0%</p>
            <p className="mt-2 text-sm text-ink/70">
              {locale === "zh"
                ? "利息分期付款 · 须符合条款"
                : "interest instalments · subject to terms"}
            </p>
            <ButtonLink href={formHref} variant="primary" className="mt-6" showArrow>
              {copy.form.title}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-ivory py-20 md:py-24">
        <div className="container-page max-w-3xl">
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
        </div>
      </section>

      <section id="form" className="scroll-mt-40 py-20 md:scroll-mt-48 md:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="eyebrow">
              {locale === "zh" ? "预约咨询" : "Consultation"}
            </p>
            <h2 className="section-title">{copy.form.title}</h2>
            <p className="section-copy">{copy.form.intro}</p>
            <p className="mt-6 text-[15px] leading-7 text-ink/70">
              {copy.cta.body}
            </p>
            <ButtonLink
              href={whatsappHref}
              variant="secondary"
              className="mt-6"
              target="_blank"
              rel="noreferrer"
            >
              {copy.cta.whatsapp}
            </ButtonLink>
          </div>
          <div className="border border-line bg-paper p-5 sm:p-8">
            <LeadForm locale={locale} />
          </div>
        </div>
      </section>
    </>
  );
}
