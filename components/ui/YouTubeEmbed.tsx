"use client";

import { useState } from "react";
import { PlayIcon } from "@/components/ui/Icons";
import { Picture } from "@/components/ui/Picture";
import type { ImageRef, Locale } from "@/content/types";

export function YouTubeEmbed({
  youtubeId,
  poster,
  title,
  locale,
  comingSoon,
}: {
  youtubeId?: string;
  poster: ImageRef;
  title: string;
  locale: Locale;
  comingSoon: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (!youtubeId) {
    return (
      <div className="relative aspect-video overflow-hidden border border-line bg-jade-deep">
        <Picture
          src={poster.src}
          alt={poster.alt[locale]}
          width={poster.width}
          height={poster.height}
          className="h-full w-full"
          imgClassName="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink/40 text-ivory">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-ivory/40">
            <PlayIcon className="h-5 w-5" />
          </span>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em]">
            {comingSoon}
          </p>
        </div>
      </div>
    );
  }

  if (playing) {
    return (
      <div className="relative aspect-video overflow-hidden border border-line bg-ink">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={
        locale === "zh" ? `播放影片：${title}` : `Play video: ${title}`
      }
      className="group relative block aspect-video w-full overflow-hidden border border-line bg-jade-deep text-ivory"
    >
      <Picture
        src={poster.src}
        alt={poster.alt[locale]}
        width={poster.width}
        height={poster.height}
        className="h-full w-full"
        imgClassName="h-full w-full object-cover opacity-65 transition duration-500 group-hover:scale-[1.02]"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-ink/30">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-ivory/50 bg-ink/30">
          <PlayIcon className="h-5 w-5" />
        </span>
      </span>
    </button>
  );
}
