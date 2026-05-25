'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ } from '@/data/faq';
import { Reveal } from '@/components/Reveal';
import { Magnetic } from '@/components/Magnetic';
import { cn } from '@/lib/utils';

export default function FaqPage() {
  const [open, setOpen] = useState<string | null>(`${FAQ[0].id}-0`);
  const [activeGroup, setActiveGroup] = useState(FAQ[0].id);

  const group = FAQ.find((g) => g.id === activeGroup) ?? FAQ[0];

  return (
    <>
      <section className="relative pt-24 pb-10 sm:pt-32 sm:pb-16 md:pt-40">
        <div className="container-page">
          <div className="grid items-end gap-6 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <p className="eyebrow">FAQ</p>
              <h1 className="mt-4 font-display text-display-xl text-balance text-ink-700 sm:mt-6">
                Everything you&rsquo;d ask
                <br />
                <span className="italic text-ash-500">on the first call.</span>
              </h1>
            </div>
            <div className="md:col-span-5">
              <p className="text-pretty text-sm leading-relaxed text-ash-500 sm:text-base">
                Grouped into pricing, process, after-launch, and fit.
                Nothing hidden, nothing dressed up. If something is
                missing, ask us in the brief or by email.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-10 sm:py-16">
        <div className="grid gap-8 md:grid-cols-12 md:gap-12">
          <aside className="md:col-span-3">
            <ul className="flex gap-1 overflow-x-auto pb-2 sm:sticky sm:top-28 sm:block sm:space-y-1 sm:overflow-visible sm:pb-0">
              {FAQ.map((g) => {
                const active = g.id === activeGroup;
                return (
                  <li key={g.id} className="shrink-0 sm:shrink">
                    <button
                      onClick={() => setActiveGroup(g.id)}
                      data-cursor="link"
                      className={cn(
                        'flex w-full items-center justify-between gap-3 whitespace-nowrap rounded-pill px-4 py-2 text-left text-sm transition-all duration-300 sm:py-3',
                        active
                          ? 'bg-ink-700 text-paper-50'
                          : 'text-ink-400 hover:bg-paper-200/60 hover:text-ink-700',
                      )}
                    >
                      <span className="font-medium">{g.label}</span>
                      <span
                        className={cn(
                          'font-mono text-[10px]',
                          active ? 'text-gold-200' : 'text-ash-400',
                        )}
                      >
                        {String(g.items.length).padStart(2, '0')}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          <div className="md:col-span-9">
            <motion.ul
              key={group.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden rounded-card border border-hairline bg-paper-50/40"
            >
              {group.items.map((it, i) => {
                const id = `${group.id}-${i}`;
                const isOpen = open === id;
                return (
                  <Reveal key={id} delay={i}>
                    <li className="border-b border-hairline last:border-b-0">
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : id)}
                        data-cursor="link"
                        aria-expanded={isOpen}
                        className="group flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-paper-50 sm:gap-6 sm:px-6 sm:py-6 md:px-9 md:py-7"
                      >
                        <span
                          className={cn(
                            'font-display text-lg text-balance text-ink-700 transition-colors sm:text-xl md:text-2xl',
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
            </motion.ul>
          </div>
        </div>
      </section>

      <section className="container-page py-16 pb-20 sm:py-24 sm:pb-32">
        <div className="rounded-card border border-hairline bg-paper-200/40 p-6 text-center sm:p-10 md:p-16">
          <Reveal>
            <p className="eyebrow">Question we missed?</p>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mx-auto mt-4 max-w-[22ch] font-display text-display-lg text-balance text-ink-700 sm:mt-6">
              Tell us in the brief.
              <br />
              <span className="italic text-ash-500">Or email us, either works.</span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <div className="mt-7 flex flex-wrap justify-center gap-3 sm:mt-10">
              <Magnetic strength={0.25}>
                <Link href="/brief" className="btn-primary" data-cursor="link">
                  Start a brief
                </Link>
              </Magnetic>
              <Link href="mailto:hello@swash.studio" className="btn-ghost" data-cursor="link">
                hello@swash.studio
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
