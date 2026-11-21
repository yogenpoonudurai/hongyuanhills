import type { Hall } from "./types";

export const halls: Hall[] = [
  {
    slug: "zizai-pavilion",
    name: { zh: "自在阁", en: "Zizai Pavilion" },
    tagline: {
      zh: "冷气骨灰殿 · 自在菩萨",
      en: "Air-conditioned columbarium · Zizai Bodhisattva",
    },
    summary: {
      zh: "一处真正让思念「安住」的清净殿堂。金色心经与蓝色涟漪两种面板，配以汉白玉双莲透灯设计。",
      en: "A tranquil hall where remembrance can truly rest, with Gold Heart Sutra and Blue Ripple panels and illuminated white-marble lotuses.",
    },
    image: {
      src: "/images/hall-zizai",
      alt: {
        zh: "自在阁冷气骨灰殿内部",
        en: "Interior of Zizai Pavilion columbarium",
      },
      width: 1200,
      height: 900,
    },
    accent: "#C9A227",
    panels: {
      zh: [
        "金色心经 · 佛教尊贵款",
        "蓝色涟漪 · 无宗教友好款",
        "汉白玉双莲 · 透灯祝福",
      ],
      en: [
        "Golden Heart Sutra · Buddhist series",
        "Blue Ripple · Universal series",
        "Double white-marble lotus · illuminated blessing",
      ],
    },
  },
  {
    slug: "benyuan-pavilion",
    name: { zh: "本愿阁", en: "Benyuan Pavilion" },
    tagline: {
      zh: "地藏王菩萨 · 净土殿堂",
      en: "Ksitigarbha Bodhisattva · Pure Land hall",
    },
    summary: {
      zh: "「地狱不空，誓不成佛。」本愿阁恭奉地藏王菩萨，以西方极乐世界为核心意象，承载愿力、福德与超度功德。",
      en: "Named after Ksitigarbha Bodhisattva’s great vow, Benyuan Pavilion enshrines the Bodhisattva and is inspired by the Western Pure Land.",
    },
    image: {
      src: "/images/hall-benyuan",
      alt: {
        zh: "本愿阁地藏王菩萨圣像",
        en: "Ksitigarbha Bodhisattva at Benyuan Pavilion",
      },
      width: 1200,
      height: 900,
    },
    accent: "#A66B3A",
    panels: {
      zh: ["地藏王菩萨圣像", "西方极乐世界意象", "愿力与超度功德"],
      en: [
        "Ksitigarbha Bodhisattva",
        "Western Pure Land imagery",
        "Vows, merit and blessings",
      ],
    },
  },
  {
    slug: "sanyuan-hall",
    name: { zh: "三缘殿", en: "Sanyuan Hall" },
    tagline: {
      zh: "冷气骨灰殿 · 三圣像安奉位",
      en: "Air-conditioned columbarium · Three Buddha niches",
    },
    summary: {
      zh: "阿弥陀佛、观音菩萨与弥勒佛安奉于水晶玻璃之内。三种安奉格位，以「缘」为名，让先人安住，也让家人心安。",
      en: "Amitabha, Guanyin and Maitreya are enshrined behind crystal glass. Three niche types, named for karmic connection, offer a calm resting place.",
    },
    image: {
      src: "/images/hall-sanyuan",
      alt: {
        zh: "三缘殿阿弥陀佛圣像",
        en: "Amitabha Buddha at Sanyuan Hall",
      },
      width: 1200,
      height: 900,
    },
    accent: "#6E8B7B",
    panels: {
      zh: [
        "观音菩萨安奉位 · 慈悲抚平烦恼",
        "阿弥陀佛安奉位 · 光明接引彼岸",
        "弥勒佛安奉位 · 欢喜与安宁",
      ],
      en: [
        "Guanyin Bodhisattva · compassion",
        "Amitabha Buddha · guiding light",
        "Maitreya Buddha · joy and peace",
      ],
    },
  },
  {
    slug: "danxiang-pavilion",
    name: { zh: "丹香阁", en: "Danxiang Pavilion" },
    tagline: {
      zh: "冷气骨灰殿 · 汉白玉牡丹面板",
      en: "Air-conditioned columbarium · white-marble peony panels",
    },
    summary: {
      zh: "丹香，淡而不散。粉色与蓝色汉白玉粉铸面板如春日牡丹，中心水晶钻圆环捕捉每一份记忆的光芒。",
      en: "A gentle, enduring remembrance. Pink and blue white-marble panels resemble spring peonies, with a crystal-studded centre that catches each memory.",
    },
    image: {
      src: "/images/hall-danxiang",
      alt: {
        zh: "丹香阁汉白玉牡丹面板",
        en: "White-marble peony panels at Danxiang Pavilion",
      },
      width: 1200,
      height: 900,
    },
    accent: "#C98A95",
    panels: {
      zh: ["汉白玉粉铸面板", "粉蓝牡丹意象", "水晶钻圆环 · 记忆之光"],
      en: [
        "White-marble powder cast panels",
        "Pink and blue peony motifs",
        "Crystal-studded ring · light of memory",
      ],
    },
  },
];

export function getHall(slug: string): Hall | undefined {
  return halls.find((hall) => hall.slug === slug);
}
