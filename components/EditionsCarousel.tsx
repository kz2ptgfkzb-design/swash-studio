'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';
import { PHOTOS } from '@/data/photos';

type Edition = {
  slug: string;
  /** External URL - when set, the card links here instead of /preview/[slug] */
  href?: string;
  brand: string;
  industry: string;
  tagline: string;
  photo: string;
  accent: string;
  bg: string;
  fg: string;
  swatch: string[];
  typeStyle: 'display' | 'editorial' | 'sans';
  meta: string;
};

const EDITIONS: Edition[] = [
  {
    slug: 'mit-mak',
    href: 'https://mit-mak-motors.vercel.app',
    brand: 'Mit-Mak Motors',
    industry: 'Automotive · Dealership rebuild',
    tagline: 'Trusted. Awarded. Unmatched.',
    photo: PHOTOS.mitmak.hero,
    accent: '#E10600',
    bg: '#0A0A0A',
    fg: '#F5F5F5',
    swatch: ['#0A0A0A', '#E10600', '#9CA0A6', '#151515'],
    typeStyle: 'display',
    meta: 'full site rebuild · 400+ car live inventory',
  },
  {
    slug: 'doctors365',
    href: 'https://doctors365.vercel.app',
    brand: 'Doctors 365',
    industry: 'Healthcare · Practice rebuild',
    tagline: 'Healthcare that goes beyond the basics.',
    photo: PHOTOS.doctors365.hero,
    accent: '#0EA5A4',
    bg: '#0F1B1E',
    fg: '#F6F4EF',
    swatch: ['#0F1B1E', '#0EA5A4', '#F6F4EF', '#086665'],
    typeStyle: 'sans',
    meta: 'full site rebuild · GP practice · Randburg',
  },
  {
    slug: 'overlay',
    brand: 'Overlay',
    industry: 'B2B SaaS · Analytics',
    tagline: 'See what your users actually do.',
    photo: PHOTOS.overlay.team,
    accent: '#2447FF',
    bg: '#F8F6F2',
    fg: '#0A0A0A',
    swatch: ['#F8F6F2', '#2447FF', '#0A0A0A', '#F0EDE7'],
    typeStyle: 'sans',
    meta: '10 sections · paper + cobalt blue',
  },
  {
    slug: 'remichel',
    href: 'https://remichel.vercel.app',
    brand: 'R.E. Michel',
    industry: 'HVAC/R distribution · Storefront rebuild',
    tagline: 'Customers first, coast to coast.',
    photo: PHOTOS.remichel.hero,
    accent: '#EE2B37',
    bg: '#14171A',
    fg: '#F5F6F7',
    swatch: ['#14171A', '#EE2B37', '#0C72BC', '#F6A03A'],
    typeStyle: 'display',
    meta: 'full storefront rebuild · 35,000+ line items',
  },
];

/**
 * Swash Editions - keyboard-navigable carousel of demo brands.
 * Inspired by Shopify Editions' theme gallery.
 *
 *  - Scroll-snap horizontal carousel
 *  - Arrow keys + Home/End for keyboard a11y
 *  - Tab indicators at the bottom show active edition
 *  - Each card is a poster of the demo with industry/palette meta
 */
export function EditionsCarousel() {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = useCallback((i: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const clamped = Math.max(0, Math.min(EDITIONS.length - 1, i));
    const card = rail.querySelectorAll<HTMLElement>('[data-edition-card]')[clamped];
    if (!card) return;
    const railRect = rail.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const delta = cardRect.left - railRect.left - (railRect.width - cardRect.width) / 2;
    rail.scrollBy({ left: delta, behavior: 'smooth' });
  }, []);

  // Track which card is centered
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    let raf = 0;
    const tick = () => {
      const rect = rail.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const cards = Array.from(rail.querySelectorAll<HTMLElement>('[data-edition-card]'));
      let bestIdx = 0;
      let bestDist = Infinity;
      cards.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        const cc = r.left + r.width / 2;
        const d = Math.abs(cc - center);
        if (d < bestDist) { bestDist = d; bestIdx = i; }
      });
      setActive(bestIdx);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Keyboard navigation when the rail or its descendants have focus
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    function onKey(e: KeyboardEvent) {
      const focused = rail!.contains(document.activeElement);
      if (!focused) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); scrollToIndex(active + 1); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); scrollToIndex(active - 1); }
      if (e.key === 'Home')       { e.preventDefault(); scrollToIndex(0); }
      if (e.key === 'End')        { e.preventDefault(); scrollToIndex(EDITIONS.length - 1); }
    }
    rail.addEventListener('keydown', onKey);
    return () => rail.removeEventListener('keydown', onKey);
  }, [active, scrollToIndex]);

  return (
    <section id="editions" className="relative overflow-hidden py-16 sm:py-24 md:py-36">
      <div className="container-wide">
        {/* Header row */}
        <div className="grid items-end gap-6 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <p className="eyebrow">- Swash Editions · Summer &apos;26</p>
            <h2 className="mt-4 font-display text-display-lg text-balance text-ink-700 sm:mt-6">
              Four brands.
              <br />
              <span className="italic text-ash-500">One studio.</span>
            </h2>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <p className="text-pretty text-sm leading-relaxed text-ash-500 sm:text-base">
              Three full rebuilds of real businesses - a Pretoria
              dealership, a Randburg GP practice, and a US HVAC/R
              distributor - plus one fictional demo brand. Each lives at
              its own URL. Click in to walk through.
            </p>
            <div className="mt-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ash-500">
              <span className="hidden md:inline">use</span>
              <span className="inline-flex items-center gap-1 rounded-pill border border-hairline px-2 py-1 text-ink-400">←</span>
              <span className="inline-flex items-center gap-1 rounded-pill border border-hairline px-2 py-1 text-ink-400">→</span>
              <span>or scroll</span>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel rail (extends past container) */}
      <div
        ref={railRef}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Swash Editions"
        className="group/rail mt-8 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto scroll-smooth px-4 pb-8 [scrollbar-width:none] focus:outline-none sm:mt-14 sm:gap-6 sm:px-6 md:gap-8 md:px-14 lg:px-20 [&::-webkit-scrollbar]:hidden"
        style={{ scrollPadding: '0 16px' }}
      >
        {EDITIONS.map((e, i) => (
          <EditionCard key={e.slug} edition={e} index={i} total={EDITIONS.length} />
        ))}
      </div>

      {/* Footer indicators + controls */}
      <div className="container-wide mt-2 flex flex-col items-center gap-5">
        <div className="flex items-center gap-2" role="tablist" aria-label="Editions">
          {EDITIONS.map((e, i) => (
            <button
              key={e.slug}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-label={`Edition ${i + 1}: ${e.brand}`}
              onClick={() => scrollToIndex(i)}
              data-cursor="link"
              className={`h-1 rounded-pill transition-all duration-500 ease-silk ${
                active === i
                  ? 'w-10 bg-lime-300'
                  : 'w-6 bg-hairline hover:bg-ash-500'
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.22em] text-ash-500">
          <button
            type="button"
            onClick={() => scrollToIndex(active - 1)}
            disabled={active === 0}
            data-cursor="prev"
            className="inline-flex items-center gap-1.5 rounded-pill px-2 py-1 text-ink-400 transition-colors hover:text-ink-700 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-ink-400"
          >
            ← Prev
          </button>
          <span>
            {String(active + 1).padStart(2, '0')} / {String(EDITIONS.length).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={() => scrollToIndex(active + 1)}
            disabled={active === EDITIONS.length - 1}
            data-cursor="next"
            className="inline-flex items-center gap-1.5 rounded-pill px-2 py-1 text-ink-400 transition-colors hover:text-ink-700 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-ink-400"
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
}

function EditionCard({
  edition,
  index,
  total,
}: {
  edition: Edition;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.18, 1.08]);

  const fontFamily =
    edition.typeStyle === 'editorial'
      ? 'var(--font-editorial)'
      : edition.typeStyle === 'display'
        ? 'var(--font-display)'
        : 'var(--font-sans)';

  return (
    <article
      ref={ref}
      data-edition-card
      className="relative w-[88vw] max-w-[820px] shrink-0 snap-center overflow-hidden rounded-[18px] border border-hairline sm:w-[80vw] md:w-[68vw] lg:w-[58vw]"
      style={{ background: edition.bg, color: edition.fg }}
    >
      <Link
        href={edition.href ?? `/preview/${edition.slug}`}
        target="_blank"
        rel={edition.href ? 'noopener' : undefined}
        data-cursor="open"
        className="group block"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <motion.img
            src={edition.photo}
            alt={edition.brand}
            style={{ y, scale }}
            loading={index < 2 ? 'eager' : 'lazy'}
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
          />
          {/* Brand-tinted vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, ${edition.bg}55 0%, ${edition.bg}25 40%, ${edition.bg}cc 100%)`,
            }}
          />
          {/* Top meta row */}
          <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-4 sm:p-6">
            <span
              className="rounded-pill px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] backdrop-blur sm:px-3 sm:text-[10px] sm:tracking-[0.22em]"
              style={{
                background: `${edition.fg}10`,
                color: edition.fg,
                border: `1px solid ${edition.fg}25`,
              }}
            >
              {edition.industry}
            </span>
            <span
              className="shrink-0 rounded-pill px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] shadow-sm sm:px-3 sm:text-[10px] sm:tracking-[0.22em]"
              style={{ background: edition.accent, color: edition.bg }}
            >
              Live demo →
            </span>
          </div>
          {/* Bottom: brand mark */}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-8">
            <h3
              className="text-balance text-[clamp(2rem,4.2vw,3.6rem)] leading-[0.95] tracking-tight transition-colors duration-500 group-hover:opacity-90"
              style={{ fontFamily }}
            >
              {edition.brand}
            </h3>
            <p
              className="mt-3 max-w-md text-pretty text-[clamp(0.95rem,1.4vw,1.15rem)] leading-relaxed opacity-80"
              style={{ fontFamily }}
            >
              {edition.tagline}
            </p>
          </div>
        </div>

        {/* Bottom rail - palette + meta + CTA */}
        <div
          className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:gap-5 sm:px-6 sm:py-5 md:px-8"
          style={{ borderTop: `1px solid ${edition.fg}15` }}
        >
          <div className="flex items-center gap-4">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.22em]"
              style={{ color: `${edition.fg}80` }}
            >
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <div className="flex gap-1.5">
              {edition.swatch.map(c => (
                <span
                  key={c}
                  title={c}
                  className="h-5 w-5 rounded-full"
                  style={{ background: c, border: `1px solid ${edition.fg}15` }}
                />
              ))}
            </div>
            <span
              className="font-mono text-[10px] uppercase tracking-[0.22em]"
              style={{ color: `${edition.fg}65` }}
            >
              {edition.meta}
            </span>
          </div>
          <span
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-transform group-hover:translate-x-1"
            style={{ color: edition.fg }}
          >
            Open edition
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 7h8M7 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </Link>
    </article>
  );
}
