'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Feature, getCategoryById } from '@/data/features';
import { cn } from '@/lib/utils';

const ACCENT: Record<string, { glow: string; text: string }> = {
  lime: { glow: 'bg-glow-lime/20', text: 'text-glow-lime' },
  violet: { glow: 'bg-glow-violet/20', text: 'text-glow-violet' },
  aqua: { glow: 'bg-glow-aqua/20', text: 'text-glow-aqua' },
  peach: { glow: 'bg-glow-peach/20', text: 'text-glow-peach' },
};

export function FeatureHero({ feature }: { feature: Feature }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const cat = getCategoryById(feature.category);
  const accent = ACCENT[cat?.accent ?? 'lime'];

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-ink-950 pt-40 pb-24 md:pt-48 md:pb-32 grain"
    >
      <motion.div
        style={{ y: orbY }}
        aria-hidden
        className={cn(
          'pointer-events-none absolute -right-[15%] -top-[10%] h-[90vmin] w-[90vmin] rounded-full blur-3xl',
          accent.glow,
        )}
      />
      <motion.div
        aria-hidden
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute -left-[20%] -bottom-[20%] h-[70vmin] w-[70vmin] rounded-full bg-glow-violet/10 blur-3xl"
      />

      <motion.div style={{ y: titleY }} className="container-wide relative z-10">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={cn('chip', accent.text, 'border-current/40 bg-current/10')}
        >
          {feature.hero.eyebrow}
        </motion.span>

        <h1 className="mt-8 max-w-[18ch] font-display text-display-xl leading-[0.92] tracking-tighter text-bone-50">
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            {feature.name}.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="block italic font-normal text-bone-400"
          >
            {feature.hero.title}
          </motion.span>
        </h1>
      </motion.div>
    </section>
  );
}
