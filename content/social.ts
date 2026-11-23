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
};

export const socialCopy: Record<Locale, SocialCopy> = {
  zh: {
    section: {
      eyebrow: "关注我们",
      title: "在社群中与我们保持联系。",
      intro:
        "Facebook 与 Instagram 会分享园区日常、服务更新与活动消息。欢迎关注我们的专页与主页，掌握最新动态。",
    },
    facebook: { label: "Facebook 专页" },
    instagram: { label: "Instagram 主页" },
  },
  en: {
    section: {
      eyebrow: "Follow Us",
      title: "Stay connected with us.",
      intro:
        "Follow our Facebook and Instagram pages for park moments, service updates and the latest happenings.",
    },
    facebook: { label: "Facebook Page" },
    instagram: { label: "Instagram Profile" },
  },
};
