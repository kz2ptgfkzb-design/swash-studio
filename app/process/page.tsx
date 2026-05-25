import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { Magnetic } from '@/components/Magnetic';

export const metadata = {
  title: 'Process · Swash',
  description:
    'How Swash works - brief, 48-hour video demo, request changes, ship. Six stages, fixed fee, clear ownership.',
};

const STAGES = [
  {
    n: 'I',
    label: 'The brief',
    days: '~5 min',
    title: 'You write it. We read every line.',
    body:
      'A five-minute structured form on industry, goals, features, timeline, budget, and references you love - plus an open notes field for the things that do not fit into chips. No discovery call required to start. Most clients fill it out late in the evening, push send, and forget it until the demo arrives.',
    youDo: ['Fill out the brief (≈5 min)', 'Drop in reference URLs, screenshots, anything you love'],
    weDo: ['Read it the same day', 'Get to work on a real preview'],
  },
  {
    n: 'II',
    label: 'The video demo',
    days: '~48 hours',
    title: 'A working preview, walked through on video.',
    body:
      'Within 48 hours of the brief we build a real, working preview of your site - designed, coded, hosted on a private URL - and send you a recorded walkthrough explaining every decision. Not a deck, not a moodboard. The actual thing. You can click through the live link yourself after watching.',
    youDo: ['Watch the video (~5 - 8 min)', 'Reply with any changes, big or small'],
    weDo: ['Build the preview', 'Record the walkthrough', 'Host it on a private URL'],
  },
  {
    n: 'II.5',
    label: 'Change requests',
    days: '~24 hours / round',
    title: 'You request changes. We revise.',
    body:
      'Reply to the demo with notes - text, voice memo, scribbled screenshots, however you think. We turn each round in 24 hours and send a fresh recording. Repeat until the demo feels right. No call required, no extra cost, no pressure to commit before you love it.',
    youDo: ['Send change requests in any format', 'Sign off in writing when it lands'],
    weDo: ['Revise the preview', 'Re-record the walkthrough each round'],
  },
  {
    n: 'III',
    label: 'Brand foundation',
    days: 'Sprint 1 · ~2 weeks',
    title: 'Voice, palette, type, motion.',
    body:
      'We start with the brand, not the site. Voice exercises, palette explorations, type pairings, motion principles. Two directions presented at the end of week one; we converge on one by end of week two. You sign off in writing before we touch a single page.',
    youDo: ['Hour-long brand kickoff', 'Sign off on direction at end of sprint'],
    weDo: ['Voice + tone document', 'Palette + type system', 'Motion principles + sample', 'Brand book draft'],
  },
  {
    n: 'IV',
    label: 'Site design + build',
    days: 'Sprint 2 - 3 · ~3 - 5 weeks',
    title: 'Pages, then production.',
    body:
      'Live preview link from day one of design. We design and build in parallel - designers in Figma, engineers writing the production site against the same components. Daily ship to the preview, weekly review with you.',
    youDo: ['30-min weekly review', 'Copy edits + content approvals'],
    weDo: ['Design every page + breakpoint', 'Production build + CMS', 'Daily preview updates'],
  },
  {
    n: 'V',
    label: 'Launch',
    days: 'Launch day',
    title: 'Hands-on, eyes open.',
    body:
      'We do the deploy. We watch the analytics for the first six hours. We fix anything that wobbles in real time. You get a clean install, full source, written handover, and a 30-minute CMS walkthrough for your team.',
    youDo: ['Send launch announcement', 'Be reachable for last-minute approvals'],
    weDo: ['Deploy + DNS cutover', 'Live monitoring for 6 hours', 'Handover documentation'],
  },
  {
    n: 'VI',
    label: '+ 30 days',
    days: '4 weeks post-launch',
    title: 'Polish, then a clean hand-off.',
    body:
      'Thirty days of bug fixes, small tweaks, and the second-guesses that always come up post-launch - included in every engagement. After day 30, we either part on good terms or you put us on a retainer. No pressure either way.',
    youDo: ['Send tweaks via shared doc'],
    weDo: ['Bug fixes, polish, micro-improvements', 'Post-launch analytics review at day 30'],
  },
];

const PROMISES = [
  {
    title: 'Fixed fee, locked.',
    body: 'The number in the engagement letter is the number you pay. We do not pad estimates and we eat scope creep we caused.',
  },
  {
    title: 'No subcontractors.',
    body: 'A skilled in-house team of web developers and brand designers. No subcontractors, no offshoring, no surprise junior swap-ins.',
  },
  {
    title: 'Live preview from day one.',
    body: 'You see the work happening. No big reveals, no surprise show-and-tells. The site is real from week one.',
  },
  {
    title: 'You own everything.',
    body: 'Source code, design files, brand book, fonts - all yours, no lock-in, no proprietary builders.',
  },
];

export default function ProcessPage() {
  return (
    <>
      <section className="relative pt-24 pb-10 sm:pt-32 sm:pb-16 md:pt-40">
        <div className="container-page">
          <div className="grid items-end gap-6 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <p className="eyebrow">Process</p>
              <h1 className="mt-4 font-display text-display-xl text-balance text-ink-700 sm:mt-6">
                Six stages,
                <br />
                <span className="italic text-ash-500">written down.</span>
              </h1>
            </div>
            <div className="md:col-span-5">
              <p className="text-pretty text-sm leading-relaxed text-ash-500 sm:text-base">
                The same six stages for a $5k starter site and a $50k
                flagship build. The only thing that changes is the scope.
                Read what happens, when, and whose job it is.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page pb-16 sm:pb-24">
        <ol className="space-y-5 sm:space-y-6">
          {STAGES.map((s, i) => (
            <li key={s.n}>
              <Reveal delay={i}>
                <article className="grid gap-6 rounded-card border border-hairline bg-paper-50/40 p-5 sm:p-8 md:grid-cols-12 md:gap-10 md:p-12">
                  <header className="md:col-span-3">
                    <p className="font-display text-display-md leading-none tracking-tight text-ink_red-400">
                      {s.n}
                    </p>
                    <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-ash-400">
                      {s.label}
                    </p>
                    <p className="mt-2 font-mono text-[11px] text-ink-700">
                      {s.days}
                    </p>
                  </header>

                  <div className="md:col-span-9">
                    <h2 className="font-display text-display-sm text-balance text-ink-700">
                      {s.title}
                    </h2>
                    <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-ink-400 sm:mt-4 sm:text-base">
                      {s.body}
                    </p>
                    <div className="mt-6 grid grid-cols-1 gap-6 sm:mt-8 sm:grid-cols-2 sm:gap-8">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash-400">
                          You
                        </p>
                        <ul className="mt-3 space-y-2">
                          {s.youDo.map((d) => (
                            <li
                              key={d}
                              className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-700"
                            >
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink_red-400" />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash-400">
                          Us
                        </p>
                        <ul className="mt-3 space-y-2">
                          {s.weDo.map((d) => (
                            <li
                              key={d}
                              className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-700"
                            >
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-700" />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="relative bg-paper-200/30 py-16 sm:py-24 md:py-32">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Promises we keep in writing</p>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-4 font-display text-display-lg text-balance text-ink-700 sm:mt-6">
              Four things in every engagement.
              <br />
              <span className="italic text-ash-500">Without exception.</span>
            </h2>
          </Reveal>
          <ul className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-card border border-hairline bg-hairline sm:mt-14 md:grid-cols-2">
            {PROMISES.map((p, i) => (
              <Reveal key={p.title} delay={i}>
                <li className="flex h-full flex-col gap-4 bg-paper-100 p-6 sm:p-8 md:p-10">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink_red-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-display-sm text-balance text-ink-700">
                    {p.title}
                  </h3>
                  <p className="text-pretty text-sm leading-relaxed text-ash-500">
                    {p.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page py-16 pb-20 sm:py-24 sm:pb-32">
        <Reveal>
          <div className="rounded-card border border-hairline bg-paper-100/75 p-6 text-ink-700 sm:p-10 md:p-16">
            <div className="grid items-end gap-6 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-lime-300">
                  Ready when you are
                </p>
                <h2 className="mt-4 font-display text-display-lg text-balance sm:mt-6">
                  Start where stage one starts.
                  <br />
                  <span className="italic text-ash-500">With the brief.</span>
                </h2>
              </div>
              <div className="md:col-span-5 md:text-right">
                <Magnetic strength={0.25}>
                  <Link
                    href="/brief"
                    className="btn bg-lime-300 text-paper-100 px-6 py-3.5 hover:bg-ink-700 hover:text-paper-100 hover:-translate-y-0.5"
                    data-cursor="link"
                  >
                    Start a brief
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </Magnetic>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
