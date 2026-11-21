# Hong Yuan Hills

Bilingual (Chinese / English) marketing site for Hong Yuan Hills (宏缘宝地), a memorial park and columbarium in Kluang, Johor.

**Status:** Phase 1 — scaffold, design tokens, bilingual shell and home page.
**Plan:** see [`IMPLEMENTATION.md`](./IMPLEMENTATION.md).

## Decisions

- No CMS. Content lives in the repository as typed TypeScript and MDX.
- No WordPress, Framer or VPS.
- Static-export Next.js deployed to Cloudflare Pages (free tier).
- Forms use one Cloudflare Pages Function at `/api/lead` (Turnstile + Resend).
- Chinese at `/`; English at `/en`.
- “From RM” prices are `null` until the client approves figures; the UI shows “Price on request”.
- WhatsApp/phone values come from environment variables; `lib/contact.ts` has temporary live-number fallbacks.

## Requirements

- Node.js 22 LTS
- npm

## Local development

```sh
npm install
npm run dev
```

## Build and preview

```sh
npm run build      # validates content, generates sitemap, outputs to out/
npm run preview    # serves out/ on http://localhost:3000
```

The build is a fully static export (`next.config.ts` → `output: "export"`). There is no Next.js server runtime.

## Checks

```sh
npm run lint
npm run typecheck
npm run validate:content
npm run test:unit  # Vitest: /api/lead contract
npm run test:e2e   # Playwright: requires a built out/ directory
```

Playwright covers both locales, mobile overflow, the mobile drawer, image loading, contact CTAs and axe accessibility checks.

## Environment

Copy `.env.example` to `.env.local` and fill in what the client supplies:

- WhatsApp numbers (general, booking, emergency)
- 24-hour and office phone numbers
- email address
- Turnstile keys (when forms ship)
- Resend key and lead inbox (when forms ship)
- optional analytics IDs

`NEXT_PUBLIC_*` values are visible in the browser and require a rebuild when changed. Server secrets belong in Cloudflare Pages environment variables, never in the repo.

## Cloudflare Pages deployment

1. Create a Pages project connected to the Git repository.
2. Build command: `npm run build`.
3. Build output directory: `out`.
4. Set `NODE_VERSION=22` and the environment variables.
5. Add custom domains `hongyuanhills.com` and `www.hongyuanhills.com`.
6. Keep the domain registered at GoDaddy, but point its nameservers to Cloudflare for the apex domain. Export and preserve MX/SPF/DKIM/DMARC records before switching.

Local Pages Functions preview:

```sh
npm run build
npx wrangler pages dev out
```

Copy `.dev.vars.example` to `.dev.vars` for local function secrets.

For local form testing, set `NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA` in `.env.local` before building, and set `TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA` in `.dev.vars`. These are Cloudflare's public always-pass test keys. Use `EMAIL_TRANSPORT=noop` so no real emails are sent.

The home page includes the booking/enquiry form at `#book`. Production requires real Turnstile keys, a verified Resend domain, and `ALLOWED_ORIGINS` set to the live domain.

## Repository notes

- `references/` is ignored because it contains 1.3 GB of client source media.
- Optimised public images live in `public/images/` as `.jpg` + `.webp`.
- Content lives in `content/`; update both `zh` and `en` values.
- Legal pages, hall detail pages, forms and the remaining service pages are later phases.
