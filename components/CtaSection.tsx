'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';

export function CtaSection() {
  return (
    <section id="ship" className="relative py-32 md:py-44">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[28px] border border-ink-700 bg-ink-900 px-8 py-20 md:px-16 md:py-32">
          <motion.div
            aria-hidden
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
            className="pointer-events-none absolute -right-[20%] -top-[40%] h-[140%] w-[140%]"
          >
            <div className="absolute inset-0 rounded-full bg-aurora opacity-70 blur-2xl" />
          </motion.div>

          <div className="relative grid items-end gap-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <Reveal>
                <span className="eyebrow">05 — Take it home</span>
              </Reveal>
              <Reveal delay={1}>
                <h2 className="mt-6 font-display text-display-xl leading-[0.92] tracking-tighter text-bone-50">
                  Drop your own
                  <br />
                  <span className="gradient-text">edition</span> into this shell.
                </h2>
              </Reveal>
              <Reveal delay={2}>
                <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-bone-300">
                  Aurora Editions is a template — every page, animation,
                  color, and content block is yours to rebrand. Built on
                  Next.js, Tailwind, and Framer Motion. Ships with a
                  documented data layer so swapping in your own features
                  takes minutes, not days.
                </p>
              </Reveal>
            </div>

            <div className="md:col-span-5">
              <Reveal delay={3}>
                <div className="space-y-4">
                  <ul className="space-y-3 text-sm text-bone-200">
                    {[
                      'Next.js 14 App Router + TypeScript',
                      'Tailwind, Framer Motion, Lenis smooth-scroll',
                      'Drop-in data layer for features and categories',
                      'Light/dark ready, fully responsive, type-safe',
                    ].map((b) => (
                      <li key={b} className="flex items-center gap-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-glow-lime" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap items-center gap-3 pt-4">
                    <Link href="#" className="btn-primary">
                      Buy the template
                    </Link>
                    <Link href="/about" className="btn-ghost">
                      Read the spec
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
