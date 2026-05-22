import Link from 'next/link';
import { Reveal } from '@/components/Reveal';

export const metadata = {
  title: 'About this edition · Aurora Editions Winter 26',
  description:
    'A note on how the Winter 26 edition was put together, who shipped it, and what comes next.',
};

const TEAM = [
  { role: 'Editor in chief', name: 'M. Kestrel' },
  { role: 'Design lead', name: 'A. Marchetti' },
  { role: 'Engineering lead', name: 'D. Yusupov' },
  { role: 'Brand & motion', name: 'N. Okafor' },
  { role: 'Words', name: 'L. Greenholt' },
  { role: 'Edition producer', name: 'R. Mahoney' },
];

const TIMELINE = [
  { phase: 'Plan', months: 'Sep – Oct 25' },
  { phase: 'Build', months: 'Oct 25 – Jan 26' },
  { phase: 'Ship', months: 'Jan – Feb 26' },
  { phase: 'Drop', months: 'Feb 18, 26' },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative pt-40 pb-24">
        <div className="container-page">
          <span className="eyebrow">Colophon</span>
          <h1 className="mt-6 max-w-[18ch] font-display text-display-xl leading-[0.92] tracking-tighter text-bone-50">
            Notes on how this edition <span className="italic font-normal text-bone-400">came together.</span>
          </h1>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <p className="eyebrow">Statement</p>
            </Reveal>
          </div>
          <div className="md:col-span-8 space-y-6">
            <Reveal delay={1}>
              <p className="text-pretty text-lg leading-relaxed text-bone-100 md:text-xl">
                The platform is the work. Every season we set aside two weeks
                at the end to gather it into a single, legible drop — not as
                a marketing artifact, but as a record. A reminder of what
                shipped, why it shipped, and where it sits in the longer
                story we are telling.
              </p>
            </Reveal>
            <Reveal delay={2}>
              <p className="text-pretty text-base leading-relaxed text-bone-300">
                The Winter 26 edition is the fourteenth of its kind. It has
                more breadth than any before it — and more depth in the
                quiet, infrastructural changes that show up later as speed,
                trust, and uptime. We list it all. None of it is filler.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <p className="eyebrow">Timeline</p>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <ol className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-ink-700 bg-ink-700 md:grid-cols-4">
              {TIMELINE.map((t, i) => (
                <Reveal key={t.phase} delay={i}>
                  <li className="bg-ink-900 p-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone-400">
                      Phase {String(i + 1).padStart(2, '0')}
                    </p>
                    <p className="mt-3 font-display text-2xl tracking-tight text-bone-50">
                      {t.phase}
                    </p>
                    <p className="mt-1 text-sm text-bone-300">{t.months}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <p className="eyebrow">Credits</p>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <dl className="grid gap-x-12 gap-y-6 sm:grid-cols-2">
              {TEAM.map((t, i) => (
                <Reveal key={t.role} delay={i}>
                  <div className="border-b border-ink-700 pb-4">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone-400">
                      {t.role}
                    </dt>
                    <dd className="mt-2 font-display text-xl text-bone-50">{t.name}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <p className="eyebrow">Next</p>
            </Reveal>
          </div>
          <div className="md:col-span-8 space-y-8">
            <Reveal delay={1}>
              <p className="font-display text-display-md leading-tight tracking-tight text-bone-50">
                The next edition drops in August.
              </p>
            </Reveal>
            <Reveal delay={2}>
              <p className="max-w-[58ch] text-pretty text-base leading-relaxed text-bone-300">
                Summer 26 will ship around four themes already in flight:
                programmable subscriptions, a rewritten POS, a unified
                customer graph, and a step-change in catalog speed. We will
                gather it the same way — and post it here.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link href="/features" className="btn-primary">
                  Browse the Winter drop
                </Link>
                <Link href="/changelog" className="btn-ghost">
                  Read the long log
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
