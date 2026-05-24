'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { WorkItem } from '@/data/work';
import { TiltCard } from './TiltCard';
import { cn } from '@/lib/utils';

const ACCENT_BG: Record<WorkItem['accent'], string> = {
  ink: 'bg-paper-50',
  saffron: 'bg-saffron-300',
  olive: 'bg-[#5C6B47]',
  rust: 'bg-[#B6553F]',
  sage: 'bg-[#7C8F77]',
};

const ACCENT_TEXT: Record<WorkItem['accent'], string> = {
  ink: 'text-ink-700',
  saffron: 'text-paper-50',
  olive: 'text-ink-700',
  rust: 'text-ink-700',
  sage: 'text-ink-700',
};

export function WorkCard({ item }: { item: WorkItem }) {
  return (
    <TiltCard intensity={6} scale={1.015} glare className="relative">
      <Link
        href={`/work/${item.slug}`}
        data-cursor="image"
        className="group relative block overflow-hidden rounded-card border border-hairline bg-paper-200/60 transition-colors duration-500 ease-silk hover:border-ink-700/30 hover:bg-paper-200"
      >
        <div
          className={cn(
            'relative aspect-[5/4] overflow-hidden border-b border-hairline',
            ACCENT_BG[item.accent],
            ACCENT_TEXT[item.accent],
          )}
        >
          <div className="absolute inset-0 bg-noise opacity-[0.07] mix-blend-overlay" />

          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <WorkVisual variant={item.slug} accent={item.accent} />
          </motion.div>

          <div className="absolute left-6 top-6 flex items-center gap-2">
            <span className="rounded-pill bg-paper-100/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] backdrop-blur-sm">
              {item.industry}
            </span>
          </div>
          <div className="absolute right-6 top-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-70">
              {item.year}
            </span>
          </div>

          {item.metric && (
            <div className="absolute bottom-6 left-6 right-6 flex items-baseline justify-between">
              <p className="font-display text-4xl leading-none tracking-tight md:text-5xl">
                {item.metric.value}
              </p>
              <p className="max-w-[50%] text-right font-mono text-[10px] uppercase tracking-[0.16em] opacity-80">
                {item.metric.label}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5 p-7">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-2xl tracking-tight text-ink-700 transition-colors duration-300 group-hover:text-lime-300 md:text-3xl">
              {item.client}
            </h3>
          </div>
          <p className="text-pretty text-sm leading-relaxed text-ash-500">
            {item.summary}
          </p>
          <div className="flex items-center justify-between border-t border-hairline pt-5">
            <ul className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ash-400">
              {item.scope.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ash-400 transition-colors group-hover:text-lime-300">
              View →
            </span>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}

function WorkVisual({ variant }: { variant: string; accent: WorkItem['accent'] }) {
  switch (variant) {
    case 'apex-mechanical':
      return (
        <div className="absolute inset-0 grid place-items-center">
          <svg viewBox="0 0 200 160" className="h-2/3 w-2/3">
            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.65 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {[20, 40, 60, 80, 100, 120].map((y, i) => (
                <line key={i} x1="10" y1={y} x2="190" y2={y} stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" />
              ))}
              <path d="M40 130 L100 30 L160 130 Z" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="100" cy="80" r="6" fill="currentColor" />
            </motion.g>
          </svg>
        </div>
      );
    case 'saltwater-co':
      return (
        <div className="absolute inset-0 grid place-items-center">
          <svg viewBox="0 0 200 160" className="h-2/3 w-3/4">
            <motion.g
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4 }}
            >
              {[40, 60, 80, 100, 120].map((y, i) => (
                <motion.path
                  key={i}
                  d={`M10 ${y} Q 50 ${y - 15}, 100 ${y} T 190 ${y}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity={0.3 + i * 0.12}
                />
              ))}
            </motion.g>
          </svg>
        </div>
      );
    case 'kilncraft':
      return (
        <div className="absolute inset-0 grid place-items-center">
          <motion.div
            initial={{ rotate: -8, scale: 0.8 }}
            whileInView={{ rotate: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-32 w-32 rounded-full border-2 border-current"
          >
            <div className="absolute inset-3 rounded-full border border-current/40" />
            <p className="absolute inset-0 grid place-items-center font-display text-5xl italic">
              K
            </p>
          </motion.div>
        </div>
      );
    case 'tidemark-realty':
      return (
        <div className="absolute inset-0 grid grid-cols-3 gap-2 p-10">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: i === 2 ? '90%' : i === 1 ? '60%' : '45%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="self-end rounded-t-sm border border-current bg-current/20"
            />
          ))}
        </div>
      );
    case 'overlay-labs':
      return (
        <div className="absolute inset-0 grid place-items-center px-8">
          <svg viewBox="0 0 200 100" className="w-full">
            <motion.path
              d="M0 80 L40 60 L70 70 L100 30 L140 50 L170 20 L200 35"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6 }}
            />
            {[
              [0, 80], [40, 60], [70, 70], [100, 30], [140, 50], [170, 20], [200, 35],
            ].map(([x, y], i) => (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="3"
                fill="currentColor"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
              />
            ))}
          </svg>
        </div>
      );
    case 'mira-skin':
      return (
        <div className="absolute inset-0 grid place-items-center">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative"
          >
            <div className="h-32 w-20 rounded-[40%] border-2 border-current" />
            <div className="absolute left-1/2 top-0 h-3 w-10 -translate-x-1/2 -translate-y-1 rounded-b-sm bg-current" />
            <p className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display italic text-xl">
              mira
            </p>
          </motion.div>
        </div>
      );
    default:
      return (
        <div className="absolute inset-0 grid place-items-center">
          <div className="h-24 w-24 rounded-full border-2 border-current" />
        </div>
      );
  }
}
