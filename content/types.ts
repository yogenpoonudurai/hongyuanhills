export type Locale = "zh" | "en";

export type L<T> = Record<Locale, T>;

export interface ImageRef {
  /** Base path without extension, e.g. /images/hall-zizai */
  src: string;
  alt: L<string>;
  width: number;
  height: number;
}

export interface HallPanel {
  name: L<string>;
  body: L<string>;
}

export interface Hall {
  slug: string;
  name: L<string>;
  tagline: L<string>;
  summary: L<string>;
  intro: L<string>;
  image: ImageRef;
  heroImage: ImageRef;
  accent: string;
  deity?: { name: L<string>; body: L<string> };
  panelDetails: HallPanel[];
  amenities: L<string[]>;
  gallery: ImageRef[];
  video: { youtubeId?: string; poster: ImageRef; title: L<string> };
  locationNote: L<string>;
}

export type PriceService = "grounds" | "columbarium" | "funeral" | "tablets";

export interface Price {
  id: string;
  service: PriceService;
  hallSlug?: string;
  label: L<string>;
  /** MYR integer, or null for "Price on request". Never invent a number. */
  fromPrice: number | null;
  unit?: L<string>;
  notes?: L<string>;
  sourceImage?: string;
  lastUpdated: string;
}
