'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <>
      {/* Curtain sweeping up to reveal the next page */}
      <motion.div
        aria-hidden
        initial={{ y: 0 }}
        animate={{ y: '-100%' }}
        transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: 0.05 }}
        className="pointer-events-none fixed inset-0 z-[90] bg-paper-100"
      />
      <motion.div
        aria-hidden
        initial={{ y: 0 }}
        animate={{ y: '-100%' }}
        transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
        className="pointer-events-none fixed inset-0 z-[89] bg-lime-300"
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
