import type { Locale } from "./types";

export const socialProfiles = {
  facebook: {
    url: "https://www.facebook.com/hyhills.my/",
    handle: "hyhills.my",
  },
  instagram: {
    url: "https://www.instagram.com/hongyuanhills/",
    handle: "@hongyuanhills",
  },
} as const;

export type SocialCopy = {
  section: { eyebrow: string; title: string; intro: string };
  facebook: { label: string };
  instagram: { label: string };
  newsCta: string;
};

export const socialCopy: Record<Locale, SocialCopy> = {
  zh: {
    section: {
      eyebrow: "关注我们",
      title: "在社群中与我们保持联系。",
      intro:
        "Facebook 与 Instagram 会分享园区日常、服务更新与活动消息。欢迎关注，或查看网站新闻与动态。",
    },
    facebook: { label: "Facebook 专页" },
    instagram: { label: "Instagram 主页" },
    newsCta: "查看新闻与动态",
  },
  en: {
    section: {
      eyebrow: "Follow Us",
      title: "Stay connected with us.",
      intro:
        "Our Facebook and Instagram pages share park moments, service updates and events. Follow along, or read the latest news on this website.",
    },
    facebook: { label: "Facebook Page" },
    instagram: { label: "Instagram Profile" },
    newsCta: "Read news & updates",
  },
};
