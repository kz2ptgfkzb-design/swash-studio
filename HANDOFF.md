# Swash Studio — project handoff

Hand this entire file to a fresh Claude session along with the message:
"Read HANDOFF.md before doing anything. The project is at `~/Desktop/swash-studio`."

That's all the context the next session needs.

---

## What this is

A premium boutique web-studio marketing site. Single user/owner (Jordan Marcus,
solo founder presenting as a small team). Built on top of a Next.js 14 template
called "Swash" — kept as the working brand name for now.

Status: deployed to Vercel (preview only — production URL not yet shared).
Domain not yet attached. Code lives at:

- Local: `~/Desktop/swash-studio`
- GitHub: `github.com/kz2ptgfkzb-design/swash-studio` (private/public — confirm)
- Vercel project: `swash-studio` under team "Jordan Marcus' projects" (Hobby tier)

---

## Stack

- **Next.js 14.2.5** (App Router)
- **React 18.3**
- **Tailwind 3.4** — design tokens in `tailwind.config.ts` + `app/globals.css`
- **framer-motion 11** — all the scroll + reveal + magnetic / tilt motion
- **lenis 1.1** — programmatic smooth scroll only (native wheel)
- **resend 6** — brief form delivery
- **TypeScript 5.5** — strict

No CSS-in-JS, no UI library, no state-management library — just React + Tailwind.

---

## Local dev

```bash
cd ~/Desktop/swash-studio
npm install        # if node_modules is missing
npm run dev        # http://localhost:3000
npm run build      # production build
npx tsc --noEmit   # type-check
```

Node 18.17+ required.

---

## Deploy workflow

Vercel auto-deploys on every push to `main`. The chain is:

```
Claude edits files locally → user runs git add/commit/push → Vercel builds → live in ~90s
```

The push command pattern after Claude makes changes:

```bash
cd ~/Desktop/swash-studio
git add -A
git commit -m "describe the change"
git push
```

Vercel webhook fires automatically — no Vercel CLI needed.

---

## Environment variables

Configured in two places (must match):

1. **Local:** `.env.local` (gitignored — never commit)
2. **Production:** Vercel dashboard → Project → Settings → Environment Variables

| Variable | Purpose | Current value |
|---|---|---|
| `RESEND_API_KEY` | Resend API key for sending the brief intake email | `re_...` (rotate any time it leaks) |
| `BRIEF_TO_EMAIL` | Where briefs land | `jordanmarcusproductions@gmail.com` |
| `BRIEF_FROM_EMAIL` | From address | `Swash <onboarding@resend.dev>` (Resend sandbox; works only to verified Resend account email until a custom domain is verified) |

**Once the user verifies a real domain in Resend** (Domains → Add → DNS records),
update `BRIEF_FROM_EMAIL` to `Swash <briefs@theirdomain.com>` and emails can
be sent to any recipient.

---

## File map (the parts that matter)

### App routes

```
app/
  layout.tsx            Root layout: fonts, SmoothScroll, AmbientFluid, CursorTrail,
                        CursorLabel, Preloader, NavBar, main, Footer, SoundToggle
  template.tsx          Page-transition curtain (3 rotated bands sweep across between routes)
  page.tsx              Homepage — composes 15 sections in order
  globals.css           Design tokens (CSS vars), utility classes (.btn, .chip,
                        .input-field, etc.), and the `--ambient-color` var

  about/page.tsx        /about — studio statement, process timeline, 6 generic role tiles
                        (no named individuals — all framed as "skilled team")
  brief/page.tsx        /brief — 5-step intake form host
  brief/thanks/page.tsx Post-submit thanks page
  faq/page.tsx          Full grouped FAQ (pricing / process / after-launch / fit)
  journal/page.tsx      Journal index
  journal/[slug]/page.tsx  Per-essay detail
  process/page.tsx      Full process page (7 stages — adds II.5 "change requests")
  services/page.tsx     6 services with deliverables
  work/page.tsx         Case-study grid (currently fictional — see "Trust cleanups")
  work/[slug]/page.tsx  Per-case-study detail
  not-found.tsx         404

  preview/page.tsx      Index of the 4 demo brands
  preview/pipeline/page.tsx       Demo 1 — Plumber (navy + safety yellow)
  preview/ember-table/page.tsx    Demo 2 — Wood-fired restaurant (cream + ember)
  preview/overlay/page.tsx        Demo 3 — B2B SaaS (paper + cobalt)
  preview/holm/page.tsx           Demo 4 — Boutique real-estate (cream + coral)

  api/brief/route.ts        POST handler — receives form payload, emails via Resend
  api/test-email/route.ts   GET — one-shot Resend smoke test. Visit to verify
                            credentials. Safe to delete once verified.
```

### Components (custom — built fresh for this site)

```
components/
  AmbientFluid.tsx          Site-wide fixed WebGL fluid background. Per-route
                            palette (HOME/BRIEF/WORK/PROCESS/SERVICES/ABOUT/FAQ/JOURNAL)
                            from lib/ambient-palette.ts. 30fps throttled.
                            Publishes current colour to --ambient-color CSS var.
                            Skipped on /preview/*.

  ChapterNav.tsx            Sticky pill rail that appears after the hero on /.
                            8 chapter labels (Why Swash / Studio Lab / Services /
                            Editions / Work / Process / Pricing / Questions).
                            IntersectionObserver-driven active highlight with
                            layoutId pill animation.

  CursorTrail.tsx           Canvas 2D ribbon trail + head dot. Reads the same
                            ambient palette as AmbientFluid so colour transitions
                            with scroll/route. Goes idle (zero per-frame work)
                            when cursor is stationary and chain has settled.
                            Skips elementFromPoint during fast scroll.

  CursorLabel.tsx           Small floating "open/view/drag/send" label that follows
                            the cursor over data-cursor elements.

  Preloader.tsx             First-visit dual-curtain. Plays once per session
                            via sessionStorage.

  NavBar.tsx                Fixed top nav, transparent-to-blurred on scroll.
                            Hidden on /preview/*.

  NowIndicator.tsx          Pulse + rotating "now: ..." line in the navbar.
                            Cycles through real-feeling work-in-progress strings.

  SoundToggle.tsx           Bottom-right corner sound on/off (Web Audio synth).
                            Off by default, persisted in localStorage.

  Hero.tsx                  Homepage hero. "BRIEF INTAKE OPEN" lime pill, big
                            "Add a swash to it." headline, two CTAs, scroll cue.
                            No more "EDITION · SUMMER '26" segment (removed).

  HeroFluid.tsx             ⚠️ DEPRECATED — replaced by AmbientFluid. Keep file
                            for now in case revert is needed.

  HeroMesh.tsx              ⚠️ DEPRECATED — older blob-mesh hero bg.

  HeroSpotlight.tsx         ⚠️ DEPRECATED — local cursor spotlight.

  StudioLab.tsx             "A brand that responds." section. Sculptable swash
                            with chip controls (Voice / Drift / Palette).
                            Cursor pulls midpoint with spring. IntersectionObserver
                            pauses sine ticker when off-screen.

  EditionsCarousel.tsx      Horizontal keyboard-navigable carousel of the 4 demo
                            brands. Arrow keys, snap-scroll, tab indicators.

  EverySiteShipsWith.tsx    12-cell icon+label grid. "Twelve things, without asking."

  ProcessScrubber.tsx       Pinned scroll-driven 6-stage process. Each stage has
                            its own mini-mockup on the right (BriefFormMockup,
                            VideoDemoMockup, ChangeRequestsMockup, BrandSystemMockup,
                            MotionTimelineMockup, LaunchedMockup).

  ProofMetrics.tsx          ⚠️ Contains fictional stats (127 / 6 / 98% / 5★).

  Testimonials.tsx          ⚠️ Contains fictional testimonials.

  WorkPreview.tsx           Homepage 4-card work preview.

  WorkCard.tsx              Individual case-study card.

  ValueProps.tsx            "Three things we do differently" section.

  ServicesOverview.tsx      6-service grid.

  IndustriesGrid.tsx        Industries we work with.

  PricingPhilosophy.tsx     4-tier pricing shape (no actual prices).

  FaqTeaser.tsx             Homepage 5-question FAQ.

  BriefCtaSection.tsx       Final homepage CTA.

  HowItWorks.tsx            ⚠️ DEPRECATED — superseded by ProcessScrubber on the
                            homepage. Still exists; not imported anywhere.

  VelocityMarquee.tsx       Industry-name marquee, bold sans, scroll-velocity skewed.

  BriefIntakeForm.tsx       The 5-step form. Industry / The build / Timeline & budget /
                            Brand & references / Contact. References field allows
                            up to 4 URLs with notes.

  SwashMark.tsx             The calligraphic S brand mark (animated path-draw).

  Logo.tsx                  Brand lockup (mark + wordmark).

  RevealText.tsx            Word/char mask-clip reveals.
  Reveal.tsx                Scroll-reveal wrapper with 1.4s forced fallback.
  Counter.tsx               In-view counter.
  Marquee.tsx               Older simpler marquee (used elsewhere).
  Magnetic.tsx              Spring-magnetic wrapper for CTAs.
  TiltCard.tsx              3D perspective tilt + glare.
  ScrollProgress.tsx        (Probably unused.)
  SmoothScroll.tsx          Lenis bootstrap (smoothWheel: false — only programmatic).

  preview/PreviewUI.tsx     Shared toolkit for the 4 demos:
                            ScrollAwareNav, FullBleedHero, ParallaxImage,
                            HoverMagnify, MagneticHover, ScrollClipReveal,
                            SectionFadeIn, useElapsed.
```

### Data

```
data/
  work.ts        6 case studies + form options (INDUSTRIES, GOALS, FEATURES_NEEDED,
                 TIMELINES, BUDGETS, BRAND_STATUS). Form chips read from here.
  services.ts    6 service specs.
  faq.ts         4 grouped FAQ sections (includes the "retainer · 3 major
                 tweaks/month + unlimited minor fixes" answers).
  journal.ts     Essay content.
  photos.ts      Curated Unsplash photo URLs. License: Unsplash (free commercial).
                 All photo IDs HEAD-200 verified.
```

### Lib

```
lib/
  utils.ts             cn() (clsx + tailwind-merge) and slugify().
  ambient-palette.ts   Single source of truth for the 8 per-route palettes
                       used by AmbientFluid AND CursorTrail. Also exports
                       pickFromPalette() (mirrors GLSL) and scrollProgress().
```

---

## Design decisions worth knowing

1. **Site-wide WebGL smoke** (`AmbientFluid`) sits behind every page (skipped on
   `/preview/*`). It's fixed-position, z-index 0, runs at 30fps. Each route picks
   a 5-stop palette; scroll progress walks through the stops. Sections layer on
   top with `relative z-10` and most have translucent dark backgrounds
   (`bg-paper-100/55` to `/75`) so the smoke bleeds through.

2. **The cursor trail and the smoke share `lib/ambient-palette.ts`** — they're
   independently computed from the same palette + scroll position, so they're
   always visually in lockstep. Cursor smoothly lerps to the target colour.

3. **The body has no background** (set in `globals.css`); the canvas (z-0) is
   the visible page colour. Html root still has `bg-paper-100` as the fallback
   if WebGL fails.

4. **Scroll perf:** Lenis is now programmatic-only (`smoothWheel: false`).
   Native wheel scrolling is GPU-accelerated; JS-driven wheel smoothing was
   causing skippy frames. AmbientFluid throttled to 30fps. CursorTrail short-
   circuits its entire draw loop when idle.

5. **No em-dashes or en-dashes anywhere.** All swept to regular hyphens. Don't
   reintroduce `—` or `–` — user's preference.

6. **"Team" framing is anonymized.** The site reads as a "skilled in-house
   team of web developers and brand designers." No named individuals appear
   anywhere. Don't add invented names.

7. **Brief flow:** form (`BriefIntakeForm`) → POST `/api/brief` → Resend →
   `jordanmarcusproductions@gmail.com`. `replyTo` is set to the prospect's email.
   Dev mode (no `RESEND_API_KEY`) logs to terminal and returns success.

8. **Retainer story:** 30 days post-launch polish included free. After that,
   monthly retainer covers up to **3 major tweaks/month** + **unlimited minor
   fixes**. Documented in `data/faq.ts` and the homepage FaqTeaser.

9. **Video-demo promise:** Within 48 hours of brief submission, the studio
   ships a recorded video walkthrough of a real working preview. Unlimited
   revisions until sign-off. This is the studio's core promise — wired into
   the brief page, ProcessScrubber, FAQ, and BriefCtaSection.

---

## Pending cleanups (the trust gap)

These are tracked but NOT YET done. The site still contains fictional content
that will read as fake if a prospect looks closely:

- [ ] Hero subtitle still says **"127 sites shipped · 6 industries · 1 standard"** — fictional.
- [ ] `ProofMetrics` section: **127 / 6 / 98% / 5★ across 41 reviews / Since 2024** — all fictional.
- [ ] `ProofMetrics` recent-clients list — fictional names (Apex Mechanical etc.).
- [ ] `Testimonials.tsx` — 3 fictional quotes.
- [ ] `/work` case studies in `data/work.ts` — 6 fictional projects.
- [ ] No `/privacy` or `/terms` page — legally needed since the form collects PII.
- [ ] No favicon.ico in `public/`.
- [ ] No `robots.txt` or `sitemap.xml`.
- [ ] Footer placeholder links / fictional address ("1814 Valencia, SF" in Holm demo is fine — that's a demo).
- [ ] "Swash" is template default — user may want to rename to their real brand.

**Recommended path:**
1. Replace fictional numbers with "Launching with four sample builds" framing OR with real numbers once they exist.
2. Add `/privacy` + `/terms` boilerplate (claude can generate, defensible for US/EU).
3. Add a real founder bio paragraph to `/about` (user is solo, but presents as team).
4. Add favicon, robots.txt, sitemap.xml.

---

## Completed work (chronological — all 36 tasks)

Big-picture: the project went from raw template → deployed-on-Vercel premium
studio site over one extended session. Major milestones:

1. **Visual upgrades** — WebGL fluid hero, swash-stroke page transitions,
   Studio Lab interactive section, process scrubber timeline, ambient sound
   system, live "Now" indicator, cursor state labels, image-flash marquee.
2. **Cursor trail rebuild** — smooth bezier ribbon, no 360s, contextual colour.
3. **Demo polish** — real Unsplash images verified, premium ScrollAwareNav +
   FullBleedHero + ParallaxImage + HoverMagnify treatment across all 4 demos.
4. **Process pivot to "video demo in 48 hours"** — copy updated across brief,
   process, FAQ, CTA. Reference field added to step 4 of the form.
5. **Shopify Editions inspiration** — sticky scroll-spy chapter nav, Editions
   carousel, every-site-ships-with grid, edition switcher (→ simplified to
   just "BRIEF INTAKE OPEN" pill).
6. **Full-page smoke** — moved AmbientFluid to layout, per-page palettes,
   stripped all cream blocks so smoke bleeds through.
7. **Brief form contrast fix** — cream-on-cream chips fixed to lime-on-dark.
8. **Anonymized team** — removed named individuals, added retainer info.
9. **Stage mockups** — replaced glyph cards on process scrubber with 6 concrete
   UI mini-mockups (BriefForm, VideoDemo, ChangeRequests, BrandSystem,
   MotionTimeline, Launched).
10. **Marquee cleanup** — removed swatch blocks + glyphs, bold sans only.
11. **ChapterNav restyle** — bold labels, no "01 · " prefixes.
12. **Cursor follows smoke** — shared palette via `lib/ambient-palette.ts`.
13. **Scroll perf pass** — Lenis lerp-mode → native, AmbientFluid 30fps,
    CursorTrail idle short-circuit, backdrop-blur removed from large surfaces.
14. **Em/en-dashes stripped** — all `—` and `–` → `-` across source.
15. **Deployed to Vercel** — Resend wired, env vars in place, brief form working.

Full 36-task list is in the task tracker (just for reference — they're all
[completed]).

---

## How to continue work in the next chat

When you start a new chat, paste this into your first message:

> Read `~/Desktop/swash-studio/HANDOFF.md` first. The project is deployed on
> Vercel. I want to [your next request].

Common next requests:

- "Strip the fictional stats and replace with launching-soon framing"
- "Add /privacy and /terms pages with legally defensible boilerplate"
- "Add a real founder bio to /about"
- "Generate a favicon + robots.txt + sitemap.xml"
- "Rename Swash to [my real brand]"
- "Add analytics (Plausible / Vercel / GA4)"
- "Connect the brief form to also drop into Slack / Airtable / Notion"
- "I want to verify [my domain] in Resend — walk me through it"
- "Help me attach [domain.com] to the Vercel project"

The next Claude should:
- Edit files in `~/Desktop/swash-studio`
- Tell the user the exact `git add / commit / push` commands to ship the change
- Never paste secrets into chat
- Type-check with `npx tsc --noEmit` before declaring done
- Trust that this handoff is the source of truth for project state

---

## Known quirks

- **HeroFluid.tsx, HeroMesh.tsx, HeroSpotlight.tsx, HowItWorks.tsx** are dead
  files (no longer imported). Safe to delete in a cleanup pass.
- **`api/test-email/route.ts`** is a smoke-test endpoint. Delete once email is
  verified working in prod.
- **`.env.local`** must exist locally with the three vars to dev the brief
  form. It's gitignored, so a fresh clone needs it recreated.
- **Per-deployment Vercel URLs are auth-protected** by default. The user must
  share the production URL (or disable Vercel Authentication in Deployment
  Protection settings) for external audits.
- **The `127 sites shipped` text in the Hero** lives at
  `components/Hero.tsx` around line 51. The fictional ProofMetrics numbers
  live in `components/ProofMetrics.tsx`. The fictional case studies live in
  `data/work.ts`. The fictional testimonials live in `components/Testimonials.tsx`.
  These are the four spots to address for the "trust pass."

---

End of handoff. Good luck.
