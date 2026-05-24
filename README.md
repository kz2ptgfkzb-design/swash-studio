# Swash

> Add a swash to it.

A boutique website-build studio site — with a multi-step intake brief
as the conversion mechanism, three industry-distinct live demo
brands, and an Awwwards-tier interaction layer.

Built with **Next.js 14** (App Router), **Tailwind**, **Framer Motion**,
**Lenis** smooth-scroll. **Bricolage Grotesque** display, **Inter
Tight** body, **Cormorant Garamond** for one of the demos, **JetBrains
Mono** for labels.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

Requires **Node 18.17+**. Production build:

```bash
npm run build && npm run start
```

---

## The fastest way to host this — **Vercel (5 minutes, free)**

Vercel is built by the team that makes Next.js. Push to GitHub,
connect, deploy. Free tier covers anything short of millions of
visits. SSL, global CDN, deploy previews, all included.

### Step-by-step:

```bash
# 1. Create a GitHub repo (https://github.com/new), call it whatever
#    you want — say "swash-studio"

# 2. Push the project up
cd ~/Desktop/swash-studio                   # (after the rename step below)
git add -A
git commit -m "Initial commit: Swash"
git remote add origin git@github.com:<YOUR-USERNAME>/swash-studio.git
git branch -M main
git push -u origin main

# 3. Go to https://vercel.com/new
#    - Sign in with GitHub
#    - Import your "swash-studio" repo
#    - Click Deploy (defaults are correct for Next.js)

# 4. Done. Your URL: https://swash-studio-<slug>.vercel.app
#    (Vercel auto-builds on every git push from then on.)
```

### Attaching `swash.studio`:

1. In the Vercel dashboard, open your project → **Settings → Domains**
2. Add `swash.studio` and `www.swash.studio`
3. Vercel shows you two DNS records (an `A` record and a `CNAME`)
4. Open your domain registrar (Namecheap / GoDaddy / Cloudflare / wherever
   you bought it) → DNS settings → add those two records exactly as shown
5. Wait 5–60 minutes for DNS to propagate
6. Vercel auto-provisions an SSL certificate

That's it. The site is live on your domain with HTTPS.

### Auto-deploys

Every `git push` to `main` triggers a production build. Every PR gets
its own preview URL. There is no faster web hosting setup for a
Next.js site.

---

## Alternative hosts (also fine)

| Host | Pros | Cons |
|---|---|---|
| **Vercel** ★ | Made by Next.js team. Zero config. Free generous tier. | Bandwidth-billed past free tier. |
| **Netlify** | Strong free tier, good DX. | Next.js support is good but second-class to Vercel. |
| **Cloudflare Pages** | Free, fast global CDN. | Next.js setup has gotchas (use `@cloudflare/next-on-pages`). |
| **Render** | One-click Next.js. | Cold starts on free tier. |
| **Your own VPS** (DigitalOcean, Linode, Hetzner) | Full control, ~$5/mo. | You handle SSL, deploys, scaling. |

If you don't want to think about hosting: **Vercel**. End of decision.

---

## The three live demos

These live at `/preview/*` and **demonstrate the studio's range**.
Each is a fully clickable, distinct brand — different industry,
palette, type system, and layout.

| Route | Brand | Industry | Stack |
|---|---|---|---|
| `/preview/pipeline` | Pipeline & Co. | Plumber / home services | Navy + safety yellow, Bricolage Bold |
| `/preview/ember-table` | Ember & Table | Wood-fired restaurant | Cream + ember orange, Cormorant Garamond italics |
| `/preview/overlay` | Overlay | B2B SaaS analytics | Paper + cobalt blue, Inter Tight + Mono |

Open the **`/preview`** index to browse all three with previews and
palette swatches.

---

## Project structure

```
app/
  layout.tsx                ← root (fonts, cursor, preloader, nav)
  template.tsx              ← page transition curtain
  globals.css               ← tokens (dark-first), utilities, cursor styles
  page.tsx                  ← homepage (12 sections)
  brief/
    page.tsx                ← 5-step intake form + risk-reducer sidebar
    thanks/page.tsx
  work/
    page.tsx                ← full case-study grid
    [slug]/page.tsx         ← per-case-study detail (auto-generated)
  services/page.tsx         ← all six services with deliverables
  process/page.tsx          ← 6-stage process + 4 written promises
  about/page.tsx            ← studio statement + team
  faq/page.tsx              ← grouped FAQ (pricing / process / fit)
  not-found.tsx
  preview/
    page.tsx                ← demo index
    pipeline/page.tsx       ← plumber demo
    ember-table/page.tsx    ← restaurant demo
    overlay/page.tsx        ← SaaS demo

components/
  NavBar.tsx                ← sticky nav (hides on /preview/*)
  Footer.tsx                ← multi-column footer
  Hero.tsx                  ← homepage hero w/ spotlight + mask reveals
  SwashMark.tsx             ← animated calligraphic mark (4 colour variants)
  Logo.tsx                  ← brand lockup
  CursorTrail.tsx           ← canvas-rendered ink trail
  Preloader.tsx             ← first-visit curtain reveal
  HeroSpotlight.tsx         ← cursor-following radial glow
  TiltCard.tsx              ← 3D perspective tilt + glare
  Magnetic.tsx              ← spring-based magnetic wrapper
  RevealText.tsx            ← word/char mask-clip reveals
  VelocityMarquee.tsx       ← scroll-velocity-skewed marquee
  Counter.tsx               ← in-view counter
  ValueProps.tsx
  ServicesOverview.tsx
  WorkPreview.tsx
  WorkCard.tsx
  HowItWorks.tsx
  ProofMetrics.tsx          ← live metric counters
  IndustriesGrid.tsx
  PricingPhilosophy.tsx
  Testimonials.tsx
  FaqTeaser.tsx
  BriefCtaSection.tsx
  BriefIntakeForm.tsx       ← multi-step form state machine
  SmoothScroll.tsx          ← Lenis bootstrap
  Reveal.tsx                ← scroll-reveal w/ deep-link fallback

data/
  work.ts                   ← 6 case studies + form options
  services.ts               ← 6 service specs
  faq.ts                    ← 4 grouped FAQ sections
```

---

## Customizing

### Brand it

Search-replace `Swash` → your brand name across the codebase. Replace
the **SwashMark.tsx** SVG paths with your own mark. Update metadata in
`app/layout.tsx`.

### Recolor

Two synchronized places:

1. `app/globals.css` — CSS variables on `:root`
2. `tailwind.config.ts` — `paper`, `ink`, `lime`, `ink_red`, `gold` ramps

Change the values, not the names — components reference the tokens
generically.

### Reword the form

Every chip option (industry, goal, features, timeline, budget, brand
status) lives in `data/work.ts`. Edit there, the form picks it up.

### Replace the case studies

`data/work.ts` `WORK` array. Each entry includes the full case-study
content (challenge, approach, outcome, testimonial, team, metrics).

### Wire the brief form to a real backend

`components/BriefIntakeForm.tsx` → `handleSubmit`. Currently saves to
sessionStorage and routes to `/brief/thanks`. Replace with a `fetch`
to your endpoint:

```ts
await fetch('/api/brief', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});
router.push('/brief/thanks');
```

Add an API route at `app/api/brief/route.ts` to send the email (via
Resend, Postmark, or SendGrid).

### Customize the demos

Each demo at `/preview/*` is a single self-contained file. Open
the corresponding `page.tsx`, change the strings, swap the color hex
values inline. They share zero state with the main Swash brand.

---

## The interaction layer

Every Awwwards-tier touch is documented in code:

| File | Effect |
|---|---|
| `components/CursorTrail.tsx` | Canvas-rendered calligraphic ink trail that follows the cursor with spring-chase physics. Hidden on touch + reduced motion. |
| `components/Preloader.tsx` | Full-screen dual-curtain on first visit. Plays once per session (cleared via `sessionStorage`). |
| `components/HeroSpotlight.tsx` | Cursor-tracked radial gradient under the hero — lime spotlight + complementary red glow. |
| `components/TiltCard.tsx` | Wrap any card. Perspective tilt + cursor-tracked glare highlight. |
| `components/Magnetic.tsx` | Wrap any CTA. Spring-physics magnetic pull toward the cursor. |
| `components/RevealText.tsx` | Word- or char-level mask-clip reveals (slide up from below). |
| `components/VelocityMarquee.tsx` | Scroll-velocity-skewed marquee using Framer's `useVelocity`. |
| `app/template.tsx` | Dual-curtain page-transition sweep between routes. |

All work together — turn off any layer if you want a quieter site.

---

## Browser support

Chrome / Safari / Firefox / Edge — last 2 versions. Lenis falls back
gracefully on unsupported. Reduced-motion preferences are respected
(cursor trail + preloader skip).

---

## License

Single-use commercial license. Modify freely. Don't redistribute as
a competing template. Multi-site or agency license — reach out.
