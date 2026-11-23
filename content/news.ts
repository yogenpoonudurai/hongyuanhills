import { groundsImages } from "./grounds";
import { halls } from "./halls";
import type { ImageRef, L, Locale } from "./types";

export type NewsPost = {
  slug: string;
  date: string;
  category: L<string>;
  title: L<string>;
  excerpt: L<string>;
  body: L<string[]>;
  image?: ImageRef;
};

export const news: NewsPost[] = [
  {
    slug: "online-visit-requests",
    date: "2026-11-21",
    category: { zh: "服务更新", en: "Service update" },
    title: {
      zh: "WhatsApp 预约参观现已开放",
      en: "Book a visit via WhatsApp",
    },
    excerpt: {
      zh: "欢迎通过 WhatsApp 联系我们预约参观宏缘宝地，并告诉我们您想了解的服务。",
      en: "Contact us on WhatsApp to book a visit to Hong Yuan Hills and let us know which services interest you.",
    },
    body: {
      zh: [
        "您现可通过 WhatsApp 联系宏缘宝地预约参观，并告诉我们想了解的服务。顾问会与您联系，确认到访时间与安排。",
        "如需即时殡仪协助，请直接致电 24 小时热线；预约参观与一般查询可通过 WhatsApp 联系我们。",
      ],
      en: [
        "You can now contact Hong Yuan Hills on WhatsApp to book a visit and tell us which services interest you. A consultant will follow up to confirm the time and arrangements.",
        "For immediate funeral assistance, please call the 24-hour hotline. Contact us on WhatsApp for visit bookings and general enquiries.",
      ],
    },
    image: groundsImages.landscape,
  },
  {
    slug: "ancestral-tablets-coming-soon",
    date: "2026-11-18",
    category: { zh: "即将推出", en: "Coming soon" },
    title: {
      zh: "神主牌服务筹备中",
      en: "Ancestral tablet service in preparation",
    },
    excerpt: {
      zh: "宏缘宝地正在筹备神主牌（祖先灵位）服务。开放时间与细节将另行公布。",
      en: "Hong Yuan Hills is preparing an ancestral tablet service. Launch timing and details will be announced separately.",
    },
    body: {
      zh: [
        "我们正在规划神主牌（祖先灵位）安奉服务，希望为家族提供一个庄严、整洁、便于祭拜的空间，延续慎终追远与孝道传统。",
        "服务目前尚未开放。您可以在神主牌页面留下联络方式，我们会在开放时通知您，或联系顾问了解现有骨灰殿与福地服务。",
      ],
      en: [
        "We are planning an ancestral tablet service that offers families a dignified, well-maintained and accessible space for remembrance, continuing the tradition of filial devotion.",
        "The service is not yet open. You can leave your contact details on the ancestral tablets page and we will notify you when it becomes available, or speak with a consultant about our current columbarium and grounds services.",
      ],
    },
  },
  {
    slug: "hall-video-tours-coming-soon",
    date: "2026-11-15",
    category: { zh: "影音", en: "Media" },
    title: {
      zh: "四座骨灰殿导览影片即将上线",
      en: "Hall tour videos coming soon",
    },
    excerpt: {
      zh: "自在阁、本愿阁、三缘殿与丹香阁的导览影片正在准备中。",
      en: "Tour videos for Zizai Pavilion, Benyuan Pavilion, Sanyuan Hall and Danxiang Pavilion are being prepared.",
    },
    body: {
      zh: [
        "四座骨灰殿的导览影片正在准备中，希望让未能到访的家庭也能感受殿堂的空间、光线与细节。",
        "影片上线前，各殿堂页面会显示预告画面。欢迎预约现场参观，由顾问陪同讲解佛像、面板与安奉格位。",
      ],
      en: [
        "Tour videos for the four columbarium halls are being prepared, so families who cannot visit in person can still experience the space, light and details.",
        "Until the videos are available, each hall page displays a preview. We welcome you to book an on-site visit and let a consultant explain the deities, panels and niche options.",
      ],
    },
    image: halls[0].image,
  },
];

export function getNewsPost(slug: string): NewsPost | undefined {
  return news.find((post) => post.slug === slug);
}

export function latestNews(count = 3): NewsPost[] {
  return [...news]
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .slice(0, count);
}

export type NewsCopy = {
  home: { eyebrow: string; title: string; intro: string; cta: string };
  hub: { meta: { title: string; description: string }; title: string; intro: string };
  article: {
    back: string;
    published: string;
    category: string;
    readMore: string;
  };
};

export const newsCopy: Record<Locale, NewsCopy> = {
  zh: {
    home: {
      eyebrow: "新闻与动态",
      title: "最新消息",
      intro: "园区服务、活动与最新安排。",
      cta: "查看全部消息",
    },
    hub: {
      meta: {
        title: "新闻与动态｜宏缘宝地",
        description:
          "宏缘宝地最新服务更新、园区消息、活动与即将推出的服务。",
      },
      title: "新闻与动态",
      intro: "了解宏缘宝地的最新服务、园区安排与即将推出的项目。",
    },
    article: {
      back: "返回新闻列表",
      published: "发布于",
      category: "分类",
      readMore: "阅读全文",
    },
  },
  en: {
    home: {
      eyebrow: "News & Updates",
      title: "Latest news",
      intro: "Service updates, park notices and what’s coming next.",
      cta: "View all updates",
    },
    hub: {
      meta: {
        title: "News & Updates | Hong Yuan Hills",
        description:
          "The latest service updates, park notices, events and upcoming services at Hong Yuan Hills.",
      },
      title: "News & Updates",
      intro: "The latest services, park arrangements and upcoming projects at Hong Yuan Hills.",
    },
    article: {
      back: "Back to news",
      published: "Published",
      category: "Category",
      readMore: "Read more",
    },
  },
};
