'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { SwashMark } from './SwashMark';
import { Magnetic } from './Magnetic';
import { RevealText, RevealBlock } from './RevealText';

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const markY = useTransform(scrollYProgress, [0, 1], [0, 320]);
  const markRotate = useTransform(scrollYProgress, [0, 1], [-8, 18]);
  const markScale = useTransform(scrollYProgress, [0, 1], [1, 0.78]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);

  return (
    <section
      ref={ref}
      id="overview"
      className="relative isolate min-h-[100svh] overflow-hidden grain"
    >

      <div className="container-wide relative z-10 flex min-h-[100svh] flex-col justify-between pb-12 pt-32">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-pill bg-lime-300 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-paper-100"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-paper-100 animate-pulse-soft" />
            Brief intake open
          </motion.div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-ash-500 md:block"
          >
            127 sites shipped · 6 industries · 1 standard
          </motion.span>
        </div>

        <motion.div
          aria-hidden
          style={{ y: markY, rotate: markRotate, scale: markScale }}
          className="pointer-events-none absolute right-2 top-[12%] hidden md:block lg:right-10"
        >
          <SwashMark size={560} variant="default" />
        </motion.div>

        <motion.div style={{ y: titleY, opacity: titleOpacity }} className="space-y-10 md:max-w-[72%]">
          <h1 className="font-display text-ink-700">
            <span className="block text-display-2xl">
              <RevealText text="Add a" mode="word" stagger={0.08} delay={0.2} duration={1.0} />
            </span>
            <span className="block text-display-2xl italic">
              <span className="underline-swash">
                <RevealBlock delay={0.45}>swash</RevealBlock>
              </span>{' '}
              <RevealBlock delay={0.55} className="text-ash-500">to it.</RevealBlock>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
          >
            <p className="max-w-md text-balance text-base leading-relaxed text-ash-500 md:text-lg">
              A boutique studio that builds websites - and the brands and
              motion that go with them. We&rsquo;ve shipped for HVAC
              dispatchers, DTC skincare lines, neighborhood bakeries, and
              Series-A SaaS teams. Tell us the brief; we&rsquo;ll do the rest.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Magnetic strength={0.3}>
                <Link href="/brief" className="btn-primary" data-cursor="link">
                  Start a brief
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </Magnetic>
              <Magnetic strength={0.22}>
                <Link href="/work" className="btn-ghost" data-cursor="link">
                  See the work
                </Link>
              </Magnetic>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center"
      >
        <div className="flex flex-col items-center gap-2 text-ash-500">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
            Scroll
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
