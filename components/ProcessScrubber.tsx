'use client';

import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';

const STAGES = [
  {
    n: '01',
    title: 'Brief',
    line: 'Five minutes. No call required.',
    body:
      'A structured form on industry, goals, features, timeline, budget, and references you love. Open notes for the things that do not fit into chips. Submit and forget - we read every line the same day.',
    accent: '#C8FE3D',
    glyph: 'B',
  },
  {
    n: '02',
    title: 'Video demo',
    line: 'In your inbox within 48 hours.',
    body:
      'We build a real, working preview of your site - designed, coded, hosted on a private URL - and send a recorded walkthrough explaining every choice. Not a deck. The actual thing. Click through the live link after.',
    accent: '#FFC247',
    glyph: '▶',
  },
  {
    n: '03',
    title: 'Request changes',
    line: 'Reply with notes. We revise.',
    body:
      'Text, voice memo, scribbled screenshot - however you think. Each revision round turns in 24 hours with a fresh recording. Repeat until the demo lands. No call required, no cost, no pressure.',
    accent: '#FF5C44',
    glyph: '↺',
  },
  {
    n: '04',
    title: 'Brand & build',
    line: 'You sign off. We finish.',
    body:
      'Once the demo is signed off, we lock the engagement letter, finish the brand system, and finalise every page and breakpoint. Two-week sprints, daily preview ship, weekly review.',
    accent: '#8E7BFF',
    glyph: 'B',
  },
  {
    n: '05',
    title: 'Motion',
    line: 'The brand learns to move.',
    body:
      'Page transitions, scroll behaviour, hover language, signature interactions. Restrained where the brand needs quiet, expressive where it has to sing. Every interaction documented in code.',
    accent: '#F4EEDF',
    glyph: 'M',
  },
  {
    n: '06',
    title: 'Ship',
    line: 'Live, measured, maintained.',
    body:
      'CMS handover, analytics wired, a half-day training. Thirty days of free follow-up tweaks. A maintenance retainer if you want it; no obligation if you don’t.',
    accent: '#C8FE3D',
    glyph: '↗',
  },
] as const;

const SILK = [0.22, 1, 0.36, 1] as const;

export function ProcessScrubber() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Active stage from scroll
  const [active, setActive] = useState(0);
  const total = STAGES.length;

  useMotionValueEvent(scrollYProgress, 'change', v => {
    const i = Math.min(total - 1, Math.max(0, Math.floor(v * total - 0.0001 + 0.001)));
    if (i !== active) setActive(i);
  });

  const railFill = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const stage = STAGES[active];

  return (
    <section
      ref={ref}
      id="process"
      className="relative bg-paper-100/55"
      style={{ height: `${total * 110}vh` }}
    >
      {/* Pinned panel */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background tint by stage */}
        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `radial-gradient(900px circle at 75% 30%, ${stage.accent}14, transparent 60%), radial-gradient(700px circle at 15% 80%, ${stage.accent}0d, transparent 65%)`,
          }}
          animate={{ opacity: [0.7, 1] }}
          transition={{ duration: 0.6 }}
        />

        <div className="container-wide relative grid h-full grid-cols-12 items-center gap-8 py-24">
          {/* LEFT - copy */}
          <div className="col-span-12 lg:col-span-6">
            <div className="mb-10 flex items-baseline gap-4">
              <span className="eyebrow">- how we build</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash-400">
                {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </div>

            <motion.div
              key={`title-${active}`}
              initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, ease: SILK }}
            >
              <div className="font-mono text-xs uppercase tracking-[0.32em]" style={{ color: stage.accent }}>
                Stage {stage.n}
              </div>
              <h2 className="mt-4 font-display text-display-lg text-balance text-ink-700">
                {stage.title}
                <span className="block text-display-md italic text-ash-500">
                  - {stage.line}
                </span>
              </h2>
              <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-ash-500">
                {stage.body}
              </p>
            </motion.div>

            {/* Stage chips */}
            <ul className="mt-12 flex flex-wrap gap-2">
              {STAGES.map((s, i) => (
                <li key={s.n}>
                  <button
                    type="button"
                    onClick={() => {
                      const el = ref.current;
                      if (!el) return;
                      const top = el.getBoundingClientRect().top + window.scrollY;
                      const height = el.getBoundingClientRect().height - window.innerHeight;
                      window.scrollTo({ top: top + (height * i) / total + 4, behavior: 'smooth' });
                    }}
                    className={`rounded-pill border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] transition-all duration-300 ease-silk ${
                      i === active
                        ? 'border-ink-700 bg-ink-700 text-paper-100'
                        : 'border-hairline bg-transparent text-ash-500 hover:border-ink-400 hover:text-ink-700'
                    }`}
                    data-cursor="link"
                  >
                    {s.n} · {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT - visual */}
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <div className="relative aspect-square w-full max-w-[560px]">
              {/* Pulse halo */}
              <motion.div
                key={`halo-${active}`}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.5 }}
                transition={{ duration: 0.9, ease: SILK }}
                className="absolute inset-[12%] rounded-full blur-2xl"
                style={{ background: stage.accent }}
              />

              {/* Glyph card */}
              <motion.div
                key={`card-${active}`}
                initial={{ opacity: 0, y: 30, scale: 0.96, rotate: -2 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                transition={{ duration: 0.7, ease: SILK }}
                className="relative grid h-full place-items-center overflow-hidden rounded-card border border-hairline bg-paper-50"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-25"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(45deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 14px)',
                    color: stage.accent,
                    maskImage: 'radial-gradient(circle at center, black 30%, transparent 78%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 78%)',
                  }}
                />

                <div className="relative z-10 grid h-full w-full place-items-center p-10 md:p-12">
                  <StageMockup index={active} accent={stage.accent} />
                </div>

                <div className="absolute left-5 top-5 z-20 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ash-500">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: stage.accent }} />
                  STAGE {stage.n}
                </div>

                <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-ash-500">
                  <span>swash · field notes</span>
                  <span>{stage.title.toLowerCase()}.md</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Vertical scroll rail */}
        <div className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 lg:block">
          <div className="relative h-[280px] w-px bg-hairline">
            <motion.div
              className="absolute left-0 top-0 w-px origin-top bg-lime-300"
              style={{ height: railFill }}
            />
          </div>
          <div className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.24em] text-ash-500">
            scroll
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Stage mockups ─────────────────────────────────────────────── */

function StageMockup({ index, accent }: { index: number; accent: string }) {
  switch (index) {
    case 0: return <BriefFormMockup accent={accent} />;
    case 1: return <VideoDemoMockup accent={accent} />;
    case 2: return <ChangeRequestsMockup accent={accent} />;
    case 3: return <BrandSystemMockup accent={accent} />;
    case 4: return <MotionTimelineMockup accent={accent} />;
    case 5: return <LaunchedMockup accent={accent} />;
    default: return null;
  }
}

/* Stage 01 - Brief: a glimpse of the form, 5-minute promise */
function BriefFormMockup({ accent }: { accent: string }) {
  const chips = ['Home services', 'Restaurant', 'SaaS', 'Real estate', 'DTC'];
  return (
    <div className="flex h-full w-full flex-col gap-5 rounded-xl border border-hairline bg-paper-100/85 p-5 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.7)]">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-ash-500">
          Step 1 / 5 · Business
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.22em]" style={{ color: accent }}>
          ~5 min
        </span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-pill bg-hairline">
        <div className="h-full w-1/5 rounded-pill" style={{ background: accent }} />
      </div>
      <p className="font-display text-xl leading-tight text-ink-700">
        What kind of business?
      </p>
      <div className="flex flex-wrap gap-1.5">
        {chips.map((c, i) => (
          <span
            key={c}
            className={`rounded-pill border px-2.5 py-1 text-[10px] font-semibold ${
              i === 0
                ? 'border-transparent text-paper-100'
                : 'border-hairline bg-paper-200/40 text-ink-400'
            }`}
            style={i === 0 ? { background: accent } : undefined}
          >
            {c}
          </span>
        ))}
      </div>
      <div className="mt-auto grid gap-2">
        <div className="h-8 rounded-md border border-hairline bg-paper-200/40 px-3 py-2 text-[10px] text-ash-500 flex items-center">
          your-business.com
        </div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-ash-500">
            No call required
          </span>
          <span
            className="rounded-pill px-3 py-1.5 text-[10px] font-semibold text-paper-100"
            style={{ background: accent }}
          >
            Continue →
          </span>
        </div>
      </div>
    </div>
  );
}

/* Stage 02 - Video demo: a video player with scrubber and timestamp */
function VideoDemoMockup({ accent }: { accent: string }) {
  return (
    <div className="flex h-full w-full flex-col gap-3 rounded-xl border border-hairline bg-paper-100/85 p-4 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.7)]">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-ink_red-400" />
        <span className="h-2 w-2 rounded-full bg-gold-300" />
        <span className="h-2 w-2 rounded-full bg-lime-300" />
        <span className="ml-2 truncate rounded bg-paper-200/60 px-2 py-0.5 font-mono text-[9px] text-ash-500">
          loom.com/share/your-site-demo
        </span>
      </div>
      {/* Video frame */}
      <div
        className="relative flex-1 overflow-hidden rounded-md"
        style={{
          background: `linear-gradient(135deg, ${accent}33, ${accent}11), #14110D`,
        }}
      >
        {/* Mock site preview inside */}
        <div className="absolute inset-3 rounded border border-white/10 bg-paper-100/70 backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-hairline px-3 py-1.5">
            <span className="font-display italic text-[11px] text-ink-700">your brand</span>
            <span className="font-mono text-[8px] uppercase tracking-wider text-ash-500">Live · v0.1</span>
          </div>
          <div className="space-y-1.5 p-3">
            <div className="h-3 w-3/4 rounded bg-ink-700/80" />
            <div className="h-2 w-1/2 rounded bg-ash-500/40" />
            <div className="mt-2 h-8 w-20 rounded" style={{ background: accent }} />
          </div>
        </div>
        {/* Play button overlay */}
        <div className="absolute inset-0 grid place-items-center">
          <div
            className="grid h-12 w-12 place-items-center rounded-full shadow-lg"
            style={{ background: accent }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="#0A0908">
              <path d="M4 2.5v9l8-4.5z" />
            </svg>
          </div>
        </div>
        {/* REC dot */}
        <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-pill bg-paper-100/85 px-2 py-0.5 backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink_red-400" />
          <span className="font-mono text-[8px] uppercase tracking-wider text-ink-700">REC</span>
        </div>
      </div>
      {/* Scrubber */}
      <div className="space-y-1.5">
        <div className="relative h-1 rounded-pill bg-paper-200/60">
          <div className="absolute inset-y-0 left-0 w-1/3 rounded-pill" style={{ background: accent }} />
          <div
            className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-paper-100"
            style={{ left: '33%', background: accent }}
          />
        </div>
        <div className="flex items-center justify-between font-mono text-[9px] text-ash-500">
          <span>02:14</span>
          <span>your-site · walkthrough</span>
          <span>06:38</span>
        </div>
      </div>
    </div>
  );
}

/* Stage 03 - Change requests: a reply thread with voice memo */
function ChangeRequestsMockup({ accent }: { accent: string }) {
  return (
    <div className="flex h-full w-full flex-col gap-2.5 rounded-xl border border-hairline bg-paper-100/85 p-4 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.7)]">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-ash-500">
          Reply · Round 1
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.22em]" style={{ color: accent }}>
          24h turnaround
        </span>
      </div>

      {/* Their reply with voice memo */}
      <div className="rounded-lg border border-hairline bg-paper-200/40 p-3">
        <p className="text-[11px] text-ink-700">
          Love the hero - can the gallery be 3 columns? Also softer photography on the about page.
        </p>
        {/* Voice memo */}
        <div
          className="mt-3 flex items-center gap-2 rounded-md border p-2"
          style={{ borderColor: `${accent}40`, background: `${accent}10` }}
        >
          <span className="grid h-7 w-7 place-items-center rounded-full" style={{ background: accent }}>
            <svg width="9" height="11" viewBox="0 0 9 11" fill="#0A0908">
              <path d="M4.5 0a2 2 0 0 0-2 2v3a2 2 0 0 0 4 0V2a2 2 0 0 0-2-2zM0 5a4.5 4.5 0 0 0 4 4.47V11h1V9.47A4.5 4.5 0 0 0 9 5H8a3.5 3.5 0 0 1-7 0H0z" />
            </svg>
          </span>
          <div className="flex flex-1 items-end gap-[2px] h-5">
            {[3, 6, 4, 8, 5, 7, 4, 9, 6, 4, 7, 5, 8, 3, 6, 4, 5, 7, 4, 3].map((h, i) => (
              <span
                key={i}
                className="w-[2px] rounded-full"
                style={{ height: `${h * 2}px`, background: accent, opacity: i < 12 ? 1 : 0.35 }}
              />
            ))}
          </div>
          <span className="font-mono text-[9px] text-ash-500">0:42</span>
        </div>
      </div>

      {/* Our reply */}
      <div className="rounded-lg border bg-paper-200/20 p-3" style={{ borderColor: `${accent}30` }}>
        <div className="flex items-center gap-2">
          <span className="grid h-5 w-5 place-items-center rounded-full" style={{ background: accent, color: '#0A0908' }}>
            <span className="font-display text-[10px] italic font-bold">S</span>
          </span>
          <span className="font-mono text-[9px] uppercase tracking-wider text-ash-500">Swash · revised</span>
        </div>
        <p className="mt-2 text-[11px] text-ink-700">
          New demo coming in 24h - gallery now 3-col, photography pass on the about page. We&apos;ll send a fresh recording.
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between text-[9px]">
        <span className="font-mono uppercase tracking-wider text-ash-500">Unlimited revisions</span>
        <span className="font-mono uppercase tracking-wider" style={{ color: accent }}>
          Until you sign off
        </span>
      </div>
    </div>
  );
}

/* Stage 04 - Brand & build: palette + type + components */
function BrandSystemMockup({ accent }: { accent: string }) {
  return (
    <div className="flex h-full w-full flex-col gap-3 rounded-xl border border-hairline bg-paper-100/85 p-4 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.7)]">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-ash-500">
          Brand system v1.0
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.22em]" style={{ color: accent }}>
          signed off
        </span>
      </div>

      {/* Palette */}
      <div>
        <span className="font-mono text-[8px] uppercase tracking-wider text-ash-500">Palette</span>
        <div className="mt-1.5 grid grid-cols-5 gap-1.5">
          {[accent, '#F4EEDF', '#0A0908', '#FFC247', '#FF5C44'].map((c, i) => (
            <div key={i} className="aspect-square rounded-md border border-hairline" style={{ background: c }} />
          ))}
        </div>
      </div>

      {/* Type */}
      <div className="rounded-lg border border-hairline bg-paper-200/40 p-3">
        <div className="flex items-baseline justify-between">
          <span className="font-display text-3xl italic text-ink-700">Aa</span>
          <span className="font-mono text-[9px] text-ash-500">Bricolage / Inter</span>
        </div>
        <div className="mt-2 space-y-1">
          <div className="h-2.5 w-full rounded bg-ink-700/70" />
          <div className="h-2 w-4/5 rounded bg-ash-500/40" />
          <div className="h-2 w-3/5 rounded bg-ash-500/30" />
        </div>
      </div>

      {/* Components */}
      <div className="grid grid-cols-3 gap-1.5">
        <div className="rounded-md border border-hairline bg-paper-200/40 p-2">
          <div className="h-3 rounded-pill" style={{ background: accent }} />
          <p className="mt-1.5 font-mono text-[8px] uppercase text-ash-500">Pill</p>
        </div>
        <div className="rounded-md border border-hairline bg-paper-200/40 p-2">
          <div className="grid h-3 grid-cols-3 gap-px">
            <span className="bg-hairline" /><span className="bg-hairline" /><span className="bg-hairline" />
          </div>
          <p className="mt-1.5 font-mono text-[8px] uppercase text-ash-500">Grid</p>
        </div>
        <div className="rounded-md border border-hairline bg-paper-200/40 p-2">
          <div className="h-3 w-3 rounded-full border" style={{ borderColor: accent }} />
          <p className="mt-1.5 font-mono text-[8px] uppercase text-ash-500">Mark</p>
        </div>
      </div>
    </div>
  );
}

/* Stage 05 - Motion: keyframe timeline + easing curve */
function MotionTimelineMockup({ accent }: { accent: string }) {
  return (
    <div className="flex h-full w-full flex-col gap-3 rounded-xl border border-hairline bg-paper-100/85 p-4 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.7)]">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-ash-500">
          Motion · timeline
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.22em]" style={{ color: accent }}>
          1.2s · ease-out
        </span>
      </div>

      {/* Easing curve */}
      <div className="relative h-[90px] overflow-hidden rounded-lg border border-hairline bg-paper-200/40 p-3">
        <svg viewBox="0 0 200 60" className="h-full w-full" preserveAspectRatio="none">
          {/* Grid */}
          {[0, 1, 2, 3, 4].map(i => (
            <line key={i} x1={(i * 50)} y1={0} x2={(i * 50)} y2={60} stroke="#252019" strokeWidth="0.5" />
          ))}
          {[0, 1, 2].map(i => (
            <line key={i} x1={0} y1={(i * 30)} x2={200} y2={(i * 30)} stroke="#252019" strokeWidth="0.5" />
          ))}
          {/* Curve */}
          <path
            d="M 0 60 C 30 60, 60 10, 200 0"
            stroke={accent}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          {/* Anchor points */}
          <circle cx="0" cy="60" r="3" fill={accent} />
          <circle cx="200" cy="0" r="3" fill={accent} />
        </svg>
      </div>

      {/* Keyframe tracks */}
      <div className="space-y-1.5">
        {[
          { label: 'Hero · reveal', start: 0, len: 60 },
          { label: 'Nav · slide',   start: 20, len: 40 },
          { label: 'Mark · draw',   start: 35, len: 55 },
          { label: 'CTA · magnet',  start: 65, len: 25 },
        ].map((t) => (
          <div key={t.label} className="flex items-center gap-2">
            <span className="w-20 font-mono text-[8px] uppercase tracking-wider text-ash-500">
              {t.label}
            </span>
            <div className="relative h-1.5 flex-1 rounded-pill bg-paper-200/60">
              <div
                className="absolute inset-y-0 rounded-pill"
                style={{ left: `${t.start}%`, width: `${t.len}%`, background: accent }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between">
        <div className="flex gap-1">
          {['Hover', 'Click', 'Enter', 'Exit'].map(t => (
            <span key={t} className="rounded-pill border border-hairline bg-paper-200/40 px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider text-ash-500">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Stage 06 - Ship: launched status with sparkline */
function LaunchedMockup({ accent }: { accent: string }) {
  return (
    <div className="flex h-full w-full flex-col gap-3 rounded-xl border border-hairline bg-paper-100/85 p-4 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.7)]">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-ink-700">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full" style={{ background: accent }} />
            <span className="relative inline-block h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
          </span>
          Live
        </span>
        <span className="font-mono text-[9px] uppercase tracking-wider text-ash-500">
          your-brand.com
        </span>
      </div>

      {/* Launch hero card */}
      <div
        className="relative overflow-hidden rounded-lg border p-3"
        style={{ borderColor: `${accent}40`, background: `${accent}12` }}
      >
        <p className="font-display text-base leading-tight text-ink-700">
          Shipped · day one
        </p>
        <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-ash-500">
          Brand · site · motion · CMS
        </p>
        <span
          className="mt-3 inline-flex items-center gap-1 rounded-pill px-2.5 py-1 text-[9px] font-semibold text-paper-100"
          style={{ background: accent }}
        >
          ↗ View live
        </span>
      </div>

      {/* Sparkline */}
      <div className="rounded-lg border border-hairline bg-paper-200/40 p-3">
        <div className="flex items-center justify-between font-mono text-[9px] text-ash-500">
          <span className="uppercase tracking-wider">Week 1 · visitors</span>
          <span className="text-ink-700">+184%</span>
        </div>
        <svg viewBox="0 0 200 32" className="mt-1.5 h-8 w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`spark-${accent.slice(1)}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.5" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M 0 28 L 20 24 L 40 26 L 60 18 L 80 20 L 100 14 L 120 10 L 140 12 L 160 6 L 180 4 L 200 2 L 200 32 L 0 32 Z"
            fill={`url(#spark-${accent.slice(1)})`}
          />
          <path
            d="M 0 28 L 20 24 L 40 26 L 60 18 L 80 20 L 100 14 L 120 10 L 140 12 L 160 6 L 180 4 L 200 2"
            fill="none"
            stroke={accent}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* +30 days polish */}
      <div className="mt-auto flex items-center justify-between text-[9px]">
        <span className="font-mono uppercase tracking-wider text-ash-500">
          +30 days of polish
        </span>
        <span className="font-mono uppercase tracking-wider" style={{ color: accent }}>
          Day 4 / 30
        </span>
      </div>
    </div>
  );
}
