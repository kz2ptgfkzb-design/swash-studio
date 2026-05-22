'use client';

import { Reveal } from './Reveal';

export function IntroSection() {
  return (
    <section id="introduction" className="relative py-32 md:py-44">
      <div className="container-page">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-3">
            <Reveal>
              <span className="eyebrow">01 — The Drop</span>
            </Reveal>
          </div>

          <div className="md:col-span-9 md:col-start-4">
            <Reveal delay={1}>
              <p className="font-display text-display-md text-balance leading-[1.04] tracking-tight text-bone-100 md:max-w-[18ch]">
                A season of work, gathered into a single shipping moment.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-12 md:grid-cols-2">
              <Reveal delay={2}>
                <p className="max-w-md text-pretty text-base leading-relaxed text-bone-300">
                  The pace of platform work is relentless. Most of it lands
                  quietly — a setting that finally makes sense, a step removed
                  from a flow, a primitive that used to be a workaround.
                  We collect it here, twice a year, so none of it is lost.
                </p>
              </Reveal>
              <Reveal delay={3}>
                <p className="max-w-md text-pretty text-base leading-relaxed text-bone-400">
                  The Winter edition has more breadth than any before it.
                  Seventy releases across six categories. Twelve of them are
                  new surfaces. The rest are refinements deep enough to feel
                  new — and that is by design.
                </p>
              </Reveal>
            </div>

            <Reveal delay={4}>
              <div className="hairline mt-16 grid grid-cols-2 gap-6 pt-8 md:grid-cols-4">
                {[
                  { k: '70', l: 'Releases shipped' },
                  { k: '06', l: 'Categories' },
                  { k: '12', l: 'New surfaces' },
                  { k: '04', l: 'Markets opened' },
                ].map((s) => (
                  <div key={s.k}>
                    <p className="font-display text-display-sm tracking-tight text-bone-50">
                      {s.k}
                    </p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-400">
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
