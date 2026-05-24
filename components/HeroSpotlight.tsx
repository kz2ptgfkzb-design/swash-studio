'use client';

import { useEffect, useRef } from 'react';

export function HeroSpotlight({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(hover: hover)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = ref.current;
    if (!el) return;

    let raf: number | null = null;
    let targetX = 0.5;
    let targetY = 0.4;
    let currX = 0.5;
    let currY = 0.4;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      targetX = (e.clientX - rect.left) / rect.width;
      targetY = (e.clientY - rect.top) / rect.height;
    };

    const tick = () => {
      currX += (targetX - currX) * 0.08;
      currY += (targetY - currY) * 0.08;
      el.style.setProperty('--spx', `${(currX * 100).toFixed(2)}%`);
      el.style.setProperty('--spy', `${(currY * 100).toFixed(2)}%`);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      if (raf != null) cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className ?? ''}`}
      style={{
        background:
          'radial-gradient(560px circle at var(--spx, 50%) var(--spy, 40%), rgba(200,254,61,0.10), transparent 55%), radial-gradient(900px circle at calc(100% - var(--spx, 50%)) calc(100% - var(--spy, 40%)), rgba(255,92,68,0.06), transparent 55%)',
      }}
    />
  );
}
