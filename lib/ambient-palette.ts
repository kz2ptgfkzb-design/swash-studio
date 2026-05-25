/**
 * Shared palette source of truth for the ambient smoke + components that
 * follow it (cursor trail, etc.). Each route picks a 5-stop palette;
 * scroll progress walks through the stops.
 */

export type Stop = [number, number, number];

export type Palette = {
  a: Stop[];
  b: Stop[];
};

export const HOME: Palette = {
  a: [
    [0.784, 0.996, 0.239],
    [1.000, 0.761, 0.278],
    [0.557, 0.482, 1.000],
    [1.000, 0.361, 0.267],
    [0.784, 0.996, 0.239],
  ],
  b: [
    [1.000, 0.361, 0.267],
    [0.784, 0.996, 0.239],
    [0.157, 0.302, 1.000],
    [1.000, 0.761, 0.278],
    [1.000, 0.361, 0.267],
  ],
};

export const BRIEF: Palette = {
  a: [
    [0.784, 0.996, 0.239],
    [0.784, 0.996, 0.239],
    [1.000, 0.761, 0.278],
    [0.784, 0.996, 0.239],
    [0.784, 0.996, 0.239],
  ],
  b: [
    [1.000, 0.761, 0.278],
    [0.784, 0.996, 0.239],
    [0.784, 0.996, 0.239],
    [1.000, 0.761, 0.278],
    [0.784, 0.996, 0.239],
  ],
};

export const WORK: Palette = {
  a: [
    [0.557, 0.482, 1.000],
    [1.000, 0.361, 0.267],
    [1.000, 0.761, 0.278],
    [0.157, 0.302, 1.000],
    [0.557, 0.482, 1.000],
  ],
  b: [
    [1.000, 0.361, 0.267],
    [1.000, 0.761, 0.278],
    [0.557, 0.482, 1.000],
    [0.557, 0.482, 1.000],
    [1.000, 0.361, 0.267],
  ],
};

export const PROCESS: Palette = {
  a: [
    [0.784, 0.996, 0.239],
    [1.000, 0.761, 0.278],
    [1.000, 0.361, 0.267],
    [0.557, 0.482, 1.000],
    [0.784, 0.996, 0.239],
  ],
  b: [
    [1.000, 0.761, 0.278],
    [1.000, 0.361, 0.267],
    [0.557, 0.482, 1.000],
    [0.784, 0.996, 0.239],
    [1.000, 0.761, 0.278],
  ],
};

export const SERVICES: Palette = {
  a: [
    [0.557, 0.482, 1.000],
    [0.157, 0.302, 1.000],
    [0.784, 0.996, 0.239],
    [0.557, 0.482, 1.000],
    [0.157, 0.302, 1.000],
  ],
  b: [
    [0.157, 0.302, 1.000],
    [0.784, 0.996, 0.239],
    [0.557, 0.482, 1.000],
    [0.157, 0.302, 1.000],
    [0.784, 0.996, 0.239],
  ],
};

export const ABOUT: Palette = {
  a: [
    [0.957, 0.933, 0.875],
    [1.000, 0.761, 0.278],
    [1.000, 0.361, 0.267],
    [1.000, 0.761, 0.278],
    [0.957, 0.933, 0.875],
  ],
  b: [
    [1.000, 0.761, 0.278],
    [1.000, 0.361, 0.267],
    [0.957, 0.933, 0.875],
    [1.000, 0.361, 0.267],
    [1.000, 0.761, 0.278],
  ],
};

export const FAQ: Palette = {
  a: [
    [1.000, 0.361, 0.267],
    [1.000, 0.761, 0.278],
    [0.557, 0.482, 1.000],
    [1.000, 0.761, 0.278],
    [1.000, 0.361, 0.267],
  ],
  b: [
    [1.000, 0.761, 0.278],
    [1.000, 0.361, 0.267],
    [1.000, 0.761, 0.278],
    [0.557, 0.482, 1.000],
    [1.000, 0.761, 0.278],
  ],
};

export const JOURNAL: Palette = {
  a: [
    [0.957, 0.933, 0.875],
    [1.000, 0.761, 0.278],
    [0.957, 0.933, 0.875],
    [1.000, 0.361, 0.267],
    [0.957, 0.933, 0.875],
  ],
  b: [
    [1.000, 0.761, 0.278],
    [0.957, 0.933, 0.875],
    [1.000, 0.761, 0.278],
    [0.957, 0.933, 0.875],
    [1.000, 0.761, 0.278],
  ],
};

export function paletteFor(pathname: string | null): Palette {
  if (!pathname || pathname === '/') return HOME;
  if (pathname.startsWith('/brief')) return BRIEF;
  if (pathname.startsWith('/work')) return WORK;
  if (pathname.startsWith('/process')) return PROCESS;
  if (pathname.startsWith('/services')) return SERVICES;
  if (pathname.startsWith('/about')) return ABOUT;
  if (pathname.startsWith('/faq')) return FAQ;
  if (pathname.startsWith('/journal')) return JOURNAL;
  return HOME;
}

/** Linear interpolate the A-palette by progress 0..1 (mirrors GLSL pickFromStops). */
export function pickFromPalette(p: Palette, progress: number): Stop {
  const t = Math.max(0, Math.min(0.9999, progress));
  const scaled = t * 4;
  const idx = Math.floor(scaled);
  const frac = scaled - idx;
  const a = p.a[idx];
  const b = p.a[Math.min(4, idx + 1)];
  return [
    a[0] + (b[0] - a[0]) * frac,
    a[1] + (b[1] - a[1]) * frac,
    a[2] + (b[2] - a[2]) * frac,
  ];
}

/** Current page-wide scroll progress 0..1. */
export function scrollProgress(): number {
  if (typeof window === 'undefined') return 0;
  const doc = document.documentElement;
  const max = Math.max(1, doc.scrollHeight - window.innerHeight);
  return Math.min(1, Math.max(0, window.scrollY / max));
}
