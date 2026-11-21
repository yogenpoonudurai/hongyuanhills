import { ButtonLink } from "@/components/ui/ButtonLink";
import { CheckIcon } from "@/components/ui/Icons";
import { Gallery } from "@/components/ui/Gallery";
import { PageHero } from "@/components/ui/PageHero";
import { Picture } from "@/components/ui/Picture";
import { aboutCopy, aboutImages } from "@/content/about";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/content/types";
import { waLink } from "@/lib/contact";
import { homeHref, localizedHref } from "@/lib/i18n";
import { jsonLd } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/metadata";

export function AboutPage({ locale }: { locale: Locale }) {
  const copy = aboutCopy[locale];
  const ui = siteCopy[locale];
  const bookHref = localizedHref(locale, "/contact#form");
  const whatsappHref = waLink(ui.whatsapp.general);

  const breadcrumbs = [
    { label: locale === "zh" ? "首页" : "Home", href: homeHref(locale) },
    { label: locale === "zh" ? "关于我们" : "About Us" },
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
        item: `${SITE_URL}${localizedHref(locale, "/about")}`,
      },
    ],
  };

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: copy.meta.title,
    description: copy.meta.description,
    url: `${SITE_URL}${localizedHref(locale, "/about")}`,
    about: {
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
        dangerouslySetInnerHTML={jsonLd(aboutSchema)}
      />

      <PageHero
        locale={locale}
        image={aboutImages.hero}
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
        intro={copy.hero.intro}
        primaryHref={bookHref}
        primaryLabel={locale === "zh" ? "预约参观" : "Book a Visit"}
        secondaryHref={whatsappHref}
        secondaryLabel={locale === "zh" ? "WhatsApp 咨询" : "WhatsApp Us"}
        breadcrumbs={breadcrumbs}
      />

      <section className="container-page grid gap-10 py-20 md:grid-cols-2 md:items-center md:py-28">
        <Picture
          src={aboutImages.gallery[1].src}
          alt={aboutImages.gallery[1].alt[locale]}
          width={aboutImages.gallery[1].width}
          height={aboutImages.gallery[1].height}
          className="aspect-[4/3] overflow-hidden"
        />
        <div>
          <p className="eyebrow">
            {locale === "zh" ? "我们的故事" : "Our Story"}
          </p>
          <h2 className="section-title">{copy.story.title}</h2>
          <div className="mt-5 space-y-4">
            {copy.story.body.map((paragraph) => (
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

      <section className="border-y border-line bg-ivory py-20 md:py-28">
        <div className="container-page grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <p className="eyebrow">
              {locale === "zh" ? "使命" : "Mission"}
            </p>
            <h2 className="section-title">{copy.mission.title}</h2>
          </div>
          <div>
            <div className="space-y-4">
              {copy.mission.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[16px] leading-8 text-ink/75 sm:text-[17px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <blockquote className="mt-8 border-l-2 border-gold pl-5">
              <p className="font-display text-2xl leading-relaxed text-jade">
                “{copy.mission.quote}”
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="container-page py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow">
            {locale === "zh" ? "价值观" : "Values"}
          </p>
          <h2 className="section-title">{copy.values.title}</h2>
          <p className="section-copy">{copy.values.intro}</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {copy.values.items.map((value) => (
            <article key={value.name} className="border border-line bg-paper p-6">
              <p className="font-display text-5xl text-gold-dark">
                {value.name}
              </p>
              <p className="mt-4 text-[15px] leading-7 text-ink/70">
                {value.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-ivory py-20 md:py-28">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">
              {locale === "zh" ? "我们的优势" : "Why Us"}
            </p>
            <h2 className="section-title">{copy.why.title}</h2>
            <p className="section-copy">{copy.why.intro}</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {copy.why.items.map((item, index) => (
              <article key={item.title} className="border border-line bg-paper p-6">
                <div className="flex items-start gap-4">
                  <p className="font-display text-3xl text-gold-dark">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <h3 className="font-display text-xl text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-7 text-ink/70">
                      {item.body}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page grid gap-10 py-20 md:grid-cols-2 md:items-center md:py-28">
        <div>
          <p className="eyebrow">
            {locale === "zh" ? "园区规划" : "Planning"}
          </p>
          <h2 className="section-title">{copy.planning.title}</h2>
          <div className="mt-5 space-y-4">
            {copy.planning.body.map((paragraph) => (
              <p
                key={paragraph}
                className="text-[16px] leading-8 text-ink/75 sm:text-[17px]"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <p className="mt-6 flex items-start gap-2 text-[15px] leading-7 text-ink/70">
            <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
            {copy.planning.note}
          </p>
        </div>
        <Picture
          src={aboutImages.gallery[2].src}
          alt={aboutImages.gallery[2].alt[locale]}
          width={aboutImages.gallery[2].width}
          height={aboutImages.gallery[2].height}
          className="aspect-[4/3] overflow-hidden"
        />
      </section>

      <section className="border-y border-line bg-ivory py-20 md:py-28">
        <div className="container-page">
          <p className="eyebrow">{copy.gallery.title}</p>
          <h2 className="section-title">{copy.gallery.intro}</h2>
          <div className="mt-10">
            <Gallery images={aboutImages.gallery} locale={locale} />
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
