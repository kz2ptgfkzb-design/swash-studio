'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Reveal } from './Reveal';
import { cn } from '@/lib/utils';

const TOP_FAQ = [
  {
    q: 'What happens in the first 48 hours?',
    a: 'We read your brief the same day. Within 48 hours we send a recorded video walkthrough of a real, working preview of your site - designed, coded, hosted on a private link. Watch it, click through, send back any changes.',
  },
  {
    q: 'What if I want changes to the demo?',
    a: 'Send notes in any format - text, voice memo, scribbled screenshots. Each revision turns in 24 hours with a fresh recording. Unlimited rounds until you sign off. No call required, no extra cost.',
  },
  {
    q: "Why don't you publish prices?",
    a: 'A fixed tag forces every brief into the same box. We scope to the brief. Tell us your budget; we will tell you what fits - never quietly stretching past it.',
  },
  {
    q: 'Who actually does the work?',
    a: 'A skilled in-house team of web developers and brand designers. No subcontractors, no offshoring, no junior swap-ins - the same team from kickoff to launch.',
  },
  {
    q: 'Can I get ongoing updates after launch?',
    a: '30 days of polish included on every engagement. After that, we offer a monthly retainer covering up to 3 major tweaks per month (new sections, design changes, integrations) plus unlimited minor fixes. Month-to-month, cancel anytime. Or hand off cleanly - your call.',
  },
];

export function FaqTeaser() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-16 sm:py-24 md:py-40">
      <div className="container-page">
        <div className="grid items-start gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <Reveal>
              <span className="eyebrow">Questions, asked</span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-4 font-display text-display-lg text-balance text-ink-700 sm:mt-6">
                The five
                <br />
                <span className="italic text-ash-500">we hear most.</span>
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-5 max-w-sm text-pretty text-sm leading-relaxed text-ash-500 sm:mt-6 sm:text-base">
                More on the full FAQ - grouped by pricing, process,
                after-launch, and fit.
              </p>
              <Link href="/faq" className="link-arrow mt-6 text-sm" data-cursor="link">
                Read every question
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <ul className="overflow-hidden rounded-card border border-hairline bg-paper-50/40">
              {TOP_FAQ.map((it, i) => {
                const isOpen = open === i;
                return (
                  <Reveal key={it.q} delay={i}>
                    <li className="border-b border-hairline last:border-b-0">
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : i)}
                        data-cursor="link"
                        aria-expanded={isOpen}
                        className="group flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-paper-50 sm:gap-6 sm:px-6 sm:py-6 md:px-9 md:py-7"
                      >
                        <span
                          className={cn(
                            'font-display text-lg text-ink-700 transition-colors sm:text-xl md:text-2xl',
                            isOpen && 'text-ink_red-400',
                          )}
                        >
                          {it.q}
                        </span>
                        <span
                          className={cn(
                            'shrink-0 grid h-9 w-9 place-items-center rounded-pill border transition-all duration-500 ease-silk',
                            isOpen
                              ? 'rotate-45 border-ink_red-400 bg-ink_red-400 text-paper-50'
                              : 'border-hairline text-ink-400 group-hover:border-ink-700/40',
                          )}
                          aria-hidden
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                          </svg>
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              height: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                              opacity: { duration: 0.3 },
                            }}
                            className="overflow-hidden"
                          >
                            <p className="px-5 pb-6 pr-10 text-pretty text-sm leading-relaxed text-ash-500 sm:px-6 sm:pb-7 sm:pr-16 sm:text-base md:px-9">
                              {it.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
