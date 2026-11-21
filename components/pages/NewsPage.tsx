import { NewsCard } from "@/components/ui/NewsCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { news, newsCopy } from "@/content/news";
import type { Locale } from "@/content/types";
import { homeHref, localizedHref } from "@/lib/i18n";
import { jsonLd } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/metadata";

export function NewsPage({ locale }: { locale: Locale }) {
  const copy = newsCopy[locale];
  const breadcrumbs = [
    { label: locale === "zh" ? "首页" : "Home", href: homeHref(locale) },
    { label: locale === "zh" ? "新闻与动态" : "News & Updates" },
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
        item: `${SITE_URL}${localizedHref(locale, "/news")}`,
      },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: copy.hub.meta.title,
    description: copy.hub.meta.description,
    url: `${SITE_URL}${localizedHref(locale, "/news")}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: news.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: post.title[locale],
        url: `${SITE_URL}${localizedHref(locale, `/news/${post.slug}`)}`,
      })),
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
        dangerouslySetInnerHTML={jsonLd(collectionSchema)}
      />

      <PageHeader
        locale={locale}
        eyebrow={locale === "zh" ? "最新消息" : "Latest updates"}
        title={copy.hub.title}
        intro={copy.hub.intro}
        breadcrumbs={breadcrumbs}
      />

      <section className="container-page py-20 md:py-28">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((post) => (
            <NewsCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>
      </section>
    </>
  );
}
