import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { SwashMark } from '@/components/SwashMark';
import { Magnetic } from '@/components/Magnetic';

export const metadata = {
  title: 'About · Swash',
  description:
    'Who we are, how we work, and why we built Swash the way we did.',
};

const PROCESS = [
  { phase: 'Brief',     body: 'You write the brief. We read every line. No discovery call required to get started.' },
  { phase: 'Proposal',  body: 'Within 48 hours: a written scope, deliverables, milestones, fixed fee. You say yes, no, or push back.' },
  { phase: 'Sprint 1',  body: 'Brand foundation: voice, palette, type, motion principles. A direction you sign off on before we build.' },
  { phase: 'Sprint 2',  body: 'Site design and prototype. Live preview link from day one. Daily ship, weekly review.' },
  { phase: 'Ship',      body: 'Launch day, hands-on. We watch the analytics, fix what wobbles, hand over a clean install.' },
  { phase: '+ 30 days', body: 'Thirty days of post-launch polish. Bugs, tweaks, the second-guesses. Then a clean off-boarding.' },
];

const TEAM = [
  { role: 'Creative direction', name: 'M. Stenseth' },
  { role: 'Brand design',       name: 'A. Yarrow' },
  { role: 'Engineering',        name: 'P. Halloran' },
  { role: 'Motion',             name: 'N. Oh' },
  { role: 'Writing',            name: 'L. Devaux' },
  { role: 'Studio manager',     name: 'R. Imani' },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative pt-40 pb-24">
        <div className="container-page">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="eyebrow">The studio</p>
              <h1 className="mt-6 font-display text-display-xl text-balance text-ink-700">
                A small studio
                <br />
                <span className="italic text-ash-500">with a wide reach.</span>
              </h1>
            </div>
            <div className="md:col-span-5">
              <p className="text-pretty text-base leading-relaxed text-ash-500">
                Swash is a six-person studio that builds websites for
                every kind of business. We started in 2024 with a quiet
                rule: no two sites we ship should look like the same
                template, and no client should ever guess what we charged
                the one before.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <Reveal>
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <p className="eyebrow">Why we made this</p>
              <h2 className="mt-6 font-display text-display-md text-balance text-ink-700">
                Most studios are too narrow.
                <span className="italic text-ash-500">
                  {' '}
                  The rest are too generic.
                </span>
              </h2>
              <div className="mt-8 space-y-4 text-pretty text-base leading-relaxed text-ash-500">
                <p>
                  Premium studios price out the small business that needs
                  a brand more than the agency does. Cheap shops can&rsquo;t
                  ship a brand to save their life. We sit in between, on
                  purpose.
                </p>
                <p>
                  Our work has gone out to one-person HVAC dispatchers and
                  Series-A SaaS teams. Same studio. Same care. Different
                  scope, different price.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2 grid place-items-center">
              <SwashMark size={360} />
            </div>
          </div>
        </Reveal>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal><p className="eyebrow">The process</p></Reveal>
            <Reveal delay={1}>
              <h2 className="mt-6 font-display text-display-md text-balance text-ink-700">
                Six stages.
                <br />
                <span className="italic text-ash-500">Six to eight weeks.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <ol className="overflow-hidden rounded-card border border-hairline">
              {PROCESS.map((p, i) => (
                <Reveal key={p.phase} delay={i}>
                  <li className="grid grid-cols-[120px_1fr] items-start gap-6 border-b border-hairline bg-paper-100 p-6 last:border-b-0 md:grid-cols-[200px_1fr] md:gap-10 md:p-8">
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink_red-400">
                      {p.phase}
                    </p>
                    <p className="text-pretty text-sm leading-relaxed text-ink-400 md:text-base">
                      {p.body}
                    </p>
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
            <Reveal><p className="eyebrow">Who&rsquo;s here</p></Reveal>
            <Reveal delay={1}>
              <h2 className="mt-6 font-display text-display-md text-balance text-ink-700">
                Six people.
                <br />
                <span className="italic text-ash-500">No subcontractors.</span>
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-6 max-w-sm text-pretty text-base leading-relaxed text-ash-500">
                Everyone who works on your project works at Swash. The
                same six names from kickoff to launch day.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <dl className="grid gap-x-12 gap-y-6 sm:grid-cols-2">
              {TEAM.map((t, i) => (
                <Reveal key={t.role} delay={i}>
                  <div className="border-b border-hairline pb-4">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ash-400">
                      {t.role}
                    </dt>
                    <dd className="mt-2 font-display text-xl text-ink-700">
                      {t.name}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="container-page py-20 pb-32">
        <Reveal>
          <div className="rounded-card border border-hairline bg-ink-700 p-10 text-paper-50 md:p-16">
            <div className="grid items-end gap-10 md:grid-cols-12">
              <div className="md:col-span-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold-200">
                  Add a swash
                </p>
                <h2 className="mt-6 font-display text-display-lg text-balance">
                  Have a brief in mind?
                  <br />
                  <span className="italic text-paper-200/70">Send it our way.</span>
                </h2>
              </div>
              <div className="md:col-span-5 md:text-right">
                <Magnetic strength={0.25}>
                  <Link
                    href="/brief"
                    className="btn bg-ink_red-400 text-paper-50 px-6 py-3.5 hover:bg-paper-50 hover:text-ink-700 hover:-translate-y-0.5"
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
