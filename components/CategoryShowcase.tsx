'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CATEGORIES, FEATURES, getCategoryById } from '@/data/features';
import { useState } from 'react';
import { FeatureCard } from './FeatureCard';
import { Reveal } from './Reveal';
import { cn } from '@/lib/utils';

export function CategoryShowcase() {
  const [active, setActive] = useState<string>('storefront');
  const filtered = FEATURES.filter((f) => f.category === active).slice(0, 4);
  const cat = getCategoryById(active);

  return (
    <section id="categories" className="relative py-24 md:py-36">
      <div className="container-wide">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <span className="eyebrow">02 — Edition Map</span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-6 font-display text-display-lg leading-[0.96] tracking-tight text-bone-50">
                Six categories.
                <br />
                <span className="italic font-normal text-bone-400">Pick a thread.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={2}>
              <p className="text-pretty text-base leading-relaxed text-bone-300">
                Every release is filed against one of six categories. Tap a
                category to preview what landed there — or jump straight to
                the full directory.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={3}>
          <div className="mt-12 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={cn('chip', active === c.id && 'chip-active')}
              >
                {c.label}
                <span className="text-bone-500">
                  {FEATURES.filter((f) => f.category === c.id).length.toString().padStart(2, '0')}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 grid gap-8 md:grid-cols-12"
        >
          <div className="md:col-span-3">
            <div className="sticky top-24 space-y-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-400">
                {cat?.label}
              </span>
              <p className="font-display text-2xl leading-snug tracking-tight text-bone-100">
                {cat?.description}
              </p>
              <Link
                href={`/features?cat=${active}`}
                className="link-arrow"
              >
                See all in {cat?.label}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="grid gap-5 md:col-span-9 md:grid-cols-2">
            {filtered.map((f) => (
              <FeatureCard key={f.slug} feature={f} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
