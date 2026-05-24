'use client';

import { Reveal } from './Reveal';
import { Counter } from './Counter';

const METRICS = [
  { value: 127, suffix: '',   label: 'Sites shipped',          sub: 'Since 2024' },
  { value: 6,   suffix: '',   label: 'Industries served',      sub: 'HVAC → SaaS' },
  { value: 98,  suffix: '%',  label: 'Clients still shipping', sub: '12-month retention' },
  { value: 5,   suffix: '★',  label: 'Average review',         sub: 'Across 41 reviews' },
];

const LOGOS = [
  'Apex Mechanical',
  'Saltwater Co.',
  'Kilncraft',
  'Tidemark Realty',
  'Overlay Labs',
  'Mira',
  'Goldenrod & Sons',
  'Notwithstanding',
];

export function ProofMetrics() {
  return (
    <section className="relative bg-ink-700 py-28 text-paper-50 md:py-36">
      <div className="absolute inset-0 bg-noise opacity-[0.04] mix-blend-overlay pointer-events-none" />
      <div className="container-wide relative">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold-200">
                The receipts
              </span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-6 font-display text-display-lg text-balance text-paper-50">
                Two years,
                <br />
                <span className="italic text-paper-200/70">a lot of paper.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={2}>
              <p className="text-pretty text-base leading-relaxed text-paper-200/80">
                A small studio is only worth what it has shipped. Here is
                where we sit, this quarter.
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-card border border-paper-50/10 bg-paper-50/10 md:grid-cols-4">
          {METRICS.map((m, i) => (
            <Reveal key={m.label} delay={i}>
              <li className="flex h-full flex-col justify-between gap-8 bg-ink-700 p-7 md:p-9">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold-200">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <div>
                  <p className="font-display text-display-md leading-none tracking-tighter text-paper-50">
                    <Counter to={m.value} suffix={m.suffix} />
                  </p>
                  <p className="mt-3 font-display text-base text-paper-50">
                    {m.label}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-paper-200/60">
                    {m.sub}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={5}>
          <div className="mt-14 border-t border-paper-50/10 pt-10">
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-paper-200/60">
              Recent clients
            </p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
              {LOGOS.map((l) => (
                <li
                  key={l}
                  className="font-display italic text-xl text-paper-50/90 md:text-2xl"
                >
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
