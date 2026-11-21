import type { Locale } from "./types";

// Draft website copy for client/legal review before publication.
export type LegalSection = {
  title: string;
  body?: string[];
  bullets?: string[];
};

export type LegalDocument = {
  meta: { title: string; description: string };
  title: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
  contactNote: string;
};

export type LegalCopy = {
  privacy: LegalDocument;
  terms: LegalDocument;
};

const lastUpdated = "2026-11-21";

export const legalCopy: Record<Locale, LegalCopy> = {
  zh: {
    privacy: {
      meta: {
        title: "隐私政策｜宏缘宝地",
        description:
          "了解宏缘宝地如何收集、使用与保护您通过网站提交的个人资料。",
      },
      title: "隐私政策",
      intro:
        "本政策说明宏缘宝地如何收集、使用、保存与保护您通过本网站提交的个人资料。我们依据马来西亚《2010 年个人资料保护法》（PDPA）处理相关资料。",
      lastUpdated,
      sections: [
        {
          title: "我们收集的资料",
          body: [
            "当您填写预约、咨询或通知表格时，我们可能收集您的姓名、联络电话、电邮地址、想了解的服务、希望参观日期与时段、留言内容，以及您同意被联系的记录。",
            "我们也可能记录提交页面与行销参数（例如 UTM 来源），以便了解查询来源。我们不会通过本网站收集身份证号码、健康资料、付款资料或其他敏感个人资料。",
          ],
        },
        {
          title: "资料用途",
          bullets: [
            "回复您的查询、预约或通知请求",
            "安排参观、顾问咨询或相关服务",
            "依您的需求提供后续跟进",
            "改善网站内容与服务流程",
            "遵守适用法律与法规要求",
          ],
        },
        {
          title: "同意与法律依据",
          body: [
            "提交表格前，您需要勾选同意让我们就您的查询与您联系。您可随时通过本页联络方式撤回同意；撤回后，我们可能无法继续处理相关请求。",
          ],
        },
        {
          title: "资料分享与处理者",
          body: [
            "我们不会出售您的个人资料。为提供服务，我们可能使用第三方处理者，例如网站托管与安全服务（Cloudflare）及电邮发送服务（Resend）。这些处理者仅依我们的指示处理资料。",
            "若我们启用网站分析、地图或影片嵌入服务（例如 Google Analytics、Google Maps 或 YouTube），相关资料也会受该服务供应商的隐私政策约束。",
          ],
        },
        {
          title: "保存期限",
          body: [
            "我们只在达成本政策所述目的所需的期间内保存个人资料，或依法律、会计与营运要求保存。超过所需期间后，我们会删除或匿名化相关资料。",
          ],
        },
        {
          title: "Cookie 与分析",
          body: [
            "本网站可能使用必要的浏览器储存来记住语言偏好。Cloudflare Web Analytics 不使用 Cookie 追踪个人。若我们启用需要同意的分析或广告工具，我们会先取得您的同意。",
          ],
        },
        {
          title: "第三方链接与嵌入",
          body: [
            "本网站可能包含第三方网站链接、地图或影片嵌入。这些第三方服务有自己的隐私政策，我们不对其内容或资料处理方式负责。",
          ],
        },
        {
          title: "查阅与更正",
          body: [
            "您可以通过本页联络方式要求查阅或更正您的个人资料，或询问我们如何保存与使用您的资料。我们会在合理期间内回应。",
          ],
        },
        {
          title: "政策更新",
          body: [
            "我们可能不时更新本政策。更新后的版本会刊登在本页面，并注明最后更新日期。",
          ],
        },
      ],
      contactNote:
        "如对本政策有任何疑问，请电邮 info@hyhills.com 或致电 24 小时热线。",
    },
    terms: {
      meta: {
        title: "使用条款｜宏缘宝地",
        description:
          "宏缘宝地网站使用条款，包括服务资讯、价格、预约、分期付款与责任说明。",
      },
      title: "使用条款",
      intro:
        "本条款适用于您使用宏缘宝地网站及相关查询服务。使用本网站即表示您同意本条款。",
      lastUpdated,
      sections: [
        {
          title: "网站资讯",
          body: [
            "本网站提供宏缘宝地的服务、园区、产品与联络资讯，仅供一般参考。我们会尽力保持资料准确，但不保证所有内容在任何时候都完整、最新或无误。",
          ],
        },
        {
          title: "价格与供应",
          body: [
            "网站标示的价格（包括「价格请咨询」或「RM 起」）为参考资讯，可能因位置、选择、供应情况与条款而改变。网站内容不构成正式报价或合约要约。",
            "实际价格、格位供应与服务内容以双方确认的书面报价或合约为准。",
          ],
        },
        {
          title: "查询与预约",
          body: [
            "通过本网站提交的预约或查询属于请求，不保证已确认。我们会在办公时间内回复，并与您确认时间、地点与服务内容。",
            "如需即时殡仪协助，请直接致电 24 小时热线；网站表格不适用于紧急情况。",
          ],
        },
        {
          title: "分期付款",
          body: [
            "任何 0% 利息分期付款安排均须符合相关条款、审批与供应情况。分期付款的资格、期限与费用以正式文件为准。",
          ],
        },
        {
          title: "知识产权",
          body: [
            "本网站的文字、图片、影片、标志与设计受知识产权法保护。未经我们书面许可，不得复制、转载、修改或作商业使用。",
          ],
        },
        {
          title: "第三方链接",
          body: [
            "本网站可能链接至第三方网站或服务。我们不对第三方内容、可用性或资料处理方式负责。",
          ],
        },
        {
          title: "责任限制",
          body: [
            "在法律允许的范围内，我们不对因使用或无法使用本网站而产生的间接、附带或后果性损失负责。本条款不排除法律不得排除的责任。",
          ],
        },
        {
          title: "适用法律",
          body: [
            "本条款受马来西亚法律管辖。任何争议将依马来西亚法律处理。",
          ],
        },
      ],
      contactNote:
        "如对本条款有任何疑问，请电邮 info@hyhills.com 或致电 24 小时热线。",
    },
  },
  en: {
    privacy: {
      meta: {
        title: "Privacy Policy | Hong Yuan Hills",
        description:
          "How Hong Yuan Hills collects, uses and protects personal data submitted through this website.",
      },
      title: "Privacy Policy",
      intro:
        "This policy explains how Hong Yuan Hills collects, uses, stores and protects personal data submitted through this website. We handle personal data in accordance with Malaysia’s Personal Data Protection Act 2010 (PDPA).",
      lastUpdated,
      sections: [
        {
          title: "Information we collect",
          body: [
            "When you complete a booking, enquiry or notification form, we may collect your name, phone number, email address, service interest, preferred visit date and time, message, and a record of your consent to be contacted.",
            "We may also record the page and marketing parameters (such as UTM source) from which a submission was made, to understand enquiry sources. We do not collect identification numbers, health data, payment data or other sensitive personal data through this website.",
          ],
        },
        {
          title: "How we use it",
          bullets: [
            "To respond to your enquiry, booking or notification request",
            "To arrange visits, consultations or related services",
            "To provide follow-up based on your request",
            "To improve website content and service processes",
            "To comply with applicable legal and regulatory requirements",
          ],
        },
        {
          title: "Consent and legal basis",
          body: [
            "Before submitting a form, you must agree to be contacted about your enquiry. You may withdraw consent at any time using the contact details on this page; after withdrawal, we may be unable to continue processing the related request.",
          ],
        },
        {
          title: "Sharing and processors",
          body: [
            "We do not sell your personal data. To provide our services, we may use third-party processors such as website hosting and security services (Cloudflare) and email delivery services (Resend). These processors handle data only on our instructions.",
            "If we enable website analytics, maps or video embeds (such as Google Analytics, Google Maps or YouTube), the relevant data is also subject to those providers’ privacy policies.",
          ],
        },
        {
          title: "Retention",
          body: [
            "We retain personal data only for as long as needed for the purposes described in this policy, or as required for legal, accounting and operational purposes. After that period, we delete or anonymise the data.",
          ],
        },
        {
          title: "Cookies and analytics",
          body: [
            "This website may use necessary browser storage to remember your language preference. Cloudflare Web Analytics does not use cookies to track individuals. If we enable analytics or advertising tools that require consent, we will obtain your consent first.",
          ],
        },
        {
          title: "Third-party links and embeds",
          body: [
            "This website may contain links to third-party sites, maps or video embeds. Those services have their own privacy policies, and we are not responsible for their content or data practices.",
          ],
        },
        {
          title: "Access and correction",
          body: [
            "You may request access to or correction of your personal data, or ask how we store and use it, using the contact details on this page. We will respond within a reasonable period.",
          ],
        },
        {
          title: "Changes to this policy",
          body: [
            "We may update this policy from time to time. The updated version will be posted on this page with a revised last-updated date.",
          ],
        },
      ],
      contactNote:
        "If you have questions about this policy, email info@hyhills.com or call the 24-hour hotline.",
    },
    terms: {
      meta: {
        title: "Terms of Use | Hong Yuan Hills",
        description:
          "Terms of use for the Hong Yuan Hills website, including service information, pricing, bookings, instalments and liability.",
      },
      title: "Terms of Use",
      intro:
        "These terms apply to your use of the Hong Yuan Hills website and related enquiry services. By using this website, you agree to these terms.",
      lastUpdated,
      sections: [
        {
          title: "Website information",
          body: [
            "This website provides general information about Hong Yuan Hills’ services, park, products and contact details. We aim to keep the information accurate but do not guarantee that all content is complete, current or error-free at all times.",
          ],
        },
        {
          title: "Pricing and availability",
          body: [
            "Prices shown on the website (including “Price on request” or “from RM”) are indicative and may change based on position, selection, availability and terms. Website content does not constitute a formal quotation or contractual offer.",
            "Actual prices, niche availability and service contents are subject to the written quotation or agreement confirmed by both parties.",
          ],
        },
        {
          title: "Enquiries and bookings",
          body: [
            "Bookings or enquiries submitted through this website are requests and are not guaranteed until confirmed. We reply during office hours and will confirm the time, location and service details with you.",
            "For immediate funeral assistance, please call the 24-hour hotline directly; website forms are not suitable for emergencies.",
          ],
        },
        {
          title: "Instalments",
          body: [
            "Any 0% interest instalment arrangement is subject to terms, approval and availability. Eligibility, duration and fees are governed by the formal documents.",
          ],
        },
        {
          title: "Intellectual property",
          body: [
            "Text, images, videos, logos and designs on this website are protected by intellectual property laws. They may not be copied, reproduced, modified or used commercially without our written permission.",
          ],
        },
        {
          title: "Third-party links",
          body: [
            "This website may link to third-party websites or services. We are not responsible for their content, availability or data practices.",
          ],
        },
        {
          title: "Limitation of liability",
          body: [
            "To the extent permitted by law, we are not liable for indirect, incidental or consequential loss arising from the use of, or inability to use, this website. These terms do not exclude liability that cannot be excluded by law.",
          ],
        },
        {
          title: "Governing law",
          body: [
            "These terms are governed by the laws of Malaysia. Any dispute will be handled in accordance with Malaysian law.",
          ],
        },
      ],
      contactNote:
        "If you have questions about these terms, email info@hyhills.com or call the 24-hour hotline.",
    },
  },
};
