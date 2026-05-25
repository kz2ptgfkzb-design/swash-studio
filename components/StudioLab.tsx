'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Reveal } from './Reveal';

const WEIGHTS = [
  { id: 'thin',    label: 'Whisper', stroke: 5 },
  { id: 'normal',  label: 'Voice',   stroke: 11 },
  { id: 'bold',    label: 'Shout',   stroke: 20 },
] as const;

const DRIFTS = [
  { id: 'calm',  label: 'Calm',  amp: 0.06,  freq: 1.0 },
  { id: 'live',  label: 'Live',  amp: 0.18,  freq: 1.6 },
  { id: 'wild',  label: 'Wild',  amp: 0.34,  freq: 2.4 },
] as const;

const PALETTES = [
  { id: 'lime',   label: 'Lime',   color: '#C8FE3D' },
  { id: 'gold',   label: 'Gold',   color: '#FFC247' },
  { id: 'red',    label: 'Ember',  color: '#FF5C44' },
  { id: 'violet', label: 'Violet', color: '#8E7BFF' },
  { id: 'cream',  label: 'Cream',  color: '#F4EEDF' },
] as const;

type WeightId = (typeof WEIGHTS)[number]['id'];
type DriftId  = (typeof DRIFTS)[number]['id'];
type PaletteId = (typeof PALETTES)[number]['id'];

/**
 * Studio Lab — a live, sculptable mark.
 *
 * The user toggles weight / drift / palette chips on the left; the big
 * brushstroke on the right re-derives its path from those params in real
 * time, drifts on a sine loop, and bulges its midpoint toward the cursor
 * with a spring. Acts as the studio's "motion as a language" proof.
 */
export function StudioLab() {
  const [weight, setWeight]   = useState<WeightId>('normal');
  const [drift, setDrift]     = useState<DriftId>('live');
  const [palette, setPalette] = useState<PaletteId>('lime');

  const stroke   = WEIGHTS.find(w => w.id === weight)!.stroke;
  const driftCfg = DRIFTS.find(d => d.id === drift)!;
  const color    = PALETTES.find(p => p.id === palette)!.color;

  // Drift phase — slow sine, but only ticks while the lab section is in
  // view (saves a RAF + state-update per frame on every other section).
  const [phase, setPhase] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const inViewRef = useRef(false);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { inViewRef.current = entry.isIntersecting; },
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    function tick() {
      if (inViewRef.current) {
        const t = (performance.now() - start) / 1000;
        setPhase(t * driftCfg.freq);
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [driftCfg.freq]);

  // Cursor pull on the midpoint
  const mxRaw = useMotionValue(0.5);
  const myRaw = useMotionValue(0.5);
  const mx = useSpring(mxRaw, { stiffness: 90, damping: 22, mass: 0.7 });
  const my = useSpring(myRaw, { stiffness: 90, damping: 22, mass: 0.7 });

  const stageRef = useRef<HTMLDivElement>(null);
  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mxRaw.set((e.clientX - r.left) / r.width);
    myRaw.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    mxRaw.set(0.5);
    myRaw.set(0.5);
  }

  // SVG viewBox is 0..1000 wide, 0..560 tall
  // Build control points parametrically; cursor pulls the middle
  const W = 1000;
  const H = 560;
  const amp = driftCfg.amp;

  const driftX = Math.sin(phase) * amp * 90;
  const driftY = Math.cos(phase * 0.7) * amp * 60;

  // d1 = first cubic control; d2 second; d3 third
  const startX = 90 - driftX * 0.3;
  const startY = H * 0.55 + driftY * 0.3;
  const endX   = W - 60 + driftX * 0.2;
  const endY   = H * 0.45 - driftY * 0.4;

  const c1xT = useTransform(mx, m => (W * 0.27) + (m - 0.5) * 220 + driftX * 0.6);
  const c1yT = useTransform(my, m => (H * 0.08) + (m - 0.5) * 220 + driftY * 0.8);
  const c2xT = useTransform(mx, m => (W * 0.55) - (m - 0.5) * 280 + driftX * -0.4);
  const c2yT = useTransform(my, m => (H * 0.95) + (m - 0.5) * 280 + driftY * 0.6);
  const c3xT = useTransform(mx, m => (W * 0.78) + (m - 0.5) * 80);
  const c3yT = useTransform(my, m => (H * 0.18) + (m - 0.5) * 140);

  const pathD = useTransform(
    [c1xT, c1yT, c2xT, c2yT, c3xT, c3yT] as never,
    (v: number[]) => {
      const [c1x, c1y, c2x, c2y, c3x, c3y] = v;
      // S-shaped composite: M -> C -> S -> C
      return `M ${startX.toFixed(1)} ${startY.toFixed(1)} ` +
             `C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${(W * 0.55).toFixed(1)} ${(H * 0.5).toFixed(1)} ` +
             `S ${c3x.toFixed(1)} ${c3y.toFixed(1)}, ${endX.toFixed(1)} ${endY.toFixed(1)}`;
    },
  );

  return (
    <section ref={sectionRef} id="lab" className="relative overflow-hidden bg-paper-50/55 py-28 md:py-40">
      <div className="container-wide">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          {/* LEFT — copy + controls */}
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow">— Studio Lab</span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-6 font-display text-display-lg text-balance text-ink-700">
                A brand that
                <br />
                <span className="italic text-lime-300">responds.</span>
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-ash-500">
                Press a chip. Move your mouse over the canvas. The mark
                rewrites itself. This is what we mean by &ldquo;motion as a
                language&rdquo; — the brand is alive in every state, not
                frozen on a style guide.
              </p>
            </Reveal>

            <div className="mt-10 space-y-7">
              <ControlRow
                label="Voice"
                value={weight}
                items={WEIGHTS.map(w => ({ id: w.id, label: w.label }))}
                onChange={id => setWeight(id as WeightId)}
              />
              <ControlRow
                label="Drift"
                value={drift}
                items={DRIFTS.map(d => ({ id: d.id, label: d.label }))}
                onChange={id => setDrift(id as DriftId)}
              />
              <ControlRow
                label="Palette"
                value={palette}
                items={PALETTES.map(p => ({ id: p.id, label: p.label, dotColor: p.color }))}
                onChange={id => setPalette(id as PaletteId)}
              />
            </div>

            <div className="mt-10 hidden items-center gap-3 md:flex">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash-500">
                params/
              </span>
              <code className="rounded-pill border border-hairline bg-paper-100 px-3 py-1.5 font-mono text-[11px] text-ink-500">
                voice:{weight} · drift:{drift} · color:{palette}
              </code>
            </div>
          </div>

          {/* RIGHT — live canvas */}
          <div className="lg:col-span-7">
            <div
              ref={stageRef}
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              className="relative aspect-[1000/560] w-full overflow-hidden rounded-card border border-hairline bg-paper-100/60"
              data-cursor="lab"
            >
              <svg
                viewBox={`0 0 ${W} ${H}`}
                className="absolute inset-0 h-full w-full"
                aria-hidden
              >
                <defs>
                  <linearGradient id="strokeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"  stopColor={color} stopOpacity="0.0" />
                    <stop offset="6%"  stopColor={color} stopOpacity="1.0" />
                    <stop offset="94%" stopColor={color} stopOpacity="1.0" />
                    <stop offset="100%" stopColor={color} stopOpacity="0.0" />
                  </linearGradient>
                  <filter id="softInk" x="-10%" y="-10%" width="120%" height="120%">
                    <feGaussianBlur stdDeviation="0.6" />
                  </filter>
                </defs>

                {/* Echo paths — softer, behind */}
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke={color}
                  strokeOpacity={0.18}
                  strokeWidth={stroke + 18}
                  strokeLinecap="round"
                  filter="url(#softInk)"
                />
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke="url(#strokeGrad)"
                  strokeWidth={stroke}
                  strokeLinecap="round"
                  filter="url(#softInk)"
                />

                {/* End dot — the period after the swash */}
                <motion.circle
                  r={stroke * 0.65}
                  fill={color}
                  cx={endX}
                  cy={endY}
                />
              </svg>

              {/* Corner crops */}
              <div className="pointer-events-none absolute inset-3 grid grid-cols-2 grid-rows-2">
                {[
                  'top-0 left-0',
                  'top-0 right-0 rotate-90',
                  'bottom-0 left-0 -rotate-90',
                  'bottom-0 right-0 rotate-180',
                ].map((pos, i) => (
                  <span
                    key={i}
                    className={`absolute h-3 w-3 ${pos}`}
                    style={{
                      borderTop: '1px solid #3a3530',
                      borderLeft: '1px solid #3a3530',
                    }}
                  />
                ))}
              </div>

              {/* Bottom-left meta strip */}
              <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ash-500">
                <span className="h-1.5 w-1.5 rounded-full bg-lime-300 animate-pulse-soft" />
                live · sculpt · ship
              </div>

              {/* Top-right hint */}
              <div className="pointer-events-none absolute right-3 top-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ash-500">
                drag cursor →
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ControlRow({
  label,
  items,
  value,
  onChange,
}: {
  label: string;
  items: { id: string; label: string; dotColor?: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="space-y-3">
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash-500">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {items.map(it => {
          const active = it.id === value;
          return (
            <button
              key={it.id}
              type="button"
              onClick={() => onChange(it.id)}
              data-cursor="link"
              className={`group inline-flex items-center gap-2 rounded-pill border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-all duration-300 ease-silk ${
                active
                  ? 'border-lime-300 bg-lime-300 text-paper-100'
                  : 'border-hairline bg-paper-100 text-ash-500 hover:border-ink-400 hover:text-ink-700'
              }`}
            >
              {it.dotColor && (
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: it.dotColor }}
                />
              )}
              {it.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
