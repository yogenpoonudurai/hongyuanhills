import { ArrowRightIcon, CheckIcon } from "@/components/ui/Icons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Gallery } from "@/components/ui/Gallery";
import { PageHero } from "@/components/ui/PageHero";
import { Picture } from "@/components/ui/Picture";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";
import { halls } from "@/content/halls";
import { getHallPrice } from "@/content/pricing";
import { siteCopy } from "@/content/site";
import type { Hall, Locale } from "@/content/types";
import { waLink } from "@/lib/contact";
import { homeHref, localizedHref } from "@/lib/i18n";
import { jsonLd } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/metadata";
import { formatFromPrice, priceDisclaimer } from "@/lib/pricing";

export function HallPage({ hall, locale }: { hall: Hall; locale: Locale }) {
  const ui = siteCopy[locale];
  const bookHref = localizedHref(locale, "/#book");
  const whatsappHref = waLink(ui.whatsapp.general);
  const price = getHallPrice(hall.slug);
  const firstGalleryImage =
    hall.gallery.length > 0 ? hall.gallery[0] : hall.image;
  const relatedHalls = halls
    .filter((item) => item.slug !== hall.slug)
    .slice(0, 3);

  const breadcrumbs = [
    { label: locale === "zh" ? "首页" : "Home", href: homeHref(locale) },
    {
      label: locale === "zh" ? "骨灰殿" : "Columbarium",
      href: localizedHref(locale, "/services/columbarium"),
    },
    { label: hall.name[locale] },
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
        item: `${SITE_URL}${localizedHref(locale, "/services/columbarium")}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: hall.name[locale],
        item: `${SITE_URL}${localizedHref(
          locale,
          `/services/columbarium/${hall.slug}`,
        )}`,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: hall.name[locale],
    description: hall.summary[locale],
    serviceType: "Columbarium niche",
    provider: {
      "@type": "FuneralHome",
      name: "Hong Yuan Hills",
      url: SITE_URL,
    },
    areaServed: { "@type": "Place", name: "Kluang, Johor, Malaysia" },
    image: `${SITE_URL}${hall.heroImage.src}.jpg`,
    url: `${SITE_URL}${localizedHref(
      locale,
      `/services/columbarium/${hall.slug}`,
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
        dangerouslySetInnerHTML={jsonLd(serviceSchema)}
      />

      <PageHero
        locale={locale}
        image={hall.heroImage}
        eyebrow={hall.tagline[locale]}
        title={hall.name[locale]}
        intro={hall.summary[locale]}
        primaryHref={bookHref}
        primaryLabel={locale === "zh" ? "预约参观" : "Book a Visit"}
        secondaryHref={whatsappHref}
        secondaryLabel={locale === "zh" ? "WhatsApp 咨询" : "WhatsApp Us"}
        breadcrumbs={breadcrumbs}
      />

      <section className="border-b border-line bg-paper">
        <div className="container-page grid grid-cols-2 gap-0 py-6 md:grid-cols-4">
          {hall.amenities[locale].slice(0, 4).map((amenity, index) => (
            <div
              key={amenity}
              className={
                index > 0
                  ? "border-l border-line px-4 py-2 text-center text-[11px] leading-5 text-ink/75 first:border-0 md:px-5 md:text-xs"
                  : "px-4 py-2 text-center text-[11px] leading-5 text-ink/75 md:px-5 md:text-xs"
              }
            >
              <CheckIcon className="mx-auto mb-2 h-4 w-4 text-gold-dark" />
              {amenity}
            </div>
          ))}
        </div>
      </section>

      <section className="container-page grid gap-10 py-20 md:grid-cols-2 md:items-center md:py-28">
        <Picture
          src={firstGalleryImage.src}
          alt={firstGalleryImage.alt[locale]}
          width={firstGalleryImage.width}
          height={firstGalleryImage.height}
          className="aspect-[4/3] overflow-hidden"
        />
        <div>
          <p className="eyebrow">
            {locale === "zh" ? "殿堂介绍" : "About the Hall"}
          </p>
          <h2 className="section-title">{hall.name[locale]}</h2>
          <p className="mt-5 text-[16px] leading-8 text-ink/75 sm:text-[17px]">
            {hall.intro[locale]}
          </p>
          <p className="mt-4 text-[15px] leading-7 text-ink/70">
            {hall.locationNote[locale]}
          </p>
          <ButtonLink href={bookHref} variant="secondary" className="mt-7" showArrow>
            {locale === "zh" ? "预约参观" : "Book a Visit"}
          </ButtonLink>
        </div>
      </section>

      {hall.deity ? (
        <section className="border-y border-line bg-ivory py-20 md:py-28">
          <div className="container-page grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="eyebrow">
                {locale === "zh" ? "中央主尊" : "Central Deity"}
              </p>
              <h2 className="section-title">{hall.deity.name[locale]}</h2>
              <p className="section-copy">{hall.deity.body[locale]}</p>
            </div>
            <Picture
              src={hall.gallery[1]?.src ?? hall.image.src}
              alt={hall.gallery[1]?.alt[locale] ?? hall.image.alt[locale]}
              width={hall.gallery[1]?.width ?? hall.image.width}
              height={hall.gallery[1]?.height ?? hall.image.height}
              className="aspect-[4/3] overflow-hidden"
            />
          </div>
        </section>
      ) : null}

      <section className="container-page py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow">
            {locale === "zh" ? "面板与格位" : "Panels and Niches"}
          </p>
          <h2 className="section-title">
            {locale === "zh" ? "三种祝福，三种表达。" : "Three expressions of blessing."}
          </h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {hall.panelDetails.map((panel, index) => (
            <article key={panel.name[locale]} className="border border-line bg-paper p-6">
              <p className="font-display text-3xl text-gold-dark">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-xl text-ink">
                {panel.name[locale]}
              </h3>
              <p className="mt-3 text-[15px] leading-7 text-ink/70">
                {panel.body[locale]}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-ivory py-20 md:py-28">
        <div className="container-page grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="eyebrow">
              {locale === "zh" ? "影片导览" : "Video Tour"}
            </p>
            <h2 className="section-title">{hall.video.title[locale]}</h2>
            <p className="section-copy">
              {locale === "zh"
                ? "透过短片感受殿堂的空间、光线与细节。影片即将上线。"
                : "A short film on the hall’s space, light and details. Coming soon."}
            </p>
          </div>
          <YouTubeEmbed
            youtubeId={hall.video.youtubeId}
            poster={hall.video.poster}
            title={hall.video.title[locale]}
            locale={locale}
            comingSoon={locale === "zh" ? "影片即将上线" : "Video coming soon"}
          />
        </div>
      </section>

      <section className="container-page py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow">
            {locale === "zh" ? "殿堂实景" : "The Hall"}
          </p>
          <h2 className="section-title">
            {locale === "zh" ? "细节与光影。" : "Details and light."}
          </h2>
        </div>
        <div className="mt-10">
          <Gallery images={hall.gallery} locale={locale} />
        </div>
      </section>

      <section className="border-y border-line bg-paper py-20 md:py-24">
        <div className="container-page grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="eyebrow">
              {locale === "zh" ? "格位咨询" : "Niche Enquiry"}
            </p>
            <h2 className="section-title">
              {locale === "zh" ? "价格与供应。" : "Pricing and availability."}
            </h2>
            <p className="mt-4 max-w-xl text-[16px] leading-8 text-ink/70">
              {locale === "zh"
                ? "格位价格视位置、面板设计与供应情况而定。欢迎预约参观，由顾问为您说明。"
                : "Niche pricing depends on position, panel design and availability. Book a visit and a consultant will explain the options."}
            </p>
            <p className="mt-4 text-xs leading-6 text-stone">
              {priceDisclaimer(locale)}
            </p>
          </div>
          <div className="border border-line bg-ivory p-6">
            <p className="text-[10px] uppercase tracking-[0.16em] text-stone">
              {locale === "zh" ? "价格" : "Price"}
            </p>
            <p className="mt-2 font-display text-3xl text-jade">
              {formatFromPrice(price?.fromPrice ?? null, locale)}
            </p>
            <p className="mt-3 text-xs leading-6 text-stone">{hall.locationNote[locale]}</p>
            <div className="mt-6 flex flex-col gap-3">
              <ButtonLink href={bookHref} variant="primary" showArrow>
                {locale === "zh" ? "预约参观" : "Book a Visit"}
              </ButtonLink>
              <ButtonLink
                href={whatsappHref}
                variant="secondary"
                target="_blank"
                rel="noreferrer"
              >
                {locale === "zh" ? "WhatsApp 咨询" : "WhatsApp Us"}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-jade-deep py-20 text-ivory md:py-28">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold-light">
                {locale === "zh" ? "其他殿堂" : "Other Halls"}
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl">
                {locale === "zh" ? "继续比较。" : "Keep comparing."}
              </h2>
            </div>
            <a
              href={localizedHref(locale, "/services/columbarium")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold-light transition hover:text-ivory"
            >
              {locale === "zh" ? "返回骨灰殿" : "Back to Columbarium"}
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {relatedHalls.map((other) => (
              <a
                key={other.slug}
                href={localizedHref(
                  locale,
                  `/services/columbarium/${other.slug}`,
                )}
                className="group border border-ivory/20 transition hover:border-gold-light/60"
              >
                <Picture
                  src={other.image.src}
                  alt={other.image.alt[locale]}
                  width={other.image.width}
                  height={other.image.height}
                  className="aspect-[4/3] overflow-hidden"
                  imgClassName="transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="p-4">
                  <p className="font-display text-xl text-ivory">
                    {other.name[locale]}
                  </p>
                  <p className="mt-1 text-xs text-ivory/60">
                    {other.tagline[locale]}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

