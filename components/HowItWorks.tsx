'use client';

import Link from 'next/link';
import { Reveal } from './Reveal';

const STEPS = [
  {
    n: '01',
    label: 'The brief',
    title: 'You tell us what you need.',
    body:
      'A five-minute form covers the essentials — industry, goals, features, timeline, budget. The richer the brief, the sharper the proposal. Anything off the menu? Tell us in the notes.',
    detail: 'Five minutes. No call required to start.',
  },
  {
    n: '02',
    label: 'The proposal',
    title: 'We scope it to fit.',
    body:
      'Within 48 hours you get a written proposal — scope, deliverables, milestones, a fixed fee. We size the work to the budget you set; we never quietly stretch past it.',
    detail: 'Fixed fee. Clear scope. No mystery line items.',
  },
  {
    n: '03',
    label: 'The build',
    title: "We ship — and we don't disappear.",
    body:
      'Brand, site, and motion delivered in two-week sprints with a live preview link from day one. Launch day, plus thirty days of polish after, included in every engagement.',
    detail: '2-week sprints. Live preview from day one.',
  },
];

export function HowItWorks() {
  return (
    <section id="process" className="relative bg-paper-200/30 py-28 md:py-40">
      <div className="container-page">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <span className="eyebrow">How it works</span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-6 font-display text-display-lg text-balance text-ink-700">
                Three steps,
                <br />
                <span className="italic text-ash-500">no surprises.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={2}>
              <p className="text-pretty text-base leading-relaxed text-ash-500">
                The same process for a five-thousand-dollar site and a
                fifty-thousand-dollar one. The only thing that changes is
                the scope.
              </p>
            </Reveal>
          </div>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-card border border-hairline bg-hairline md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i + 1}>
              <li className="flex h-full flex-col justify-between gap-10 bg-paper-100 p-8 md:p-10">
                <div className="space-y-5">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink_red-400">
                      {s.n} · {s.label}
                    </span>
                  </div>
                  <h3 className="font-display text-display-sm text-balance text-ink-700">
                    {s.title}
                  </h3>
                  <p className="text-pretty text-sm leading-relaxed text-ash-500 md:text-base">
                    {s.body}
                  </p>
                </div>
                <p className="border-t border-hairline pt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ash-400">
                  {s.detail}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={4}>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <p className="text-pretty text-base text-ash-500 max-w-md">
              The brief takes about five minutes. There&rsquo;s no pricing
              menu to navigate — you tell us your budget, we tell you what
              fits.
            </p>
            <Link href="/brief" className="btn-primary" data-cursor="link">
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
