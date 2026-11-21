import { ButtonLink } from "@/components/ui/ButtonLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Picture } from "@/components/ui/Picture";
import type { ImageRef, Locale } from "@/content/types";

type PageHeroProps = {
  locale: Locale;
  image: ImageRef;
  eyebrow: string;
  title: string;
  intro: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  breadcrumbs: Array<{ label: string; href?: string }>;
};

export function PageHero({
  locale,
  image,
  eyebrow,
  title,
  intro,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  breadcrumbs,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-jade-deep">
      <Picture
        src={image.src}
        alt={image.alt[locale]}
        width={image.width}
        height={image.height}
        priority
        className="absolute inset-0 -z-10"
        imgClassName="h-full w-full object-cover opacity-75"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/75 via-ink/40 to-ink/85" />
      <div className="container-page flex min-h-[62dvh] flex-col justify-end py-14 md:min-h-[68dvh] md:py-24">
        <Breadcrumbs
          items={breadcrumbs}
          label={locale === "zh" ? "面包屑" : "Breadcrumb"}
        />
        <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-light md:text-xs">
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-4xl font-display text-4xl leading-[1.08] text-ivory sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-[16px] leading-8 text-ivory/80 sm:text-[17px]">
          {intro}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={primaryHref} variant="primary" showArrow>
            {primaryLabel}
          </ButtonLink>
          <ButtonLink
            href={secondaryHref}
            variant="ghost"
            target="_blank"
            rel="noreferrer"
          >
            {secondaryLabel}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
