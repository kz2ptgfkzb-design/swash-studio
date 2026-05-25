'use client';

import { Reveal } from './Reveal';

const PROPS = [
  {
    n: '01',
    title: 'Brand built into the site, not bolted on.',
    body:
      'Every site we ship starts with a brand foundation - voice, palette, type, motion. The site is the brand expressed, not a wrapper around it.',
  },
  {
    n: '02',
    title: 'Budget-aware, not budget-bound.',
    body:
      "Tell us what you can spend. We scope the work to fit - a starter site, a full studio build, or somewhere in between. The brief drives the price, not a tier sheet.",
  },
  {
    n: '03',
    title: 'Motion as a language, not a layer.',
    body:
      'Animation is part of how the brand reads. We design it like type or color - restrained where it should be, expressive where it has to be.',
  },
];

export function ValueProps() {
  return (
    <section id="why" className="relative py-28 md:py-40">
      <div className="container-page">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <Reveal>
              <span className="eyebrow">Why Swash</span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-6 font-display text-display-lg text-balance text-ink-700">
                Three things we
                <br />
                <span className="italic text-ash-500">do differently.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <Reveal delay={2}>
              <p className="text-pretty text-base leading-relaxed text-ash-500">
                Most studios start with a template, then bend the brand to
                fit. We start with the brief, build the brand, then design
                a site that could only belong to it.
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-card border border-hairline bg-hairline md:grid-cols-3">
          {PROPS.map((p, i) => (
            <Reveal key={p.n} delay={i + 1}>
              <li className="flex h-full flex-col gap-6 bg-paper-100 p-8 md:p-10">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink_red-400">
                  {p.n}
                </span>
                <h3 className="font-display text-display-sm text-balance text-ink-700">
                  {p.title}
                </h3>
                <p className="text-pretty text-sm leading-relaxed text-ash-500 md:text-base">
                  {p.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
