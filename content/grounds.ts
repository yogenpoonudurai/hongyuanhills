import type { ImageRef, Locale } from "./types";

export const groundsImages = {
  hero: {
    src: "/images/grounds/hero",
    width: 1600,
    height: 900,
    alt: {
      zh: "宏缘宝地园区山水景观",
      en: "Landscape at Hong Yuan Hills memorial park",
    },
  },
  site: {
    src: "/images/grounds/site",
    width: 1200,
    height: 900,
    alt: {
      zh: "蓬莱宝地园区地势与来龙",
      en: "Terrain and dragon-vein landscape at Penglai Blessed Grounds",
    },
  },
  pond: {
    src: "/images/grounds/pond",
    width: 1200,
    height: 900,
    alt: {
      zh: "宏缘宝地月眉池水景",
      en: "Crescent Moon Pond at Hong Yuan Hills",
    },
  },
  landscape: {
    src: "/images/grounds/landscape",
    width: 1200,
    height: 900,
    alt: {
      zh: "宏缘宝地山环水抱的园区景观",
      en: "Hills and water embracing the memorial park",
    },
  },
} satisfies Record<string, ImageRef>;

export const groundsGallery = [
  groundsImages.site,
  groundsImages.pond,
  groundsImages.landscape,
];

export type GroundsCopy = {
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; intro: string; book: string; whatsapp: string };
  quote: { text: string; attribution: string };
  chapters: Array<{ id: string; label: string }>;
  siteSelection: {
    eyebrow: string;
    title: string;
    body: string[];
    points: string[];
  };
  landscape: {
    eyebrow: string;
    title: string;
    body: string;
    points: Array<{ title: string; body: string }>;
    guardians: { back: string; front: string; left: string; right: string; center: string };
  };
  orientations: {
    eyebrow: string;
    title: string;
    intro: string;
    rows: Array<{ name: string; meaning: string }>;
    other: string;
  };
  soil: {
    eyebrow: string;
    title: string;
    body: string;
    points: string[];
  };
  pond: {
    eyebrow: string;
    title: string;
    body: string;
    sections: Array<{ title: string; body: string }>;
  };
  qualities: {
    eyebrow: string;
    title: string;
    intro: string;
    points: string[];
  };
  pricing: {
    eyebrow: string;
    title: string;
    intro: string;
    note: string;
    cta: string;
    whatsapp: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: Array<{ q: string; a: string }>;
  };
  gallery: { eyebrow: string; title: string; intro: string };
  disclaimer: string;
  cta: { title: string; body: string; book: string; whatsapp: string };
};

export const groundsCopy: Record<Locale, GroundsCopy> = {
  zh: {
    meta: {
      title: "蓬莱宝地｜居銮风水福地",
      description:
        "宏缘宝地蓬莱宝地择址严谨，背靠来龙、前有明堂、左右护砂分明，月眉池环抱园区。了解风水格局、朝向与福地特质。",
    },
    hero: {
      eyebrow: "风水福地 · 蓬莱宝地",
      title: "山环水抱，藏风聚气。",
      intro:
        "宏缘宝地择址严谨，源自传统阴宅风水之精髓。此地土藏穴场，正位于真龙结穴之处，为家族提供一处安稳长久的福地。",
      book: "预约参观福地",
      whatsapp: "WhatsApp 咨询",
    },
    quote: {
      text: "三年寻龙，十年点穴。",
      attribution: "古籍风水语",
    },
    chapters: [
      { id: "site-selection", label: "选址" },
      { id: "landscape", label: "山水形势" },
      { id: "orientations", label: "朝向吉象" },
      { id: "soil", label: "土质" },
      { id: "pond", label: "月眉池" },
      { id: "qualities", label: "福地特质" },
      { id: "pricing", label: "咨询" },
    ],
    siteSelection: {
      eyebrow: "选址",
      title: "真龙结穴，土藏生气。",
      body: [
        "宏缘宝地择址严谨，源自传统阴宅风水之精髓。古籍有云：「三年寻龙，十年点穴」，真正的福地，须得真龙结穴、山水相辅、气脉相承，方能福泽后人、绵延不绝。",
        "宏缘宝地土藏穴场，正位于真龙结穴之处。此地土质温润厚实，不松不燥、不硬不裂，色泽近赤，正合「生气内藏、地气安稳」之上等土质标准。",
      ],
      points: [
        "真龙结穴 · 气脉相承",
        "温润厚土 · 不松不燥",
        "色泽近赤 · 生气内藏",
      ],
    },
    landscape: {
      eyebrow: "山水形势",
      title: "左辅右弼，四神俱全。",
      body: "宏缘宝地背靠来龙，前有明堂，左右护砂分明，形成传统风水中极为难得的格局。整体地势自然环合，气脉流转有情，符合「四神相应、阴阳平衡」之理。",
      points: [
        { title: "后有靠山", body: "主根基稳固、世代承续。" },
        { title: "前有明堂", body: "主前途开阔、财禄聚集。" },
        { title: "左辅右弼", body: "贵人相助，家运和合。" },
        { title: "山环水抱", body: "藏风聚气，福泽深厚。" },
      ],
      guardians: {
        back: "后有靠山",
        front: "前有明堂",
        left: "左辅",
        right: "右弼",
        center: "藏风聚气",
      },
    },
    orientations: {
      eyebrow: "朝向吉象",
      title: "顺天应地，五吉并临。",
      intro:
        "宏缘宝地因应天然山势与来龙方向精心规划，吉向齐备。其他吉向亦可因人因命，量身择位。",
      rows: [
        { name: "艮山坤向", meaning: "主富贵端正、家道昌隆。" },
        { name: "乾山巽向", meaning: "主贵人提携、事业进展。" },
        { name: "巽山乾向", meaning: "利文昌才艺、技术专业。" },
        { name: "其他吉向", meaning: "因人因命，量身择位。" },
      ],
      other:
        "此等格局，尤利后代在政界、公务、企业管理、金融、地产、教育、医疗、工程、设计、专业技术领域发展。",
    },
    soil: {
      eyebrow: "福地特质",
      title: "藏风聚气，阴宅上品。",
      body: "宏缘宝地不仅重视形势，更兼顾理气。此类福地被视为「山水秀而气内藏」，不但能庇佑先人安宁，更能为后代积福添寿、兴旺人丁。",
      points: [
        "地气纯正，气脉不杂",
        "山水自然，不假造作",
        "阴阳协调，不偏不枯",
        "可长久安奉，世代受用",
      ],
    },
    pond: {
      eyebrow: "月眉池",
      title: "山因水活，地因水灵。",
      body: "位于宏缘宝地园区核心地带的「月眉池」，是园区重点规划的景观水系。池形宛若新月，水线柔和流畅，环抱而生，象征圆融、智慧与福泽汇聚。",
      sections: [
        {
          title: "一水含情 · 山水相映",
          body: "月眉池以「有情之水」为设计理念，池水清润平缓，不急不滞，既涵养园区整体气场，也营造出安定、祥和的环境氛围。水形柔美如月，寓意包容与圆满。",
        },
        {
          title: "静水养心 · 慎终追远",
          body: "月眉池不仅是一处景观水系，更是一方让人沉静心念的所在。访客行走其间，可暂离喧扰，于水光山影之中追思先人、体悟生命。",
        },
        {
          title: "顺应天时 · 自然流转",
          body: "池畔绿植环绕，随四时更替而展现不同景致：春夏生机盎然，秋冬静谧沉稳，呈现顺应天时、自然流转的节奏之美。",
        },
      ],
    },
    qualities: {
      eyebrow: "为何是福地",
      title: "山水秀而气内藏。",
      intro:
        "宏缘宝地兼顾传统风水形势与理气，让先人安息，也让后代得福。",
      points: [
        "后有靠山，根基稳固",
        "前有明堂，前途开阔",
        "左右护砂，家运和合",
        "月眉池水，福泽凝聚",
      ],
    },
    pricing: {
      eyebrow: "福地咨询",
      title: "每一处福地，都因人选位。",
      intro:
        "福地价格视位置、朝向、面积与供应情况而定。欢迎预约到园区参观，由顾问为您详细说明。",
      note: "价格请咨询；实际价格视选择、供应情况及条款而定。",
      cta: "预约参观",
      whatsapp: "WhatsApp 咨询",
    },
    faq: {
      eyebrow: "常见问题",
      title: "关于蓬莱宝地",
      items: [
        {
          q: "可以到园区参观吗？",
          a: "可以。请通过 24 小时热线或 WhatsApp 预约，我们会安排顾问陪同讲解。",
        },
        {
          q: "福地价格如何计算？",
          a: "价格视位置、朝向、面积与供应情况而定。请咨询顾问获取最新说明。",
        },
        {
          q: "风水格局是否因人而异？",
          a: "园区提供多种吉向，顾问可依据家族情况与传统习俗，协助您选择合适的福地。",
        },
      ],
    },
    gallery: {
      eyebrow: "园区景观",
      title: "山水之间，宁静有序。",
      intro: "从地势、来龙到月眉池，每一处都顺应自然地形而规划。",
    },
    disclaimer:
      "以上风水内容依据传统习俗与客户提供资料整理，仅供文化参考，不构成任何保证或承诺。",
    cta: {
      title: "欢迎预约到园区参观。",
      body: "亲眼看看山势、水景与福地位置，再由顾问为您解答疑问。",
      book: "预约参观",
      whatsapp: "WhatsApp 咨询",
    },
  },
  en: {
    meta: {
      title: "Penglai Blessed Grounds | Feng Shui Burial Grounds in Kluang",
      description:
        "Penglai Blessed Grounds at Hong Yuan Hills was selected with care: a supporting mountain, an open bright hall, protective landforms and Crescent Moon Pond. Learn about the Feng Shui setting, orientations and grounds.",
    },
    hero: {
      eyebrow: "Feng Shui Grounds · Penglai",
      title: "Embraced by mountains and water.",
      intro:
        "Penglai Blessed Grounds was selected with great care, drawing on the essence of traditional Yin-house Feng Shui. The burial site sits at what tradition describes as the convergence of a true dragon vein.",
      book: "Book a Grounds Visit",
      whatsapp: "WhatsApp Us",
    },
    quote: {
      text: "Three years to seek the dragon vein, ten years to locate the auspicious point.",
      attribution: "Traditional Feng Shui saying",
    },
    chapters: [
      { id: "site-selection", label: "Site selection" },
      { id: "landscape", label: "Landscape" },
      { id: "orientations", label: "Orientations" },
      { id: "soil", label: "Soil" },
      { id: "pond", label: "Crescent Moon Pond" },
      { id: "qualities", label: "Qualities" },
      { id: "pricing", label: "Enquire" },
    ],
    siteSelection: {
      eyebrow: "Site Selection",
      title: "A true dragon vein, with vital energy held within.",
      body: [
        "Penglai Blessed Grounds was selected with great care, drawing on the essence of traditional Yin-house Feng Shui. As an ancient saying goes, “Three years to seek the dragon vein, ten years to locate the auspicious point.” A truly blessed site is believed to require a favourable dragon vein, harmonious mountains and water, and a continuous flow of vital energy.",
        "The burial site is situated at what traditional Feng Shui describes as the convergence of a true dragon vein. Its soil is moist yet firm, neither loose nor overly dry, neither hard nor cracked, and reddish in colour — qualities traditionally associated with the ideal of vital energy held within and stable earth energy.",
      ],
      points: [
        "True dragon vein · continuous energy",
        "Moist, firm soil · neither loose nor dry",
        "Reddish hue · vital energy held within",
      ],
    },
    landscape: {
      eyebrow: "Landscape Formation",
      title: "Support on both sides, all four celestial guardians.",
      body: "With a supporting mountain behind, an open bright hall in front, and protective landforms to either side, the grounds are described as having a highly valued traditional Feng Shui configuration. The naturally embracing terrain is considered conducive to the harmonious flow of energy.",
      points: [
        { title: "Supporting mountain behind", body: "A stable foundation and continuity across generations." },
        { title: "Open bright hall in front", body: "Broad opportunities and the gathering of prosperity." },
        { title: "Support on the left and right", body: "Helpful benefactors and family harmony." },
        { title: "Mountains embracing water", body: "Retention of beneficial energy and abundant blessings." },
      ],
      guardians: {
        back: "Supporting mountain",
        front: "Bright hall",
        left: "Left guardian",
        right: "Right guardian",
        center: "Gathered energy",
      },
    },
    orientations: {
      eyebrow: "Auspicious Orientations",
      title: "Harmony with heaven and earth.",
      intro:
        "The grounds were planned around the natural mountain contours and dragon-vein orientation, offering several traditionally auspicious alignments. Other orientations can be selected to suit individual circumstances.",
      rows: [
        { name: "Gen-facing-Kun", meaning: "Traditionally associated with dignity, prosperity and a flourishing family." },
        { name: "Qian-facing-Xun", meaning: "Traditionally associated with support from benefactors and career advancement." },
        { name: "Xun-facing-Qian", meaning: "Traditionally associated with academic achievement, creativity and professional expertise." },
        { name: "Other orientations", meaning: "Plots can be selected to suit individual circumstances and traditional destiny considerations." },
      ],
      other:
        "In traditional belief, these configurations are considered especially favourable for descendants pursuing careers in politics, public service, business management, finance, real estate, education, healthcare, engineering, design and technical professions.",
    },
    soil: {
      eyebrow: "Qualities of the Grounds",
      title: "Sheltered energy, an exceptional burial site.",
      body: "The grounds consider not only physical landforms but also the traditional principles governing the flow of energy. Such a site is described as “beautiful mountains and waters with energy held within.”",
      points: [
        "Pure, undisturbed earth energy",
        "Natural mountains and waterways",
        "Balanced Yin and Yang",
        "Suitable for long-term remembrance across generations",
      ],
    },
    pond: {
      eyebrow: "Crescent Moon Pond",
      title: "Water brings life to the mountains and spirit to the land.",
      body: "Located at the heart of the park, Crescent Moon Pond is a key landscape water feature. Its shape resembles a new moon, with gently flowing curves that embrace the surrounding landscape. It symbolises harmony, wisdom and the gathering of blessings.",
      sections: [
        {
          title: "Water with grace · Mountains in harmony",
          body: "The pond is designed around the idea of “water with affection.” Its clear, gently moving waters are neither turbulent nor stagnant, nurturing the park’s atmosphere and creating a calm, harmonious setting.",
        },
        {
          title: "Still waters, peaceful hearts",
          body: "Crescent Moon Pond is more than a landscape feature; it is a place for quiet reflection. Visitors can leave behind everyday distractions, remember their ancestors and contemplate life amid reflections of water and mountains.",
        },
        {
          title: "Following the seasons",
          body: "Greenery surrounds the pond, changing with the seasons: lively and flourishing in spring and summer, quiet and composed in autumn and winter, reflecting the natural rhythm of time.",
        },
      ],
    },
    qualities: {
      eyebrow: "Why This Ground",
      title: "Beautiful mountains and waters, with energy held within.",
      intro:
        "The grounds bring together traditional landform and energy principles, offering a peaceful resting place for ancestors and a source of blessings for descendants.",
      points: [
        "Supporting mountain, a stable foundation",
        "Open bright hall, broad opportunities",
        "Protective landforms, family harmony",
        "Crescent Moon Pond, gathered blessings",
      ],
    },
    pricing: {
      eyebrow: "Grounds Enquiry",
      title: "Every plot is chosen for a family.",
      intro:
        "Pricing depends on position, orientation, size and availability. Book a visit and a consultant will explain the options in person.",
      note: "Price on request. Actual price depends on selection, availability and terms.",
      cta: "Book a Visit",
      whatsapp: "WhatsApp Us",
    },
    faq: {
      eyebrow: "FAQ",
      title: "About Penglai Blessed Grounds",
      items: [
        {
          q: "Can we visit the grounds?",
          a: "Yes. Contact us through the 24-hour hotline or WhatsApp and we will arrange a guided visit.",
        },
        {
          q: "How is the price calculated?",
          a: "Pricing depends on position, orientation, size and availability. Please speak with a consultant for the latest information.",
        },
        {
          q: "Can the orientation be matched to our family?",
          a: "The grounds offer several auspicious orientations. A consultant can help you choose according to family circumstances and tradition.",
        },
      ],
    },
    gallery: {
      eyebrow: "The Park",
      title: "Quiet order among mountains and water.",
      intro: "From the terrain and dragon vein to Crescent Moon Pond, every element follows the natural landscape.",
    },
    disclaimer:
      "Feng Shui descriptions are presented according to traditional custom and client-supplied information for cultural reference only. They are not guarantees or promises.",
    cta: {
      title: "Book a visit to the grounds.",
      body: "See the terrain, water and plot positions for yourself, and let a consultant answer your questions.",
      book: "Book a Visit",
      whatsapp: "WhatsApp Us",
    },
  },
};
