'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { SwashMark } from './SwashMark';

const STORAGE_KEY = 'swash:preloader-v1';
const TOTAL_DURATION = 2600;

export function Preloader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    if (typeof window === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(false);
      return;
    }

    const seen = sessionStorage.getItem(STORAGE_KEY);
    if (seen) {
      setVisible(false);
      return;
    }

    sessionStorage.setItem(STORAGE_KEY, '1');

    // Lock scroll during preloader
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const t = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = prevOverflow;
    }, TOTAL_DURATION);

    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Avoid hydration mismatch - preloader only renders client-side
  if (!hasMounted) return null;
  if (pathname?.startsWith('/preview/')) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="fixed inset-0 z-[100]"
        >
          {/* Top curtain */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.85, ease: [0.65, 0, 0.35, 1] }}
            className="absolute inset-x-0 top-0 h-[50.5%] bg-paper-100"
          />
          {/* Bottom curtain */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.85, ease: [0.65, 0, 0.35, 1] }}
            className="absolute inset-x-0 bottom-0 h-[50.5%] bg-paper-100"
          />

          {/* Subtle paper grain on curtains */}
          <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.04] mix-blend-overlay" />

          {/* Centerpiece */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, -4] }}
              transition={{
                times: [0, 0.2, 0.78, 1],
                duration: TOTAL_DURATION / 1000 - 0.4,
                ease: [0.65, 0, 0.35, 1],
              }}
              className="flex flex-col items-center gap-6"
            >
              <SwashMark size={140} variant="default" />

              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-display italic text-3xl tracking-tight text-ink-700"
              >
                Swash
              </motion.span>

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.4 }}
                className="font-mono text-[10px] uppercase tracking-[0.32em] text-ash-400"
              >
                - add a swash to it -
              </motion.span>
            </motion.div>
          </div>

          {/* Hairline that draws across the seam */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.0, delay: 0.4, ease: [0.65, 0, 0.35, 1] }}
            className="absolute left-0 right-0 top-1/2 h-px origin-left bg-lime-300"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
