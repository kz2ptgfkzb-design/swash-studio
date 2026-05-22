'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Feature, getCategoryById } from '@/data/features';
import { cn } from '@/lib/utils';

const ACCENT_GRADIENT: Record<string, string> = {
  lime: 'from-glow-lime/30 via-glow-lime/5 to-transparent',
  violet: 'from-glow-violet/30 via-glow-violet/5 to-transparent',
  aqua: 'from-glow-aqua/30 via-glow-aqua/5 to-transparent',
  peach: 'from-glow-peach/30 via-glow-peach/5 to-transparent',
};

const ACCENT_TEXT: Record<string, string> = {
  lime: 'text-glow-lime',
  violet: 'text-glow-violet',
  aqua: 'text-glow-aqua',
  peach: 'text-glow-peach',
};

const STATUS_LABEL: Record<Feature['status'], string> = {
  shipping: 'Shipping now',
  'rolling-out': 'Rolling out',
  preview: 'Developer preview',
};

export function FeatureCard({ feature, large = false }: { feature: Feature; large?: boolean }) {
  const cat = getCategoryById(feature.category);
  const accent = cat?.accent ?? 'lime';

  return (
    <Link href={`/features/${feature.slug}`} className={cn('card-feature flex flex-col', large ? 'col-span-2' : '')}>
      <div className="relative aspect-[4/3] overflow-hidden border-b border-ink-700">
        <div className={cn('absolute inset-0 bg-gradient-to-br', ACCENT_GRADIENT[accent])} />
        <div className="absolute inset-0 bg-noise opacity-[0.04]" />

        <FeatureVisual variant={feature.slug} accent={accent} />

        <div className="absolute left-5 top-5 flex items-center gap-2">
          <span className={cn('font-mono text-[10px] uppercase tracking-[0.18em]', ACCENT_TEXT[accent])}>
            {cat?.label}
          </span>
        </div>
        <div className="absolute right-5 top-5">
          <span className="rounded-pill border border-bone-50/10 bg-ink-950/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-bone-200 backdrop-blur">
            {STATUS_LABEL[feature.status]}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6 md:p-7">
        <h3 className="font-display text-2xl tracking-tight text-bone-50 transition-colors duration-300 group-hover:text-glow-lime md:text-3xl">
          {feature.name}
        </h3>
        <p className="text-pretty text-sm leading-relaxed text-bone-300 md:text-base">
          {feature.tagline}
        </p>

        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="link-arrow text-sm">
            Read the spec
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone-500">
            {feature.slug}
          </span>
        </div>
      </div>
    </Link>
  );
}

function FeatureVisual({ variant, accent }: { variant: string; accent: string }) {
  // Original abstract visuals per feature — generated, not copied.
  switch (variant) {
    case 'compose-studio':
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-6 grid-rows-4 gap-1 p-8 w-full h-full">
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: i % 5 === 0 ? 0.9 : 0.18, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.02 }}
                className={cn(
                  'rounded border border-bone-50/15',
                  i % 5 === 0 && 'bg-bone-50/80 border-bone-50/0',
                  i % 7 === 0 && 'col-span-2',
                )}
              />
            ))}
          </div>
        </div>
      );
    case 'beacon-checkout':
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-10">
          {[100, 80, 60, 40].map((w, i) => (
            <motion.div
              key={i}
              initial={{ width: 0 }}
              whileInView={{ width: `${w}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
              className="h-2.5 rounded-full bg-bone-50/80"
            />
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-2 h-9 w-32 rounded-pill bg-glow-violet text-center text-xs leading-9 text-ink-950"
          >
            Pay → 0.4s
          </motion.div>
        </div>
      );
    case 'aurora-ai':
      return (
        <div className="absolute inset-0 grid place-items-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="relative h-40 w-40"
          >
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <span
                key={deg}
                className="absolute left-1/2 top-1/2 h-24 w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-t from-transparent via-glow-lime to-transparent"
                style={{ transform: `translate(-50%, -50%) rotate(${deg}deg)` }}
              />
            ))}
            <span className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bone-50 mix-blend-difference" />
          </motion.div>
        </div>
      );
    case 'insight-pulse':
      return (
        <div className="absolute inset-0 flex items-end justify-around gap-1.5 px-8 pb-12">
          {[35, 55, 40, 70, 50, 90, 60, 80, 45, 95, 65, 75].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="w-2.5 rounded-sm bg-glow-aqua/80"
            />
          ))}
        </div>
      );
    case 'threadlink':
      return (
        <div className="absolute inset-0 grid place-items-center">
          <svg viewBox="0 0 200 200" className="h-48 w-48 text-bone-50">
            {[40, 70, 100, 130, 160].map((y, i) => (
              <motion.line
                key={i}
                x1="20"
                y1={y}
                x2="180"
                y2={y}
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="3 4"
                opacity={0.4}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: i * 0.1 }}
              />
            ))}
            {[
              [40, 50],
              [120, 70],
              [80, 100],
              [150, 130],
              [60, 160],
            ].map(([x, y], i) => (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="5"
                fill="currentColor"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.08 }}
              />
            ))}
          </svg>
        </div>
      );
    case 'halocast':
      return (
        <div className="absolute inset-0 grid grid-cols-3 gap-2 p-8">
          {['Email', 'SMS', 'Push'].map((ch, i) => (
            <motion.div
              key={ch}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col justify-between rounded-md border border-bone-50/15 bg-ink-950/40 p-3"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone-300">{ch}</p>
              <div className="space-y-1.5">
                <div className="h-1 w-full rounded-full bg-bone-50/40" />
                <div className="h-1 w-3/4 rounded-full bg-bone-50/30" />
                <div className="h-1 w-1/2 rounded-full bg-bone-50/20" />
              </div>
            </motion.div>
          ))}
        </div>
      );
    case 'pinpoint-search':
      return (
        <div className="absolute inset-0 grid place-items-center p-8">
          <div className="w-full max-w-[280px] space-y-2">
            <div className="rounded-md border border-bone-50/20 bg-ink-950/60 p-3 font-mono text-xs text-bone-100">
              <span className="text-bone-500">›</span> warm winter coat for hiking
            </div>
            {['Trailhead Insulated Parka', 'Aspen Down Anorak', 'Frostline Shell, Mid-weight'].map((r, i) => (
              <motion.div
                key={r}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="rounded border border-bone-50/10 bg-ink-900/50 px-3 py-2 text-xs text-bone-200"
              >
                {r}
              </motion.div>
            ))}
          </div>
        </div>
      );
    case 'cortex-api':
      return (
        <div className="absolute inset-0 grid place-items-center px-6">
          <pre className="font-mono text-[10px] leading-relaxed text-bone-200 md:text-xs">
{`> cortex.cart.add({
    items: [{ id, qty }],
    market: "JP",
  });

✓ 47ms — single round-trip`}
          </pre>
        </div>
      );
    case 'loom-loyalty':
      return (
        <div className="absolute inset-0 grid place-items-center p-8">
          <div className="relative h-32 w-32">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-dashed border-bone-50/40"
            />
            <div className="absolute inset-4 grid place-items-center rounded-full bg-glow-peach/20">
              <div className="grid place-items-center rounded-full bg-glow-peach text-ink-950 h-20 w-20 font-display text-2xl">
                ✦
              </div>
            </div>
          </div>
        </div>
      );
    case 'mirror-mode':
      return (
        <div className="absolute inset-0 grid grid-cols-2 gap-4 p-8">
          {['A', 'B'].map((v, i) => (
            <motion.div
              key={v}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col justify-between rounded-lg border border-bone-50/15 bg-ink-950/40 p-4"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone-400">Variant {v}</span>
              <p className="font-display text-3xl text-bone-50">{i === 0 ? '2.8%' : '4.1%'}</p>
            </motion.div>
          ))}
        </div>
      );
    case 'pulsegate':
      return (
        <div className="absolute inset-0 grid place-items-center p-8">
          <div className="w-full max-w-[260px] space-y-2 font-mono text-[11px]">
            <div className="flex items-center justify-between text-bone-200">
              <span>LCP</span>
              <span className="text-glow-lime">1.4s ↓</span>
            </div>
            <div className="flex items-center justify-between text-bone-200">
              <span>INP</span>
              <span className="text-glow-lime">112ms ↓</span>
            </div>
            <div className="flex items-center justify-between text-bone-200">
              <span>CLS</span>
              <span className="text-glow-lime">0.03 ↓</span>
            </div>
            <div className="mt-4 rounded-md border border-glow-lime/40 bg-glow-lime/10 px-3 py-2 text-glow-lime">
              ✓ Budget passed
            </div>
          </div>
        </div>
      );
    case 'atlas-markets':
      return (
        <div className="absolute inset-0 grid place-items-center">
          <svg viewBox="0 0 200 120" className="h-32 w-48 text-bone-50">
            <motion.path
              d="M10,80 Q40,40 70,60 T130,40 T190,55"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8 }}
            />
            {[
              [25, 75],
              [70, 60],
              [110, 50],
              [150, 45],
              [185, 55],
            ].map(([x, y], i) => (
              <motion.g
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.12 }}
              >
                <circle cx={x} cy={y} r="4" fill="currentColor" />
                <circle cx={x} cy={y} r="9" fill="none" stroke="currentColor" strokeOpacity="0.3" />
              </motion.g>
            ))}
          </svg>
        </div>
      );
    default:
      return (
        <div className="absolute inset-0 grid place-items-center">
          <div className="h-24 w-24 rounded-full border border-bone-50/20" />
        </div>
      );
  }
}
