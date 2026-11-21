import type { Locale } from "./types";

export type FuneralCopy = {
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; intro: string };
  urgent: { title: string; body: string; call: string; whatsapp: string };
  services: {
    title: string;
    intro: string;
    items: Array<{ title: string; body: string }>;
  };
  process: {
    title: string;
    intro: string;
    steps: Array<{ title: string; body: string }>;
  };
  customs: { title: string; body: string; points: string[] };
  packages: { title: string; body: string; note: string; cta: string };
  checklist: { title: string; intro: string; items: string[] };
  faq: { title: string; items: Array<{ q: string; a: string }> };
  cta: { title: string; body: string; call: string; whatsapp: string };
};

export const funeralCopy: Record<Locale, FuneralCopy> = {
  zh: {
    meta: {
      title: "殡仪服务｜居銮 24 小时协助",
      description:
        "宏缘宝地殡仪服务涵盖遗体接送、安置安排、殡仪策划、灵堂布置及殡葬用品准备，依照不同文化与宗教礼仪提供协助。",
    },
    hero: {
      eyebrow: "殡仪服务配套",
      title: "在告别的时刻，陪伴每一步。",
      intro:
        "从遗体接送到灵堂布置，我们以专业与关怀协助家属处理每个细节，让家人把时间留给彼此。",
    },
    urgent: {
      title: "如需即时协助",
      body: "若亲人刚离世或情况紧急，请直接致电 24 小时热线。我们会先了解情况，再安排后续步骤。",
      call: "拨打 24 小时热线",
      whatsapp: "WhatsApp 紧急联系",
    },
    services: {
      title: "我们协助的事项",
      intro: "依照不同文化与宗教礼仪，提供完整而周全的协助。",
      items: [
        {
          title: "遗体接送",
          body: "协助安排遗体接送与必要手续，让家属在第一时间得到支援。",
        },
        {
          title: "安置安排",
          body: "协助安排遗体安置、灵堂与相关场地，让流程有序进行。",
        },
        {
          title: "殡仪策划",
          body: "根据家族传统、宗教礼仪与预算，规划合适的告别流程。",
        },
        {
          title: "灵堂布置",
          body: "协助灵堂布置、仪式用品与现场协调，让家属安心陪伴。",
        },
        {
          title: "殡葬用品",
          body: "准备所需殡葬用品，并依不同习俗提供合适选择。",
        },
      ],
    },
    process: {
      title: "协助流程",
      intro: "每一步都会先与家属沟通，确认后再执行。",
      steps: [
        {
          title: "初步联系",
          body: "接听您的电话或 WhatsApp，了解情况、地点与即时需求。",
        },
        {
          title: "接送与安置",
          body: "安排遗体接送与安置，并说明接下来需要准备的事项。",
        },
        {
          title: "流程规划",
          body: "依家族传统、宗教礼仪与预算，规划告别仪式与服务内容。",
        },
        {
          title: "仪式与执行",
          body: "协调灵堂、用品与现场安排，确保流程顺利进行。",
        },
        {
          title: "后续关怀",
          body: "仪式结束后提供后续协助与关怀，让家人安心。",
        },
      ],
    },
    customs: {
      title: "尊重不同文化与宗教",
      body: "每个家庭的习俗与信仰都不同。我们会先倾听，再依传统安排细节。",
      points: [
        "佛教、道教与传统礼仪",
        "基督教与其他宗教需求",
        "不同方言群与家族习俗",
        "简约或传统仪式安排",
      ],
    },
    packages: {
      title: "服务配套",
      body: "配套内容会依家族需求、仪式规模与用品选择而不同。我们会在了解情况后提供清楚说明。",
      note: "实际内容与费用视选择、地点、供应情况及条款而定；请咨询顾问获取报价。",
      cta: "咨询殡仪服务",
    },
    checklist: {
      title: "家属可先准备",
      intro: "无需一次准备齐全；我们的团队会一步步引导您。",
      items: [
        "逝者的身份证明文件（如适用）",
        "家属联络方式与主要决策人",
        "宗教或传统礼仪上的特别要求",
        "预算范围与仪式规模偏好",
        "希望安排的地点与日期",
      ],
    },
    faq: {
      title: "常见问题",
      items: [
        {
          q: "夜间或周末可以联系吗？",
          a: "可以。24 小时热线与紧急 WhatsApp 全天候待命。",
        },
        {
          q: "可以先了解配套再决定吗？",
          a: "可以。我们会先了解情况与预算，再提供说明，不会催促您做决定。",
        },
        {
          q: "不同宗教仪式都能协助吗？",
          a: "我们会依家族传统与宗教需求安排，并在能力范围内提供协助或转介。",
        },
        {
          q: "服务范围包括哪些地区？",
          a: "以居銮及周边地区为主；其他地点请先与我们联系确认。",
        },
      ],
    },
    cta: {
      title: "需要协助时，请直接联系我们。",
      body: "24 小时热线与 WhatsApp 随时待命。我们会先倾听，再陪您走过下一步。",
      call: "拨打 24 小时热线",
      whatsapp: "WhatsApp 联系",
    },
  },
  en: {
    meta: {
      title: "Funeral Services | 24-Hour Assistance in Kluang",
      description:
        "Hong Yuan Hills funeral services cover transportation, placement, funeral planning, memorial hall setup and funeral supplies, adapted to different cultural and religious customs.",
    },
    hero: {
      eyebrow: "Funeral Services",
      title: "Supporting you through every step of the farewell.",
      intro:
        "From transportation to memorial hall setup, we help families handle each detail with professionalism and care, so you can focus on being together.",
    },
    urgent: {
      title: "If you need immediate assistance",
      body: "If a loved one has just passed away or the situation is urgent, please call the 24-hour hotline. We will first understand the situation and then guide the next steps.",
      call: "Call the 24-Hour Hotline",
      whatsapp: "WhatsApp Emergency Contact",
    },
    services: {
      title: "How we help",
      intro: "Comprehensive assistance adapted to different cultural and religious customs.",
      items: [
        {
          title: "Transportation",
          body: "Assistance with transportation and necessary arrangements so families receive support from the start.",
        },
        {
          title: "Placement arrangements",
          body: "Help with placement, memorial space and related arrangements so the process can proceed with order.",
        },
        {
          title: "Funeral planning",
          body: "Planning a suitable farewell based on family tradition, religious customs and budget.",
        },
        {
          title: "Memorial hall setup",
          body: "Assistance with memorial hall setup, ceremonial items and on-site coordination.",
        },
        {
          title: "Funeral supplies",
          body: "Preparation of needed supplies, with suitable options for different customs.",
        },
      ],
    },
    process: {
      title: "How the process works",
      intro: "We speak with the family before each step and proceed only after confirmation.",
      steps: [
        {
          title: "First contact",
          body: "We answer your call or WhatsApp to understand the situation, location and immediate needs.",
        },
        {
          title: "Transport and placement",
          body: "We arrange transportation and placement, and explain what needs to be prepared next.",
        },
        {
          title: "Planning",
          body: "We plan the farewell and service according to tradition, religious customs and budget.",
        },
        {
          title: "Ceremony and execution",
          body: "We coordinate the memorial hall, supplies and on-site arrangements so the service runs smoothly.",
        },
        {
          title: "Aftercare",
          body: "We provide follow-up assistance and care after the ceremony for the family’s peace of mind.",
        },
      ],
    },
    customs: {
      title: "Respecting different cultures and faiths",
      body: "Every family’s customs and beliefs are different. We listen first, then arrange the details according to tradition.",
      points: [
        "Buddhist, Taoist and traditional rites",
        "Christian and other religious needs",
        "Different dialect groups and family customs",
        "Simple or traditional ceremonies",
      ],
    },
    packages: {
      title: "Service Packages",
      body: "Package contents vary with family needs, ceremony scale and supplies. We explain the options clearly after understanding the situation.",
      note: "Actual contents and costs depend on selection, location, availability and terms. Please speak with a consultant for a quotation.",
      cta: "Enquire about funeral services",
    },
    checklist: {
      title: "What families can prepare",
      intro: "You do not need to prepare everything at once; our team will guide you step by step.",
      items: [
        "Identification documents for the deceased (where applicable)",
        "Family contact details and main decision-maker",
        "Religious or traditional requirements",
        "Budget range and preferred ceremony scale",
        "Preferred location and dates",
      ],
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          q: "Can we contact you at night or on weekends?",
          a: "Yes. The 24-hour hotline and emergency WhatsApp are available around the clock.",
        },
        {
          q: "Can we understand the options before deciding?",
          a: "Yes. We first understand the situation and budget, then explain the options without pressuring you.",
        },
        {
          q: "Can you assist with different religious customs?",
          a: "We arrange according to family tradition and religious needs, and provide assistance or referrals within our scope.",
        },
        {
          q: "Which areas do you serve?",
          a: "We focus on Kluang and surrounding areas. Please contact us to confirm other locations.",
        },
      ],
    },
    cta: {
      title: "When you need help, contact us directly.",
      body: "The 24-hour hotline and WhatsApp are always available. We will listen first, then guide the next step.",
      call: "Call the 24-Hour Hotline",
      whatsapp: "WhatsApp Us",
    },
  },
};
