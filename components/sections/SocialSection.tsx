import {
  ArrowRightIcon,
  FacebookIcon,
  InstagramIcon,
} from "@/components/ui/Icons";
import { socialCopy, socialProfiles } from "@/content/social";
import type { Locale } from "@/content/types";
import { localizedHref } from "@/lib/i18n";

export function SocialSection({ locale }: { locale: Locale }) {
  const copy = socialCopy[locale];
  const newsHref = localizedHref(locale, "/news");

  return (
    <section id="social" className="border-y border-line bg-ivory py-20 md:py-24">
      <div className="container-page grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center">
        <div>
          <p className="eyebrow">{copy.section.eyebrow}</p>
          <h2 className="section-title">{copy.section.title}</h2>
          <p className="section-copy">{copy.section.intro}</p>
          <p className="mt-4 max-w-md text-xs leading-6 text-stone">
            {copy.note}
          </p>
          <a
            href={newsHref}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-jade transition hover:text-gold"
          >
            {copy.newsCta}
            <ArrowRightIcon className="h-4 w-4" />
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href={socialProfiles.facebook.url}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col border border-line bg-paper p-6 transition hover:border-gold/60 hover:shadow-lg hover:shadow-ink/5"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ivory text-jade">
              <FacebookIcon className="h-5 w-5" />
            </span>
            <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-stone">
              {copy.facebook.label}
            </p>
            <h3 className="mt-1 font-display text-xl text-ink">
              {socialProfiles.facebook.name[locale]}
            </h3>
            <p className="mt-1 text-sm text-ink/70">
              {socialProfiles.facebook.handle}
            </p>
            <p className="mt-3 text-xs leading-6 text-stone">
              {socialProfiles.facebook.category[locale]}
            </p>
            <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-jade transition group-hover:text-gold">
              {copy.facebook.cta}
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </span>
          </a>

          <a
            href={socialProfiles.instagram.url}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col border border-line bg-paper p-6 transition hover:border-gold/60 hover:shadow-lg hover:shadow-ink/5"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ivory text-jade">
              <InstagramIcon className="h-5 w-5" />
            </span>
            <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-stone">
              {copy.instagram.label}
            </p>
            <h3 className="mt-1 font-display text-xl text-ink">
              {socialProfiles.instagram.name[locale]}
            </h3>
            <p className="mt-1 text-sm text-ink/70">
              {socialProfiles.instagram.handle}
            </p>
            <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-jade transition group-hover:text-gold">
              {copy.instagram.cta}
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
