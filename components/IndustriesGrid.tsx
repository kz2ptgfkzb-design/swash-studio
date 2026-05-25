'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';

const INDUSTRIES = [
  { label: 'Home services',         q: 'home-services', sub: 'HVAC · plumbing · roofing · landscaping' },
  { label: 'Ecommerce',             q: 'ecommerce',     sub: 'DTC · retail · marketplace' },
  { label: 'Dropshipping',          q: 'dropshipping',  sub: 'Single-product · multi-product' },
  { label: 'Restaurant',            q: 'restaurant',    sub: 'Cafés · bars · hotels · catering' },
  { label: 'Professional services', q: 'professional',  sub: 'Law · accounting · consulting' },
  { label: 'Healthcare',            q: 'healthcare',    sub: 'Practices · clinics · wellness' },
  { label: 'Real estate',           q: 'real-estate',   sub: 'Brokerages · agents · listings' },
  { label: 'SaaS or product',       q: 'saas',          sub: 'Software · apps · tech products' },
  { label: 'Creator or personal',   q: 'creator',       sub: 'Portfolios · newsletters' },
  { label: 'Nonprofit',             q: 'nonprofit',     sub: 'Mission-driven · donation flows' },
  { label: 'Education',             q: 'education',     sub: 'Tutoring · courses · academies' },
  { label: 'Whatever you are',      q: '',              sub: "Tell us in the brief" },
];

export function IndustriesGrid() {
  return (
    <section id="industries" className="relative py-16 sm:py-24 md:py-40">
      <div className="container-page">
        <div className="grid items-end gap-6 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <Reveal>
              <span className="eyebrow">Who we build for</span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-4 font-display text-display-lg text-balance text-ink-700 sm:mt-6">
                Every industry.
                <br />
                <span className="italic text-ash-500">No favorites.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={2}>
              <p className="text-pretty text-sm leading-relaxed text-ash-500 sm:text-base">
                We start every brief category-blind. Same care for the
                bakery and the SaaS team. Same engineering rigor for the
                HVAC dispatch site and the luxury skincare drop.
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-card border border-hairline bg-hairline sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((it, i) => (
            <Reveal key={it.label} delay={i % 3}>
              <li className="group relative bg-paper-100 transition-colors duration-300 hover:bg-paper-50">
                <Link
                  href={it.q ? `/brief?industry=${it.q}` : '/brief'}
                  data-cursor="link"
                  className="flex h-full flex-col justify-between gap-5 p-5 sm:gap-8 sm:p-7 md:p-9"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash-400">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <motion.span
                      initial={{ x: -6, opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                      className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink_red-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    >
                      → Start a brief
                    </motion.span>
                  </div>
                  <div>
                    <p className="font-display text-xl text-ink-700 sm:text-2xl md:text-3xl">
                      {it.label}
                    </p>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ash-400 sm:text-[11px]">
                      {it.sub}
                    </p>
                  </div>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={4}>
          <p className="mt-10 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-ash-400">
            None of the above? - <Link href="/brief" className="text-ink-700 underline decoration-ink_red-400 underline-offset-4" data-cursor="link">Tell us in the brief.</Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
