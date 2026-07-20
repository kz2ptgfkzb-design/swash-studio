'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const LINES = [
  'now: taking briefs',
  'now: polishing the Mit-Mak build',
  'now: refining the R.E. Michel build',
  'now: sketching the next demo brand',
  'now: 48h from brief to video demo',
];

const ROTATE_MS = 4400;

/**
 * Small rotating "currently shipping" line that lives in the navbar.
 * Cycles through real-feeling work-in-progress lines on a timer so the
 * studio reads as alive, not static.
 */
export function NowIndicator({ className = '' }: { className?: string }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => {
      setIdx(i => (i + 1) % LINES.length);
    }, ROTATE_MS);
    return () => window.clearInterval(t);
  }, []);

  return (
    <div
      className={`hidden items-center gap-2.5 rounded-pill border border-hairline bg-paper-100/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ash-500 backdrop-blur md:inline-flex ${className}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inset-0 animate-ping rounded-full bg-ink_red-400/60" />
        <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-ink_red-400" />
      </span>
      <span className="relative h-3.5 w-[230px] overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={idx}
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-110%', opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 truncate"
          >
            {LINES[idx]}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}
