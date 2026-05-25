'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { PHOTOS } from '@/data/photos';
import {
  ScrollAwareNav,
  FullBleedHero,
  ParallaxImage,
  HoverMagnify,
  MagneticHover,
  SectionFadeIn,
} from '@/components/preview/PreviewUI';

export default function PipelinePreview() {
  return (
    <div className="bg-[#0E2236] text-[#F4EFE3] min-h-screen font-[var(--font-sans)]" style={{ fontFamily: 'var(--font-sans)' }}>
      <PipelineNav />
      <PipelineHero />
      <PipelineMarquee />
      <PipelineServices />
      <PipelineOnTheJob />
      <PipelineTrust />
      <PipelineAreas />
      <PipelineReviews />
      <PipelineQuote />
      <PipelineFooter />
    </div>
  );
}

function PipelineLogo({ size = 28 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <rect x="2" y="2" width="28" height="28" rx="4" fill="#FFD93D" />
        <path d="M10 10 H 18 a 4 4 0 0 1 0 8 H 14 a 4 4 0 0 0 0 8 H 22" stroke="#0E2236" strokeWidth="3" strokeLinecap="square" fill="none" />
      </svg>
      <span style={{ fontFamily: 'var(--font-display)' }} className="font-semibold tracking-tight text-[18px]">
        Pipeline <span className="text-[#FFD93D]">&amp;</span> Co.
      </span>
    </span>
  );
}

function PipelineNav() {
  return (
    <ScrollAwareNav
      bg="rgba(14,34,54,0.78)"
      border="rgba(255,255,255,0.08)"
      threshold={64}
    >
      <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between px-6 lg:px-10">
        <Link href="/preview/pipeline" className="text-white">
          <PipelineLogo />
        </Link>
        <nav className="hidden items-center gap-8 md:flex" style={{ fontFamily: 'var(--font-sans)' }}>
          {['Services', 'Areas', 'Reviews', 'About'].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-sm text-white/85 transition-colors hover:text-[#FFD93D]"
            >
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="tel:5550100142" className="hidden text-sm font-medium text-white hover:text-[#FFD93D] md:inline">
            (555) 010-0142
          </a>
          <MagneticHover strength={0.25}>
            <a
              href="#quote"
              className="rounded-md bg-[#FFD93D] px-4 py-2.5 text-sm font-bold text-[#0E2236] transition-transform hover:-translate-y-0.5"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Get a quote
            </a>
          </MagneticHover>
        </div>
      </div>
    </ScrollAwareNav>
  );
}

function PipelineHero() {
  return (
    <FullBleedHero
      src={PHOTOS.pipeline.hero}
      minH="100svh"
      parallax={200}
      zoom={1.1}
      overlays={
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E2236] via-[#0E2236]/65 to-[#0E2236]/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E2236] via-transparent to-[#0E2236]/55" />
          <div className="absolute inset-0 bg-noise opacity-[0.06] mix-blend-overlay" />
        </>
      }
    >
      <div className="mx-auto w-full max-w-[1320px] px-6 pb-24 lg:px-10 lg:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="max-w-3xl"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#FFD93D]">
            Est. 2008 · Licensed · Bonded · Insured
          </p>
          <h1
            style={{ fontFamily: 'var(--font-display)' }}
            className="mt-6 text-balance text-[clamp(3rem,9.5vw,10rem)] font-bold leading-[0.9] tracking-tight text-white"
          >
            Plumbing that
            <br />
            <span className="text-[#FFD93D]">shows up.</span>
          </h1>
          <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-white/80">
            Family-owned commercial &amp; residential plumbing for the
            Greater Bay area since 2008. Real techs, transparent pricing,
            a single number that someone picks up — even at 2&nbsp;a.m.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticHover>
              <a
                href="tel:5550100142"
                className="group inline-flex items-center gap-3 rounded-md bg-[#FFD93D] px-6 py-4 text-base font-bold text-[#0E2236] transition-transform hover:-translate-y-0.5"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Call (555) 010-0142
              </a>
            </MagneticHover>
            <MagneticHover strength={0.22}>
              <a
                href="#quote"
                className="inline-flex items-center gap-2 rounded-md border-2 border-white/25 bg-white/5 px-6 py-3.5 text-base font-bold text-white backdrop-blur-sm transition-colors hover:border-[#FFD93D] hover:text-[#FFD93D]"
              >
                Get a written quote →
              </a>
            </MagneticHover>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 grid max-w-2xl grid-cols-3 gap-8 border-t border-white/15 pt-8"
        >
          {[
            { k: '6,400+', l: 'Jobs completed' },
            { k: '15 min', l: 'Avg response time' },
            { k: '4.9★', l: 'Across 312 reviews' },
          ].map((s) => (
            <div key={s.l}>
              <p style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-bold text-[#FFD93D] md:text-4xl">
                {s.k}
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/65">
                {s.l}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center"
        >
          <div className="flex flex-col items-center gap-2 text-white/65">
            <span className="font-mono text-[10px] uppercase tracking-[0.32em]">Services</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="block h-6 w-px bg-current"
            />
          </div>
        </motion.div>
      </div>
    </FullBleedHero>
  );
}

function PipelineMarquee() {
  const ITEMS = [
    '24/7 Emergency',
    'Leak detection',
    'Water heaters',
    'Drain cleaning',
    'Repipes',
    'Sewer line',
    'Trenchless repair',
    'Backflow testing',
    'Garbage disposals',
    'Hydro jetting',
  ];
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="border-y border-white/10 bg-[#FFD93D] py-5 overflow-hidden">
      <div className="flex w-max gap-10 animate-marquee">
        {doubled.map((it, i) => (
          <div key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-bold uppercase tracking-tight text-[#0E2236] md:text-3xl">
              {it}
            </span>
            <span className="text-[#0E2236]">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PipelineServices() {
  const services = [
    {
      icon: '🏠',
      title: 'Residential',
      body: 'Homes, condos, ADUs. Repairs, repipes, water heaters, drain cleaning, fixture installs. Same-day for most calls.',
      bullets: ['Same-day service', 'Free quotes on jobs over $500', '1-year warranty on parts & labour'],
    },
    {
      icon: '🏢',
      title: 'Commercial',
      body: 'Restaurants, offices, multi-family, retail. Scheduled maintenance, retrofits, code-compliant builds — on your timeline.',
      bullets: ['Off-hours work available', 'Net-30 invoicing for accounts', 'Permit handling included'],
    },
    {
      icon: '🚨',
      title: 'Emergency',
      body: 'Burst pipe at midnight? Sewer backup on Sunday? One number, one truck, one tech. Live phones 24/7.',
      bullets: ['Live phones, 24/7/365', 'Standard rate, never surge', 'Most calls in under an hour'],
    },
  ];
  return (
    <section id="services" className="px-6 py-24 lg:px-10 md:py-36">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#FFD93D]">What we do</p>
            <h2
              style={{ fontFamily: 'var(--font-display)' }}
              className="mt-6 text-balance text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight"
            >
              Three things.
              <br />
              <span className="text-white/55">Done right.</span>
            </h2>
          </div>
          <p className="md:col-span-5 text-pretty text-base leading-relaxed text-white/70">
            We don&rsquo;t spread thin. Plumbing — and only plumbing —
            done by techs we trained ourselves. Same answer every time
            you call, in person or on the phone.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <article
              key={s.title}
              className="group relative flex h-full flex-col gap-5 rounded-lg border-2 border-white/10 bg-white/[0.02] p-8 transition-all hover:-translate-y-1 hover:border-[#FFD93D]/60"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{s.icon}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFD93D]">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-bold tracking-tight">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/70">{s.body}</p>
              <ul className="mt-auto space-y-2 border-t border-white/10 pt-5">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-white/85">
                    <svg className="mt-1.5 shrink-0 text-[#FFD93D]" width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5 l2 2 l4 -4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PipelineOnTheJob() {
  const items = [
    { src: PHOTOS.pipeline.plumberWork, label: 'Same-day · burst pipe', loc: 'San Mateo' },
    { src: PHOTOS.pipeline.pipes,       label: 'Repipe · multi-family',  loc: 'Daly City' },
    { src: PHOTOS.pipeline.tools,       label: 'Sewer line · trenchless', loc: 'Burlingame' },
    { src: PHOTOS.pipeline.truck,       label: 'Backflow · annual test', loc: 'San Bruno' },
  ];
  return (
    <section className="border-t-2 border-white/10 px-6 py-24 lg:px-10 md:py-32">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#FFD93D]">
              On the job
            </p>
            <h2
              style={{ fontFamily: 'var(--font-display)' }}
              className="mt-6 text-balance text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[0.96] tracking-tight"
            >
              Last week alone.
            </h2>
          </div>
          <p className="md:col-span-5 text-pretty leading-relaxed text-white/70">
            A snapshot of recent calls — the routine and the chaos. No two
            weeks look the same; we&rsquo;re built for both.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <SectionFadeIn key={i} delay={i * 0.08}>
              <HoverMagnify
                scale={1.06}
                className="relative aspect-[4/5] rounded-lg border-2 border-white/10"
              >
                <ParallaxImage
                  src={it.src}
                  alt=""
                  range={60}
                  scaleFrom={1.1}
                  scaleTo={1.22}
                  className="absolute inset-0 h-full w-full"
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0E2236] via-[#0E2236]/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 z-10 p-5">
                  <p style={{ fontFamily: 'var(--font-display)' }} className="text-lg font-semibold text-[#F4EFE3]">
                    {it.label}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFD93D]">
                    {it.loc}
                  </p>
                </div>
                <div className="absolute right-4 top-4 z-10 rounded-full bg-[#FFD93D] px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#0E2236] shadow-sm">
                  {String(i + 1).padStart(2, '0')} · done
                </div>
              </HoverMagnify>
            </SectionFadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PipelineTrust() {
  const promises = [
    { k: 'Licensed', sub: 'CSL # 1043-8821' },
    { k: 'Insured', sub: '$2M general liability' },
    { k: 'Bonded', sub: '$25k surety bond' },
    { k: 'Background-checked', sub: 'Every tech, every truck' },
  ];
  return (
    <section className="border-y-2 border-white/10 bg-[#091828] px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-[1320px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#FFD93D]">
          Trust receipts
        </p>
        <h2
          style={{ fontFamily: 'var(--font-display)' }}
          className="mt-4 text-balance text-[clamp(2rem,4vw,3.5rem)] font-bold leading-tight"
        >
          The boring stuff that matters.
        </h2>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border-2 border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((p) => (
            <li key={p.k} className="flex h-full flex-col gap-2 bg-[#091828] p-6">
              <p style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-bold text-[#FFD93D]">
                {p.k}
              </p>
              <p className="font-mono text-xs text-white/55">{p.sub}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PipelineAreas() {
  const areas = [
    'San Francisco', 'Daly City', 'South SF', 'Brisbane', 'San Bruno',
    'Millbrae', 'Burlingame', 'San Mateo', 'Foster City', 'Belmont',
    'San Carlos', 'Redwood City', 'Menlo Park', 'Palo Alto',
  ];
  return (
    <section id="areas" className="px-6 py-24 lg:px-10 md:py-32">
      <div className="mx-auto max-w-[1320px] grid gap-12 md:grid-cols-12 md:items-end">
        <div className="md:col-span-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#FFD93D]">
            Where we work
          </p>
          <h2
            style={{ fontFamily: 'var(--font-display)' }}
            className="mt-6 text-balance text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[0.96] tracking-tight"
          >
            14 cities,
            <br />
            <span className="text-white/55">one number.</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/70">
            We cover the Peninsula and parts of the South Bay. Not sure
            we cover yours? Call. We&rsquo;ll tell you straight.
          </p>
        </div>
        <ul className="md:col-span-7 grid grid-cols-2 gap-px overflow-hidden rounded-md bg-white/10 sm:grid-cols-3">
          {areas.map((a) => (
            <li
              key={a}
              className="flex items-center justify-between bg-[#0E2236] p-4 transition-colors hover:bg-white/5"
            >
              <span style={{ fontFamily: 'var(--font-display)' }} className="font-semibold">{a}</span>
              <span className="text-[#FFD93D]">●</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PipelineReviews() {
  const reviews = [
    {
      stars: 5,
      body: 'Called at 11pm for a burst pipe — Mike was at our door in 32 minutes. Fixed it, cleaned up, and the bill was what he quoted on the phone. Will never use anyone else.',
      name: 'Sarah K.',
      where: 'San Mateo · Yelp',
    },
    {
      stars: 5,
      body: 'We manage 14 restaurants in the Bay. Pipeline & Co. handles all of them. Same number, same techs, never a surprise on the invoice. Worth their weight.',
      name: 'Marcus T.',
      where: 'Restaurant group · Google',
    },
    {
      stars: 5,
      body: 'Quote in writing, on time, no upsell. They explained every line item before they started. First plumber in 20 years of homeownership I actually trust.',
      name: 'Anita R.',
      where: 'Palo Alto · NextDoor',
    },
  ];
  return (
    <section id="reviews" className="border-y-2 border-white/10 bg-[#091828] px-6 py-24 lg:px-10 md:py-32">
      <div className="mx-auto max-w-[1320px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#FFD93D]">
              4.9★ across 312 reviews
            </p>
            <h2
              style={{ fontFamily: 'var(--font-display)' }}
              className="mt-6 text-balance text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[0.96] tracking-tight"
            >
              Read the receipts.
            </h2>
          </div>
          <div className="flex gap-4 text-white/55">
            <span className="font-mono text-xs">Yelp 4.9★</span>
            <span className="font-mono text-xs">Google 4.9★</span>
            <span className="font-mono text-xs">NextDoor 4.8★</span>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <blockquote
              key={i}
              className="flex h-full flex-col justify-between gap-8 rounded-lg border-2 border-white/10 bg-[#0E2236] p-7"
            >
              <div>
                <div className="flex gap-1 text-[#FFD93D]">
                  {Array.from({ length: r.stars }).map((_, k) => (
                    <span key={k}>★</span>
                  ))}
                </div>
                <p className="mt-5 text-pretty leading-relaxed text-white/85">
                  &ldquo;{r.body}&rdquo;
                </p>
              </div>
              <footer className="border-t border-white/10 pt-4">
                <p style={{ fontFamily: 'var(--font-display)' }} className="font-semibold">
                  {r.name}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
                  {r.where}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function PipelineQuote() {
  return (
    <section id="quote" className="px-6 py-24 lg:px-10 md:py-32">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-12 rounded-2xl bg-[#FFD93D] p-10 text-[#0E2236] md:grid-cols-12 md:p-16">
          <div className="md:col-span-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#0E2236]/70">
              Get a written quote
            </p>
            <h2
              style={{ fontFamily: 'var(--font-display)' }}
              className="mt-4 text-balance text-[clamp(2rem,4.2vw,3.5rem)] font-bold leading-tight"
            >
              Tell us what&rsquo;s leaking.
              <br />
              We&rsquo;ll quote it before we dispatch.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[#0E2236]/75">
              Quotes within 30 minutes. Honored for 14 days. No
              surprises when the bill comes.
            </p>
            <div className="mt-8 space-y-2 font-mono text-sm">
              <p><strong>Phone:</strong> (555) 010-0142 — answered 24/7</p>
              <p><strong>Email:</strong> dispatch@pipelineco.example</p>
              <p><strong>Hours:</strong> Live 24/7 · Trucks 6am – 10pm</p>
            </div>
          </div>
          <form className="md:col-span-6 grid gap-4" onSubmit={(e) => { e.preventDefault(); alert('Demo only — wire to your CRM.'); }}>
            <input className="w-full rounded-md border-2 border-[#0E2236]/20 bg-white px-4 py-3 text-[#0E2236] placeholder:text-[#0E2236]/50 focus:border-[#0E2236] focus:outline-none" placeholder="Your name" required />
            <input className="w-full rounded-md border-2 border-[#0E2236]/20 bg-white px-4 py-3 text-[#0E2236] placeholder:text-[#0E2236]/50 focus:border-[#0E2236] focus:outline-none" type="tel" placeholder="Phone number" required />
            <input className="w-full rounded-md border-2 border-[#0E2236]/20 bg-white px-4 py-3 text-[#0E2236] placeholder:text-[#0E2236]/50 focus:border-[#0E2236] focus:outline-none" placeholder="Address (so we can dispatch the right truck)" />
            <textarea rows={4} className="w-full resize-none rounded-md border-2 border-[#0E2236]/20 bg-white px-4 py-3 text-[#0E2236] placeholder:text-[#0E2236]/50 focus:border-[#0E2236] focus:outline-none" placeholder="What's going on? (leak / no hot water / clog / other)" />
            <button type="submit" className="rounded-md bg-[#0E2236] px-6 py-4 font-bold text-[#FFD93D] transition-transform hover:-translate-y-0.5">
              Send for a quote →
            </button>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0E2236]/55">
              We typically reply in 8 – 30 minutes. 24/7.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function PipelineFooter() {
  return (
    <footer className="border-t-2 border-white/10 bg-[#091828] px-6 py-14 lg:px-10">
      <div className="mx-auto max-w-[1320px] grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="space-y-4">
          <PipelineLogo size={32} />
          <p className="max-w-xs text-sm text-white/55">
            Family-owned commercial &amp; residential plumbing for the
            Greater Bay area since 2008.
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFD93D]">Reach us</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li><a href="tel:5550100142" className="hover:text-[#FFD93D]">(555) 010-0142</a></li>
            <li>dispatch@pipelineco.example</li>
            <li>1840 El Camino Real, San Mateo</li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFD93D]">Hours</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>Live phones · 24/7</li>
            <li>Service trucks · 6am – 10pm</li>
            <li>Emergency · any time</li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFD93D]">Credentials</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>CSL # 1043-8821</li>
            <li>BBB A+ since 2011</li>
            <li>EPA WaterSense partner</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1320px] flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row md:items-center">
        <p>© 2026 Pipeline &amp; Co. All rights reserved.</p>
        <Link href="/" className="hover:text-white/80">
          ← Back to Swash · website built by Swash
        </Link>
      </div>
    </footer>
  );
}
