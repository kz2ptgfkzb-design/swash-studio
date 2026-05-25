'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Variant = 'default' | 'ink' | 'paper' | 'red' | 'gold' | 'lime';

const PALETTE: Record<Variant, string> = {
  default: '#F4EEDF',  // bone cream - main mark on dark bg
  ink:     '#F4EEDF',  // alias
  paper:   '#0A0908',  // dark mark - for light cards
  red:     '#FF5C44',
  gold:    '#FFC247',
  lime:    '#C8FE3D',
};

export function SwashMark({
  size = 96,
  variant = 'default',
  animate = true,
  className,
  strokeWidth,
}: {
  size?: number;
  variant?: Variant;
  animate?: boolean;
  className?: string;
  strokeWidth?: number;
}) {
  const stroke = PALETTE[variant];
  const sw = strokeWidth ?? Math.max(8, Math.min(14, size * 0.06));

  return (
    <motion.svg
      width={size}
      height={size * 0.78}
      viewBox="0 0 240 188"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Swash"
      className={cn('block select-none overflow-visible', className)}
      initial={animate ? { opacity: 0 } : false}
      animate={animate ? { opacity: 1 } : undefined}
      transition={{ duration: 0.3 }}
    >
      {/* Pre-entry flourish - thin lead-in */}
      <motion.path
        d="M 8 84 C 20 78, 32 76, 44 72"
        stroke={stroke}
        strokeWidth={sw * 0.45}
        strokeLinecap="round"
        fill="none"
        initial={animate ? { pathLength: 0 } : false}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
      />

      {/* Main calligraphic S body - the heart of the mark */}
      <motion.path
        d="M 44 72 C 70 36, 144 30, 176 60 C 200 84, 138 116, 84 124 C 44 130, 92 158, 162 160 C 184 161, 200 168, 196 180"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={animate ? { pathLength: 0 } : false}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{
          duration: 1.4,
          delay: 0.25,
          ease: [0.65, 0, 0.35, 1],
        }}
      />

      {/* Trailing swash flourish - exit curl */}
      <motion.path
        d="M 196 180 C 208 184, 222 184, 230 174 C 234 168, 234 160, 228 154"
        stroke={stroke}
        strokeWidth={sw * 0.45}
        strokeLinecap="round"
        fill="none"
        initial={animate ? { pathLength: 0 } : false}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{
          duration: 0.7,
          delay: 1.4,
          ease: [0.65, 0, 0.35, 1],
        }}
      />

      {/* Signature dot - the period after the swash */}
      <motion.circle
        cx="218"
        cy="148"
        r={sw * 0.32}
        fill={stroke}
        initial={animate ? { scale: 0, opacity: 0 } : false}
        animate={animate ? { scale: 1, opacity: 1 } : undefined}
        transition={{
          duration: 0.45,
          delay: 2.0,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      />
    </motion.svg>
  );
}
