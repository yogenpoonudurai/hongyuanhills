import type { L, Locale } from "./types";

export interface NavItem {
  id: string;
  href: string;
  label: L<string>;
}

export const nav: NavItem[] = [
  { id: "about", href: "/#about", label: { zh: "关于我们", en: "About Us" } },
  { id: "services", href: "/#services", label: { zh: "服务项目", en: "Our Services" } },
  { id: "halls", href: "/services/columbarium", label: { zh: "骨灰殿", en: "Columbarium" } },
  {
    id: "pre-planning",
    href: "/#pre-planning",
    label: { zh: "生前规划", en: "Pre-Planning" },
  },
  { id: "contact", href: "/#contact", label: { zh: "联系我们", en: "Contact Us" } },
];

export const servicesMenu: NavItem[] = [
  {
    id: "grounds",
    href: "/services/feng-shui-grounds",
    label: { zh: "风水福地 · 蓬莱宝地", en: "Feng Shui Grounds · Penglai" },
  },
  {
    id: "columbarium",
    href: "/services/columbarium",
    label: { zh: "骨灰殿 · 四座殿堂", en: "Columbarium · Four Halls" },
  },
  {
    id: "funeral",
    href: "/#book",
    label: { zh: "殡仪服务配套", en: "Funeral Services" },
  },
  {
    id: "tablets",
    href: "/#book",
    label: { zh: "神主牌 · 即将推出", en: "Ancestral Tablets · Coming Soon" },
  },
];

type SiteCopy = {
  langLabel: string;
  otherLangLabel: string;
  location: string;
  brand: { name: string; latin: string };
  tagline: string;
  navServices: string;
  skipToContent: string;
  cta: {
    book: string;
    bookShort: string;
    call: string;
    callShort: string;
    whatsapp: string;
    menu: string;
    close: string;
    learnMore: string;
    enquire: string;
    priceOnRequest: string;
  };
  labels: {
    phone24: string;
    officePhone: string;
    email: string;
    whatsapp: string;
    hours: string;
    park: string;
    office: string;
    viewMap: string;
  };
  hours: { value: string; emergency: string };
  addresses: Array<{ label: string; value: string }>;
  footer: {
    quickLinks: string;
    contact: string;
    visit: string;
    rights: string;
    legalNote: string;
  };
  whatsapp: { booking: string; general: string; funeral: string };
};

export const siteCopy: Record<Locale, SiteCopy> = {
  zh: {
    langLabel: "中文",
    otherLangLabel: "English",
    location: "居銮 · 柔佛",
    brand: { name: "宏缘宝地", latin: "HONG YUAN HILLS" },
    tagline: "一处安宁归宿 · 承载永恒思念",
    navServices: "服务项目",
    skipToContent: "跳到主要内容",
    cta: {
      book: "预约参观",
      bookShort: "预约",
      call: "24小时热线",
      callShort: "致电",
      whatsapp: "WhatsApp 咨询",
      menu: "打开菜单",
      close: "关闭",
      learnMore: "了解更多",
      enquire: "咨询详情",
      priceOnRequest: "价格请咨询",
    },
    labels: {
      phone24: "24小时热线",
      officePhone: "办公电话",
      email: "邮箱",
      whatsapp: "WhatsApp",
      hours: "营业时间",
      park: "墓园地址",
      office: "办公地址",
      viewMap: "查看地图",
    },
    hours: {
      value: "周一至周日 8:00am – 6:00pm",
      emergency: "紧急服务 24 小时待命",
    },
    addresses: [
      {
        label: "墓园地址",
        value:
          "Lot 3188, Jalan Peringatan, Belakang, Kampung Mic Kluang, 86000 Kluang, Johor, Malaysia",
      },
      {
        label: "办公地址",
        value: "76 & 76A, Jalan Mersing, 86000 Kluang, Johor, Malaysia",
      },
    ],
    footer: {
      quickLinks: "快速链接",
      contact: "联系我们",
      visit: "到访",
      rights: "版权所有",
      legalNote: "隐私政策与条款可应要求提供。",
    },
    whatsapp: {
      booking: "您好，我想预约参观宏缘宝地。",
      general: "您好，我想咨询宏缘宝地的服务。",
      funeral: "您好，我需要殡仪服务协助。",
    },
  },
  en: {
    langLabel: "English",
    otherLangLabel: "中文",
    location: "Kluang · Johor",
    brand: { name: "Hong Yuan Hills", latin: "宏缘宝地" },
    tagline: "A peaceful resting place, held in everlasting remembrance",
    navServices: "Services",
    skipToContent: "Skip to main content",
    cta: {
      book: "Book a Visit",
      bookShort: "Book",
      call: "24-Hour Hotline",
      callShort: "Call",
      whatsapp: "WhatsApp Us",
      menu: "Open menu",
      close: "Close",
      learnMore: "Learn more",
      enquire: "Enquire",
      priceOnRequest: "Price on request",
    },
    labels: {
      phone24: "24-hour hotline",
      officePhone: "Office",
      email: "Email",
      whatsapp: "WhatsApp",
      hours: "Opening hours",
      park: "Memorial park",
      office: "Office",
      viewMap: "View map",
    },
    hours: {
      value: "Monday–Sunday, 8:00 am – 6:00 pm",
      emergency: "Emergency service available 24 hours",
    },
    addresses: [
      {
        label: "Memorial park",
        value:
          "Lot 3188, Jalan Peringatan, Belakang, Kampung Mic Kluang, 86000 Kluang, Johor, Malaysia",
      },
      {
        label: "Office",
        value: "76 & 76A, Jalan Mersing, 86000 Kluang, Johor, Malaysia",
      },
    ],
    footer: {
      quickLinks: "Quick links",
      contact: "Contact",
      visit: "Visit",
      rights: "All rights reserved",
      legalNote: "Privacy policy and terms are available on request.",
    },
    whatsapp: {
      booking: "Hello, I would like to book a visit to Hong Yuan Hills.",
      general: "Hello, I would like to enquire about Hong Yuan Hills.",
      funeral: "Hello, I need funeral assistance.",
    },
  },
};
