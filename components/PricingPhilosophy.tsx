'use client';

import Link from 'next/link';
import { Reveal } from './Reveal';

const TIERS = [
  {
    name: 'Starter',
    fit: 'For one-person shops, side projects, soft launches.',
    includes: ['Single-page or short site', 'Light brand polish', 'One round of revisions', 'Two-week turnaround'],
  },
  {
    name: 'Core',
    fit: 'For most small-to-mid businesses ready to grow.',
    includes: ['Multi-page site', 'Brand mark + system', 'CMS for self-updates', 'Lead-capture or booking', 'Four-week build'],
  },
  {
    name: 'Studio',
    fit: 'For brands that need the site to do real lifting.',
    includes: ['Full custom build', 'Brand identity (logo, system, motion)', 'Ecommerce / integrations', 'Animation system', 'Six-to-eight-week build'],
  },
  {
    name: 'Flagship',
    fit: 'For launches, rebrands, and ambitious projects.',
    includes: ['Open scope', 'Brand + site + print + motion', 'Photography direction', 'Ongoing retainer option', 'Bespoke timeline'],
  },
];

export function PricingPhilosophy() {
  return (
    <section id="pricing" className="relative py-28 md:py-40">
      <div className="container-page">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <span className="eyebrow">A note on price</span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-6 font-display text-display-lg text-balance text-ink-700">
                We don&rsquo;t publish prices.
                <br />
                <span className="italic font-light text-ash-500">Here&rsquo;s why.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={2}>
              <p className="text-pretty text-base leading-relaxed text-ash-500">
                A fixed price tag forces every brief into the same box.
                We&rsquo;d rather hear yours, scope the work honestly, and
                give you a fee that reflects the project, not a tier sheet.
              </p>
              <p className="mt-4 text-pretty text-base leading-relaxed text-ash-500">
                That said - here&rsquo;s a rough map of the shapes a
                Swash project tends to take.
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={i}>
              <li className="flex h-full flex-col gap-6 rounded-card border border-hairline bg-paper-200/60 p-7 transition-all duration-500 ease-silk hover:-translate-y-1 hover:border-lime-300/30">
                <div className="flex items-center justify-between">
                  <p className="font-display text-2xl tracking-tight text-ink-700">
                    {t.name}
                  </p>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-saffron-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="text-pretty text-sm leading-relaxed text-ash-500">
                  {t.fit}
                </p>
                <ul className="space-y-2 border-t border-hairline pt-5">
                  {t.includes.map((it) => (
                    <li
                      key={it}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-400"
                    >
                      <svg
                        className="mt-1 shrink-0 text-saffron-500"
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                      >
                        <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={5}>
          <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-card border border-hairline bg-paper-200/40 p-8 md:flex-row md:items-center md:p-10">
            <div>
              <p className="font-display text-2xl text-ink-700">
                Tell us your budget. We&rsquo;ll tell you what it builds.
              </p>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-ash-500">
                The brief asks once. We don&rsquo;t push you up a tier.
              </p>
            </div>
            <Link href="/brief" className="btn-primary shrink-0">
              Start a brief
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
