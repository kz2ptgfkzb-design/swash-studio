'use client';

import { motion, type Variants, useInView } from 'framer-motion';
import { ReactNode, useEffect, useRef, useState } from 'react';

const baseVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.06,
    },
  }),
};

export function Reveal({
  children,
  delay = 0,
  className = '',
  as: As = 'div',
  amount = 0.05,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'p' | 'section' | 'article' | 'span' | 'li';
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    amount,
    margin: '0px 0px -5% 0px',
  });
  const [forced, setForced] = useState(false);

  // Fallback: if the observer hasn't fired within 1.4s of mount (e.g. user
  // deep-linked into a section and the IntersectionObserver didn't trigger),
  // reveal anyway so content is never stuck at opacity 0.
  useEffect(() => {
    const t = window.setTimeout(() => setForced(true), 1400);
    return () => window.clearTimeout(t);
  }, []);

  const MotionComp = motion[As as 'div'];
  return (
    <MotionComp
      ref={ref as never}
      variants={baseVariants}
      initial="hidden"
      animate={inView || forced ? 'visible' : 'hidden'}
      custom={delay}
      className={className}
    >
      {children}
    </MotionComp>
  );
}
