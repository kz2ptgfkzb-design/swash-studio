'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';

const SILK = [0.65, 0, 0.35, 1] as const;

/**
 * Page-transition: a layered calligraphic sweep - not a flat curtain.
 *
 * Three rotated bands cross the screen in sequence (paper → lime → paper),
 * each with soft mask-fade leading edges so they read as brush strokes.
 * Underneath, the new page slides up and the swash mark briefly flickers
 * dead center while the page is fully covered.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <>
      {/* Band 1 - paper, leading edge */}
      <motion.div
        aria-hidden
        initial={{ x: '-130%', skewX: -12 }}
        animate={{ x: '130%', skewX: -12 }}
        transition={{ duration: 1.15, ease: SILK }}
        className="pointer-events-none fixed -inset-y-[20%] -left-[20%] z-[92] w-[180%] origin-center bg-paper-100"
        style={{
          maskImage:
            'linear-gradient(105deg, transparent 0%, black 6%, black 94%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(105deg, transparent 0%, black 6%, black 94%, transparent 100%)',
        }}
      />

      {/* Band 2 - lime accent, follows just behind */}
      <motion.div
        aria-hidden
        initial={{ x: '-130%', skewX: -12 }}
        animate={{ x: '130%', skewX: -12 }}
        transition={{ duration: 1.15, ease: SILK, delay: 0.08 }}
        className="pointer-events-none fixed -inset-y-[20%] -left-[20%] z-[91] w-[180%] origin-center bg-lime-300"
        style={{
          maskImage:
            'linear-gradient(105deg, transparent 0%, black 4%, black 96%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(105deg, transparent 0%, black 4%, black 96%, transparent 100%)',
        }}
      />

      {/* Band 3 - second paper layer, kills any seam */}
      <motion.div
        aria-hidden
        initial={{ x: '-130%', skewX: -12 }}
        animate={{ x: '130%', skewX: -12 }}
        transition={{ duration: 1.2, ease: SILK, delay: 0.16 }}
        className="pointer-events-none fixed -inset-y-[20%] -left-[20%] z-[90] w-[180%] origin-center bg-paper-100"
      />

      {/* Calligraphic hairline that draws across the seam */}
      <motion.div
        aria-hidden
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 1.0,
          times: [0, 0.2, 0.7, 1],
          delay: 0.32,
          ease: SILK,
        }}
        className="pointer-events-none fixed left-0 right-0 top-1/2 z-[93] h-px origin-left bg-lime-300/80"
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
