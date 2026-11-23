import type { Locale } from "./types";

export type ContactCopy = {
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; intro: string };
  whatsapp: { title: string; intro: string };
  directions: { title: string; body: string; points: string[] };
  note: string;
};

export const contactCopy: Record<Locale, ContactCopy> = {
  zh: {
    meta: {
      title: "联系我们｜宏缘宝地 居銮",
      description:
        "联系宏缘宝地：24 小时热线、WhatsApp、电邮、墓园与办公地址。欢迎预约参观居銮园区。",
    },
    hero: {
      eyebrow: "联系我们",
      title: "欢迎预约参观，或与我们联系。",
      intro:
        "无论您正在为家人提前规划，或需要即时的殡仪协助，我们都愿意倾听并提供帮助。",
    },
    whatsapp: {
      title: "通过 WhatsApp 与我们联系",
      intro:
        "点击下方按钮开启 WhatsApp 对话，预约参观或告诉我们您的需求。",
    },
    directions: {
      title: "到访与联络",
      body: "参观园区请提前预约，以便我们安排顾问陪同。您也可以先到办公地址与我们见面。",
      points: [
        "墓园与办公地址请见上方联络资料",
        "预约后由顾问确认集合地点与时间",
        "如需即时殡仪协助，请直接致电或 WhatsApp",
        "营业时间：周一至周日 8:00am – 6:00pm",
      ],
    },
    note: "紧急服务 24 小时待命。若电话未能接通，请通过 WhatsApp 留言，我们会尽快回复。",
  },
  en: {
    meta: {
      title: "Contact Us | Hong Yuan Hills, Kluang",
      description:
        "Contact Hong Yuan Hills: 24-hour hotline, WhatsApp, email, memorial park and office addresses. Book a visit to our Kluang park.",
    },
    hero: {
      eyebrow: "Contact Us",
      title: "Book a visit or speak with us.",
      intro:
        "Whether you are planning ahead for your family or need immediate funeral assistance, we are here to listen and help.",
    },
    whatsapp: {
      title: "Message us on WhatsApp",
      intro:
        "Open a WhatsApp conversation to book a visit or tell us how we can help.",
    },
    directions: {
      title: "Visiting and contacting us",
      body: "Please book park visits in advance so a consultant can accompany you. You may also meet us at the office address.",
      points: [
        "Memorial park and office addresses are listed above",
        "A consultant will confirm the meeting point and time after booking",
        "For urgent funeral assistance, call or WhatsApp us directly",
        "Opening hours: Monday–Sunday, 8:00 am – 6:00 pm",
      ],
    },
    note: "Emergency service is available 24 hours. If the phone is unattended, leave a WhatsApp message and we will reply as soon as possible.",
  },
};
