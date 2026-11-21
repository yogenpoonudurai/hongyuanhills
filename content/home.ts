import type { Locale } from "./types";

export type ServiceIcon = "lotus" | "hall" | "heart" | "calendar";

export type HomeCopy = {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    primary: string;
    secondary: string;
    note: string;
    imageAlt: string;
  };
  trust: Array<{ value: string; label: string }>;
  about: {
    eyebrow: string;
    title: string;
    body: string[];
    points: string[];
    cta: string;
    imageAlt: string;
  };
  grounds: {
    eyebrow: string;
    title: string;
    body: string;
    points: string[];
    cta: string;
    imageAlt: string;
  };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{
      icon: ServiceIcon;
      title: string;
      body: string;
      cta: string;
      href: string;
    }>;
  };
  halls: {
    eyebrow: string;
    title: string;
    intro: string;
    cta: string;
    priceNote: string;
  };
  preplanning: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: Array<{ title: string; body: string }>;
    cta: string;
    note: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: Array<{ q: string; a: string }>;
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    bookingCta: string;
    callCta: string;
    note: string;
  };
};

export const homeCopy: Record<Locale, HomeCopy> = {
  zh: {
    meta: {
      title: "宏缘宝地｜居銮风水墓园与骨灰殿",
      description:
        "宏缘宝地位于柔佛居銮，提供风水福地、冷气骨灰殿、殡仪服务与生前规划。24小时服务热线，欢迎预约参观。",
    },
    hero: {
      eyebrow: "宏缘宝地 · 居銮 · 柔佛",
      title: "一处安宁归宿，承载永恒思念",
      body: "宏缘宝地结合修身、修心、修德理念，规划风水福地、骨灰殿与祖先灵位，为家族提供一处安稳长久的归宿。",
      primary: "预约参观",
      secondary: "WhatsApp 咨询",
      note: "24小时服务 · 中文 / English",
      imageAlt: "宏缘宝地园区山水景观",
    },
    trust: [
      { value: "24小时", label: "紧急服务待命" },
      { value: "居銮", label: "柔佛州" },
      { value: "4座", label: "骨灰殿" },
      { value: "0%", label: "分期付款*" },
    ],
    about: {
      eyebrow: "关于宏缘",
      title: "承载文化传统，守护世代情怀。",
      body: [
        "宏缘宝地结合修身、修心、修德理念，规划墓园、骨灰宝塔与祖先灵位，为家族提供一处安稳长久的福地。",
        "我们秉承中华文化五千年的仁、义、忠、孝精神，致力打造兼具环保理念与整体规划的现代风水墓园。",
        "在这里，慎终追远不止于仪式，更是一种安心的托付；山水为证，情义长存。",
      ],
      points: ["修身 · 修心 · 修德", "传统风水 · 现代管理", "庄严 · 整洁 · 可持续"],
      cta: "了解宏缘",
      imageAlt: "宏缘宝地园区景观",
    },
    grounds: {
      eyebrow: "风水福地 · 蓬莱宝地",
      title: "山环水抱，藏风聚气。",
      body: "宏缘宝地择址严谨，背靠来龙，前有明堂，左右护砂分明。月眉池位于园区山水交汇之处，象征圆融、智慧与福泽汇聚。",
      points: ["真龙结穴 · 土藏生气", "四神相应 · 阴阳平衡", "月眉池 · 一水含情"],
      cta: "咨询福地详情",
      imageAlt: "宏缘宝地月眉池与山水景观",
    },
    services: {
      eyebrow: "服务项目",
      title: "从福地到告别，全程陪伴。",
      intro:
        "四项核心服务，依照不同文化与宗教礼仪，为每个家庭提供周全协助。",
      items: [
        {
          icon: "lotus",
          title: "风水福地",
          body: "由专业风水师整体规划选址，融合传统风水格局与园林布局，营造山环水抱、宁静庄重的安息环境。",
          cta: "了解福地",
          href: "/services/feng-shui-grounds",
        },
        {
          icon: "hall",
          title: "骨灰殿",
          body: "提供室内冷气骨灰殿及半开放式骨灰殿，环境整洁肃穆，让思念有所安处。",
          cta: "了解骨灰殿",
          href: "/services/columbarium",
        },
        {
          icon: "heart",
          title: "殡仪服务",
          body: "涵盖遗体接送、安置安排、殡仪策划、灵堂布置及殡葬用品准备，依照不同文化与宗教礼仪提供协助。",
          cta: "咨询服务",
          href: "/services/funeral-services",
        },
        {
          icon: "calendar",
          title: "生前规划",
          body: "免费咨询、个性化定制、全程跟进与灵活付款方案，让家人提前安心安排。",
          cta: "了解生前规划",
          href: "/pre-planning",
        },
      ],
    },
    halls: {
      eyebrow: "骨灰殿",
      title: "四座殿堂，四种祝福。",
      intro:
        "冷气骨灰殿与半开放式骨灰殿，庄严、整洁、宁静。每一座殿堂都有独特的佛像、面板设计与祝福意涵。",
      cta: "了解详情",
      priceNote: "实际价格视选择、供应情况及条款而定。",
    },
    preplanning: {
      eyebrow: "生前规划",
      title: "提前规划，是给家人的一份安心。",
      intro: "从咨询到执行，我们全程陪伴，让每个细节都符合您的期望。",
      steps: [
        {
          title: "免费咨询",
          body: "专业顾问贴心解答，轻松了解服务与价格，并欢迎到园区参观。",
        },
        {
          title: "个性化定制",
          body: "根据预算、文化背景与特殊要求，制定最合适的墓地与服务方案。",
        },
        {
          title: "安心服务",
          body: "从签约到执行、从安排到后续关怀，全程跟进，确保一切顺利进行。",
        },
        {
          title: "灵活付款",
          body: "提供 0% 利息分期付款，让提前规划更从容。须符合条款。",
        },
      ],
      cta: "预约咨询",
      note: "0% 利息分期付款须符合条款；详情请咨询顾问。",
    },
    faq: {
      eyebrow: "常见问题",
      title: "您可能想了解",
      items: [
        {
          q: "如何预约参观？",
          a: "您可以通过 24 小时热线或 WhatsApp 与我们联系，我们会为您安排参观时间。",
        },
        {
          q: "骨灰殿有冷气吗？",
          a: "是的，自在阁、三缘殿与丹香阁为冷气骨灰殿；我们也提供半开放式骨灰殿选择。",
        },
        {
          q: "是否提供分期付款？",
          a: "我们提供 0% 利息分期付款，须符合相关条款；欢迎咨询顾问了解详情。",
        },
        {
          q: "殡仪服务涵盖哪些项目？",
          a: "涵盖遗体接送、安置安排、殡仪策划、灵堂布置及殡葬用品准备，并依照不同文化与宗教礼仪提供协助。",
        },
      ],
    },
    contact: {
      eyebrow: "联系我们",
      title: "欢迎预约参观，或与我们联系。",
      intro:
        "无论您正在为家人提前规划，或需要即时的殡仪协助，我们都愿意倾听并提供帮助。",
      bookingCta: "WhatsApp 预约参观",
      callCta: "拨打 24 小时热线",
      note: "我们会在办公时间内回复。如需即时殡仪协助，请致电 24 小时热线。",
    },
  },
  en: {
    meta: {
      title: "Hong Yuan Hills | Memorial Park & Columbarium in Kluang",
      description:
        "Hong Yuan Hills in Kluang, Johor offers Feng Shui burial grounds, air-conditioned columbarium halls, funeral services and pre-planning. 24-hour hotline. Book a visit.",
    },
    hero: {
      eyebrow: "Hong Yuan Hills · Kluang · Johor",
      title: "A peaceful resting place, held in everlasting remembrance",
      body: "Hong Yuan Memorial Park brings together Feng Shui burial grounds, columbarium halls and ancestral tablets — a serene, lasting place for families.",
      primary: "Book a Visit",
      secondary: "WhatsApp Us",
      note: "24-hour service · 中文 / English",
      imageAlt: "Landscape at Hong Yuan Hills memorial park",
    },
    trust: [
      { value: "24 hours", label: "Emergency service" },
      { value: "Kluang", label: "Johor, Malaysia" },
      { value: "4 halls", label: "Columbarium" },
      { value: "0%", label: "Instalment*" },
    ],
    about: {
      eyebrow: "About Hong Yuan",
      title: "Honouring cultural traditions, preserving the bonds of generations.",
      body: [
        "Hong Yuan Memorial Park embraces the principles of cultivating oneself, nurturing the mind and practising virtue. Its thoughtfully planned burial grounds, columbarium halls and ancestral tablets offer families a peaceful and lasting resting place.",
        "Guided by the Chinese values of benevolence, righteousness, loyalty and filial piety, we are committed to a modern Feng Shui memorial park that combines environmental responsibility with comprehensive planning.",
        "Here, honouring our ancestors is more than a ceremony; it is a heartfelt commitment entrusted with peace of mind. Here, the mountains and waters bear witness, and the bonds of love endure.",
      ],
      points: [
        "Cultivate self · Nurture mind · Practise virtue",
        "Traditional Feng Shui · Modern management",
        "Dignified · Well-maintained · Sustainable",
      ],
      cta: "About Hong Yuan",
      imageAlt: "Landscape at Hong Yuan Hills memorial park",
    },
    grounds: {
      eyebrow: "Feng Shui Grounds · Penglai",
      title: "Embraced by mountains and water.",
      body: "Penglai Blessed Grounds was selected with care: a supporting mountain behind, an open bright hall in front, and protective landforms on both sides. Crescent Moon Pond sits where the park’s hills and waters meet.",
      points: [
        "True dragon vein · vital earth energy",
        "Four Celestial Guardians · balanced Yin and Yang",
        "Crescent Moon Pond · water with grace",
      ],
      cta: "Enquire about the grounds",
      imageAlt: "Crescent Moon Pond and landscape at Hong Yuan Hills",
    },
    services: {
      eyebrow: "Our Services",
      title: "Support from the grounds to the farewell.",
      intro:
        "Four core services, delivered with care and respect for different cultural and religious customs.",
      items: [
        {
          icon: "lotus",
          title: "Feng Shui Burial Grounds",
          body: "Carefully selected and planned with professional Feng Shui masters, combining traditional principles with landscaped gardens.",
          cta: "Explore the grounds",
          href: "/services/feng-shui-grounds",
        },
        {
          icon: "hall",
          title: "Columbarium Halls",
          body: "Air-conditioned indoor halls and semi-open columbarium options, kept clean and solemn for family remembrance.",
          cta: "Explore the halls",
          href: "/services/columbarium",
        },
        {
          icon: "heart",
          title: "Funeral Services",
          body: "Transportation, placement, funeral planning, memorial hall setup and funeral supplies, tailored to different customs.",
          cta: "Enquire",
          href: "/services/funeral-services",
        },
        {
          icon: "calendar",
          title: "Pre-Planning",
          body: "Free consultation, personalised planning, end-to-end care and flexible payment options for peace of mind.",
          cta: "Plan ahead",
          href: "/pre-planning",
        },
      ],
    },
    halls: {
      eyebrow: "Columbarium",
      title: "Four halls, four expressions of blessing.",
      intro:
        "Air-conditioned and semi-open columbarium halls, each with its own deity, panel design and spiritual character.",
      cta: "View hall",
      priceNote:
        "Actual price depends on selection, availability and terms.",
    },
    preplanning: {
      eyebrow: "Pre-Planning",
      title: "Planning ahead is a gift of peace of mind.",
      intro:
        "From consultation to execution, we guide you through every step so each detail meets your expectations.",
      steps: [
        {
          title: "Free Consultation",
          body: "Speak with our consultants, learn about services and pricing, and visit the park.",
        },
        {
          title: "Personalised Planning",
          body: "We recommend a suitable plot and service plan based on your budget, culture and requirements.",
        },
        {
          title: "Peace-of-Mind Service",
          body: "From agreement to arrangements and follow-up care, we support you throughout.",
        },
        {
          title: "Flexible Payment",
          body: "0% interest instalment options make planning ahead easier. Subject to terms.",
        },
      ],
      cta: "Book a Consultation",
      note: "0% interest instalment is subject to terms. Please speak with a consultant for details.",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Questions you may have",
      items: [
        {
          q: "How do I book a visit?",
          a: "Contact us through the 24-hour hotline or WhatsApp and we will arrange a suitable time.",
        },
        {
          q: "Are the columbarium halls air-conditioned?",
          a: "Zizai Pavilion, Sanyuan Hall and Danxiang Pavilion are air-conditioned. Semi-open columbarium options are also available.",
        },
        {
          q: "Is an instalment plan available?",
          a: "Yes, 0% interest instalments are available subject to terms. Please speak with a consultant.",
        },
        {
          q: "What do funeral services include?",
          a: "Transportation, placement arrangements, funeral planning, memorial hall setup and funeral supplies, adapted to different cultural and religious customs.",
        },
      ],
    },
    contact: {
      eyebrow: "Contact Us",
      title: "Book a visit or speak with us.",
      intro:
        "Whether you are planning ahead for your family or need immediate funeral assistance, we are here to listen and help.",
      bookingCta: "Book a Visit via WhatsApp",
      callCta: "Call the 24-Hour Hotline",
      note: "We reply during office hours. For urgent funeral assistance, please call the 24-hour hotline.",
    },
  },
};
