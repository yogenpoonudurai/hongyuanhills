import type { Locale } from "./types";

export type PrePlanningCopy = {
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; intro: string };
  benefits: {
    title: string;
    intro: string;
    items: Array<{ title: string; body: string }>;
  };
  steps: {
    title: string;
    intro: string;
    items: Array<{ title: string; body: string }>;
  };
  payment: { title: string; body: string; note: string };
  faq: { title: string; items: Array<{ q: string; a: string }> };
  form: { title: string; intro: string };
  cta: { title: string; body: string; whatsapp: string };
};

export const prePlanningCopy: Record<Locale, PrePlanningCopy> = {
  zh: {
    meta: {
      title: "生前规划｜提前安排，让家人安心",
      description:
        "宏缘宝地生前规划提供免费咨询、个性化定制、全程跟进与 0% 利息分期付款，让您从容安排未来。",
    },
    hero: {
      eyebrow: "生前规划",
      title: "提前规划，是给家人的一份安心。",
      intro:
        "从咨询到执行，我们全程陪伴，让每个细节都符合您的期望，也让家人在未来少一份操心。",
    },
    benefits: {
      title: "为什么要提前规划",
      intro: "生前规划不是忌讳，而是一份体贴与责任。",
      items: [
        {
          title: "减轻家人负担",
          body: "提前安排，家人不必在艰难时刻仓促做决定。",
        },
        {
          title: "表达个人意愿",
          body: "依照自己的信仰、传统与偏好，选择合适的位置与仪式。",
        },
        {
          title: "锁定预算",
          body: "提前了解费用与付款方式，让家庭财务更有规划。",
        },
        {
          title: "安心托付",
          body: "将安排交给专业团队跟进，让自己与家人都放心。",
        },
      ],
    },
    steps: {
      title: "四个步骤，从容规划",
      intro: "我们会先倾听您的想法，再一步步说明选项。",
      items: [
        {
          title: "免费咨询",
          body: "专业顾问贴心解答，轻松了解服务与价格，并欢迎到园区参观，感受每个细节。",
        },
        {
          title: "个性化定制",
          body: "根据您的预算、文化背景与特殊要求，制定最合适的墓地与服务方案。",
        },
        {
          title: "安心服务",
          body: "从签约到执行、从安排到后续关怀，我们全程跟进，确保一切顺利进行。",
        },
        {
          title: "灵活付款",
          body: "提供 0% 利息分期付款，让您更轻松地提前做好安排，以更从容的方式守护家人与未来。",
        },
      ],
    },
    payment: {
      title: "0% 利息分期付款",
      body: "提前规划不必一次承担全部费用。我们提供 0% 利息分期付款，让预算安排更有弹性。",
      note: "分期付款须符合相关条款与审批；详情请咨询顾问。",
    },
    faq: {
      title: "常见问题",
      items: [
        {
          q: "生前规划可以随时调整吗？",
          a: "在符合条款与供应情况的前提下，顾问会协助您了解可调整的范围。",
        },
        {
          q: "需要先决定所有细节吗？",
          a: "不需要。您可以先咨询、参观与了解，再逐步决定。",
        },
        {
          q: "分期付款有额外费用吗？",
          a: "我们提供 0% 利息分期付款，但须符合条款与审批；请向顾问确认细节。",
        },
        {
          q: "可以只做咨询，不购买吗？",
          a: "可以。咨询与参观不收取费用，也不会有压力。",
        },
      ],
    },
    form: {
      title: "预约生前规划咨询",
      intro:
        "留下联络方式与想了解的项目，我们会安排顾问与您联系。您也可以直接致电或 WhatsApp。",
    },
    cta: {
      title: "为自己与家人，提前准备。",
      body: "欢迎预约咨询，我们会先倾听您的想法，再提供合适的建议。",
      whatsapp: "WhatsApp 咨询",
    },
  },
  en: {
    meta: {
      title: "Pre-Planning | Plan Ahead with Peace of Mind",
      description:
        "Hong Yuan Hills pre-planning offers free consultation, personalised planning, end-to-end care and 0% interest instalments.",
    },
    hero: {
      eyebrow: "Pre-Planning",
      title: "Planning ahead is a gift of peace of mind.",
      intro:
        "From consultation to execution, we guide you through every step so each detail meets your expectations and your family has less to worry about in the future.",
    },
    benefits: {
      title: "Why plan ahead",
      intro: "Pre-planning is not a taboo; it is an expression of care and responsibility.",
      items: [
        {
          title: "Reduce the burden on family",
          body: "With arrangements in place, your family will not need to make rushed decisions during a difficult time.",
        },
        {
          title: "Express your wishes",
          body: "Choose a suitable location and ceremony according to your faith, tradition and preferences.",
        },
        {
          title: "Plan your budget",
          body: "Understand costs and payment options in advance so the family can plan financially.",
        },
        {
          title: "Peace of mind",
          body: "Leave the arrangements to a professional team, for your peace of mind and your family’s.",
        },
      ],
    },
    steps: {
      title: "Four steps to plan with ease",
      intro: "We listen to your wishes first, then explain the options step by step.",
      items: [
        {
          title: "Free consultation",
          body: "Speak with our consultants to learn about services and pricing, and visit the park to experience the care in every detail.",
        },
        {
          title: "Personalised planning",
          body: "Based on your budget, cultural background and special requirements, we recommend a suitable plot and service plan.",
        },
        {
          title: "Peace-of-mind service",
          body: "From agreement to execution, arrangements and follow-up care, we support you throughout.",
        },
        {
          title: "Flexible payment",
          body: "0% interest instalments make it easier to plan ahead and care for your family’s future with confidence.",
        },
      ],
    },
    payment: {
      title: "0% Interest Instalments",
      body: "Planning ahead does not require paying everything at once. Our 0% interest instalments make budgeting more flexible.",
      note: "Instalments are subject to terms and approval. Please speak with a consultant for details.",
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          q: "Can a pre-plan be adjusted later?",
          a: "Subject to terms and availability, a consultant can explain the adjustments available to you.",
        },
        {
          q: "Do I need to decide every detail now?",
          a: "No. You can start with a consultation and visit, then decide step by step.",
        },
        {
          q: "Are there extra charges for instalments?",
          a: "We offer 0% interest instalments subject to terms and approval. Please confirm the details with a consultant.",
        },
        {
          q: "Can I consult without purchasing?",
          a: "Yes. Consultation and visits are free, with no pressure to purchase.",
        },
      ],
    },
    form: {
      title: "Book a Pre-Planning Consultation",
      intro:
        "Leave your contact details and the service you are interested in, and we will arrange a consultant to speak with you. You can also call or WhatsApp us directly.",
    },
    cta: {
      title: "Prepare for yourself and your family.",
      body: "Book a consultation and we will listen first, then offer suitable guidance.",
      whatsapp: "WhatsApp Us",
    },
  },
};
