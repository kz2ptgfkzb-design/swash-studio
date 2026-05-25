'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const DEFAULTS: Record<string, string> = {
  link:  'open',
  image: 'view',
  lab:   'drag',
  drag:  'drag',
  send:  'send',
  next:  'next',
  prev:  'prev',
};

/**
 * Small text label that rides next to the cursor on data-cursor elements.
 * Hidden by default; appears on hover with a short label inherited from
 * the data-cursor / data-cursor-label attribute.
 */
export function CursorLabel() {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(hover: hover)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    function onMove(e: MouseEvent) {
      tx = e.clientX;
      ty = e.clientY;
      const t = e.target as HTMLElement | null;
      if (!t || !t.closest) {
        setLabel('');
        setVisible(false);
        return;
      }
      const el = t.closest('[data-cursor]') as HTMLElement | null;
      if (!el) {
        setLabel('');
        setVisible(false);
        return;
      }
      const kind = el.dataset.cursor || '';
      const explicit = el.dataset.cursorLabel;
      const next = explicit ?? DEFAULTS[kind] ?? '';
      setLabel(next);
      setVisible(next !== '');
    }

    function tick() {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      const el = ref.current;
      if (el) {
        el.style.transform = `translate3d(${cx + 22}px, ${cy + 22}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (pathname?.startsWith('/preview/')) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none fixed left-0 top-0 z-[58] rounded-pill bg-ink-700 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-paper-100 transition-opacity duration-200 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ willChange: 'transform' }}
    >
      {label || '·'}
    </div>
  );
}
