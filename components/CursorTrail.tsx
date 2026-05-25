'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { paletteFor, pickFromPalette, scrollProgress } from '@/lib/ambient-palette';

/**
 * Quiet, immaculate cursor: a short tapered ink ribbon with a small
 * spring-chased dot at the head.
 *
 * Tuning rationale (the prior version whipped through 360s on sharp
 * direction changes because the chain was too long and under-damped):
 *  - Shorter chain (14 points instead of 26) - tail can't lap the head.
 *  - Lower stiffness, higher per-frame damping - the chain converges
 *    instead of orbiting.
 *  - Velocity is zeroed below a small threshold each frame so points
 *    settle clean when the cursor is still.
 *  - Head dot tracks 1:1 with no orbital lag of its own.
 *  - Smaller head + smaller halo so it reads as a confident cursor,
 *    not a comet.
 */

const NUM_POINTS = 14;
const STIFFNESS_HEAD = 0.34;   // first segment - closest to cursor
const STIFFNESS_TAIL = 0.22;   // last segment - looser, prettier curve
const FRICTION = 0.62;          // 1 - per-frame damping; lower = settles faster
const STILL_THRESHOLD = 0.04;   // px/frame velocity below this snaps to rest
const HEAD_RADIUS = 3;
const HALO_RADIUS = 8;          // gentle inner glow, not a spotlight
const MAX_WIDTH = 2.4;

type Point = { x: number; y: number; vx: number; vy: number };

export function CursorTrail() {
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -500, y: -500, hasMoved: false });
  const pointsRef = useRef<Point[]>([]);
  const rafRef = useRef<number | null>(null);
  const visibleRef = useRef(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(hover: hover)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = window.innerWidth;
    let h = window.innerHeight;

    function resize() {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    pointsRef.current = Array.from({ length: NUM_POINTS }, () => ({
      x: -500, y: -500, vx: 0, vy: 0,
    }));

    const isFormField = (el: EventTarget | null) => {
      if (!el || !(el instanceof HTMLElement)) return false;
      const tag = el.tagName;
      return (
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT' ||
        el.isContentEditable
      );
    };

    const onMove = (e: MouseEvent) => {
      visibleRef.current = !isFormField(e.target);
      if (!mouseRef.current.hasMoved) {
        for (const p of pointsRef.current) {
          p.x = e.clientX;
          p.y = e.clientY;
        }
        mouseRef.current.hasMoved = true;
      }
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const onLeave  = () => { visibleRef.current = false; };
    const onEnter  = () => { visibleRef.current = true;  };
    const onBlur   = () => { visibleRef.current = false; };
    const onFocusIn = (e: FocusEvent) => {
      if (isFormField(e.target)) visibleRef.current = false;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);
    window.addEventListener('blur', onBlur);
    document.addEventListener('focusin', onFocusIn);

    // Resolve the current smoke color from the same palette logic AmbientFluid
    // uses - independent path, no CSS-var handshake required.
    function ambientColor(): [number, number, number] {
      const palette = paletteFor(window.location.pathname);
      const [r, g, b] = pickFromPalette(palette, scrollProgress());
      return [
        Math.round(Math.max(0, Math.min(1, r)) * 255),
        Math.round(Math.max(0, Math.min(1, g)) * 255),
        Math.round(Math.max(0, Math.min(1, b)) * 255),
      ];
    }

    // Smoothed RGB the trail actually paints with - lerps toward ambient
    let smoothRGB: [number, number, number] = ambientColor();

    function pickColor(): [number, number, number] {
      // If the cursor is over a bright surface, swap to dark ink for contrast.
      const x = mouseRef.current.x;
      const y = mouseRef.current.y;
      const ambient = ambientColor();
      if (x < 0 || y < 0) return ambient;
      const el = document.elementFromPoint(x, y) as HTMLElement | null;
      if (!el) return ambient;
      let cur: HTMLElement | null = el;
      let bg = '';
      while (cur) {
        const c = getComputedStyle(cur).backgroundColor;
        if (c && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent') { bg = c; break; }
        cur = cur.parentElement;
      }
      if (!bg) return ambient;
      const m = bg.match(/rgba?\(([^)]+)\)/);
      if (!m) return ambient;
      const [br, bgg, bb] = m[1].split(',').map(v => parseFloat(v));
      const L = (0.2126 * br + 0.7152 * bgg + 0.0722 * bb) / 255;
      return L > 0.62 ? [10, 9, 8] : ambient;
    }

    function rgbToHex(c: [number, number, number]) {
      const r = Math.max(0, Math.min(255, Math.round(c[0])));
      const g = Math.max(0, Math.min(255, Math.round(c[1])));
      const b = Math.max(0, Math.min(255, Math.round(c[2])));
      return `rgb(${r}, ${g}, ${b})`;
    }

    let sampleCounter = 0;
    let targetRGB: [number, number, number] = ambientColor();

    // Track scroll velocity - skip the expensive elementFromPoint sample
    // while the user is mid-flick. picks up again once the page settles.
    let lastScrollY = window.scrollY;
    let lastScrollT = performance.now();
    let scrollFastUntil = 0;
    function onScroll() {
      const now = performance.now();
      const dt = Math.max(1, now - lastScrollT);
      const dy = Math.abs(window.scrollY - lastScrollY);
      const v = dy / dt; // px/ms
      if (v > 0.8) scrollFastUntil = now + 120;
      lastScrollY = window.scrollY;
      lastScrollT = now;
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    let lastMoveT = 0;
    const origOnMove = onMove;
    const wrappedMove = (e: MouseEvent) => {
      lastMoveT = performance.now();
      origOnMove(e);
    };
    window.removeEventListener('mousemove', onMove);
    window.addEventListener('mousemove', wrappedMove, { passive: true });

    const tick = () => {
      // Idle short-circuit: if cursor hasn't moved in 240ms AND the chain
      // is settled AND the colour isn't still lerping, skip every draw
      // call this frame. Saves a clearRect + 12 bezier strokes when
      // nothing's actually happening - frees the compositor for scroll.
      const tnow = performance.now();
      const cursorIdle = tnow - lastMoveT > 240;
      let chainSettled = true;
      if (cursorIdle) {
        const pts = pointsRef.current;
        for (let i = 0; i < pts.length; i++) {
          if (Math.abs(pts[i].vx) > 0.05 || Math.abs(pts[i].vy) > 0.05) {
            chainSettled = false;
            break;
          }
        }
      }
      const colorSettled =
        Math.abs(targetRGB[0] - smoothRGB[0]) < 0.5 &&
        Math.abs(targetRGB[1] - smoothRGB[1]) < 0.5 &&
        Math.abs(targetRGB[2] - smoothRGB[2]) < 0.5;
      if (cursorIdle && chainSettled && colorSettled && visibleRef.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      ctx.clearRect(0, 0, w, h);

      if (visibleRef.current && mouseRef.current.hasMoved) {
        // Re-sample the target color every ~32 frames (~half-second at 60fps)
        // - the page colour shifts slowly, so we don't need to spam
        // elementFromPoint. Also skip while the user is mid-flick so the
        // sample doesn't force a layout during scroll.
        const now = performance.now();
        if ((sampleCounter++ & 31) === 0 && now >= scrollFastUntil) {
          targetRGB = pickColor();
        }
        // Lerp smoothRGB toward targetRGB so transitions feel like smoke,
        // not a hard switch.
        const k = 0.06;
        smoothRGB = [
          smoothRGB[0] + (targetRGB[0] - smoothRGB[0]) * k,
          smoothRGB[1] + (targetRGB[1] - smoothRGB[1]) * k,
          smoothRGB[2] + (targetRGB[2] - smoothRGB[2]) * k,
        ];
        const strokeCache = rgbToHex(smoothRGB);

        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        const points = pointsRef.current;
        let prevX = mx;
        let prevY = my;

        // Spring chase - interpolate stiffness from head (snappy) to tail (loose)
        for (let i = 0; i < points.length; i++) {
          const p = points[i];
          const t = i / Math.max(1, points.length - 1);
          const k = STIFFNESS_HEAD + (STIFFNESS_TAIL - STIFFNESS_HEAD) * t;
          p.vx = (p.vx + (prevX - p.x) * k) * FRICTION;
          p.vy = (p.vy + (prevY - p.y) * k) * FRICTION;
          // Hard-stop when velocity drops below visible threshold - kills the
          // residual orbits that look like random 360s.
          if (Math.abs(p.vx) < STILL_THRESHOLD) p.vx = 0;
          if (Math.abs(p.vy) < STILL_THRESHOLD) p.vy = 0;
          p.x += p.vx;
          p.y += p.vy;
          prevX = p.x;
          prevY = p.y;
        }

        // Draw the trail as quadratic-curve segments between midpoints
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = strokeCache;

        for (let i = 0; i < points.length - 2; i++) {
          const t = i / (points.length - 2);
          const taper = Math.pow(1 - t, 1.5);
          const width = Math.max(0.3, MAX_WIDTH * taper);
          const alpha = Math.max(0, 0.85 * taper);
          const a = points[i];
          const b = points[i + 1];
          const c = points[i + 2];
          const mid1x = (a.x + b.x) / 2;
          const mid1y = (a.y + b.y) / 2;
          const mid2x = (b.x + c.x) / 2;
          const mid2y = (b.y + c.y) / 2;
          ctx.lineWidth = width;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.moveTo(mid1x, mid1y);
          ctx.quadraticCurveTo(b.x, b.y, mid2x, mid2y);
          ctx.stroke();
        }

        // Soft inner glow (small - not a spotlight)
        const halo = ctx.createRadialGradient(mx, my, 0, mx, my, HALO_RADIUS);
        halo.addColorStop(0, hexToRgba(strokeCache, 0.35));
        halo.addColorStop(1, hexToRgba(strokeCache, 0));
        ctx.globalAlpha = 1;
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(mx, my, HALO_RADIUS, 0, Math.PI * 2);
        ctx.fill();

        // Head dot - tracks the cursor exactly (no extra lag)
        ctx.globalAlpha = 1;
        ctx.fillStyle = strokeCache;
        ctx.beginPath();
        ctx.arc(mx, my, HEAD_RADIUS, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 1;
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', wrappedMove);
      window.removeEventListener('scroll', onScroll);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      window.removeEventListener('blur', onBlur);
      document.removeEventListener('focusin', onFocusIn);
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

function hexToRgba(c: string, a: number) {
  if (c.startsWith('#')) {
    const hex = c.slice(1);
    const n = hex.length === 3
      ? hex.split('').map(h => parseInt(h + h, 16))
      : [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
    return `rgba(${n[0]}, ${n[1]}, ${n[2]}, ${a})`;
  }
  const m = c.match(/rgba?\(([^)]+)\)/);
  if (!m) return c;
  const [r, g, b] = m[1].split(',').map(v => parseFloat(v));
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
