'use client';

import { Reveal } from './Reveal';

const QUOTES = [
  {
    body:
      'The brief took ten minutes to write. The proposal came back the next day. We launched in three weeks, and our booking rate doubled in the first month. I will never use a template again.',
    name: 'Renée Ostrowski',
    role: 'Founder, Apex Mechanical',
  },
  {
    body:
      'Most studios sell you a look. Swash sold us a brand we still recognize three years in. The motion system alone has been worth its weight.',
    name: 'David Anand',
    role: 'CEO, Overlay Labs',
  },
  {
    body:
      'They priced the work to fit what we had, and the site shipped at the level of brands ten times our size. That is the trick, I think.',
    name: 'Mira Holloway',
    role: 'Founder, Mira',
  },
];

export function Testimonials() {
  return (
    <section className="relative bg-bone-200/30 py-28 md:py-40">
      <div className="container-page">
        <Reveal>
          <span className="eyebrow">In their words</span>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="mt-6 max-w-[18ch] font-display text-display-lg text-balance text-ink-700">
            Built for clients who
            <br />
            <span className="italic font-light text-ash-500">stay clients.</span>
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <Reveal key={q.name} delay={i}>
              <li className="flex h-full flex-col justify-between gap-8 rounded-card border border-hairline bg-bone-100 p-8 md:p-10">
                <svg width="34" height="26" viewBox="0 0 34 26" fill="none" className="text-saffron-400">
                  <path
                    d="M0 26V14C0 6.3 5.2 0.8 13 0V5.2C8.6 5.7 5.7 8.7 5.7 13H13V26H0ZM21 26V14C21 6.3 26.2 0.8 34 0V5.2C29.6 5.7 26.7 8.7 26.7 13H34V26H21Z"
                    fill="currentColor"
                  />
                </svg>
                <p className="text-pretty font-display text-xl leading-snug tracking-tight text-ink-700 md:text-2xl">
                  {q.body}
                </p>
                <div className="border-t border-hairline pt-5">
                  <p className="font-display text-base text-ink-700">{q.name}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ash-400">
                    {q.role}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
