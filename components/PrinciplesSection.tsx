'use client';

import { Reveal } from './Reveal';

const PRINCIPLES = [
  {
    n: '01',
    title: 'Defaults are a feature.',
    body: 'A platform earns trust by making the right thing the easy thing. Every default in this edition is the answer most merchants would have arrived at, after enough time.',
  },
  {
    n: '02',
    title: 'Speed is the headline.',
    body: 'Latency is a tax on attention. We measure it on every surface and refuse to ship a release that adds to it. Most of this edition is faster than the version it replaces.',
  },
  {
    n: '03',
    title: 'Composition over configuration.',
    body: 'The best stores are made of clean parts you can stack. We extend the primitive library, not the option panel. Less to learn, more to build.',
  },
  {
    n: '04',
    title: 'Quiet wins count.',
    body: 'Half of what shipped this season is a small thing — a setting that finally makes sense, a step removed from a flow. We list every one of them. None of it is filler.',
  },
];

export function PrinciplesSection() {
  return (
    <section id="principles" className="relative py-32 md:py-44">
      <div className="container-page">
        <div className="grid items-start gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <Reveal>
                <span className="eyebrow">04 — Working Notes</span>
              </Reveal>
              <Reveal delay={1}>
                <h2 className="mt-6 font-display text-display-lg leading-[0.96] tracking-tight text-bone-50">
                  How this edition was built.
                </h2>
              </Reveal>
              <Reveal delay={2}>
                <p className="mt-6 text-pretty text-base leading-relaxed text-bone-300">
                  Four principles that show up in every release inside the
                  drop — read them as a lens on what changed and why.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="md:col-span-8">
            <ul className="space-y-px">
              {PRINCIPLES.map((p, i) => (
                <Reveal key={p.n} delay={i}>
                  <li className="group grid grid-cols-[auto_1fr] gap-6 border-t border-ink-700 py-10 transition-colors hover:bg-ink-900/40 md:gap-10 md:py-12">
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-bone-400 md:text-sm">
                      {p.n}
                    </span>
                    <div>
                      <h3 className="font-display text-display-md leading-tight tracking-tight text-bone-50 transition-colors duration-300 group-hover:text-glow-lime">
                        {p.title}
                      </h3>
                      <p className="mt-4 max-w-[58ch] text-pretty text-base leading-relaxed text-bone-300">
                        {p.body}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
              <li className="hairline" />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
