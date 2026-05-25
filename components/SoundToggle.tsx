'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'swash:sound-v1';

type Mode = 'on' | 'off';

/**
 * Web Audio synthesized UI sounds - no asset files.
 *
 * Off by default, opt-in via the corner toggle. When on, hovers and clicks
 * on data-cursor elements produce tiny ticks; route changes get a soft
 * swoosh. Respects prefers-reduced-motion.
 */
export function SoundToggle() {
  const [mode, setMode] = useState<Mode>('off');
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const lastHoverRef = useRef<number>(0);
  const pathname = usePathname();
  const initial = useRef(true);

  // Hydration-safe initial read
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const saved = localStorage.getItem(STORAGE_KEY) as Mode | null;
    if (saved === 'on' || saved === 'off') setMode(saved);
  }, []);

  // Build / tear-down audio context
  useEffect(() => {
    if (mode !== 'on') {
      if (ctxRef.current) {
        ctxRef.current.close().catch(() => {});
        ctxRef.current = null;
        masterRef.current = null;
      }
      return;
    }

    type WindowWithLegacy = Window & { webkitAudioContext?: typeof AudioContext };
    const AC: typeof AudioContext | undefined =
      typeof window === 'undefined'
        ? undefined
        : window.AudioContext || (window as WindowWithLegacy).webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    const master = ctx.createGain();
    master.gain.value = 0.13;
    master.connect(ctx.destination);
    ctxRef.current = ctx;
    masterRef.current = master;

    return () => {
      ctx.close().catch(() => {});
      ctxRef.current = null;
      masterRef.current = null;
    };
  }, [mode]);

  function tick(freq = 1800, dur = 0.035, gain = 0.18) {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;
    const t0 = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, t0);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.55, t0 + dur);
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(gain, t0 + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g).connect(master);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  function pop(freq = 220, dur = 0.13, gain = 0.32) {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;
    const t0 = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq * 3.2, t0);
    osc.frequency.exponentialRampToValueAtTime(freq, t0 + dur);
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(gain, t0 + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g).connect(master);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  function swoosh() {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;
    const t0 = ctx.currentTime;
    // Filtered noise burst
    const buf = ctx.createBuffer(1, ctx.sampleRate * 0.6, ctx.sampleRate);
    const ch = buf.getChannelData(0);
    for (let i = 0; i < ch.length; i++) ch[i] = (Math.random() * 2 - 1) * (1 - i / ch.length);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(900, t0);
    filter.frequency.exponentialRampToValueAtTime(2400, t0 + 0.5);
    filter.Q.value = 8;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(0.18, t0 + 0.06);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.55);
    src.connect(filter).connect(g).connect(master);
    src.start(t0);
    src.stop(t0 + 0.6);
  }

  // Global hover/click listeners
  useEffect(() => {
    if (mode !== 'on') return;

    function onPointerOver(e: PointerEvent) {
      const t = e.target as HTMLElement | null;
      if (!t || !t.closest) return;
      const el = t.closest('[data-cursor]');
      if (!el) return;
      const now = performance.now();
      if (now - lastHoverRef.current < 40) return;
      lastHoverRef.current = now;
      tick(1600 + Math.random() * 600, 0.03, 0.12);
    }
    function onClick(e: MouseEvent) {
      const t = e.target as HTMLElement | null;
      if (!t || !t.closest) return;
      if (!t.closest('[data-cursor], button, a')) return;
      pop(260, 0.11, 0.3);
    }

    document.addEventListener('pointerover', onPointerOver);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('click', onClick);
    };
  }, [mode]);

  // Route-change swoosh
  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }
    if (mode === 'on') swoosh();
  }, [pathname, mode]);

  function toggle() {
    setMode(m => {
      const next: Mode = m === 'on' ? 'off' : 'on';
      try { localStorage.setItem(STORAGE_KEY, next); } catch {}
      return next;
    });
  }

  if (pathname?.startsWith('/preview/')) return null;

  return (
    <button
      onClick={toggle}
      aria-label={mode === 'on' ? 'Mute UI sounds' : 'Enable UI sounds'}
      aria-pressed={mode === 'on'}
      data-cursor="link"
      className="group fixed bottom-5 right-5 z-[80] inline-flex h-11 items-center gap-2 rounded-pill border border-hairline bg-paper-100/85 px-3.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ash-500 backdrop-blur transition-all duration-300 ease-silk hover:border-lime-300/60 hover:text-ink-700"
    >
      <span
        aria-hidden
        className={`relative flex h-2.5 w-2.5 items-center justify-center`}
      >
        <span
          className={`absolute inset-0 rounded-full ${mode === 'on' ? 'bg-lime-300' : 'bg-ash-500/50'}`}
        />
        {mode === 'on' && (
          <span className="absolute inset-0 animate-ping rounded-full bg-lime-300/60" />
        )}
      </span>
      {mode === 'on' ? 'sound · on' : 'sound · off'}
    </button>
  );
}
