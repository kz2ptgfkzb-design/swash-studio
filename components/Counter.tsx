'use client';

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

export function Counter({
  to,
  duration = 1.6,
  prefix = '',
  suffix = '',
  format = 'number',
}: {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  format?: 'number' | 'comma';
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const v = useMotionValue(0);

  const display = useTransform(v, (latest) => {
    const n = Math.round(latest);
    const formatted = format === 'comma' ? n.toLocaleString('en-US') : String(n);
    return `${prefix}${formatted}${suffix}`;
  });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(v, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, to, duration, v]);

  return <motion.span ref={ref}>{display}</motion.span>;
}
