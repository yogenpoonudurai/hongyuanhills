# Hong Yuan Hills — Detailed Implementation Plan

**Project:** Hong Yuan Hills (宏缘宝地) memorial park website
**Location:** Kluang, Johor, Malaysia
**Status:** Draft for approval
**Last updated:** 2026-11-21
**Working directory:** `/mnt/Development/fira/wentak/hongyuanhills`
**Domain:** `hongyuanhills.com` (registered at GoDaddy; DNS and hosting on Cloudflare)

---

## 0. How to read this document

| Section | Purpose |
|---|---|
| 1–5 | Product, audience, decisions, goals and constraints |
| 6–8 | Architecture, repository, routing, i18n and content model |
| 9–11 | Page-by-page specification, design system, mobile requirements |
| 12–16 | Forms/API, security, SEO/analytics, performance, accessibility |
| 17–21 | Testing, CI/CD, Cloudflare/DNS, observability, content operations |
| 22–26 | Phases, definition of done, risks, open decisions, skills applied |
| Appendices | Env vars, URL map/redirects, content inventory, commands, price rules |

All decisions below reflect the confirmed conversation:

- Chinese + English only.
- No CMS, no WordPress, no Framer, no VPS.
- Next.js static export on Cloudflare Pages free tier.
- Forms via one Cloudflare Pages Function.
- Booking is a request form only.
- Pricing is “From RM” where figures exist, otherwise “Price on request”.
- Price source is the image-only A4 flyers/posters until the client supplies figures.
- 神主牌 is “Coming Soon” with notify-me.
- Crematorium and ceremony archive are phase 2.
- No invented permits, land tenure or claims.
- English naming convention approved.
- WhatsApp/phone numbers come from environment variables.

---

## 1. Executive decision

Build a **bilingual, statically exported Next.js site** deployed to **Cloudflare Pages** (free), with **no CMS** and **no server**. Content lives in the Git repository as typed TypeScript and MDX. The only dynamic endpoint is a **Cloudflare Pages Function** at `POST /api/lead` that validates enquiry forms, verifies Cloudflare Turnstile, and sends the lead through Resend.

### Why this architecture

| Requirement | Decision |
|---|---|
| Free hosting | Cloudflare Pages free: unlimited static requests/bandwidth, 500 builds/month |
| Chinese + English | Pre-rendered `/` (Chinese) and `/en` (English) with correct `lang` and hreflang |
| Low change volume | Git-based content + deploy; covered by the 6-month retainer |
| No WordPress security risk | No PHP, no plugins, no database, no admin login |
| No CMS | Typed content files, build-time validation, preview URLs |
| Forms | One Pages Function: Turnstile + Zod + Resend |
| Pricing from image flyers | Structured cards + zoomable flyer image + “Price on request” fallback |
| Videos | Unlisted YouTube, click-to-load; never hosted on Pages |
| Domain | Keep GoDaddy registration; move nameservers to Cloudflare; preserve email DNS |

### Rejected alternatives

| Alternative | Why rejected |
|---|---|
| WordPress / GoDaddy hosting | Security, plugin maintenance, database, and the client’s bad experience |
| Framer | No runtime `.env` for contact config, weak structured bilingual content, limited form/lead routing, hosting lock-in |
| VPS (“small server”) | Costs money, needs patching/backups/SSL; unnecessary for a static marketing site |
| Vercel Hobby | Free plan is restricted to non-commercial use; this is a client business site |
| Full Next.js SSR on Workers | Free Workers CPU is 10 ms/request; SSR/server actions are unnecessary and riskier |
| CMS (Sanity/Payload) for v1 | Low change volume and 6-month retainer make it unnecessary complexity |

---

## 2. Goals, non-goals, assumptions, unknowns

### 2.1 Goals

1. Present Hong Yuan Hills as a trustworthy, culturally rooted memorial park in Kluang.
2. Make the 24-hour hotline and WhatsApp reachable in one tap on mobile.
3. Explain the four columbarium halls and the Feng Shui grounds clearly, bilingually.
4. Capture booking/enquiry leads without a database or admin panel.
5. Show “From RM” pricing with honest disclaimers and image-backed detail.
6. Rank locally for Chinese and English memorial-park searches in Johor.
7. Keep the site fast on low-end Android phones and slow 4G.
8. Keep operating cost at RM0/month apart from the domain, with an optional $5/month Workers upgrade path.

### 2.2 Non-goals (v1)

- No CMS/admin UI, no client login.
- No e-commerce, online payment, deposit or niche availability checker.
- No live appointment calendar; request form only.
- No member portal, memorial pages for deceased, or family accounts.
- No Bahasa Malaysia.
- No 360° virtual tour.
- No crematorium or past-ceremony archive pages (phase 2).
- No blog engine; events can be MDX later.
- No automated price calculator or installment simulator.
- No dark mode.

### 2.3 Assumptions

- Traffic is well below 100,000 dynamic requests/day; static traffic is unmetered.
- The client accepts that content updates go through the developer and a deploy.
- The client can provide final prices, plot/niche dimensions, and approved English copy.
- Videos can be uploaded to an unlisted YouTube channel.
- `info@hyhills.com` remains the lead inbox and is accessible.
- The domain is registered at GoDaddy and the client can provide DNS access.
- The client owns or can create the Cloudflare, GitHub and Resend accounts.
- No sensitive personal data (NRIC, health data, payment data) is collected by the website.

### 2.4 Blocking unknowns

| Unknown | Blocks | Owner |
|---|---|---|
| Final “From RM” figures and price validity | Pricing cards | Client |
| WhatsApp numbers and routing (general/booking/emergency) | Contact CTAs | Client |
| Email provider and DNS records (GoDaddy email / Google / Microsoft 365) | DNS cutover | Client + developer |
| Cloudflare account ownership and access | Pages/DNS setup | Client |
| Video IDs after uploading to YouTube | Hall pages | Developer + client |
| 神主牌 status (coming soon vs live) | Tablets page | Client |
| Land tenure/permit claims | About/trust section | Client |
| Testimonials/reviews permission | Social proof | Client |

---

## 3. Product snapshot

Hong Yuan Hills is a Feng Shui memorial park and columbarium serving Chinese-Malaysian families in Kluang and wider Johor.

| Offering | Summary |
|---|---|
| 蓬莱宝地 / Penglai Blessed Grounds | Feng Shui burial grounds: dragon vein, Four Guardians, auspicious orientations, soil quality, Crescent Moon Pond (月眉池) |
| 自在阁 / Zizai Pavilion | Air-conditioned columbarium; Zizai Bodhisattva; Gold Heart Sutra and Blue Ripple panels; double white-marble lotus with backlight |
| 本愿阁 / Benyuan Pavilion | Ksitigarbha Bodhisattva; Western Pure Land theme; video |
| 三缘殿 / Sanyuan Hall | Air-conditioned; Amitabha, Guanyin and Maitreya enshrinement niches; crystal glass; video |
| 丹香阁 / Danxiang Pavilion | White-marble powder panels; pink/blue peony and crystal ring; video |
| 殡仪服务配套 / Funeral Services | Body transfer, placement, funeral planning, memorial hall setup, supplies; multi-cultural/religious |
| 神主牌 / Ancestral Tablets | Coming soon; notify-me |
| 生前规划 / Pre-Planning | Free consultation, personalised planning, end-to-end care, 0% instalment |
| Phase 2 | 归真阁火化场 / Guizhen Crematorium; 历届超度法会 / Past Prayer Ceremonies |

### 3.1 Brand and emotional positioning

- Calm, dignified, warm and culturally rooted — not dark, clinical or morbid.
- “A serene, trustworthy final resting place — planned with Feng Shui, managed with care.”
- Chinese-first, with a genuine English translation.
- Real photography and real ceremonies; avoid generic stock.

---

## 4. Audience and journeys

### 4.1 Personas

| Persona | Context | Needs | Device |
|---|---|---|---|
| Immediate-need family member (35–60) | A death has occurred or is imminent | 24h phone/WhatsApp, funeral service scope, directions, fast response | Mobile |
| Pre-planner (45–70) | Researching for themselves or elderly parents | Feng Shui credibility, hall comparison, price ranges, instalments, visit booking | Mobile/tablet |
| Overseas relative (Singapore, Australia, etc.) | Arranging remotely | English content, video tours, WhatsApp, clear process | Mobile |
| Elderly visitor (65+) | Visiting or paying respects | Large text, high contrast, simple navigation, one-tap call, directions | Mobile |
| Funeral director/partner | Referral or collaboration | Service information, contact person, credentials | Desktop/mobile |

### 4.2 Journeys

**Immediate need**
Home → tap 24h call/WhatsApp → Funeral Services → package/process → contact/lead.

**Pre-planning**
Search (Chinese/English) → Penglai or hall page → video/gallery → pricing → Book a Visit → WhatsApp follow-up.

**Compare halls**
Home/Services → Columbarium hub → 4 hall pages → video/panels → enquiry prefilled with the hall name.

**Visit**
Contact → map/directions (Google Maps/Waze) → book a visit form → confirmation/WhatsApp.

**Seasonal**
Qingming/中元/重阳 notice or ceremony page → gallery/events → contact (phase 2 for events).

---

## 5. Naming and content rules

### 5.1 Approved English naming

| Chinese | English primary | Notes |
|---|---|---|
| 宏缘宝地 | Hong Yuan Hills | Descriptor: Hong Yuan Memorial Park |
| 蓬莱宝地 | Penglai Blessed Grounds | |
| 自在阁 | Zizai Pavilion | Subtitle only: Freedom Columbarium |
| 本愿阁 | Benyuan Pavilion | Not “Ben Yuan Ge” |
| 三缘殿 | Sanyuan Hall | Not “Sanyuan Dian” |
| 丹香阁 | Danxiang Pavilion | |
| 月眉池 | Crescent Moon Pond | |
| 神主牌 | Ancestral Tablets | |
| 归真阁火化场 | Guizhen Crematorium | Phase 2 |
| 历届超度法会 | Past Prayer Ceremonies | Phase 2 |
| 生前规划 | Pre-Planning | |
| 风水福地 | Feng Shui Burial Grounds | |
| 骨灰殿 / 骨灰位 | Columbarium Hall / Niches | |
| 殡仪服务配套 | Funeral Services | |

### 5.2 Content rules

- Chinese is the source language; English must be reviewed, not machine-translated at runtime.
- Simplified Chinese (`zh-Hans`).
- Both locales must exist for every page, nav item, form label, error, meta title/description and image alt text.
- No invented prices, permits, land tenure, ratings, awards or guarantees.
- Feng Shui claims are presented as traditional belief, not guaranteed outcomes.
- Use “indicative starting price” language for all “From RM” prices.
- Keep Buddhist terminology consistent with the approved copy.
- Do not use emoji in the UI unless the client explicitly requests it.

---

## 6. Architecture

### 6.1 Runtime diagram

```
Visitor
  │ HTTPS
  ▼
Cloudflare DNS + CDN + TLS (free)
  │
  ├── Static pages ───────────────► Cloudflare Pages (out/)
  │     ├── /                       zh-Hans
  │     ├── /en                     en
  │     ├── /services/...           bilingual routes
  │     ├── /_headers               security/cache
  │     └── /_redirects             legacy/URL rules
  │
  └── POST /api/lead ─────────────► Pages Function
        ├── method + origin + body-size checks
        ├── honeypot
        ├── Zod validation
        ├── Turnstile siteverify
        ├── optional KV rate limit
        └── Resend API ───────────► office inbox / optional Sheet

Videos: unlisted YouTube (click-to-load, youtube-nocookie)
No database · No CMS · No server · No admin login
```

### 6.2 Cloudflare free-tier limits (verified 2026-11-21)

| Resource | Free limit | Impact |
|---|---|---|
| Pages builds | 500/month, 1 concurrent, 20 min timeout | Fine; avoid build-per-commit |
| Pages files | 20,000 files, 25 MiB per file | Keep videos out; images optimized |
| Pages static traffic | Unlimited requests/bandwidth | Fine |
| Pages custom domains | 100 per project | Fine |
| Pages deployments | 30-day retention; 100 most recent kept | Rollback available |
| Workers/Pages Functions | 100,000 requests/day, 10 ms CPU, 128 MB, 50 subrequests | Fine for forms |
| Workers Paid (optional) | From $5/month | Only if SSR or higher CPU is ever needed |
| TLS/CDN/DNS/basic DDoS | Included | Fine |
| Turnstile | Free | Use on forms |
| Web Analytics | Free | Use |
| Commercial use | Allowed | This is a client business site |

**Important:** Cloudflare Stream is paid. Do not use it. Host videos on unlisted YouTube.

### 6.3 Static-export constraints

`next.config.mjs`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // No ISR, middleware, server actions or dynamic route handlers.
};

export default nextConfig;
```

Consequences:

- Every route must be statically generated, including dynamic hall routes via `generateStaticParams`.
- No `next/image` optimizer; images are pre-optimized by a build script.
- No Next.js server actions; forms use `/api/lead` as a Pages Function.
- No runtime `headers()`/`cookies()`.
- `_headers` and `_redirects` live in `public/` and are copied into `out/`.
- Verify `out/404.html` is generated; otherwise provide a static `public/404.html`.

### 6.4 Why multiple root layouts

Chinese and English need different `<html lang>` values in the static HTML for SEO and screen readers.

```
app/
  (zh)/
    layout.tsx        # <html lang="zh-Hans">
    page.tsx          # /
    about/page.tsx    # /about
    services/...      # /services/...
  (en)/
    layout.tsx        # <html lang="en">
    en/
      page.tsx        # /en
      about/page.tsx  # /en/about
      services/...    # /en/services/...
```

Each route group owns a root layout; shared UI lives in `components/`. Verify in Phase 1 that Next.js emits both root layouts correctly; this is the main routing risk of the static-export approach.

---

## 7. Technology stack and repository

### 7.1 Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js current stable, App Router, TypeScript | Static export, React ecosystem, SEO metadata |
| Styling | Tailwind CSS + CSS variables | Fast, consistent design tokens |
| i18n | Custom typed dictionaries + route groups | Two locales; no framework overhead; build-time completeness |
| Long-form content | MDX via `next-mdx-remote/rsc` | Rich content with React components |
| Content validation | Zod + `tsx` script | Fail the build on missing translations/prices |
| Icons | Local inline SVG components | No icon-library payload |
| Forms | Native form + shared Zod schema | No form-library overhead |
| Serverless form handler | Cloudflare Pages Function | Free, same platform |
| Email | Resend | Simple API, free tier for low volume |
| Spam protection | Cloudflare Turnstile | Free, privacy-friendly |
| Images | `sharp` build script + `<picture>` | AVIF/WebP with responsive widths |
| Video | Unlisted YouTube + click-to-load poster | No hosting cost, no Pages file-size issue |
| Tests | Vitest + `@cloudflare/vitest-pool-workers` + Playwright + axe | Unit/integration/E2E/a11y |
| CI | GitHub Actions | Lint, typecheck, content validation, tests, build |
| Hosting | Cloudflare Pages | Free tier, previews, SSL, CDN |
| Validation gate | `no-mistakes` | Review/test/lint/push/PR/CI gate |

### 7.2 Repository layout

```
hongyuanhills/
├── IMPLEMENTATION.md
├── README.md
├── .env.example
├── .dev.vars.example
├── .gitignore
├── package.json
├── next.config.mjs
├── tsconfig.json
├── eslint.config.mjs
├── postcss.config.mjs
├── wrangler.toml
├── app/
│   ├── (zh)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── services/feng-shui-grounds/page.tsx
│   │   ├── services/columbarium/page.tsx
│   │   ├── services/columbarium/[slug]/page.tsx
│   │   ├── services/funeral-services/page.tsx
│   │   ├── services/ancestral-tablets/page.tsx
│   │   ├── pre-planning/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── privacy-policy/page.tsx
│   │   ├── terms/page.tsx
│   │   └── not-found.tsx
│   └── (en)/
│       ├── layout.tsx
│       └── en/
│           ├── page.tsx
│           ├── about/page.tsx
│           ├── services/...
│           ├── pre-planning/page.tsx
│           ├── contact/page.tsx
│           ├── privacy-policy/page.tsx
│           ├── terms/page.tsx
│           └── not-found.tsx
├── components/
│   ├── layout/       Header, Footer, MobileActionBar, LanguageSwitcher
│   ├── ui/           Button, Link, Section, Container, Accordion, Dialog, Field
│   ├── media/        Picture, Lightbox, YouTubeEmbed, MapCard
│   ├── pricing/      PriceCard, PriceNote, FlyerLightbox
│   ├── forms/        LeadForm, VisitForm, FuneralForm, NotifyForm
│   └── pages/        HomePage, AboutPage, HallPage, GroundsPage, ...
├── content/
│   ├── site.ts
│   ├── halls/*.ts
│   ├── pricing.ts
│   ├── faqs.ts
│   ├── services.ts
│   ├── pages/*.mdx
│   └── types.ts
├── lib/
│   ├── env.ts
│   ├── i18n.ts
│   ├── metadata.ts
│   ├── schema.ts
│   ├── contact.ts
│   ├── pricing.ts
│   └── analytics.ts
├── functions/
│   └── api/lead.ts
├── public/
│   ├── images/optimized/...
│   ├── fonts/...
│   ├── _headers
│   ├── _redirects
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   ├── optimize-images.ts
│   ├── validate-content.ts
│   └── generate-sitemap.ts
├── tests/
│   ├── unit/
│   ├── workers/
│   └── e2e/
└── .github/workflows/ci.yml
```

### 7.3 Node version

- Local: Node 22 LTS (recommended for parity with Cloudflare Pages).
- Cloudflare Pages build env: `NODE_VERSION=22`.
- Do not rely on Node 26 locally for deploy parity; pin `.nvmrc` to 22.

---

## 8. Routing, i18n and content model

### 8.1 URL map

| Page | Chinese | English |
|---|---|---|
| Home | `/` | `/en` |
| About | `/about` | `/en/about` |
| Services hub | `/services` | `/en/services` |
| Penglai grounds | `/services/feng-shui-grounds` | `/en/services/feng-shui-grounds` |
| Columbarium hub | `/services/columbarium` | `/en/services/columbarium` |
| Hall detail | `/services/columbarium/{slug}` | `/en/services/columbarium/{slug}` |
| Funeral services | `/services/funeral-services` | `/en/services/funeral-services` |
| Ancestral tablets | `/services/ancestral-tablets` | `/en/services/ancestral-tablets` |
| Pre-planning | `/pre-planning` | `/en/pre-planning` |
| Contact | `/contact` | `/en/contact` |
| Privacy | `/privacy-policy` | `/en/privacy-policy` |
| Terms | `/terms` | `/en/terms` |
| Phase 2 ceremonies | `/ceremonies` | `/en/ceremonies` |
| Phase 2 crematorium | `/crematorium` | `/en/crematorium` |

Slugs are English and shared across locales. Chinese titles and metadata are Chinese.

### 8.2 Language behavior

- URL determines language; no automatic redirect on first visit.
- Language switcher maps the current path:
  - Chinese → English: `/en` + path.
  - English → Chinese: remove `/en`.
- Store the user’s explicit language choice in `localStorage` only for switcher hints; never auto-redirect.
- `<html lang>` is `zh-Hans` or `en` from the root layout.
- Hreflang on every page:

```html
<link rel="alternate" hreflang="zh-Hans" href="https://hongyuanhills.com{zhPath}" />
<link rel="alternate" hreflang="en" href="https://hongyuanhills.com/en{zhPath}" />
<link rel="alternate" hreflang="x-default" href="https://hongyuanhills.com{zhPath}" />
<link rel="canonical" href="https://hongyuanhills.com{selfPath}" />
```

### 8.3 Content types

```ts
export type Locale = 'zh' | 'en';
export type L<T> = { zh: T; en: T };

export interface Hall {
  slug: string;
  name: L<string>;
  tagline: L<string>;
  intro: L<string>;
  deity: L<{ name: string; body: string }>;
  panels: L<Array<{ name: string; body: string; image: ImageRef }>>;
  amenities: L<string[]>;
  video?: { youtubeId: string; title: L<string>; poster: ImageRef };
  gallery: ImageRef[];
  seo: L<{ title: string; description: string }>;
}

export interface Price {
  id: string;
  service: 'grounds' | 'columbarium' | 'funeral' | 'tablets';
  hallSlug?: string;
  label: L<string>;
  fromPrice: number | null; // MYR; null means "Price on request"
  unit?: L<string>;
  notes?: L<string>;
  sourceImage?: string;
  lastUpdated: string; // ISO date
}
```

- All content objects require both `zh` and `en`; TypeScript fails if one is missing.
- `content/pricing.ts` is the single source of truth for prices.
- `content/site.ts` holds brand, addresses, hours, nav, social, legal links.
- Environment variables hold phone/WhatsApp/email; not content files.
- MDX frontmatter: `title`, `description`, `locale`, `updated`, `hero`, `heroAlt`.

### 8.4 Content validation (build gate)

`scripts/validate-content.ts` checks:

- Every localized field has non-empty `zh` and `en`.
- Hall slugs are unique and URL-safe.
- Every hall has at least one image with `alt` in both languages.
- Prices are `null` or a positive integer; `lastUpdated` is a valid ISO date.
- No placeholder strings (`TODO`, `TBD`, `Lorem`) in production content.
- Every nav item and footer link resolves to a route.
- Every video has a YouTube ID and a poster image.
- Every page has a meta title ≤60 characters and description ≤160 characters (warning, not hard fail).

Run before build: `npm run validate:content`.

---

## 9. Page-by-page specification

### 9.1 Global shell

**Header (desktop)**
- Logo (Chinese + English lockup).
- Nav: 首页 / 关于我们 / 服务项目 (dropdown) / 生前规划 / 联系我们.
- Services dropdown: 风水福地, 骨灰殿 (submenu: 4 halls), 殡仪服务, 神主牌.
- Right side: 24h hotline (tel link), language switcher, primary “预约参观”.
- Sticky, translucent ivory background after scroll; gold hairline.

**Header (mobile)**
- ≤64px: logo, call icon, language, hamburger.
- Drawer: full-screen, nested accordions, hotline, WhatsApp, Book a Visit, language.
- Focus trap, close button, body scroll lock, `Escape` closes.

**Mobile action bar**
- Fixed bottom, 56px + safe-area inset.
- 3 actions: Call, WhatsApp, Book a Visit.
- Content pages reserve bottom padding so the bar never covers content.
- Hidden on desktop.

**Footer**
- Brand + short line.
- Sitemap columns.
- Both addresses, hours, phone/WhatsApp/email.
- Language switcher, privacy/terms.
- Copyright.
- On mobile: accordion columns.

**Global**
- Skip-to-content link.
- Breadcrumbs on interior pages.
- Back-to-top button on long pages.
- 404 page with useful links and contact.
- Announcement banner (optional) for Qingming/中元 notices; dismissible; CMS-less via content file.

### 9.2 Home

| Order | Section | Content / behavior |
|---|---|---|
| 1 | Hero | Full-bleed image or muted video poster; eyebrow “宏缘宝地 · Kluang, Johor”; H1; subcopy; primary “预约参观”; secondary WhatsApp; 24h hotline |
| 2 | Trust strip | 24h service, bilingual, Kluang location, 0% instalment (subject to terms) |
| 3 | Editorial image section | Supplied photo; “一处安宁归宿 · 承载永恒思念”; short brand statement |
| 4 | About snippet | 3 pillars: 修身, 修心, 修德; link to About |
| 5 | Services grid | 4 cards: Feng Shui grounds, Columbarium, Funeral Services, Pre-Planning; each with image, short copy, “Learn more” |
| 6 | Featured halls | 4 hall cards with image, name, one-line differentiator, “From RM”/“Price on request” |
| 7 | Penglai story | Crescent Moon Pond image; short Feng Shui copy; link to grounds |
| 8 | Pre-planning | 4-step icon flow + 0% instalment + Book a Visit |
| 9 | Community/trust | Ceremony photo or video; Google reviews if available |
| 10 | FAQ | 5–6 questions; accordion |
| 11 | Location | Two addresses, hours, map preview, directions, Book a Visit |
| 12 | Footer | Global |

**Primary CTA:** Book a Visit. **Secondary:** WhatsApp. **Emergency:** 24h call always visible.

### 9.3 About

- Hero with park image.
- “关于宏缘” story (from V4).
- Mission & vision.
- Values: 仁, 义, 忠, 孝.
- “用心规划 · 传承价值”.
- Why Hong Yuan: professional team, one-stop service, sincere care, flexible customization (from live site content).
- Credentials/permits: only verified facts; otherwise “Documentation available on request”.
- Gallery.
- CTA.

### 9.4 Services hub

- Intro.
- Four service cards with links.
- Pricing note (“From RM”, subject to availability/terms).
- CTA to contact.

### 9.5 Penglai Blessed Grounds

- Hero with aerial/landscape image.
- Intro: 蓬莱宝地, site selection, “三年寻龙，十年点穴”.
- Sticky chapter nav:
  1. 选址
  2. 山水形势 (左辅右弼，四神俱全)
  3. 朝向吉象 (良山坤向, 乾山巽向, 巽山乾向; other orientations)
  4. 福地特质 (藏风聚气)
  5. 月眉池 (山因水活, 一水含情, 静水养心)
  6. 福地/价格 (plot types, pricing)
- Four Guardians diagram (custom SVG or annotated image).
- Orientation table; on mobile stack as cards.
- Soil quality section.
- Crescent Moon Pond image gallery.
- Video: `Video- 福地.mp4` (20s) via YouTube.
- Pricing cards (“From RM”/“Price on request”).
- FAQ.
- CTA: Book a site visit + WhatsApp.
- Disclaimer: traditional Feng Shui beliefs; no guarantees.

### 9.6 Columbarium hub

- Intro to air-conditioned and semi-open columbarium options.
- Comparison table: hall, deity, panel style, Buddhist/universal, video, price.
- 4 hall cards.
- “How to choose” guidance.
- CTA.

### 9.7 Hall template (4 pages)

**Shared sections**

1. Breadcrumb.
2. Hero: image/video poster, name, tagline, key facts (air-conditioned, location, panel types).
3. Intro quote + body.
4. Central deity.
5. Panel/niche options: cards with image, material, Buddhist/universal badge.
6. Video tour: poster + click-to-load YouTube (privacy-enhanced).
7. Gallery: grid + accessible lightbox.
8. Amenities: verified only (air-conditioning, parking, accessibility).
9. Pricing: “From RM”/“Price on request”; flyer lightbox; disclaimer.
10. Location within park: map/diagram (static; “Open in Maps”).
11. FAQ.
12. Related halls.
13. CTA: Book a Visit / WhatsApp.

**Per-hall content**

| Hall | Key content |
|---|---|
| Zizai | Zizai Bodhisattva; Gold Heart Sutra panel; Blue Ripple universal panel; double white-marble lotus with backlight |
| Benyuan | Ksitigarbha Bodhisattva; “地狱不空，誓不成佛”; Western Pure Land theme; video |
| Sanyuan | Amitabha, Guanyin, Maitreya niches; crystal glass; video |
| Danxiang | White-marble powder panels; pink/blue peony; crystal ring; video |

**Video handling**

- Upload the supplied MP4s to unlisted YouTube (or Vimeo if preferred).
- Use `youtube-nocookie.com` embeds.
- Show a poster image; load the iframe only on click.
- Provide captions; YouTube auto-captions are a starting point, reviewed for accuracy.
- Do not autoplay with sound; do not autoplay on mobile.

### 9.8 Funeral Services

- **Urgent banner above the fold:** “If a death has occurred, call 24h…” with call + WhatsApp.
- What we handle: body transfer, placement, funeral planning, memorial hall setup, supplies.
- Packages: only if client supplies details; otherwise “Contact for a personalised quotation”.
- Cultural/religious customization.
- Process timeline.
- “What to prepare” checklist.
- FAQ.
- CTA.

### 9.9 Pre-Planning

- Intro: why pre-plan.
- 4 steps: free consultation, personalised planning, peace-of-mind service, flexible payment.
- 0% instalment explanation + terms/disclaimer.
- FAQ.
- Consultation request form (same lead endpoint, type `enquiry` or `visit`).
- CTA.

### 9.10 Ancestral Tablets (Coming Soon)

- Explanation and expected launch.
- Notify-me form (type `notify`).
- CTA to contact for current alternatives.
- Replace with a full page if the client confirms it is live.

### 9.11 Contact

- Emergency banner.
- Contact cards: 24h hotline, office line, WhatsApp, email.
- Two addresses with map previews and “Open in Google Maps/Waze”.
- Opening hours.
- Forms:
  - Book a Visit (request).
  - General Enquiry.
  - Urgent Funeral Assistance.
  - Use tabs/accordion to avoid three long forms at once.
- Directions/transport notes (if supplied).
- PDPA notice.

### 9.12 Legal

- Privacy Policy (PDPA 2010 Malaysia): what is collected, why, who processes it (Cloudflare, Resend, analytics), retention, access/correction contact.
- Terms: pricing, availability, 0% instalment terms, no guarantees, intellectual property.
- Cookie notice only if GA4/Meta Pixel is enabled; Cloudflare Web Analytics is cookieless.

### 9.13 Phase 2 pages

- `/ceremonies`: past prayer ceremonies, dates, photos, video, annual calendar.
- `/crematorium`: Guizhen Crematorium information, process, FAQ.
- `/events` or `/news`: Qingming/中元 notices, promotions.
- Build only when content and permissions exist; avoid empty pages.

---

## 10. Design system

### 10.1 Direction

- **Imperial Stone & Bronze (approved default):** porcelain ivory, antique bronze, dark stone, restrained heritage red and Chinese heritage details.
- A distinguished memorial sanctuary — not a golf resort or luxury hotel. Quiet, warm, grounded and readable.
- Generous whitespace, editorial typography, verified Hong Yuan Hills photography.
- Rounded, soft Chinese type; calm, readable body.
- Subtle motion: fades and 8px translations; no flashy parallax.
- **Ivory** remains an alternate light theme via the footer theme switch.
- Design kit/moodboard are art-direction references only. Production imagery must be verified Hong Yuan Hills photography, facilities and branding.

### 10.2 Color tokens

| Token | Imperial value | Usage |
|---|---|---|
| `--ink` | `#201D15` | Primary text |
| `--stone` | `#6B6458` | Muted text |
| `--jade` | `#6B5338` | Links; token retained, now antique bronze |
| `--jade-deep` | `#1C1A14` | Footer and dark sanctuary bands |
| `--gold` | `#A88050` | Antique bronze accents/CTA |
| `--gold-light` | `#D0C0A8` | Pale bronze/hover |
| `--gold-dark` | `#7A5A2E` | Bronze text on ivory |
| `--paper` | `#F5EFE6` | Page background |
| `--ivory` | `#F8F0E8` | Porcelain ivory surfaces/light text |
| `--line` | `#D8CBB8` | Bronze borders |
| `--seal` | `#702828` | Restrained seal and tiny accents only |

Ivory alternate: ink `#1C2A25`, jade `#1F4A3A`, deep `#123328`, gold `#B08D57`, ivory `#F7F3EA`, paper `#FBF8F1`, stone `#5F665F`, line `#DED6C6`.
| Zizai accent | `#C9A227` + `#3E6B8A` | Hall page |
| Benyuan accent | `#A66B3A` | Hall page |
| Sanyuan accent | `#6E8B7B` + `#B9D6D0` | Hall page |
| Danxiang accent | `#C98A95` + `#8FA9C4` | Hall page |

Verify contrast (4.5:1) for body text and gold-on-ivory combinations.

### 10.3 Typography

| Role | Chinese | English |
|---|---|---|
| Display/headings | LXGW WenKai subset (Kaiti-style) or licensed Kaiti | Cormorant Garamond |
| Body | LXGW WenKai subset, then system CJK fallback | Source Sans 3 |
| UI/labels | Same as body | Source Sans 3 |
| Quotes | LXGW WenKai subset | Cormorant Garamond italic |

**Font budget:** ≤400 KB initial webfont payload. The current LXGW WenKai subset is ~221 KB. Re-subset when new Chinese glyphs are added; if the client supplies a licensed font, replace `cnFont` in `lib/fonts.ts`.

### 10.4 Scale and spacing

- Body: 17–18px mobile, 18–19px desktop; line-height 1.75.
- H1: `clamp(2.1rem, 6vw, 4.2rem)`; H2: `clamp(1.6rem, 4vw, 2.8rem)`.
- Section padding: `clamp(64px, 10vw, 128px)`.
- Container: max 1200px; gutter 20px mobile, 32px tablet, 48px desktop.
- Radius: 2px for editorial images, 8–16px for cards, 999px for pills.
- Hairlines: 1px `--line`; gold rules 1px.
- Touch targets: ≥48px.

### 10.5 Components

- Button (primary/secondary/ghost/text; loading/disabled).
- Link (inline, arrow).
- Section/Container.
- Card (service, hall, price, contact).
- Accordion (FAQ, mobile footer, forms).
- Tabs (contact forms; only if accessible).
- Dialog/Lightbox (native `<dialog>`, focus trap, Escape, scroll lock).
- Breadcrumb.
- LanguageSwitcher.
- Header/Footer/MobileActionBar.
- Picture (AVIF/WebP + fallback).
- YouTubeEmbed (poster, click-to-load).
- MapCard (static preview + directions).
- PriceCard/PriceNote/FlyerLightbox.
- FormField/FormError/FormSuccess.
- ChapterNav (sticky in-page anchors).
- NoticeBanner.
- Gallery.

### 10.6 Photography and motifs

- Use real photos from `references`, color-graded warm and calm.
- Motifs: lotus, crescent moon, mountain-water line art, seal-style brand mark, gold hairlines.
- Avoid heavy black backgrounds, red “funeral” clichés and generic stock.
- Alt text in both languages; captions where useful.

---

## 11. Mobile and responsive requirements

These are acceptance criteria, not suggestions.

### 11.1 Layout

- Support 320px–1920px; primary target 360–430px.
- Breakpoints: 480 / 768 / 1024 / 1280 / 1440.
- No horizontal scrolling at 320, 360, 375, 390 or 430px.
- Header ≤64px; sticky; call icon always visible.
- Bottom action bar 56px + `env(safe-area-inset-bottom)`; pages reserve padding.
- Full-screen mobile drawer with nested accordions, focus trap, scroll lock.
- Tables become stacked cards below 768px.
- Long pages use sticky chapter chips with horizontal scroll.
- Footer columns collapse into accordions.

### 11.2 Typography and accessibility

- Body 17–18px; labels 16px; inputs ≥16px (prevents iOS zoom).
- Tap targets ≥48×48px; 8px spacing.
- Contrast 4.5:1; focus visible; skip link.
- `prefers-reduced-motion` respected.
- 200% text zoom without clipping.
- Correct `lang` per locale; screen-reader labels on icon buttons.
- Chinese line-height 1.8 for body; avoid narrow columns.
- English text is longer; no fixed-height cards or buttons.

### 11.3 Media

- Hero images ≤200 KB on mobile; AVIF/WebP with `srcset`/`sizes`.
- Width/height on every image to prevent CLS.
- Lazy-load below the fold; `fetchpriority="high"` on the hero.
- No background video or autoplay on mobile.
- Video poster + tap-to-play; 16:9 responsive; captions.
- Maps: static preview + “Open in Google Maps/Waze”; load iframe only on tap.
- Galleries: swipeable, 1–2 columns, captions visible without hover.

### 11.4 Forms

- Single column; labels above fields.
- Correct `type`, `inputmode`, `autocomplete`.
- Native date/time pickers.
- Inline validation + error summary; `aria-live`.
- Success panel with WhatsApp fallback.
- No multi-step wizard for v1.

### 11.5 iOS/Android specifics

- Use `100dvh`, not `100vh`.
- Safe-area insets on fixed bars.
- No `background-attachment: fixed` (broken on iOS).
- Test on iOS Safari, Chrome Android and Samsung Internet.
- Test with Chinese system fonts and with webfonts blocked.

### 11.6 Device matrix

- iPhone SE (375×667), iPhone 14/15 (390/393×852), iPhone Pro Max (430×932).
- Galaxy S23 (360×780), Pixel 7.
- iPad Mini/Air.
- Desktop 1280/1440/1920.
- Slow 4G and Fast 3G.
- Landscape.
- 200% text zoom.
- Reduced motion.

---

## 12. Forms and API contract

### 12.1 Form types and fields

**Book a Visit (`visit`)**
- name (required)
- phone (required)
- email (optional)
- locale (`zh`/`en`)
- interest: grounds / columbarium / funeral / pre-planning / other
- preferred date/time (optional)
- message (optional)
- consent (required)
- honeypot `website` (must be empty)
- Turnstile token

**Urgent Funeral Assistance (`funeral`)**
- name (required)
- phone (required)
- relationship (optional)
- location (optional)
- immediate need (required)
- consent (required)
- honeypot + Turnstile

**General Enquiry (`enquiry`)**
- name, phone, email, message, consent, honeypot, Turnstile.

**Notify Me (`notify`)**
- name, phone or email, interest, consent, honeypot, Turnstile.

### 12.2 API contract

```
POST /api/lead
Content-Type: application/json
```

Request:

```json
{
  "type": "visit",
  "locale": "zh",
  "name": "Chan Tai Man",
  "phone": "+60 12-345 6789",
  "email": "optional@example.com",
  "interest": "columbarium",
  "preferredDate": "2026-12-01",
  "preferredTime": "morning",
  "message": "Would like to view Zizai Pavilion.",
  "consent": true,
  "website": "",
  "turnstileToken": "…",
  "page": "/services/columbarium/zizai-pavilion",
  "utm": { "source": "google", "medium": "cpc", "campaign": "…" }
}
```

Responses:

| Status | Body | Meaning |
|---|---|---|
| 200 | `{ "ok": true }` | Accepted |
| 400 | `{ "ok": false, "error": "validation", "fields": {...} }` | Invalid input |
| 403 | `{ "ok": false, "error": "turnstile" }` | Bot verification failed |
| 405 | `{ "ok": false, "error": "method" }` | Non-POST |
| 413 | `{ "ok": false, "error": "too_large" }` | Body > 8 KB |
| 429 | `{ "ok": false, "error": "rate_limited" }` | Too many requests |
| 502 | `{ "ok": false, "error": "delivery_failed", "fallback": "whatsapp" }` | Email provider failed |
| 503 | `{ "ok": false, "error": "form_disabled", "fallback": "whatsapp" }` | Form disabled/not configured |

### 12.3 Server flow (`functions/api/lead.ts`)

1. Reject non-POST.
2. Check `Origin` against `ALLOWED_ORIGINS`; reject mismatches.
3. Reject `Content-Length` > 8 KB; parse JSON safely.
4. Honeypot: if `website` is non-empty, return 200 silently.
5. Validate with shared Zod schema; normalize phone/email; trim.
6. Require `consent === true`.
7. Verify Turnstile with `TURNSTILE_SECRET_KEY`, remote IP and expected hostname; fail closed.
8. Optional KV rate limit: key `${type}:${ip}` with a short TTL; return 429.
9. Compose plain-text + HTML email; escape user input; subject includes type/locale.
10. Send via Resend to `LEAD_NOTIFICATION_EMAIL`; `reply_to` the enquirer.
11. Optional auto-reply to the enquirer (bilingual, no marketing).
12. Log only metadata (type, status, duration); never PII.
13. Return success; on provider failure return 502 with WhatsApp fallback.

**Test/preview mode:** `EMAIL_TRANSPORT=noop` returns success without sending; use in CI and preview. Production uses `EMAIL_TRANSPORT=resend`.

### 12.4 Client behavior

- Shared Zod schema for client and server; no duplicate rules.
- Turnstile widget loaded only on pages with forms.
- Submit disabled while pending; show spinner and status.
- On 400, map field errors to inputs; focus the first error.
- On 403, ask the user to retry; show WhatsApp fallback.
- On 429/502/503, show call/WhatsApp with a prefilled message.
- Preserve entered data on failure.
- No PII in analytics events.
- Honeypot field visually hidden and `tabindex=-1`; not `display:none` only.

### 12.5 Email and deliverability

- Verify `hyhills.com` in Resend (SPF, DKIM, DMARC).
- From: `website@hyhills.com` (or an approved address); Reply-To: enquirer.
- Test to a real inbox before launch.
- Keep a daily check of the inbox/resend dashboard for the first week.
- If `info@hyhills.com` is on GoDaddy email, verify DNS records before cutover.

---

## 13. Security and PDPA

### 13.1 Threat model

| Asset | Actor | Entry point | Threat | Mitigation |
|---|---|---|---|---|
| Enquiry PII | Public/bots | `/api/lead` | Spam, abuse, injection | Turnstile, honeypot, Zod, origin check, size limit, rate limit |
| PII in email | Developer/processors | Resend/inbox | Leakage | No logs, least access, 2FA, retention policy |
| Site content | Attacker | GitHub/Cloudflare | Defacement | Branch protection, PR review, 2FA, minimal permissions |
| Secrets | Attacker | Repo/build logs | Leakage | Cloudflare env only, `.gitignore`, no `NEXT_PUBLIC` secrets |
| Domain/DNS | Attacker | Registrar/Cloudflare | Hijack, email breakage | Registrar lock, 2FA, DNS backup, TTL plan |
| Users | Attacker | Links/forms | XSS, phishing | React escaping, CSP, no user HTML, no open redirects |
| Availability | Attacker | Traffic | DoS | Cloudflare DDoS, static pages, form rate limit |

### 13.2 Headers (`public/_headers`)

```
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  X-Frame-Options: DENY
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  Content-Security-Policy: default-src 'self'; img-src 'self' data: https://i.ytimg.com; media-src 'self'; frame-src https://challenges.cloudflare.com https://www.youtube-nocookie.com; connect-src 'self' https://challenges.cloudflare.com; script-src 'self' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'
```

- Start CSP in report-only if strict hashes are not feasible with Next.js static output.
- Add GA4/Meta domains only if those tools are enabled and consent-gated.
- Never use `dangerouslySetInnerHTML` with user input; MDX is trusted build-time content.

### 13.3 PDPA 2010 (Malaysia)

- Consent checkbox with privacy-policy link; record consent timestamp in the lead email.
- Purpose: respond to the enquiry/booking.
- Data minimisation: no NRIC, health data, payment data or ID uploads.
- Retention: define with the client (e.g., 12 months), then delete.
- Access/correction contact: `info@hyhills.com`.
- Processors: Cloudflare (hosting), Resend (email), Google (analytics if enabled), YouTube (embedded video).
- Cookie banner only for non-essential analytics; Cloudflare Web Analytics is cookieless.
- Privacy policy and terms reviewed by the client/legal.

### 13.4 Account and supply-chain security

- 2FA on GitHub, Cloudflare, GoDaddy, Resend.
- Domain registrar lock.
- GitHub branch protection: PR required, CI green, no force push.
- Dependabot/Renovate for npm and Actions.
- Pin GitHub Actions by full SHA.
- `npm audit --omit=dev` in CI; no high/critical.
- Least-privilege Cloudflare API token if used (Pages edit only, scoped).
- Secret scanning enabled.
- No secrets in build logs or client bundles.

### 13.5 Residual risks

- Turnstile can be solved by determined attackers; add rate limiting if abuse appears.
- Free Cloudflare plan has limited WAF/rate-limit controls.
- Email deliverability depends on DNS/Resend configuration.
- Static hosting removes most server attack surface, but content/account takeover remains.
- CSP may need `'unsafe-inline'` for scripts if hashing is not feasible; document if so.

---

## 14. SEO and analytics

### 14.1 Metadata

Every page exports:

- `title` (≤60 chars, localized).
- `description` (≤160 chars, localized).
- `canonical` (self).
- `alternates.languages` (zh-Hans, en, x-default).
- Open Graph title/description/image.
- `robots` index/follow for public pages.

### 14.2 Schema

- `LocalBusiness` (or `FuneralHome` if appropriate) with name, address, phone, hours, geo, sameAs.
- `Service` for each offering.
- `FAQPage` where FAQs are visible.
- `BreadcrumbList`.
- `VideoObject` for hall/grounds videos.
- No fake `AggregateRating` or reviews without consent.

### 14.3 Sitemap, robots and redirects

- `scripts/generate-sitemap.ts` outputs `public/sitemap.xml` with both locales and hreflang.
- `public/robots.txt` allows all and points to the sitemap.
- `public/_redirects` handles legacy Framer URLs and canonical host rules.
- Submit sitemap to Google Search Console and Bing Webmaster Tools.
- Use Google’s “Change of Address” only if the domain changes (it does not).

### 14.4 Keyword map

| Page | Chinese focus | English focus |
|---|---|---|
| Home | 居銮 风水墓园, 宏缘宝地 | memorial park Kluang, Hong Yuan Hills |
| Penglai | 居銮 福地, 风水墓地 | Feng Shui burial ground Kluang |
| Columbarium hub | 居銮 骨灰殿, 骨灰位 | columbarium Kluang Johor |
| Zizai | 自在阁, 冷气骨灰殿 | Zizai Pavilion columbarium |
| Benyuan | 本愿阁, 地藏王 | Benyuan Pavilion Ksitigarbha |
| Sanyuan | 三缘殿, 阿弥陀佛 | Sanyuan Hall columbarium |
| Danxiang | 丹香阁, 汉白玉 | Danxiang Pavilion columbarium |
| Funeral | 居銮 殡仪服务 | funeral services Kluang |
| Pre-planning | 生前规划, 分期 | memorial pre-planning Malaysia |
| Contact | 居銮 墓园 地址 | memorial park Kluang contact |

No keyword stuffing; the existing copy is already rich.

### 14.5 Local SEO

- Google Business Profile for the memorial park and office (if eligible).
- Consistent NAP (name, address, phone) across the site and GBP.
- Photos, posts, Q&A, review requests (with consent).
- Directions links for both locations.
- Chinese and English descriptions on GBP.

### 14.6 Analytics

- Cloudflare Web Analytics (cookieless) always on.
- GA4/GTM/Meta Pixel only with consent; no PII.
- Events:
  - `call_click` (location/page)
  - `whatsapp_click` (location/page/context)
  - `book_visit_submit`
  - `funeral_enquiry_submit`
  - `notify_submit`
  - `video_play` (hall/page)
  - `map_direction_click` (park/office)
  - `brochure_download`
  - `language_switch`
- UTM parameters captured on form submit (hidden fields) for lead attribution.
- No cross-site tracking; disclose in privacy policy.

---

## 15. Performance and media

### 15.1 Budgets

| Metric | Target |
|---|---|
| LCP (mobile 4G) | ≤2.5s |
| INP | ≤200ms |
| CLS | ≤0.1 |
| HTML (gzip) | ≤100KB |
| CSS (gzip) | ≤50KB |
| Initial JS (gzip) | ≤200KB |
| Initial fonts | ≤300KB |
| Hero image (mobile) | ≤200KB |
| Lighthouse mobile Performance | ≥90 |
| Accessibility | 100 |
| Best Practices | ≥95 |
| SEO | 100 |

Measure before claiming; budgets are targets, not guarantees.

### 15.2 Chinese font strategy

- Display font: LXGW WenKai (OFL) subset to headings/quotes; self-host WOFF2.
- Body: system CJK stack to avoid a large download.
- English: Cormorant Garamond + Source Sans 3, Latin subset only.
- `font-display: swap`; preload only the critical display face.
- No more than 2 weights per family.
- If Kaiti body is required, use `cn-font-split` unicode-range slices and revisit the budget.

### 15.3 Image pipeline

- Source images are 2–8 MB; do not ship originals.
- `scripts/optimize-images.ts` using `sharp`:
  - widths: 480, 768, 1200, 1920 (and 2560 only for full-bleed desktop if needed)
  - formats: AVIF, WebP, JPEG fallback
  - quality: 72–82
  - output: `public/images/optimized/{name}-{width}.{ext}`
- `<Picture>` component generates `srcset`, `sizes`, width/height, alt.
- Hero `fetchpriority="high"`; below-fold `loading="lazy"`.
- Keep total optimized images under the 20,000-file Pages limit (easily).

### 15.4 Video pipeline

- Do not commit MP4s to the repo.
- Upload to unlisted YouTube; store IDs in content.
- Poster image in AVIF/WebP.
- Click-to-load iframe; no autoplay; `youtube-nocookie`.
- Captions reviewed before launch.
- Use `VideoObject` schema.

### 15.5 JavaScript and caching

- Static export; minimal client components:
  - Header/mobile drawer
  - Language switcher
  - Accordion/tabs
  - Lightbox
  - Lead forms/Turnstile
  - Analytics consent
- No heavy carousel/animation libraries.
- Cloudflare Pages immutable hashed assets; HTML short cache.
- `_headers` cache rules:
  - `/_next/static/*` → `public, max-age=31536000, immutable`
  - images/fonts → long cache
  - HTML → short cache/revalidate.

### 15.6 Measurement

- Lighthouse CI on Home, a hall page, Penglai, Contact (mobile + desktop).
- Cloudflare Web Analytics; CrUX after launch.
- Test on a throttled 4G profile and a low-end Android device.
- Record before/after for any optimization; no unmeasured claims.

---

## 16. Accessibility

Target: **WCAG 2.2 AA**.

- Semantic landmarks, one H1 per page, logical heading order.
- Skip link; visible focus; keyboard-operable menus, accordions, lightbox, forms.
- Contrast ≥4.5:1 for body; check gold/ivory and muted text.
- Alt text in both languages; decorative images `alt=""`.
- Captions for all videos; transcripts where feasible.
- Form labels, descriptions, error messages, `aria-live` status.
- No hover-only information; no drag-only interactions.
- `prefers-reduced-motion`; no autoplay video.
- 200% zoom/reflow; no horizontal scroll at 320px.
- Correct `lang` per page; `lang` on mixed-language quotes if needed.
- Test with VoiceOver (iOS), TalkBack (Android), NVDA (Windows).
- Axe scan: 0 serious/critical issues on key pages.

---

## 17. Testing strategy

All statuses below are **Planned** until the code exists. Do not report a test as executed unless it was actually run.

| Behavior | Level | Oracle | Status | Gap/notes |
|---|---|---|---|---|
| Content completeness (zh/en, slugs, prices, alts) | Unit / build script | Content contract | Planned | Fails build on missing fields |
| Price formatting and fallback | Unit | Price rules in Appendix E | Planned | RM formatting, null → on request |
| WhatsApp/phone link builder + env fallback | Unit | Contact spec | Planned | No broken links |
| Hreflang/canonical/metadata | E2E / rendered HTML | SEO spec | Planned | Both locales |
| Language switch mapping | E2E | URL map | Planned | No auto-redirect |
| Header/dropdown/drawer keyboard | E2E | WCAG/UX spec | Planned | Focus trap, Escape |
| Hall pages render content | E2E | Content source | Planned | 4 halls |
| Gallery lightbox | E2E | Interaction spec | Planned | Keyboard + Escape |
| Video click-to-load | E2E | Media spec | Planned | No iframe before click |
| Pricing cards | E2E | Appendix E | Planned | Disclaimer visible |
| Booking form success | Integration + E2E | API contract | Planned | `EMAIL_TRANSPORT=noop` |
| Form validation errors | Integration + E2E | Zod schema | Planned | Field-level errors |
| Consent required | Integration | PDPA spec | Planned | 400 without consent |
| Honeypot silently accepted | Integration | Anti-spam spec | Planned | No email sent |
| Origin mismatch rejected | Integration | Security spec | Planned | 403 |
| Turnstile failure rejected | Integration | Security spec | Planned | Fail closed |
| Resend failure fallback | Integration | API contract | Planned | 502 + WhatsApp |
| Rate limit (if enabled) | Integration | Security spec | Planned | 429 |
| 404 page | E2E | UX spec | Planned | Bilingual |
| Legacy URL redirects | E2E / curl | Redirect map | Planned | 301 |
| Mobile no horizontal scroll | E2E viewports | Mobile spec | Planned | 320–430px |
| Sticky bar/drawer | E2E | Mobile spec | Planned | Safe area |
| Accessibility (axe) | E2E | WCAG 2.2 AA | Planned | 0 serious/critical |
| Keyboard/focus | E2E/manual | WCAG | Planned | All interactive |
| Reduced motion | E2E/manual | WCAG | Planned | No animation |
| Performance budgets | LHCI | Section 15 | Planned | Mobile + desktop |
| Real email delivery | Manual staging | Runbook | Planned | Test inbox |
| DNS/SSL/email cutover | Manual | Runbook | Planned | Rollback ready |
| Price/permit accuracy | Client sign-off | Content checklist | Planned | Human review |

**Test environment**

- Turnstile test keys in local/CI.
- `EMAIL_TRANSPORT=noop` in CI/preview.
- Test inbox for staging.
- `wrangler pages dev out` for Functions integration.
- No live emails from CI; no destructive DNS tests.

**Regression rule**

For any bug, reproduce with a failing test first where practical, then fix and re-run.

---

## 18. CI/CD and the `no-mistakes` gate

### 18.1 GitHub Actions (`ci.yml`)

Triggers: `pull_request`, `push` to `main`, `workflow_dispatch`.

Permissions: `contents: read` only.

Steps:

1. Checkout (pin action by SHA).
2. Setup Node 22 with npm cache.
3. `npm ci`.
4. `npm run validate:content`.
5. `npm run lint`.
6. `npm run typecheck`.
7. `npm run test:unit`.
8. `npm run build`.
9. `npm run test:e2e` (Playwright; start `wrangler pages dev out` with test env).
10. Lighthouse CI (optional; run on key pages, fail on budget).
11. Upload Playwright/Lighthouse artifacts on failure.

Concurrency: cancel in-progress runs for the same ref.

### 18.2 Cloudflare Pages

- Connect the GitHub repository to a Pages project.
- Production branch: `main`.
- Build command: `npm run build`.
- Build output: `out`.
- `NODE_VERSION=22`.
- Preview deployments for all non-production branches.
- Production env vars and preview env vars are separate.
- Preview uses `EMAIL_TRANSPORT=noop` and Turnstile test keys; no real emails.
- Preview must allow its own origin in `ALLOWED_ORIGINS` (or the Function must explicitly permit the project’s `*.pages.dev` origin) or preview form submissions will be rejected by the origin check.
- Production uses Resend + real Turnstile keys.

### 18.3 `no-mistakes` validation gate

`no-mistakes` validates committed changes through review, test, document, lint, push, PR and CI. It is a **between-runs, feature-branch** gate — not something to run on `main` or on uncommitted work.

**Prerequisites (Phase 0):**

- Initialize Git in `hongyuanhills/`.
- Create a feature branch.
- Run `no-mistakes init`.
- Ensure a supported pipeline agent is configured (`no-mistakes doctor`).
- Ensure the repo has a clean worktree and a remote/push target.

**Per change:**

```sh
git checkout -b feat/<slug>
# implement + commit
no-mistakes axi run --intent "<full user intent and decisions>"
# respond to gates until outcome: checks-passed
```

**Intent template:**

> Build the Hong Yuan Hills bilingual memorial-park site without a CMS. Use static-export Next.js on Cloudflare Pages free tier; Chinese at `/`, English at `/en`; typed TS/MDX content; pricing as “From RM” from image flyers with “Price on request” fallback; use WhatsApp as the point of communication, with localized prefilled booking and enquiry CTAs on the home page and a WhatsApp CTA on the contact page; do not add on-site contact or booking forms; no WordPress/Framer/VPS; preserve GoDaddy domain and email DNS; mobile-first, accessible, performance-budgeted.

**Rules:**

- Do not bypass `no-mistakes` or force-push.
- Do not edit files while a gate is active; respond with `fix`/`approve`/`skip` as appropriate.
- `ask-user` findings must be escalated to the user.
- A run ends at `checks-passed`; the human reviews and merges the PR.
- If `no-mistakes` is unavailable in the environment, fall back to CI + manual review and document why.

**Current status:** The working directory is not yet a Git repository and `no-mistakes` has not been initialized. This gate is a Phase 0 task, not something claimed as run today.

### 18.4 Branch protection

- Require PR before merging to `main`.
- Require CI status checks.
- Require at least 1 approval (developer or client nominee).
- No force pushes; no deletions.
- Linear history preferred.

### 18.5 Rollback

- Cloudflare Pages dashboard: rollback to a previous deployment.
- Or revert the commit on `main` and redeploy.
- No database migrations; DNS unchanged.
- Form endpoint can be disabled via `FORM_ENABLED=false` (returns 503 with WhatsApp fallback).
- Keep the previous Framer site live until the new site is stable.

---

## 19. Cloudflare Pages setup and DNS cutover

### 19.1 Cloudflare Pages project

- Project: `hongyuanhills`.
- Build command: `npm run build`.
- Output: `out`.
- Node: `NODE_VERSION=22`.
- Env vars: Appendix A.
- Custom domains: `hongyuanhills.com` and `www.hongyuanhills.com`.
- Canonical host: `https://hongyuanhills.com` (301 from `www`).
- SSL: automatic.
- Preview deployments: enabled.
- Functions: `functions/` directory auto-discovered.
- `wrangler.toml` for local dev and compatibility date.
- Local: `npm run build && npx wrangler pages dev out`.

### 19.2 Domain and DNS

- Keep registration at GoDaddy; do not buy hosting.
- Apex custom domain on Pages requires Cloudflare nameservers.
- Before changing nameservers:
  - Export all DNS records: A, AAAA, CNAME, MX, TXT (SPF, DKIM, DMARC, verification), CAA.
  - Confirm email provider (`info@hyhills.com`): GoDaddy email, Google Workspace, Microsoft 365.
  - Lower TTL to 300s 24–48h before cutover.
- Add the domain to Cloudflare; import/recreate records; verify.
- Change nameservers at GoDaddy to the Cloudflare pair.
- Wait for propagation; verify:
  - `https://hongyuanhills.com` and `https://www.hongyuanhills.com`
  - SSL certificate
  - Email send/receive
  - SPF/DKIM/DMARC
  - Forms
- Keep the old nameservers/records for 7 days for rollback.
- Rollback: restore GoDaddy nameservers; keep the Framer site intact.

### 19.3 Framer migration

Old URLs (from live site):

- `/`
- `/about-us`
- `/services`
- `/contact-us`
- `/coming-soon`

Map:

- `/about-us` → `/about` (301)
- `/services` → `/services` (301/200)
- `/contact-us` → `/contact` (301)
- `/coming-soon` → `/` or `/contact` (301)
- English equivalents under `/en/...`

Keep the Framer site live until the new deployment is tested on `*.pages.dev`; then cut over. Do not cancel Framer/GoDaddy hosting until 2 weeks after stable.

### 19.4 Cloudflare free-tier operating rules

- Watch the 100,000 Functions requests/day; static traffic is unlimited.
- Keep videos off Pages.
- Keep each file <25 MiB; total files <20,000.
- Avoid a build per commit; 500/month is enough.
- Add an uptime monitor; free plan has no SLA.
- If SSR or more CPU is ever needed, upgrade Workers Paid ($5/month).

---

## 20. Observability and production readiness

### 20.1 Signals

- Cloudflare Web Analytics: traffic, top pages, referrers.
- GA4 (consent): conversions (call, WhatsApp, form, video, map).
- Uptime monitor: `/` and `/en` every 5 minutes.
- Resend dashboard: delivery/bounce/complaint.
- Cloudflare Pages deployment notifications (email/Slack).
- Search Console: indexing, queries, Core Web Vitals.
- 404 monitoring via Cloudflare analytics or a lightweight page-view event.

### 20.2 Logs

- Pages Function logs: request id, type, status, duration; no PII.
- `npx wrangler pages deployment tail` for live debugging.
- No tokens or form contents in logs.
- Retain logs only as long as needed.

### 20.3 Release checklist

- [ ] Content validated (`npm run validate:content`).
- [ ] Chinese and English reviewed by the client.
- [ ] Prices/figures approved; “Price on request” fallback correct.
- [ ] No invented permits/claims.
- [ ] Forms tested on preview; real email verified; SPF/DKIM/DMARC pass.
- [ ] Turnstile production keys set.
- [ ] Secrets only in Cloudflare; no secrets in Git.
- [ ] Headers/CSP verified.
- [ ] Redirects from Framer URLs verified.
- [ ] Sitemap/robots/hreflang verified.
- [ ] Google Business Profile/NAP updated.
- [ ] Analytics/consent verified.
- [ ] Uptime monitor live.
- [ ] Backup/rollback plan tested.
- [ ] DNS records exported; TTL lowered.
- [ ] Client sign-off.

### 20.4 Launch

1. Deploy to `*.pages.dev`; smoke test desktop/mobile.
2. Test forms with a real inbox.
3. Check SSL, headers, redirects, 404.
4. Cut DNS; monitor 24h.
5. Submit sitemap; verify indexing.
6. Monitor forms, uptime, analytics for 7 days.

### 20.5 Post-launch

- 24h: DNS/SSL/email/forms, errors, uptime.
- 7d: indexing, Core Web Vitals, form delivery, 404s.
- 30d: review analytics, adjust content/CTAs.
- 6-month support: content updates, price changes, image swaps, minor fixes; defined SLA.

---

## 21. Content operations without a CMS

### 21.1 Workflow

1. Client sends changes (email/WhatsApp) with exact copy and assets.
2. Developer updates `content/` or MDX.
3. `npm run validate:content` + preview deploy.
4. Client reviews the preview URL.
5. Merge to `main`; production deploy.
6. Confirm live; log the change.

### 21.2 Common changes

| Change | Where | Notes |
|---|---|---|
| “From RM” price | `content/pricing.ts` | Update `lastUpdated`; validate; deploy |
| Hall copy/image | `content/halls/{slug}.ts` | Both locales; alt text |
| FAQ | `content/faqs.ts` | Both locales |
| Contact number/WhatsApp | Cloudflare env vars | Redeploy required for `NEXT_PUBLIC_*` |
| New event/ceremony | `content/pages/*.mdx` | Phase 2 |
| Notice banner | `content/site.ts` | Qingming/中元 |
| Legal text | MDX/TS | Client/legal approval |

### 21.3 SLA (proposal)

- Copy/price/image updates: 2 business days.
- New section/page: 5 business days (scope quoted).
- Emergency contact change: same day where feasible.
- Included in the 6-month retainer; define monthly hours in the contract.

### 21.4 Future CMS path (not v1)

If the client later wants self-editing, use **Keystatic** (Git-based, no database) or **Sanity** (hosted). The typed content model maps directly; no rebuild. Never WordPress.

### 21.5 Handover

- Repo access, Cloudflare project access, DNS access.
- `README.md` setup/deploy.
- `CONTENT.md` editing guide.
- `RUNBOOK.md` DNS/rollback/forms.
- 1-hour walkthrough.
- After 6 months: hourly/retainer or CMS migration.

---

## 22. Phases and timeline

| Phase | Duration | Deliverables | Exit criteria |
|---|---|---|---|
| 0. Foundations | 3–5 days | Git repo, Cloudflare/GitHub/Resend accounts, DNS audit, content/price/video checklist, no-mistakes init | Access confirmed; unknowns logged |
| 1. Scaffold + design system | 1 week | Next.js static export, Tailwind tokens, fonts, layout shell, header/footer/mobile bar, language routing | `pnpm/npm build` produces `out/`; `/` and `/en` render correct `lang` |
| 2. Home + forms | 1 week | Home page, contact CTAs, lead endpoint, Turnstile, Resend, preview mode | Form success/failure tested; mobile bar works |
| 3. Product pages | 2 weeks | Penglai, columbarium hub, 4 hall pages, videos/galleries, pricing cards | All content renders; videos click-to-load |
| 4. Remaining pages | 1 week | About, funeral, pre-planning, tablets, contact, legal, 404 | Navigation complete; redirects mapped |
| 5. Content + SEO | 1 week | All copy, images, metadata, schema, sitemap, analytics | Client content review; validation passes |
| 6. QA | 1 week | E2E, a11y, performance, mobile, form delivery, security headers | Budgets met; no serious a11y issues |
| 7. Launch | 3–5 days | DNS cutover, smoke tests, monitoring, handover | Live, stable, rollback ready |
| 8. Support | 6 months | Content updates, fixes, monitoring | SLA met |

**Critical path:** price figures, DNS/email access, video IDs, bilingual content sign-off. Build can start before these, using “Price on request” and placeholders, but launch cannot.

---

## 23. Definition of Done

A phase is done only when:

- [ ] Content validation passes for both locales.
- [ ] Typecheck, lint and unit tests pass.
- [ ] E2E covers the changed behavior.
- [ ] No horizontal scroll at 320–430px.
- [ ] Keyboard and screen-reader checks pass.
- [ ] Axe has 0 serious/critical issues on touched pages.
- [ ] Performance budgets met on touched pages.
- [ ] Metadata, canonical and hreflang correct.
- [ ] No secrets in Git or client bundles.
- [ ] Preview URL reviewed by the client where relevant.
- [ ] `no-mistakes` run reaches `checks-passed` (once initialized).
- [ ] Rollback path documented for deployment/DNS changes.

---

## 24. Risks and mitigations

| Risk | Severity | Mitigation |
|---|---|---|
| DNS cutover breaks `info@hyhills.com` | HIGH | Export MX/SPF/DKIM/DMARC; lower TTL; test before/after; rollback nameservers |
| Incorrect prices or outdated flyers | HIGH | Client sign-off; `lastUpdated`; “indicative” disclaimer; easy content update |
| Chinese webfont bloats mobile | HIGH | Subset display font; system body font; budget + Lighthouse |
| Video weight/performance | MED | YouTube unlisted; poster; click-to-load; no autoplay |
| Form deliverability | MED | Resend domain verification; test inbox; fallback to WhatsApp |
| Client expects self-editing | MED | Written no-CMS workflow/SLA; Keystatic/Sanity path later |
| Framer SEO migration | MED | 301 map; sitemap; Search Console; keep old site until stable |
| Cloudflare free plan limits | LOW | Static traffic unmetered; monitor 100k/day; $5 upgrade path |
| Free plan has no SLA | LOW | Uptime monitor; runbook; optional paid plan |
| Turnstile blocks some users | LOW | WhatsApp/call fallback; test accessibility |
| Content/asset rights | MED | Client confirms photo/video rights; no stock without license |
| PDPA non-compliance | MED | Consent, privacy policy, retention, processors disclosed |
| No CMS means slower updates | LOW | 6-month SLA; preview deploys; typed content |
| English copy inconsistency | MED | Approved naming table; human review |
| Unverified permits/claims | HIGH | Omit until client supplies evidence |

---

## 25. Open decisions

1. Final “From RM” figures and validity dates.
2. WhatsApp numbers/routing: general, booking, emergency.
3. Email provider and DNS records for `info@hyhills.com`.
4. Cloudflare account ownership (client vs agency) and access.
5. 神主牌 status: coming soon vs live.
6. Crematorium/ceremony content timing.
7. Land tenure/permit details to publish.
8. Testimonials/Google review permissions.
9. Video upload account and final IDs.
10. Analytics/ads: GA4 only, or Meta Pixel/Google Ads too?
11. Canonical host: apex vs `www` (recommend apex).
12. 6-month retainer hours/SLA.

---

## 26. Skills applied

| Skill | How it shaped this plan |
|---|---|
| `no-mistakes` | Defined the feature-branch validation gate, intent requirements, gate handling and `checks-passed` handoff |
| `nextjs-engineering` | Static-export constraints, server/client boundaries, metadata, SEO, minimal client JS |
| `architecture-review` | Single static site + one form endpoint; rejected CMS/VPS/SSR; risks and reversibility |
| `testing-strategy` | Behavior-first test matrix; unit/integration/E2E; independent oracles; no source-string tests |
| `production-readiness` | Release checklist, observability, downtime/rollback, DNS cutover, owner handoff |
| `secure-coding` | Threat model, origin checks, Turnstile, Zod, PII/logging, secrets, 2FA, CSP |
| `ci-cd-engineering` | GitHub Actions, least-privilege tokens, preview/production envs, pinned actions, rollback |
| `performance-engineering` | Measured budgets, Chinese font strategy, image/video pipeline, Lighthouse CI |

---

## Appendix A — Environment variables

### Public (build-time)

```bash
NEXT_PUBLIC_SITE_URL=https://hongyuanhills.com
NEXT_PUBLIC_WHATSAPP_GENERAL=
NEXT_PUBLIC_WHATSAPP_BOOKING=
NEXT_PUBLIC_WHATSAPP_EMERGENCY=
NEXT_PUBLIC_PHONE_24H=
NEXT_PUBLIC_PHONE_OFFICE=
NEXT_PUBLIC_EMAIL=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_META_PIXEL_ID=
```

### Server / Pages Function secrets

```bash
RESEND_API_KEY=
TURNSTILE_SECRET_KEY=
LEAD_NOTIFICATION_EMAIL=
FROM_EMAIL=
ALLOWED_ORIGINS=https://hongyuanhills.com,https://www.hongyuanhills.com
FORM_ENABLED=true
EMAIL_TRANSPORT=resend   # use "noop" in CI/preview
```

### Build

```bash
NODE_VERSION=22
```

Rules:

- Numbers in international format, digits only, no `+` or spaces (e.g., `60177333385`).
- `NEXT_PUBLIC_*` is visible in the browser; never put secrets there.
- Changing a `NEXT_PUBLIC_*` value requires a redeploy.
- If a number is missing, the UI falls back to the current live number or hides the CTA; never render `wa.me/`.
- Temporary fallback while the client supplies final numbers: general/emergency `60177333385`, office `606077723399`, email `info@hyhills.com`. Keep these in `lib/contact.ts` as clearly marked temporary defaults, never hardcoded in components.

---

## Appendix B — Legacy URL redirects

`public/_redirects`:

```
/about-us        /about               301
/contact-us      /contact             301
/coming-soon     /                    301
/en/about-us     /en/about            301
/en/contact-us   /en/contact          301
```

`/services` and `/en/services` keep the same URL; do not add a self-redirect.

Add `www` → apex canonical redirect at Cloudflare (or in `_redirects` if host matching is supported).

Verify with:

```sh
curl -I https://hongyuanhills.com/about-us
curl -I https://hongyuanhills.com/en/about-us
```

---

## Appendix C — Content and asset inventory

| Asset | Use | Notes |
|---|---|---|
| CN website copy V4 | Home, About, Services, Pre-planning, Contact | Source of truth |
| EN website copy V4 | English pages | Human review required |
| Hall docs (Zizai, Benyuan) | Hall pages | Bilingual |
| Product doc | Hall summaries | Bilingual |
| 35 photos | Hero, halls, grounds, galleries | 2–8 MB; optimize |
| 7 videos | Hall/grounds tours, ceremonies | Upload to YouTube unlisted |
| 2 posters | Gallery/pricing reference | Image-only; transcribe later |
| 2 A4 flyers | Pricing reference | Image-only; client sign-off |
| Empty folders (crematorium, ceremonies) | Phase 2 | No content; do not launch empty pages |
| Live Framer site | Legacy redirects/SEO | Keep until stable |

**Missing:** final prices, plot/niche dimensions, permits/tenure, testimonials, captions, alt text, video IDs, English final review.

---

## Appendix D — Commands

```sh
# Install
npm ci

# Develop UI (static pages)
npm run dev

# Validate content
npm run validate:content

# Typecheck / lint / unit
npm run typecheck
npm run lint
npm run test:unit

# Build static output
npm run build

# Preview static output
npx serve out

# Full-stack local (Pages Functions + static)
npm run build
npx wrangler pages dev out

# E2E
npm run test:e2e

# Lighthouse CI
npm run lhci

# Optimize images
npm run optimize:images

# Generate sitemap
npm run generate:sitemap
```

---

## Appendix E — Price display rules

1. `fromPrice` is a positive integer in MYR or `null`.
2. If number (the figure below is formatting only, not a real price):
   - Chinese: `RM 12,800 起`
   - English: `From RM 12,800`
   - Format with `Intl.NumberFormat` (`currency: 'MYR'`, `maximumFractionDigits: 0`) and insert the localized prefix.
3. If `null`:
   - Chinese: `价格请咨询`
   - English: `Price on request`
4. Always show:
   - Chinese: `价格为参考起价，实际价格视选择、供应情况及条款而定。`
   - English: `Indicative starting price only. Actual price depends on selection, availability and terms.`
5. 0% instalment: `0% 利息分期付款，须符合条款。` / `0% interest instalment available, subject to terms.`
6. Show `lastUpdated` on the pricing section.
7. Link “View price list” to the original flyer image in an accessible lightbox.
8. Never infer or invent a price from an image; if unreadable, use “Price on request” until the client confirms.

---

## Appendix F — Old → new URL map

| Old (Framer) | New (Chinese) | New (English) |
|---|---|---|
| `/` | `/` | `/en` |
| `/about-us` | `/about` | `/en/about` |
| `/services` | `/services` | `/en/services` |
| `/contact-us` | `/contact` | `/en/contact` |
| `/coming-soon` | `/` | `/en` |

---

*End of implementation plan.*
