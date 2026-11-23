// Approved values transcribed from site-owner decisions recorded in prior review rounds.
export const approvedSiteContract = {
  whatsapp: {
    number: "60177333385",
    messages: {
      zh: {
        booking: "您好，我想预约参观宏缘宝地。",
        general: "您好，我想咨询宏缘宝地的服务。",
      },
      en: {
        booking: "Hello, I would like to book a visit to Hong Yuan Hills.",
        general: "Hello, I would like to enquire about Hong Yuan Hills.",
      },
    },
  },
  social: {
    facebook: "https://www.facebook.com/hyhills.my/",
    instagram: "https://www.instagram.com/hongyuanhills/",
  },
  homeNews: [
    { slug: "online-visit-requests", title: "WhatsApp 预约参观现已开放" },
    { slug: "ancestral-tablets-coming-soon", title: "神主牌服务筹备中" },
    { slug: "hall-video-tours-coming-soon", title: "四座骨灰殿导览影片即将上线" },
  ],
} as const;
