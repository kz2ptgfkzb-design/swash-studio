'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';
import { SwashMark } from './SwashMark';
import { Magnetic } from './Magnetic';

export function BriefCtaSection() {
  return (
    <section id="cta" className="relative py-28 md:py-40">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[28px] bg-ink-700 px-8 py-20 text-paper-50 md:px-16 md:py-32">
          <motion.div
            aria-hidden
            initial={{ opacity: 0, rotate: -20 }}
            whileInView={{ opacity: 0.18, rotate: -8 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4 }}
            className="pointer-events-none absolute -right-[12%] top-[-18%] hidden md:block"
          >
            <SwashMark size={680} variant="ink" animate={false} />
          </motion.div>

          <div className="absolute inset-0 bg-noise opacity-[0.04] mix-blend-overlay pointer-events-none" />

          <div className="relative grid items-end gap-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <Reveal>
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold-200">
                  Add a swash
                </span>
              </Reveal>
              <Reveal delay={1}>
                <h2 className="mt-6 font-display text-display-xl text-balance text-paper-50">
                  Tell us the brief.
                  <br />
                  <span className="italic text-paper-200/70">
                    We&rsquo;ll do the rest.
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={2}>
                <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-paper-200/80">
                  Five minutes of writing on your end. A proposal in your
                  inbox within 48 hours. No pricing menu. No hard sell.
                  Just a written scope, fixed fee, and an honest yes-or-no.
                </p>
              </Reveal>
            </div>

            <div className="md:col-span-5">
              <Reveal delay={3}>
                <ul className="space-y-3 text-sm text-paper-200/85">
                  {[
                    'Fixed-fee proposal in 48 hours',
                    'Brand, site, and motion in one engagement',
                    'Live preview link from day one of the build',
                    '30 days of polish included post-launch',
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-ink_red-300 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Magnetic strength={0.25}>
                    <Link
                      href="/brief"
                      className="btn bg-ink_red-400 text-paper-50 px-6 py-3.5 hover:bg-paper-50 hover:text-ink-700 hover:-translate-y-0.5"
                      data-cursor="link"
                    >
                      Start a brief
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </Magnetic>
                  <Link
                    href="mailto:hello@swash.studio"
                    className="btn border border-paper-50/20 text-paper-50 px-6 py-3.5 hover:border-paper-50 hover:bg-paper-50/5"
                    data-cursor="link"
                  >
                    Email us instead
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
