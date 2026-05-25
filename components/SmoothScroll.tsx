'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export function SmoothScroll() {
  useEffect(() => {
    if (typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Lenis is only used here for programmatic smooth scrolling (chapter
    // nav, in-page anchors). Wheel + touch use the browser's native
    // scrolling - it's GPU-accelerated, 120Hz-capable, and never blocks
    // on a JS frame. Mixing in JS-driven wheel smoothing was the source
    // of the "skippy" feel.
    const lenis = new Lenis({
      smoothWheel: false,
      syncTouch: false,
    });

    // Expose for programmatic scrollTo from other components
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let raf = 0;
    function tick(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return null;
}
