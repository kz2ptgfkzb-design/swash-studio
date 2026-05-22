# Aurora Editions — Winter 26

A premium "seasonal product launch / changelog" template for SaaS and platform teams.
Built with **Next.js 14 (App Router)**, **Tailwind CSS**, **Framer Motion**, and
**Lenis** smooth-scroll.

Ships with a documented data layer so you can drop your own brand, releases, and
categories into the same shell in an afternoon.

---

## Quick start

```bash
# 1. Install deps
npm install

# 2. Run dev server
npm run dev

# 3. Open
open http://localhost:3000
```

Requires Node 18.17 or later.

## Build for production

```bash
npm run build
npm run start
```

Or deploy directly to Vercel / Netlify / any Node host.

---

## What is in the box

| Page                 | Path                  | Purpose                                                    |
| -------------------- | --------------------- | ---------------------------------------------------------- |
| Homepage             | `/`                   | Hero, marquee, intro, category showcase, spotlight, CTA    |
| Features directory   | `/features`           | Filterable, searchable grid of every release               |
| Feature detail page  | `/features/[slug]`    | Hero, body, highlights, related releases                   |
| Changelog            | `/changelog`          | Weekly entries with new / improved / fixed / deprecated    |
| About                | `/about`              | Statement, timeline, credits, what is next                 |
| 404                  | `/not-found`          | On-brand "off the path" page                               |

## Tech stack

- **Next.js 14** — App Router, React Server Components, static generation
- **Tailwind CSS 3.4** — Custom design tokens for color, type, motion
- **Framer Motion 11** — Scroll-driven animation, layout transitions
- **Lenis** — Premium smooth-scroll feel
- **TypeScript** — Strict, end-to-end

No CMS dependency. All content lives in `data/`.

---

## Customizing

### 1. Brand it

Open `components/Logo.tsx` and replace the SVG mark and wordmark.
Set the brand name everywhere else by find-replacing "Aurora" and "Winter 26".

The site title, OG metadata, and footer year live in:
- `app/layout.tsx` — site-wide metadata
- `app/page.tsx` — homepage data
- `components/Footer.tsx` — footer copy

### 2. Recolor it

The color system lives in **two places** that stay in lockstep:

- `app/globals.css` — CSS variables under `:root`
- `tailwind.config.ts` — `theme.extend.colors`

Adjust the three glow accents (`glow.lime`, `glow.violet`, `glow.aqua`)
and the dark `ink` ramp. Everything in the UI is derived from these.

### 3. Replace the content

Every release shown anywhere on the site lives in `data/features.ts`.
Each entry has:

```ts
{
  slug: 'compose-studio',
  name: 'Compose Studio',
  tagline: '...',
  summary: '...',
  category: 'storefront',          // see CATEGORIES at top of file
  status: 'shipping',              // | 'rolling-out' | 'preview'
  hero: {
    eyebrow: 'Storefront / Build',
    title: 'The page builder...',
    body: 'Compose Studio lets...',
  },
  highlights: [{ title, body }, ...],
  meta:       [{ label, value }, ...],
  related:    ['mirror-mode', 'pinpoint-search'],
}
```

Add, remove, or reorder freely. The features index, detail pages, sitemap,
and homepage previews all read from this single source.

### 4. Replace the per-feature visuals

The animated card visuals are in `components/FeatureCard.tsx` inside
`FeatureVisual()`. Each is a small SVG / motion composition keyed by the
feature `slug`. To add your own, add a new `case 'your-slug':` branch.

The default fallback (a simple ring) renders for any feature without a
custom visual.

### 5. Tune the motion

Scroll smoothing lives in `components/SmoothScroll.tsx`. Adjust `duration`
and `wheelMultiplier` to taste.

Section reveals use the `<Reveal>` component (`components/Reveal.tsx`).
The base variants control distance, duration, and easing for the whole
site.

### 6. Plug in real analytics

Add your analytics script in `app/layout.tsx` inside `<body>`, or wrap
the `Footer` with a `<script>` element. The template is unopinionated —
GA4, Plausible, PostHog, and Vercel Analytics all drop in cleanly.

---

## File map

```
app/
  layout.tsx              ← root layout + fonts
  globals.css             ← tokens, base styles, utilities
  page.tsx                ← homepage
  not-found.tsx           ← global 404
  features/
    page.tsx              ← filterable directory
    [slug]/
      page.tsx            ← detail page
      not-found.tsx       ← release 404
  changelog/page.tsx      ← weekly log
  about/page.tsx          ← colophon

components/
  NavBar.tsx              ← sticky top nav
  Footer.tsx              ← multi-column footer + display marquee
  SideNav.tsx             ← scroll-active section nav (homepage)
  Hero.tsx                ← parallax hero
  Marquee.tsx             ← scrolling ticker strip
  IntroSection.tsx        ← intro + stats
  CategoryShowcase.tsx    ← tabbed category preview
  SpotlightSection.tsx    ← single-release headliner
  PrinciplesSection.tsx   ← long-form sticky principles
  CtaSection.tsx          ← closing CTA card
  FeatureCard.tsx         ← release card + animated visual
  FeatureHero.tsx         ← release detail page hero
  FeaturesBrowser.tsx     ← directory page client logic
  Logo.tsx                ← brand mark
  Reveal.tsx              ← scroll-reveal primitive
  ScrollProgress.tsx      ← top progress bar
  SmoothScroll.tsx        ← Lenis bootstrap

data/
  features.ts             ← all releases + categories
  changelog.ts            ← changelog entries + tag styles

lib/
  utils.ts                ← cn() + slugify()
```

---

## Browser support

- Chrome / Edge — last 2 versions
- Safari 15+
- Firefox — last 2 versions
- Mobile Safari / Chrome Android — latest

Lenis is feature-detected; it degrades gracefully to native scroll on
browsers that do not support `wheel` smoothing.

---

## License

Single-site commercial license:

- ✅ Use on one client site you build, or one product you ship.
- ✅ Modify the source freely.
- ❌ Do not redistribute the unmodified source as a competing template.
- ❌ Do not resell as-is on theme marketplaces.

Need a multi-site or agency license? Reach out via the listing page.

---

## Credits

Type — Inter Tight, Inter, JetBrains Mono (Google Fonts).
Motion — Framer Motion + Lenis.
Images — None bundled; use your own or pull from a licensed source.

Built as a complete, opinionated foundation for shipping seasonal
release pages. Rebrand, reword, and ship.
