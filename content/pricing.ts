import type { Price } from "./types";

/**
 * Single source of truth for public starting prices.
 * Do not invent figures. `null` renders "Price on request" until the
 * client supplies and approves the image-only price list.
 */
export const pricing: Price[] = [
  {
    id: "penglai-plot",
    service: "grounds",
    label: { zh: "蓬莱宝地福地", en: "Penglai Blessed Grounds plot" },
    fromPrice: null,
    lastUpdated: "2026-11-21",
  },
  {
    id: "zizai-niche",
    service: "columbarium",
    hallSlug: "zizai-pavilion",
    label: { zh: "自在阁骨灰位", en: "Zizai Pavilion niche" },
    fromPrice: null,
    lastUpdated: "2026-11-21",
  },
  {
    id: "benyuan-niche",
    service: "columbarium",
    hallSlug: "benyuan-pavilion",
    label: { zh: "本愿阁骨灰位", en: "Benyuan Pavilion niche" },
    fromPrice: null,
    lastUpdated: "2026-11-21",
  },
  {
    id: "sanyuan-niche",
    service: "columbarium",
    hallSlug: "sanyuan-hall",
    label: { zh: "三缘殿骨灰位", en: "Sanyuan Hall niche" },
    fromPrice: null,
    lastUpdated: "2026-11-21",
  },
  {
    id: "danxiang-niche",
    service: "columbarium",
    hallSlug: "danxiang-pavilion",
    label: { zh: "丹香阁骨灰位", en: "Danxiang Pavilion niche" },
    fromPrice: null,
    lastUpdated: "2026-11-21",
  },
  {
    id: "funeral-package",
    service: "funeral",
    label: { zh: "殡仪服务配套", en: "Funeral service package" },
    fromPrice: null,
    lastUpdated: "2026-11-21",
  },
];

export function getHallPrice(hallSlug: string): Price | undefined {
  return pricing.find((price) => price.hallSlug === hallSlug);
}
