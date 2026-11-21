import {
  ArrowRightIcon,
  FacebookIcon,
  InstagramIcon,
} from "@/components/ui/Icons";
import { socialCopy, socialProfiles } from "@/content/social";
import type { Locale } from "@/content/types";

export function SocialSection({ locale }: { locale: Locale }) {
  const copy = socialCopy[locale];

  return (
    <section id="social" className="border-y border-line bg-paper py-14">
      <div className="container-page flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="eyebrow">{copy.section.eyebrow}</p>
          <h2 className="mt-3 font-display text-2xl text-ink sm:text-3xl">
            {copy.section.title}
          </h2>
          <p className="mt-2 max-w-lg text-[15px] leading-7 text-ink/70">
            {copy.section.intro}
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:items-end">
          <a
            href={socialProfiles.facebook.url}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 text-ink transition hover:text-jade"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-jade">
              <FacebookIcon className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-[10px] uppercase tracking-[0.16em] text-stone">
                {copy.facebook.label}
              </span>
              <span className="text-sm font-medium">
                {socialProfiles.facebook.handle}
              </span>
            </span>
            <ArrowRightIcon className="h-4 w-4 text-jade transition group-hover:translate-x-0.5" />
          </a>

          <a
            href={socialProfiles.instagram.url}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 text-ink transition hover:text-jade"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-jade">
              <InstagramIcon className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-[10px] uppercase tracking-[0.16em] text-stone">
                {copy.instagram.label}
              </span>
              <span className="text-sm font-medium">
                {socialProfiles.instagram.handle}
              </span>
            </span>
            <ArrowRightIcon className="h-4 w-4 text-jade transition group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
