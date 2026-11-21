import type { Metadata } from "next";
import type { Locale } from "@/content/types";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://hongyuanhills.com"
).replace(/\/$/, "");

type BuildMetadataInput = {
  locale: Locale;
  /** Chinese path, e.g. "/" or "/about". English is derived as /en + path. */
  path: string;
  title: string;
  description: string;
  image?: string;
};

export function localePaths(path: string) {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  return {
    zh: `${SITE_URL}${clean || "/"}`,
    en: `${SITE_URL}/en${clean}`,
  };
}

export function buildMetadata({
  locale,
  path,
  title,
  description,
  image = "/images/hero.jpg",
}: BuildMetadataInput): Metadata {
  const paths = localePaths(path);
  const canonical = locale === "zh" ? paths.zh : paths.en;
  const absoluteImage = image.startsWith("http")
    ? image
    : `${SITE_URL}${image}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: title },
    description,
    alternates: {
      canonical,
      languages: {
        "zh-Hans": paths.zh,
        en: paths.en,
        "x-default": paths.zh,
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "Hong Yuan Hills",
      title,
      description,
      locale: locale === "zh" ? "zh_MY" : "en_MY",
      images: [{ url: absoluteImage, width: 1920, height: 1080, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteImage],
    },
    robots: { index: true, follow: true },
  };
}
