import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import type { Locale } from "@/content/types";

export function PageHeader({
  locale,
  eyebrow,
  title,
  intro,
  breadcrumbs,
  badge,
}: {
  locale: Locale;
  eyebrow: string;
  title: string;
  intro: string;
  breadcrumbs: Array<{ label: string; href?: string }>;
  badge?: string;
}) {
  return (
    <section className="border-b border-line bg-jade-deep text-ivory">
      <div className="container-page py-16 md:py-24">
        <Breadcrumbs
          items={breadcrumbs}
          label={locale === "zh" ? "面包屑" : "Breadcrumb"}
        />
        {badge ? (
          <span className="mt-6 inline-flex items-center rounded-full border border-gold-light/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-light">
            {badge}
          </span>
        ) : null}
        <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-light md:text-xs">
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-4xl font-display text-4xl leading-[1.08] sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-[16px] leading-8 text-ivory/80 sm:text-[17px]">
          {intro}
        </p>
      </div>
    </section>
  );
}
