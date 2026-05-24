'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const NUM_POINTS = 22;
const FRICTION = 0.78;
const SPRING = 0.32;

type Point = { x: number; y: number; vx: number; vy: number };

export function CursorTrail() {
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -100, y: -100, active: false });
  const pointsRef = useRef<Point[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(hover: hover)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.scale(dpr, dpr);
    }
    resize();
    window.addEventListener('resize', resize);

    pointsRef.current = Array.from({ length: NUM_POINTS }, () => ({
      x: -100, y: -100, vx: 0, vy: 0,
    }));

    const onMove = (e: MouseEvent) => {
      if (!mouseRef.current.active) {
        // Seed all points at the first mouse position so the trail doesn't
        // snap in from off-screen.
        pointsRef.current.forEach((p) => {
          p.x = e.clientX;
          p.y = e.clientY;
        });
        mouseRef.current.active = true;
      }
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    const onLeave = () => { mouseRef.current.active = false; };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);

    const tick = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const points = pointsRef.current;
      let prevX = mouseRef.current.x;
      let prevY = mouseRef.current.y;

      // Spring-chase: each point eases toward the previous one
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.vx = (p.vx + (prevX - p.x) * SPRING) * FRICTION;
        p.vy = (p.vy + (prevY - p.y) * SPRING) * FRICTION;
        p.x += p.vx;
        p.y += p.vy;
        prevX = p.x;
        prevY = p.y;
      }

      // Draw tapered calligraphic stroke through the chain
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#F4EEDF';

      for (let i = 0; i < points.length - 1; i++) {
        const a = points[i];
        const b = points[i + 1];
        const t = i / points.length;
        const width = (1 - t) * 7 + 0.6;
        const alpha = (1 - t) * 0.9;
        ctx.lineWidth = width;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo(
          a.x, a.y,
          (a.x + b.x) / 2,
          (a.y + b.y) / 2,
        );
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', resize);
    };
  }, []);

  if (pathname?.startsWith('/preview/')) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[55]"
    />
  );
}
