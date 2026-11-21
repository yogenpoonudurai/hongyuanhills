# Hong Yuan Hills

Bilingual (Chinese / English) marketing site for Hong Yuan Hills (宏缘宝地), a memorial park and columbarium in Kluang, Johor.

**Status:** Phase 4 — all requested bilingual pages are built: home, about, grounds, columbarium, halls, funeral services, pre-planning, contact, ancestral tablets (coming soon) and legal pages.
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

## Run locally

### Full local preview (recommended)

```sh
npm install
npm run preview:local
```

Open **http://localhost:8788**.

This builds with Cloudflare’s public Turnstile test site key and starts the Cloudflare Pages runtime, so the static pages **and** the `/api/lead` form endpoint work. `.dev.vars` is configured with the test Turnstile secret, `EMAIL_TRANSPORT=noop` and a test inbox, so submitting the form shows the success state but sends no real email.

### Hot-reload UI only

```sh
npm run dev
```

Open http://localhost:3000. This is the fastest way to edit UI, but Cloudflare Pages Functions are not available, so `/api/lead` will not work. Use the full preview to test forms.

### Reuse an existing build

```sh
npm run dev:pages
```

Serves the existing `out/` on http://localhost:8788. Run `npm run preview:local` again after changing content.

### Real email locally

Edit `.dev.vars`:

```bash
EMAIL_TRANSPORT=resend
RESEND_API_KEY=re_...
FROM_EMAIL=website@your-verified-domain.com
LEAD_NOTIFICATION_EMAIL=your-inbox@example.com
```

Use a real Turnstile site key in the build command and the matching secret in `.dev.vars`.

Run `npm run build` (without the test-key env) before running Playwright or producing the deployment artifact.

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


## Theme and fonts

- **Ivory** is the default theme; **Sanctuary** is a cooler, mistier premium variant. Toggle it in the footer; the choice persists in `localStorage`.
- The Sanctuary palette lives in `app/globals.css` under `html[data-theme="sanctuary"]`.
- Chinese uses a self-hosted, subset **LXGW WenKai** (Kaiti-style, SIL OFL 1.1). The file is `assets/fonts/LXGWWenKai-Regular.woff2`; the licence is `public/fonts/OFL-LXGWWenKai.txt`.
- The subset currently covers every CJK character in the source. If new Chinese copy introduces new characters, re-subset the font before release; otherwise those glyphs fall back to the system Kaiti stack.
- English display/body fonts are self-hosted Cormorant Garamond and Source Sans 3 via `next/font/google`.
- If the client supplies a specific licensed font, replace `cnFont` in `lib/fonts.ts` and keep the same `--font-cn` variable.

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
- Built routes in both languages: `/`, `/about`, `/services/feng-shui-grounds`, `/services/columbarium`, the four hall detail pages, `/services/funeral-services`, `/services/ancestral-tablets`, `/pre-planning`, `/contact`, `/privacy-policy` and `/terms`.
- The home booking form and the contact/pre-planning forms use `/api/lead`; the ancestral tablets page uses the same endpoint in notify mode.
- Hall videos currently show a “coming soon” poster until YouTube IDs are supplied.
- Remaining: final YouTube IDs, approved price figures, client/legal review of the draft privacy policy and terms, Cloudflare deployment and DNS cutover.
- `/services` and the old Framer URLs redirect to the closest equivalent.
