'use client';

import { motion, type Variants } from 'framer-motion';
import { ReactNode } from 'react';

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
  amount = 0.2,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'p' | 'section' | 'article' | 'span' | 'li';
  amount?: number;
}) {
  const MotionComp = motion[As as 'div'];
  return (
    <MotionComp
      variants={baseVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      custom={delay}
      className={className}
    >
      {children}
    </MotionComp>
  );
}
