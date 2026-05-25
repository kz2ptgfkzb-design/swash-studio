'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Reveal } from './Reveal';

type Feature = {
  label: string;
  desc: string;
  Icon: () => ReactNode;
};

// Hand-rolled icons so we don't pull in a library. Each is ~16x16.
const FEATURES: Feature[] = [
  {
    label: 'Headless CMS',
    desc: 'Edit copy and imagery without touching code.',
    Icon: () => (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
        <rect x="2" y="3" width="12" height="3" rx="0.5" stroke="currentColor" />
        <rect x="2" y="8" width="8" height="2" rx="0.5" stroke="currentColor" />
        <rect x="2" y="11" width="10" height="2" rx="0.5" stroke="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Live preview URL',
    desc: 'Real link from day one - watch us ship.',
    Icon: () => (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="currentColor" />
        <path d="M2.5 8H13.5M8 2.5C6 4.5 6 11.5 8 13.5M8 2.5C10 4.5 10 11.5 8 13.5" stroke="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Performance budget',
    desc: 'LCP under 2s, hand-tuned.',
    Icon: () => (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
        <path d="M2 13L7 8L9 10L14 5" stroke="currentColor" strokeLinecap="round" />
        <path d="M14 5V8M14 5H11" stroke="currentColor" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'WCAG AA accessibility',
    desc: 'Keyboard, screen-reader, color-contrast tested.',
    Icon: () => (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
        <circle cx="8" cy="3.5" r="1.5" stroke="currentColor" />
        <path d="M3 7H13M8 7V13M5 13L8 10L11 13" stroke="currentColor" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'SEO foundation',
    desc: 'Sitemap, schema, OG, redirects - wired.',
    Icon: () => (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
        <circle cx="7" cy="7" r="4" stroke="currentColor" />
        <path d="M10 10L13.5 13.5" stroke="currentColor" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Analytics wired',
    desc: 'Plausible, GA4, or your warehouse of choice.',
    Icon: () => (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
        <rect x="2" y="9" width="2.5" height="5" stroke="currentColor" />
        <rect x="6.75" y="6" width="2.5" height="8" stroke="currentColor" />
        <rect x="11.5" y="3" width="2.5" height="11" stroke="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Motion system',
    desc: 'Choreographed transitions, documented in code.',
    Icon: () => (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
        <path d="M2 12C4 8 8 8 8 12C8 8 12 8 14 4" stroke="currentColor" strokeLinecap="round" />
        <circle cx="2" cy="12" r="1" fill="currentColor" />
        <circle cx="14" cy="4" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Component library',
    desc: 'Type-safe, themed, ready to extend.',
    Icon: () => (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
        <rect x="2" y="2" width="5" height="5" stroke="currentColor" />
        <rect x="9" y="2" width="5" height="5" stroke="currentColor" />
        <rect x="2" y="9" width="5" height="5" stroke="currentColor" />
        <rect x="9" y="9" width="5" height="5" stroke="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Form integrations',
    desc: 'Resend, Postmark, your CRM - wired and tested.',
    Icon: () => (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
        <rect x="2" y="3" width="12" height="10" rx="1" stroke="currentColor" />
        <path d="M2 5L8 9L14 5" stroke="currentColor" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Editorial sourcing',
    desc: 'Licensed photography or commissioned shoots.',
    Icon: () => (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
        <rect x="2" y="4" width="12" height="9" rx="1" stroke="currentColor" />
        <circle cx="8" cy="9" r="2.5" stroke="currentColor" />
        <rect x="6" y="2.5" width="4" height="2" rx="0.4" stroke="currentColor" />
      </svg>
    ),
  },
  {
    label: '30 days of polish',
    desc: 'Bug fixes, tweaks, second-guesses - included.',
    Icon: () => (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="currentColor" />
        <path d="M8 5V8L10.5 9.5" stroke="currentColor" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Source code yours',
    desc: 'Git history, design files, brand book - handed over.',
    Icon: () => (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
        <path d="M3 5L6 8L3 11M7 11H13" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

/**
 * Shopify-Editions style icon + label feature grid. Dense, scannable, builds
 * trust without bloat.
 */
export function EverySiteShipsWith() {
  return (
    <section className="relative bg-paper-200/30 py-28 md:py-36">
      <div className="container-wide">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <span className="eyebrow">- Every site we ship</span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-6 font-display text-display-lg text-balance text-ink-700">
                Twelve things,
                <br />
                <span className="italic text-ash-500">without asking.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <Reveal delay={2}>
              <p className="text-pretty text-base leading-relaxed text-ash-500">
                Not add-ons. Not tiered. Not contingent on the contract
                size. Every Swash site ships with the list below - from the
                starter to the flagship.
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-card border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {FEATURES.map((f, i) => (
            <FeatureCell key={f.label} feature={f} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function FeatureCell({ feature, index }: { feature: Feature; index: number }) {
  const { Icon } = feature;
  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group flex h-full flex-col gap-3 bg-paper-100 p-6 transition-colors duration-500 hover:bg-paper-50 md:p-7"
    >
      <div className="flex items-center justify-between">
        <span className="grid h-9 w-9 place-items-center rounded-pill border border-hairline text-ink-400 transition-colors duration-500 group-hover:border-lime-300 group-hover:text-lime-300">
          <Icon />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash-500">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <h3 className="font-display text-xl tracking-tight text-ink-700">
        {feature.label}
      </h3>
      <p className="text-pretty text-sm leading-relaxed text-ash-500">
        {feature.desc}
      </p>
    </motion.li>
  );
}
