import { groundsImages } from "./grounds";
import type { ImageRef, Locale } from "./types";

export const aboutImages: {
  hero: ImageRef;
  gallery: ImageRef[];
} = {
  hero: {
    src: "/images/about",
    width: 1600,
    height: 1000,
    alt: {
      zh: "宏缘宝地园区景观",
      en: "Landscape at Hong Yuan Hills memorial park",
    },
  },
  gallery: [
    {
      src: "/images/about",
      width: 1600,
      height: 1000,
      alt: {
        zh: "宏缘宝地园区景观",
        en: "Landscape at Hong Yuan Hills memorial park",
      },
    },
    groundsImages.landscape,
    groundsImages.pond,
  ],
};

export type AboutCopy = {
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; intro: string };
  story: { title: string; body: string[] };
  mission: { title: string; body: string[]; quote: string };
  values: {
    title: string;
    intro: string;
    items: Array<{ name: string; body: string }>;
  };
  why: {
    title: string;
    intro: string;
    items: Array<{ title: string; body: string }>;
  };
  planning: { title: string; body: string[]; note: string };
  gallery: { title: string; intro: string };
  cta: { title: string; body: string; book: string; whatsapp: string };
};

export const aboutCopy: Record<Locale, AboutCopy> = {
  zh: {
    meta: {
      title: "关于宏缘｜承传文化，守护世代",
      description:
        "宏缘宝地以仁、义、忠、孝为本，结合传统风水、现代管理与环保理念，为居銮与柔佛家庭规划安息之所。",
    },
    hero: {
      eyebrow: "关于宏缘",
      title: "承载文化传统，守护世代情怀。",
      intro:
        "宏缘宝地结合修身、修心、修德理念，规划墓园、骨灰宝塔与祖先灵位，为家族提供一处安稳长久的福地。",
    },
    story: {
      title: "关于宏缘宝地",
      body: [
        "宏缘宝地不仅是一处安息之地，更是一份对生命的尊重与传承。园区在规划上兼顾传统文化、自然生态与现代管理，致力打造一个庄严、整洁、可持续发展的生命纪念园区。",
        "在这里，慎终追远不止于仪式，更是一种安心的托付；在这里，山水为证，情义长存。",
      ],
    },
    mission: {
      title: "使命与愿景",
      body: [
        "我们秉承中华文化五千年的仁、义、忠、孝精神，致力打造兼具环保理念与整体规划的现代风水墓园。",
        "宏缘宝地希望成为家属心灵的依靠，在每一个重要的告别时刻，以专业与关怀陪伴家人走过。",
      ],
      quote: "让传统得以延续，让孝道有所安放。",
    },
    values: {
      title: "我们的价值",
      intro: "以传统美德为本，落实在园区规划与每一次服务之中。",
      items: [
        {
          name: "仁",
          body: "以同理心对待每一个家庭，在艰难时刻给予温暖与体谅。",
        },
        {
          name: "义",
          body: "以诚信与责任为本，清楚说明服务、价格与安排。",
        },
        {
          name: "忠",
          body: "忠于托付，细心照顾每一个细节，让家人安心。",
        },
        {
          name: "孝",
          body: "尊重慎终追远的传统，让孝心与祝福得以延续。",
        },
      ],
    },
    why: {
      title: "为什么选择宏缘",
      intro: "从规划到执行，我们希望每个家庭都能感受到专业与真诚。",
      items: [
        {
          title: "专业团队",
          body: "拥有资深风水师与生命规划顾问，理解不同文化背景与宗教需求。",
        },
        {
          title: "一站式服务",
          body: "从咨询、方案定制到安置执行与后续关怀，全程陪伴。",
        },
        {
          title: "真诚关怀",
          body: "以耐心与同理心服务每个家庭，重视家属的感受。",
        },
        {
          title: "灵活定制",
          body: "依照预算、传统与现代需求，安排合适的方案。",
        },
      ],
    },
    planning: {
      title: "用心规划 · 传承价值",
      body: [
        "园区规划兼顾传统文化、自然生态与现代管理，让山水、建筑与服务彼此呼应。",
        "我们相信，真正的福地不仅让先人安宁，也让后人安心。",
      ],
      note: "园区资料、土地与相关批文可应要求提供。",
    },
    gallery: {
      title: "园区一景",
      intro: "山、水、建筑与光线，构成宏缘宝地的宁静秩序。",
    },
    cta: {
      title: "欢迎到园区走走。",
      body: "预约参观，亲身感受园区的环境与规划，再由顾问为您解答疑问。",
      book: "预约参观",
      whatsapp: "WhatsApp 咨询",
    },
  },
  en: {
    meta: {
      title: "About Hong Yuan Hills | Memorial Park in Kluang",
      description:
        "Guided by benevolence, righteousness, loyalty and filial piety, Hong Yuan Hills combines traditional Feng Shui, modern management and environmental care.",
    },
    hero: {
      eyebrow: "About Hong Yuan",
      title: "Honouring cultural traditions, preserving the bonds of generations.",
      intro:
        "Hong Yuan Memorial Park embraces the principles of cultivating oneself, nurturing the mind and practising virtue. Its thoughtfully planned grounds, columbarium halls and ancestral tablets offer families a peaceful and lasting resting place.",
    },
    story: {
      title: "About Hong Yuan Hills",
      body: [
        "Hong Yuan Hills is more than a final resting place; it represents respect for life and the passing down of family values. Its design brings together traditional culture, natural ecology and modern management to create a dignified, well-maintained and sustainable memorial park.",
        "Here, honouring our ancestors is more than a ceremony; it is a heartfelt commitment entrusted with peace of mind. Here, the mountains and waters bear witness, and the bonds of love endure.",
      ],
    },
    mission: {
      title: "Mission and Vision",
      body: [
        "Guided by the Chinese cultural values of benevolence, righteousness, loyalty and filial piety, we are committed to developing a modern Feng Shui memorial park that combines environmental responsibility with comprehensive planning.",
        "Hong Yuan Hills hopes to be a source of support for families, accompanying them with professionalism and care through every important farewell.",
      ],
      quote: "Keeping traditions alive and providing a meaningful place for filial devotion.",
    },
    values: {
      title: "Our Values",
      intro: "Traditional virtues, expressed in the park’s planning and in every service.",
      items: [
        {
          name: "Benevolence",
          body: "We treat every family with empathy, warmth and understanding in difficult moments.",
        },
        {
          name: "Righteousness",
          body: "We act with integrity and responsibility, explaining services, pricing and arrangements clearly.",
        },
        {
          name: "Loyalty",
          body: "We honour the trust placed in us and care for every detail so families can feel at ease.",
        },
        {
          name: "Filial Piety",
          body: "We respect the tradition of remembering ancestors, keeping filial devotion and blessings alive.",
        },
      ],
    },
    why: {
      title: "Why Hong Yuan Hills",
      intro: "From planning to execution, we want every family to experience professionalism and sincerity.",
      items: [
        {
          title: "Professional team",
          body: "Experienced Feng Shui masters and life-planning consultants who understand different cultural and religious needs.",
        },
        {
          title: "One-stop service",
          body: "From consultation and personalised planning to placement and follow-up care, we accompany you throughout.",
        },
        {
          title: "Genuine care",
          body: "We serve each family with patience and empathy, paying attention to how families feel.",
        },
        {
          title: "Flexible customisation",
          body: "We arrange suitable options according to budget, tradition and modern preferences.",
        },
      ],
    },
    planning: {
      title: "Thoughtful Planning · Lasting Legacy",
      body: [
        "The park brings together traditional culture, natural ecology and modern management, allowing landscape, architecture and service to complement one another.",
        "We believe a truly blessed place offers peace to ancestors and peace of mind to descendants.",
      ],
      note: "Park documentation, land information and relevant approvals are available on request.",
    },
    gallery: {
      title: "A Glimpse of the Park",
      intro: "Mountains, water, architecture and light form the quiet order of Hong Yuan Hills.",
    },
    cta: {
      title: "Visit the park.",
      body: "Book a visit to experience the grounds and planning for yourself, and let a consultant answer your questions.",
      book: "Book a Visit",
      whatsapp: "WhatsApp Us",
    },
  },
};
