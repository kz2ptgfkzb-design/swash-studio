'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useRef, MouseEvent } from 'react';

export function TiltCard({
  children,
  intensity = 8,
  scale = 1.012,
  className,
  glare = true,
}: {
  children: ReactNode;
  intensity?: number;
  scale?: number;
  className?: string;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xs = useSpring(x, { stiffness: 200, damping: 26, mass: 0.6 });
  const ys = useSpring(y, { stiffness: 200, damping: 26, mass: 0.6 });

  // Tilt
  const rotateX = useTransform(ys, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(xs, [-0.5, 0.5], [-intensity, intensity]);

  // Glare position (radial-gradient follows the cursor)
  const glareX = useTransform(xs, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(ys, [-0.5, 0.5], ['0%', '100%']);

  // Scale
  const sx = useMotionValue(1);
  const sxs = useSpring(sx, { stiffness: 220, damping: 30 });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onEnter() {
    sx.set(scale);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
    sx.set(1);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        rotateX,
        rotateY,
        scale: sxs,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      className={className}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
          style={{
            background: 'radial-gradient(220px circle at var(--glare-x) var(--glare-y), rgba(255,255,255,0.22), transparent 60%)',
            ['--glare-x' as never]: glareX,
            ['--glare-y' as never]: glareY,
            mixBlendMode: 'overlay',
          }}
          whileHover={{ opacity: 1 }}
        />
      )}
    </motion.div>
  );
}
