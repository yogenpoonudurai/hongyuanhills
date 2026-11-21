import type { Locale } from "./types";

export type TabletsCopy = {
  meta: { title: string; description: string };
  header: { eyebrow: string; title: string; intro: string; badge: string };
  what: { title: string; body: string[] };
  expect: { title: string; intro: string; items: Array<{ title: string; body: string }> };
  form: {
    title: string;
    intro: string;
    submit: string;
    successTitle: string;
    successBody: string;
    message: string;
  };
  note: string;
  cta: { title: string; body: string; whatsapp: string };
};

export const tabletsCopy: Record<Locale, TabletsCopy> = {
  zh: {
    meta: {
      title: "神主牌｜祖先灵位 · 即将推出",
      description:
        "宏缘宝地神主牌（祖先灵位）服务即将推出。留下联络方式，我们会在开放时通知您。",
    },
    header: {
      eyebrow: "神主牌",
      title: "祖先灵位，即将推出。",
      intro:
        "延续中华孝道文化，为家族保留一个庄重神圣的祭拜空间，让孝心与祝福代代相传。",
      badge: "即将推出",
    },
    what: {
      title: "什么是神主牌",
      body: [
        "神主牌（祖先灵位）是家族追思与祭拜先人的重要载体。它让后代有一个固定的地方表达敬意、延续家族记忆，也让传统孝道在日常生活中有所依托。",
        "宏缘宝地正在规划神主牌安奉服务，希望为家庭提供一个庄严、整洁、便于祭拜的空间。",
      ],
    },
    expect: {
      title: "开放后可以期待",
      intro: "以下为规划方向，实际内容与开放时间以正式公布为准。",
      items: [
        {
          title: "庄严的安奉空间",
          body: "环境整洁、肃穆，适合家族祭拜与追思。",
        },
        {
          title: "家族灵位安排",
          body: "依家族结构与需求，规划合适的灵位安排。",
        },
        {
          title: "祭拜与后续关怀",
          body: "提供祭拜指引与后续协助，让家人安心。",
        },
      ],
    },
    form: {
      title: "开放时通知我",
      intro: "留下联络方式，我们会在神主牌服务开放时与您联系。",
      submit: "通知我",
      successTitle: "已收到您的通知请求",
      successBody: "感谢您的关注。神主牌服务开放时，我们会尽快与您联系。",
      message: "请在有神主牌（祖先灵位）服务时通知我。",
    },
    note: "神主牌服务尚未开放；在此期间，欢迎联系我们了解现有骨灰殿与福地服务。",
    cta: {
      title: "想先了解更多？",
      body: "欢迎联系顾问，了解现有服务或预约到园区参观。",
      whatsapp: "WhatsApp 咨询",
    },
  },
  en: {
    meta: {
      title: "Ancestral Tablets | Coming Soon",
      description:
        "Ancestral tablet services at Hong Yuan Hills are coming soon. Leave your contact details and we will notify you when available.",
    },
    header: {
      eyebrow: "Ancestral Tablets",
      title: "Ancestral tablets, coming soon.",
      intro:
        "Continuing the tradition of filial piety, we are planning a dignified space for families to remember and honour their ancestors.",
      badge: "Coming Soon",
    },
    what: {
      title: "What are ancestral tablets?",
      body: [
        "Ancestral tablets are an important way for families to remember and honour their ancestors. They provide a dedicated place for respect, family memory and the continuation of filial tradition.",
        "Hong Yuan Hills is planning an ancestral tablet service that offers a dignified, well-maintained and accessible space for family remembrance.",
      ],
    },
    expect: {
      title: "What to expect",
      intro: "The following is a planning direction; final details and launch timing will be announced officially.",
      items: [
        {
          title: "A dignified space",
          body: "A clean and solemn setting suitable for family remembrance.",
        },
        {
          title: "Family tablet arrangements",
          body: "Arrangements planned around family structure and needs.",
        },
        {
          title: "Guidance and aftercare",
          body: "Guidance for remembrance and follow-up assistance for families.",
        },
      ],
    },
    form: {
      title: "Notify me when available",
      intro: "Leave your contact details and we will contact you when the ancestral tablet service opens.",
      submit: "Notify me",
      successTitle: "Your request has been received",
      successBody: "Thank you for your interest. We will contact you when the service becomes available.",
      message: "Please notify me when ancestral tablet services become available.",
    },
    note: "Ancestral tablet services are not yet open. In the meantime, contact us to learn about our current columbarium and grounds services.",
    cta: {
      title: "Want to learn more first?",
      body: "Contact a consultant to learn about current services or book a park visit.",
      whatsapp: "WhatsApp Us",
    },
  },
};
