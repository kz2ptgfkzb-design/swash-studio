'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const subY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 240]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="overview"
      className="relative isolate min-h-[100svh] overflow-hidden bg-ink-950 grain"
    >
      <motion.div
        style={{ y: orbY }}
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-aurora opacity-90"
      />
      <motion.div
        aria-hidden
        animate={{
          rotate: [0, 360],
        }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute -left-[20%] top-[10%] h-[80vmin] w-[80vmin] rounded-full bg-glow-violet/10 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{
          rotate: [360, 0],
        }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute -right-[15%] bottom-[5%] h-[70vmin] w-[70vmin] rounded-full bg-glow-lime/10 blur-3xl"
      />

      <motion.div
        style={{ opacity }}
        className="container-wide relative z-10 flex min-h-[100svh] flex-col justify-between pb-12 pt-32"
      >
        <div className="flex items-center justify-between">
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="chip"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-glow-lime animate-pulse-soft" />
            Winter 2026 — Edition 014
          </motion.span>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden font-mono text-xs uppercase tracking-[0.18em] text-bone-400 md:block"
          >
            58 shipped · 12 in preview · 04 markets
          </motion.span>
        </div>

        <motion.div style={{ y: titleY }} className="space-y-8">
          <h1 className="font-display text-display-2xl tracking-tighter text-bone-50">
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              Every release.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="block italic font-normal text-bone-300"
            >
              every refinement,
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="block gradient-text"
            >
              one season.
            </motion.span>
          </h1>

          <motion.div
            style={{ y: subY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end"
          >
            <p className="max-w-md text-balance text-base leading-relaxed text-bone-300 md:text-lg">
              The Winter edition gathers a season of work — new surfaces, new
              primitives, and the quiet improvements you only notice when you
              stop having to think about them.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/features" className="btn-primary">
                Browse all 70 features
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/changelog" className="btn-ghost">
                Read the changelog
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center"
      >
        <div className="flex flex-col items-center gap-2 text-bone-400">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
            Scroll to drop in
          </span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="block h-6 w-px bg-current"
          />
        </div>
      </motion.div>
    </section>
  );
}
