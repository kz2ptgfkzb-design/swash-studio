'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Reveal } from './Reveal';

export function SpotlightSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 1.04]);

  return (
    <section id="spotlight" ref={ref} className="relative overflow-hidden py-32 md:py-44">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-aurora opacity-50" />

      <div className="container-page relative">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <span className="eyebrow">03 — Headliner</span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-6 font-display text-display-xl leading-[0.92] tracking-tighter text-bone-50">
                The release we cleared a season for.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={2}>
              <p className="text-pretty text-base leading-relaxed text-bone-300">
                Once a year, we hold space at the front of the edition for a
                single piece of work that rewrites the floor of what a
                merchant can do on the platform. This is that piece.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={3}>
          <motion.div
            style={{ y, scale }}
            className="mt-16 grid overflow-hidden rounded-[28px] border border-ink-700 bg-ink-900 md:grid-cols-12"
          >
            <div className="relative aspect-[16/10] overflow-hidden border-b border-ink-700 md:col-span-7 md:aspect-auto md:border-b-0 md:border-r">
              <div className="absolute inset-0 bg-gradient-to-br from-glow-lime/20 via-glow-violet/10 to-transparent" />
              <div className="absolute inset-0 bg-noise opacity-[0.06]" />

              <motion.div
                aria-hidden
                animate={{
                  rotate: 360,
                }}
                transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                className="absolute -right-[15%] -top-[15%] h-[60%] w-[60%]"
              >
                <div className="h-full w-full rounded-full bg-glow-lime/30 blur-3xl" />
              </motion.div>

              <div className="absolute inset-0 flex items-center justify-center p-12">
                <pre className="font-mono text-[11px] leading-relaxed text-bone-100 md:text-sm">
{`aurora ›  build a winter sale page
            for cold-weather basics
            with a 25% discount block

✓  drafted page in 1.2s
✓  reused: Hero, ProductGrid, CountdownStrip
✓  applied: Winter-26 promo theme

   review →   ship →   undo
`}
                </pre>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-10 p-8 md:col-span-5 md:p-12">
              <div>
                <span className="chip">
                  <span className="h-1.5 w-1.5 rounded-full bg-glow-lime animate-pulse-soft" />
                  Headliner
                </span>
                <h3 className="mt-6 font-display text-display-md tracking-tight text-bone-50">
                  Aurora AI
                </h3>
                <p className="mt-4 text-pretty text-base leading-relaxed text-bone-300">
                  A commerce-aware assistant that lives in every workspace.
                  It has read your catalog, watched your funnel, and is
                  fluent in your theme. Ask in plain language. Approve in
                  one click.
                </p>
              </div>

              <ul className="space-y-3">
                {[
                  'Catalog-aware drafting',
                  'In-place theme edits with rollback',
                  'Cohort and campaign authoring',
                ].map((b, i) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-bone-200">
                    <span className="mt-1 grid h-4 w-4 place-items-center rounded-full bg-glow-lime text-ink-950 text-[10px]">
                      {i + 1}
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-3">
                <Link href="/features/aurora-ai" className="btn-primary">
                  Read the spec
                </Link>
                <Link href="/features?cat=ai" className="btn-ghost">
                  More Intelligence work
                </Link>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
