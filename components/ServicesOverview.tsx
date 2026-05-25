'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SERVICES } from '@/data/services';
import { Reveal } from './Reveal';

const CATEGORY_LABEL: Record<string, string> = {
  brand: 'Brand',
  site: 'Site',
  motion: 'Motion',
  growth: 'Growth',
};

export function ServicesOverview() {
  return (
    <section id="services" className="relative py-16 sm:py-24 md:py-40">
      <div className="container-wide">
        <div className="grid items-end gap-6 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <Reveal>
              <span className="eyebrow">What we do</span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-4 font-display text-display-lg text-balance text-ink-700 sm:mt-6">
                Six services.
                <br />
                <span className="italic text-ash-500">One studio.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <Reveal delay={2}>
              <p className="text-pretty text-sm leading-relaxed text-ash-500 sm:text-base">
                Bundle them or pick one. Most engagements pair a brand
                with a site; some are audits, some are launch pages, some
                are pure motion work. The proposal makes the shape clear.
              </p>
              <Link href="/services" className="link-arrow mt-6 text-sm" data-cursor="link">
                Read every service
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </Reveal>
          </div>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-card border border-hairline bg-hairline sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={i % 3}>
              <li
                className="group relative flex h-full flex-col gap-4 bg-paper-100 p-5 transition-colors duration-500 ease-silk hover:bg-paper-50 sm:gap-5 sm:p-7 md:p-9"
                data-cursor="link"
              >
                <Link
                  href={`/services#${s.slug}`}
                  className="absolute inset-0 z-10"
                  aria-label={s.title}
                />
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink_red-400">
                    {String(i + 1).padStart(2, '0')} · {CATEGORY_LABEL[s.category]}
                  </span>
                  <motion.span
                    className="font-mono text-[10px] uppercase tracking-[0.18em] text-ash-400 transition-colors group-hover:text-ink-700"
                  >
                    {s.duration}
                  </motion.span>
                </div>
                <h3 className="font-display text-xl tracking-tight text-ink-700 sm:text-2xl md:text-3xl">
                  {s.title}
                </h3>
                <p className="text-pretty text-sm leading-relaxed text-ash-500">
                  {s.tagline}
                </p>
                <div className="mt-auto pt-4 border-t border-hairline">
                  <span className="link-arrow text-xs">
                    Read the spec
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
