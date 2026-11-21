import type { Locale } from "./types";

export const socialProfiles = {
  facebook: {
    url: "https://www.facebook.com/hyhills.my/",
    handle: "hyhills.my",
    name: { zh: "宏缘宝地", en: "Hong Yuan Hills" },
    category: {
      zh: "殡葬服务 · 墓园",
      en: "Funeral & Cemetery Service",
    },
  },
  instagram: {
    url: "https://www.instagram.com/hongyuanhills/",
    handle: "@hongyuanhills",
    name: { zh: "宏缘宝地", en: "Hong Yuan Hills" },
  },
} as const;

export type SocialCopy = {
  section: { eyebrow: string; title: string; intro: string };
  facebook: { label: string; cta: string };
  instagram: { label: string; cta: string };
  newsCta: string;
  note: string;
};

export const socialCopy: Record<Locale, SocialCopy> = {
  zh: {
    section: {
      eyebrow: "关注我们",
      title: "在社群中与我们保持联系。",
      intro:
        "Facebook 与 Instagram 会分享园区日常、服务更新与活动消息。欢迎关注，或查看网站新闻与动态。",
    },
    facebook: { label: "Facebook 专页", cta: "浏览专页" },
    instagram: { label: "Instagram 主页", cta: "浏览主页" },
    newsCta: "查看新闻与动态",
    note: "社群内容以平台公布为准；最新服务资讯请以本网站及顾问说明为准。",
  },
  en: {
    section: {
      eyebrow: "Follow Us",
      title: "Stay connected with us.",
      intro:
        "Our Facebook and Instagram pages share park moments, service updates and events. Follow along, or read the latest news on this website.",
    },
    facebook: { label: "Facebook Page", cta: "Visit page" },
    instagram: { label: "Instagram Profile", cta: "Visit profile" },
    newsCta: "Read news & updates",
    note: "Social content is subject to each platform; the latest service information on this website and from our consultants takes precedence.",
  },
};
