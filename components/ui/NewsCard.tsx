import { ArrowRightIcon, LotusIcon } from "@/components/ui/Icons";
import { Picture } from "@/components/ui/Picture";
import { newsCopy, type NewsPost } from "@/content/news";
import type { Locale } from "@/content/types";
import { formatNewsDate } from "@/lib/date";
import { localizedHref } from "@/lib/i18n";

export function NewsCard({
  post,
  locale,
}: {
  post: NewsPost;
  locale: Locale;
}) {
  const copy = newsCopy[locale];
  const href = localizedHref(locale, `/news/${post.slug}`);

  return (
    <article className="group flex flex-col overflow-hidden border border-line bg-paper transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5">
      {post.image ? (
        <Picture
          src={post.image.src}
          alt={post.image.alt[locale]}
          width={post.image.width}
          height={post.image.height}
          className="aspect-[16/10] overflow-hidden"
          imgClassName="transition duration-700 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="flex aspect-[16/10] items-center justify-center bg-jade-deep">
          <LotusIcon className="h-10 w-10 text-gold-light" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-stone">
          <span>{post.category[locale]}</span>
          <time dateTime={post.date}>
            {formatNewsDate(post.date, locale)}
          </time>
        </div>
        <h3 className="mt-3 font-display text-xl leading-snug text-ink">
          <a href={href} className="transition hover:text-jade">
            {post.title[locale]}
          </a>
        </h3>
        <p className="mt-2 flex-1 text-[15px] leading-7 text-ink/70">
          {post.excerpt[locale]}
        </p>
        <a
          href={href}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-jade transition hover:text-gold"
        >
          {copy.article.readMore}
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}
