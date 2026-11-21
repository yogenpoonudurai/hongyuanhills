import { ArrowRightIcon } from "@/components/ui/Icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { Picture } from "@/components/ui/Picture";
import { newsCopy, type NewsPost } from "@/content/news";
import type { Locale } from "@/content/types";
import { formatNewsDate } from "@/lib/date";
import { homeHref, localizedHref } from "@/lib/i18n";
import { jsonLd } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/metadata";

export function NewsArticlePage({
  post,
  locale,
}: {
  post: NewsPost;
  locale: Locale;
}) {
  const copy = newsCopy[locale];
  const newsHref = localizedHref(locale, "/news");
  const articleHref = localizedHref(locale, `/news/${post.slug}`);
  const breadcrumbs = [
    { label: locale === "zh" ? "首页" : "Home", href: homeHref(locale) },
    { label: locale === "zh" ? "新闻与动态" : "News & Updates", href: newsHref },
    { label: post.title[locale] },
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
        item: `${SITE_URL}${newsHref}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title[locale],
        item: `${SITE_URL}${articleHref}`,
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title[locale],
    description: post.excerpt[locale],
    datePublished: `${post.date}T00:00:00+08:00`,
    dateModified: `${post.date}T00:00:00+08:00`,
    inLanguage: locale === "zh" ? "zh-Hans" : "en",
    mainEntityOfPage: `${SITE_URL}${articleHref}`,
    image: `${SITE_URL}${post.image?.src ?? "/images/hero"}.jpg`,
    publisher: {
      "@type": "Organization",
      name: locale === "zh" ? "宏缘宝地" : "Hong Yuan Hills",
      url: SITE_URL,
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
        dangerouslySetInnerHTML={jsonLd(articleSchema)}
      />

      <PageHeader
        locale={locale}
        eyebrow={post.category[locale]}
        title={post.title[locale]}
        intro={post.excerpt[locale]}
        breadcrumbs={breadcrumbs}
      />

      <article className="container-page max-w-3xl py-16 md:py-24">
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone">
          <span>{post.category[locale]}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.date}>
            {copy.article.published} {formatNewsDate(post.date, locale)}
          </time>
        </div>

        {post.image ? (
          <Picture
            src={post.image.src}
            alt={post.image.alt[locale]}
            width={post.image.width}
            height={post.image.height}
            className="mt-8 aspect-[16/9] overflow-hidden"
          />
        ) : null}

        <div className="mt-8 space-y-5">
          {post.body[locale].map((paragraph) => (
            <p
              key={paragraph}
              className="text-[17px] leading-8 text-ink/80"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <a
          href={newsHref}
          className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-jade transition hover:text-gold"
        >
          <ArrowRightIcon className="h-4 w-4 rotate-180" />
          {copy.article.back}
        </a>
      </article>
    </>
  );
}
