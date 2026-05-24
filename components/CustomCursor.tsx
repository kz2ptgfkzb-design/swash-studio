'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type CursorState = 'default' | 'link' | 'text' | 'image';

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const xs = useSpring(x, { stiffness: 380, damping: 30, mass: 0.4 });
  const ys = useSpring(y, { stiffness: 380, damping: 30, mass: 0.4 });

  const [state, setState] = useState<CursorState>('default');
  const [hidden, setHidden] = useState(true);
  const lastTarget = useRef<Element | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(hover: hover)').matches) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (hidden) setHidden(false);

      const t = (e.target as Element | null) ?? null;
      if (t === lastTarget.current) return;
      lastTarget.current = t;

      const interactive = t?.closest('[data-cursor]') as HTMLElement | null;
      const role = interactive?.dataset.cursor as CursorState | undefined;

      if (role) {
        setState(role);
        return;
      }

      const link = t?.closest('a, button, [role="button"]');
      if (link) {
        setState('link');
        return;
      }

      const text = t?.closest('p, li, input, textarea, h1, h2, h3, h4, h5, h6');
      if (text) {
        setState('text');
        return;
      }

      setState('default');
    };

    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, [hidden, x, y]);

  return (
    <motion.div
      aria-hidden
      className="cursor-glove"
      data-state={state}
      data-hidden={hidden}
      style={{ x: xs, y: ys }}
    />
  );
}
