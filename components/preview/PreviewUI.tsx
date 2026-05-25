'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring, type MotionValue, useMotionTemplate } from 'framer-motion';
import { ReactNode, useEffect, useRef, useState, MouseEvent } from 'react';

/**
 * Shared premium primitives for the live demo brands.
 * Each brand passes its own palette/typography in.
 */

/**
 * ScrollAwareNav — wraps a sticky nav header. Background is transparent
 * over the hero, then transitions to a colored backdrop-blur once scrolled
 * past a threshold. The hero image bleeds up underneath.
 */
export function ScrollAwareNav({
  children,
  bg = 'rgba(10,9,8,0.72)',
  border = 'rgba(255,255,255,0.08)',
  threshold = 56,
  className = '',
}: {
  children: ReactNode;
  bg?: string;
  border?: string;
  threshold?: number;
  className?: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${className}`}
      style={{
        background: scrolled ? bg : 'transparent',
        backdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'none',
        borderBottom: `1px solid ${scrolled ? border : 'transparent'}`,
      }}
    >
      {children}
    </header>
  );
}

/**
 * FullBleedHero — an image that runs from y=0 (under the transparent nav)
 * down to the bottom of the section. Scrolling pulls the image upward (parallax)
 * and scales it gently — feels like the cover of a magazine that breathes.
 */
export function FullBleedHero({
  src,
  alt = '',
  children,
  overlays,
  minH = '100svh',
  parallax = 180,
  zoom = 1.08,
  className = '',
}: {
  src: string;
  alt?: string;
  children: ReactNode;
  overlays?: ReactNode;
  minH?: string;
  parallax?: number;
  zoom?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, parallax]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, zoom]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0.4]);

  return (
    <section
      ref={ref}
      className={`relative isolate overflow-hidden ${className}`}
      style={{ minHeight: minH }}
    >
      <motion.div
        aria-hidden
        style={{ y, scale, opacity: fade }}
        className="absolute inset-0 will-change-transform"
      >
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
      </motion.div>
      {overlays}
      <div className="relative z-10 flex h-full min-h-[inherit] flex-col justify-end">
        {children}
      </div>
    </section>
  );
}

/**
 * ParallaxImage — pure scroll-driven y-parallax for in-section photography.
 * Pass `range` to control how aggressively the image moves with scroll.
 */
export function ParallaxImage({
  src,
  alt = '',
  className = '',
  range = 120,
  scaleFrom = 1.05,
  scaleTo = 1.18,
  rounded = '',
  innerClassName = '',
  children,
}: {
  src: string;
  alt?: string;
  className?: string;
  range?: number;
  scaleFrom?: number;
  scaleTo?: number;
  rounded?: string;
  innerClassName?: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [range * 0.5, -range * 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [scaleFrom, scaleTo, scaleFrom]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${rounded} ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ y, scale }}
        className={`absolute inset-0 h-full w-full object-cover will-change-transform ${innerClassName}`}
      />
      {children}
    </div>
  );
}

/**
 * HoverMagnify — wraps a child image and zooms/pans it toward the cursor on
 * hover. Combined with overflow-hidden it gives a gallery a crisp interactive feel.
 */
export function HoverMagnify({
  children,
  className = '',
  scale = 1.08,
}: {
  children: ReactNode;
  className?: string;
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xs = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 });
  const ys = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 });
  const s = useMotionValue(1);
  const ss = useSpring(s, { stiffness: 220, damping: 30 });

  const tx = useTransform(xs, v => v * 14);
  const ty = useTransform(ys, v => v * 14);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onEnter() { s.set(scale); }
  function onLeave() { x.set(0); y.set(0); s.set(1); }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div
        style={{ x: tx, y: ty, scale: ss }}
        className="h-full w-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * ScrollClipReveal — image with a clip-path that opens as the section
 * scrolls into view. Editorial reveal — feels intentional, not gimmicky.
 */
export function ScrollClipReveal({
  src,
  alt = '',
  className = '',
  innerClassName = '',
}: {
  src: string;
  alt?: string;
  className?: string;
  innerClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.4'],
  });
  // 100% (closed) → 0% (open)
  const inset = useTransform(scrollYProgress, [0, 0.55], [100, 0]);
  const clip = useMotionTemplate`inset(0% ${inset}% 0% ${inset}%)`;
  const scale = useTransform(scrollYProgress, [0, 0.55], [1.18, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ clipPath: clip, WebkitClipPath: clip }}
      className={`relative overflow-hidden will-change-[clip-path] ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ scale }}
        className={`absolute inset-0 h-full w-full object-cover ${innerClassName}`}
      />
    </motion.div>
  );
}

/**
 * MagneticHover — spring-based magnetic pull on a wrapper. Use for CTAs
 * and small interactive accents inside demos.
 */
export function MagneticHover({
  children,
  strength = 0.28,
  className = '',
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xs = useSpring(x, { stiffness: 320, damping: 22, mass: 0.4 });
  const ys = useSpring(y, { stiffness: 320, damping: 22, mass: 0.4 });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  }
  function onLeave() { x.set(0); y.set(0); }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: xs, y: ys }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * SectionFadeIn — simple stagger reveal on scroll. Local to demos so we don't
 * pull in the studio's Reveal (which expects different tokens).
 */
export function SectionFadeIn({
  children,
  delay = 0,
  y = 28,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Exported helper: a continuously-driven MotionValue for ambient effects. */
export function useElapsed(): MotionValue<number> {
  const mv = useMotionValue(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = () => {
      mv.set((performance.now() - start) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mv]);
  return mv;
}
