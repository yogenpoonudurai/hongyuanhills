import type { Locale } from "./types";

export type ColumbariumCopy = {
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; intro: string; book: string; whatsapp: string };
  intro: { title: string; body: string[] };
  comparison: {
    eyebrow: string;
    title: string;
    intro: string;
    labels: { hall: string; focus: string; design: string; price: string };
  };
  howToChoose: {
    eyebrow: string;
    title: string;
    intro: string;
    points: Array<{ title: string; body: string }>;
  };
  notice: string;
  cta: { title: string; body: string; book: string; whatsapp: string };
};

export const columbariumCopy: Record<Locale, ColumbariumCopy> = {
  zh: {
    meta: {
      title: "骨灰殿｜自在阁 · 本愿阁 · 三缘殿 · 丹香阁",
      description:
        "宏缘宝地四座骨灰殿：自在阁、本愿阁、三缘殿与丹香阁。了解各殿佛像、面板设计、安奉格位与参观安排。",
    },
    hero: {
      eyebrow: "骨灰殿 · 四座殿堂",
      title: "四座殿堂，四种祝福。",
      intro:
        "冷气骨灰殿与半开放式骨灰殿，庄严、整洁、宁静。每一座殿堂都有独特的佛像、面板设计与祝福意涵。",
      book: "预约参观骨灰殿",
      whatsapp: "WhatsApp 咨询",
    },
    intro: {
      title: "让思念有所安处。",
      body: [
        "宏缘宝地提供室内冷气骨灰殿及半开放式骨灰殿，环境整洁肃穆，便于家属祭拜追思。",
        "四座殿堂各有不同的主尊、面板设计与空间气质，家属可依照信仰、审美与预算选择合适的安奉格位。",
      ],
    },
    comparison: {
      eyebrow: "殿堂比较",
      title: "从主尊到面板，找到合适的一殿。",
      intro:
        "以下为四座殿堂的概览。实际格位、价格与供应情况请咨询顾问。",
      labels: {
        hall: "殿堂",
        focus: "主尊 / 主题",
        design: "面板与格位",
        price: "价格",
      },
    },
    howToChoose: {
      eyebrow: "如何选择",
      title: "四个问题，帮助您决定。",
      intro:
        "没有唯一正确的选择，只有最适合家族的方式。欢迎到园区参观，由顾问陪您比较。",
      points: [
        {
          title: "信仰与氛围",
          body: "若家族重视佛教传统，可选择金色心经、地藏王菩萨或三圣像殿堂；若无特定宗教偏好，蓝色涟漪等无宗教友好设计更为合适。",
        },
        {
          title: "主尊与因缘",
          body: "自在菩萨、地藏王菩萨、阿弥陀佛、观音菩萨与弥勒佛，各有不同象征。可依家族信仰与因缘选择。",
        },
        {
          title: "设计与材质",
          body: "金色心经、蓝色涟漪、汉白玉双莲、粉蓝牡丹与水晶钻圆环，呈现不同的美感与祝福意涵。",
        },
        {
          title: "位置与预算",
          body: "格位位置、殿堂、面板设计与供应情况都会影响价格。顾问可依预算提供合适方案。",
        },
      ],
    },
    notice:
      "各殿堂格位与价格视供应情况及条款而定。参观请提前预约，以便安排顾问陪同。",
    cta: {
      title: "欢迎预约参观骨灰殿。",
      body: "亲眼看看殿堂、佛像与面板细节，再由顾问为您解答疑问。",
      book: "预约参观",
      whatsapp: "WhatsApp 咨询",
    },
  },
  en: {
    meta: {
      title: "Columbarium | Zizai, Benyuan, Sanyuan & Danxiang Halls",
      description:
        "Explore the four columbarium halls at Hong Yuan Hills: Zizai Pavilion, Benyuan Pavilion, Sanyuan Hall and Danxiang Pavilion. Compare deities, panel designs and niche options.",
    },
    hero: {
      eyebrow: "Columbarium · Four Halls",
      title: "Four halls, four expressions of blessing.",
      intro:
        "Air-conditioned and semi-open columbarium halls, each with its own deity, panel design and spiritual character.",
      book: "Book a Columbarium Visit",
      whatsapp: "WhatsApp Us",
    },
    intro: {
      title: "A resting place for remembrance.",
      body: [
        "Hong Yuan Hills offers air-conditioned indoor columbarium halls and semi-open options, kept clean and solemn for family remembrance.",
        "Each of the four halls has a different central deity, panel design and atmosphere, so families can choose according to faith, aesthetic and budget.",
      ],
    },
    comparison: {
      eyebrow: "Compare the Halls",
      title: "From deity to panel, find the right hall.",
      intro:
        "An overview of the four halls. Please speak with a consultant for current niche availability, pricing and terms.",
      labels: {
        hall: "Hall",
        focus: "Deity / theme",
        design: "Panels and niches",
        price: "Price",
      },
    },
    howToChoose: {
      eyebrow: "How to Choose",
      title: "Four questions to guide your decision.",
      intro:
        "There is no single right choice — only the one that suits your family. Visit the park and let a consultant help you compare.",
      points: [
        {
          title: "Faith and atmosphere",
          body: "Families with Buddhist traditions may prefer the Golden Heart Sutra, Ksitigarbha or Three Buddha halls. For no particular religious preference, a universal design such as Blue Ripple may feel more suitable.",
        },
        {
          title: "Deity and connection",
          body: "Zizai Bodhisattva, Ksitigarbha Bodhisattva, Amitabha, Guanyin and Maitreya each carry different symbolism. Choose according to family faith and affinity.",
        },
        {
          title: "Design and material",
          body: "Golden Heart Sutra, Blue Ripple, white-marble lotuses, pink-blue peonies and crystal rings each offer a different aesthetic and expression of blessing.",
        },
        {
          title: "Position and budget",
          body: "Niche position, hall, panel design and availability all affect price. A consultant can recommend options within your budget.",
        },
      ],
    },
    notice:
      "Niche availability and pricing depend on supply and terms. Please book a visit in advance so a consultant can accompany you.",
    cta: {
      title: "Book a visit to the columbarium halls.",
      body: "See the halls, deities and panel details for yourself, and let a consultant answer your questions.",
      book: "Book a Visit",
      whatsapp: "WhatsApp Us",
    },
  },
};
