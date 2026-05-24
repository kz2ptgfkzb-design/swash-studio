'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { cn } from '@/lib/utils';

type Mode = 'word' | 'char';

export function RevealText({
  text,
  className,
  mode = 'word',
  delay = 0,
  stagger = 0.06,
  duration = 0.85,
  as: As = 'span',
}: {
  text: string;
  className?: string;
  mode?: Mode;
  delay?: number;
  stagger?: number;
  duration?: number;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'div';
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const parts =
    mode === 'word'
      ? text.split(/(\s+)/) // keep whitespace
      : Array.from(text);

  const Tag = motion[As] as typeof motion.span;

  return (
    <Tag
      ref={ref as never}
      className={cn('inline-block', className)}
      style={{ overflow: 'hidden' }}
    >
      {parts.map((p, i) => {
        if (/^\s+$/.test(p)) {
          return <span key={i}>{p}</span>;
        }
        return (
          <span
            key={i}
            className="relative inline-block overflow-hidden align-bottom"
            style={{ verticalAlign: 'bottom' }}
          >
            <motion.span
              className="inline-block"
              initial={{ y: '110%', opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : undefined}
              transition={{
                duration,
                ease: [0.22, 1, 0.36, 1],
                delay: delay + i * stagger,
              }}
            >
              {p}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}

/** Variant: reveal child node (e.g. <span>italic</span>) by sliding it up from a clipped container. */
export function RevealBlock({
  children,
  className,
  delay = 0,
  duration = 0.85,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <span
      ref={ref}
      className={cn(
        'relative inline-block overflow-hidden align-bottom',
        className,
      )}
      style={{ verticalAlign: 'bottom' }}
    >
      <motion.span
        className="inline-block"
        initial={{ y: '110%' }}
        animate={inView ? { y: 0 } : undefined}
        transition={{ duration, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}
