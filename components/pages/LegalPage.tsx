import { PageHeader } from "@/components/ui/PageHeader";
import type { LegalDocument } from "@/content/legal";
import type { Locale } from "@/content/types";
import { homeHref, localizedHref } from "@/lib/i18n";
import { jsonLd } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/metadata";

export function LegalPage({
  locale,
  doc,
  path,
}: {
  locale: Locale;
  doc: LegalDocument;
  path: string;
}) {
  const breadcrumbs = [
    { label: locale === "zh" ? "首页" : "Home", href: homeHref(locale) },
    { label: doc.title },
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
        item: `${SITE_URL}${localizedHref(locale, path)}`,
      },
    ],
  };

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: doc.meta.title,
    description: doc.meta.description,
    url: `${SITE_URL}${localizedHref(locale, path)}`,
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
        eyebrow={locale === "zh" ? "法律资讯" : "Legal"}
        title={doc.title}
        intro={doc.intro}
        breadcrumbs={breadcrumbs}
      />

      <article className="container-page max-w-3xl py-16 md:py-24">
        <p className="text-[11px] uppercase tracking-[0.16em] text-stone">
          {locale === "zh" ? "最后更新" : "Last updated"}: {doc.lastUpdated}
        </p>

        <div className="mt-10 space-y-10">
          {doc.sections.map((section, index) => (
            <section key={section.title}>
              <h2 className="font-display text-2xl text-ink">
                {index + 1}. {section.title}
              </h2>
              {section.body ? (
                <div className="mt-3 space-y-3">
                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-[16px] leading-8 text-ink/75"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : null}
              {section.bullets ? (
                <ul className="mt-4 space-y-2">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 text-[16px] leading-8 text-ink/75"
                    >
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <p className="text-[15px] leading-7 text-ink/70">
            {doc.contactNote}
          </p>
        </div>
      </article>
    </>
  );
}
