import type { Locale } from "./types";

export type FormCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  privacy: string;
  urgent: string;
  submit: string;
  submitting: string;
  fields: {
    name: string;
    phone: string;
    email: string;
    interest: string;
    date: string;
    time: string;
    message: string;
    consent: string;
    optional: string;
    required: string;
  };
  interests: Array<{ value: string; label: string }>;
  times: Array<{ value: string; label: string }>;
  errors: {
    name: string;
    phone: string;
    email: string;
    date: string;
    consent: string;
    turnstile: string;
    generic: string;
    network: string;
    rateLimited: string;
    unavailable: string;
    fallback: string;
  };
  success: {
    title: string;
    body: string;
    whatsapp: string;
  };
};

export const formCopy: Record<Locale, FormCopy> = {
  zh: {
    eyebrow: "预约参观",
    title: "告诉我们您的需求，我们会尽快与您联系。",
    intro:
      "填写以下表格预约参观，或咨询福地、骨灰殿、殡仪服务与生前规划。我们会依照您的需求安排合适的顾问。",
    privacy:
      "提交即表示您同意我们通过电话、WhatsApp 或电邮回复此查询。您的资料仅用于此目的。",
    urgent: "如需即时殡仪协助，请致电 24 小时热线。",
    submit: "提交预约",
    submitting: "提交中…",
    fields: {
      name: "姓名",
      phone: "联络电话",
      email: "电邮",
      interest: "想了解的服务",
      date: "希望参观日期",
      time: "希望时段",
      message: "其他需求",
      consent: "我同意宏缘宝地就此查询与我联系。",
      optional: "选填",
      required: "必填",
    },
    interests: [
      { value: "grounds", label: "风水福地" },
      { value: "columbarium", label: "骨灰殿" },
      { value: "funeral", label: "殡仪服务" },
      { value: "preplanning", label: "生前规划" },
      { value: "other", label: "其他" },
    ],
    times: [
      { value: "any", label: "任何时段" },
      { value: "morning", label: "上午" },
      { value: "afternoon", label: "下午" },
      { value: "evening", label: "傍晚" },
    ],
    errors: {
      name: "请填写姓名。",
      phone: "请填写有效的联络电话。",
      email: "请填写有效的电邮地址。",
      date: "请填写有效的日期。",
      consent: "请同意我们与您联系。",
      turnstile: "请完成人机验证后再提交。",
      generic: "提交时出现问题，请检查表格后重试。",
      network: "网络连接出现问题，请稍后重试。",
      rateLimited: "提交次数过多，请稍后再试。",
      unavailable: "暂时无法提交表格，请稍后再试。",
      fallback: "如果表格无法提交，请通过 WhatsApp 或电话与我们联系。",
    },
    success: {
      title: "预约请求已收到",
      body: "感谢您的联系。我们会在办公时间内尽快与您确认参观安排。",
      whatsapp: "WhatsApp 跟进",
    },
  },
  en: {
    eyebrow: "Book a Visit",
    title: "Tell us what you need and we’ll be in touch.",
    intro:
      "Book a visit or ask about the grounds, columbarium halls, funeral services or pre-planning. We’ll match you with the right consultant.",
    privacy:
      "By submitting, you agree to be contacted by phone, WhatsApp or email about this enquiry. Your details will be used for this purpose only.",
    urgent: "For urgent funeral assistance, please call the 24-hour hotline.",
    submit: "Submit request",
    submitting: "Submitting…",
    fields: {
      name: "Name",
      phone: "Phone",
      email: "Email",
      interest: "I’m interested in",
      date: "Preferred visit date",
      time: "Preferred time",
      message: "Anything else we should know",
      consent: "I agree to be contacted by Hong Yuan Hills about this enquiry.",
      optional: "Optional",
      required: "Required",
    },
    interests: [
      { value: "grounds", label: "Feng Shui grounds" },
      { value: "columbarium", label: "Columbarium halls" },
      { value: "funeral", label: "Funeral services" },
      { value: "preplanning", label: "Pre-planning" },
      { value: "other", label: "Something else" },
    ],
    times: [
      { value: "any", label: "Any time" },
      { value: "morning", label: "Morning" },
      { value: "afternoon", label: "Afternoon" },
      { value: "evening", label: "Evening" },
    ],
    errors: {
      name: "Please enter your name.",
      phone: "Please enter a valid phone number.",
      email: "Please enter a valid email address.",
      date: "Please enter a valid date.",
      consent: "Please agree to be contacted.",
      turnstile: "Please complete the verification before submitting.",
      generic: "Something went wrong. Please check the form and try again.",
      network: "There was a network problem. Please try again.",
      rateLimited: "Too many submissions. Please try again later.",
      unavailable: "The form is temporarily unavailable. Please try again.",
      fallback:
        "If the form does not submit, please contact us via WhatsApp or phone.",
    },
    success: {
      title: "Request received",
      body: "Thank you for reaching out. We’ll confirm your visit during office hours.",
      whatsapp: "Follow up on WhatsApp",
    },
  },
};
