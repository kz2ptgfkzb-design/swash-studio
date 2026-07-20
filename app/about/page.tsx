import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { SwashMark } from '@/components/SwashMark';
import { Magnetic } from '@/components/Magnetic';

export const metadata = {
  title: 'About',
  description:
    'Who we are, how we work, and why we built Swash the way we did.',
};

const PROCESS = [
  { phase: 'Brief',          body: 'You write the brief. We read every line. No discovery call required to get started.' },
  { phase: 'Video demo',     body: 'Within 48 hours: a recorded walkthrough of a real, working preview of your site - designed, coded, hosted.' },
  { phase: 'Change requests',body: 'Reply to the demo with notes in any format. Each revision turns in 24 hours with a fresh recording.' },
  { phase: 'Brand & build',  body: 'You sign off. We finish the brand system and the production site in two-week sprints with daily preview ship.' },
  { phase: 'Ship',           body: 'Launch day, hands-on. We watch the analytics, fix what wobbles, hand over a clean install.' },
  { phase: '+ 30 days',      body: 'Thirty days of post-launch polish. Bugs, tweaks, the second-guesses. Then a clean off-boarding.' },
];

const ROLES = [
  { role: 'Creative direction', note: 'Shapes the brief into a brand and a build plan.' },
  { role: 'Brand design',       note: 'Mark, palette, type, voice - the foundation.' },
  { role: 'Engineering',        note: 'Production Next.js with performance and a11y built in.' },
  { role: 'Motion',             note: 'Transitions, scroll behaviour, signature interactions.' },
  { role: 'Copy & strategy',    note: 'First-draft copy on every page so you can edit, not write.' },
  { role: 'Production',         note: 'Hosting, analytics, CMS, hand-over docs.' },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 md:pt-40 md:pb-24">
        <div className="container-page">
          <div className="grid items-end gap-6 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <p className="eyebrow">The studio</p>
              <h1 className="mt-4 font-display text-display-xl text-balance text-ink-700 sm:mt-6">
                A small studio
                <br />
                <span className="italic text-ash-500">with a wide reach.</span>
              </h1>
            </div>
            <div className="md:col-span-5">
              <p className="text-pretty text-sm leading-relaxed text-ash-500 sm:text-base">
                Swash is a tight team of web developers and brand designers
                that builds websites for every kind of business. We started
                in 2024 with a quiet rule: no two sites we ship should look
                like the same template, and no client should ever guess
                what we charged the one before.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-10 sm:py-16">
        <Reveal>
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="order-2 md:order-1">
              <p className="eyebrow">Why we made this</p>
              <h2 className="mt-4 font-display text-display-md text-balance text-ink-700 sm:mt-6">
                Most studios are too narrow.
                <span className="italic text-ash-500">
                  {' '}
                  The rest are too generic.
                </span>
              </h2>
              <div className="mt-6 space-y-4 text-pretty text-sm leading-relaxed text-ash-500 sm:mt-8 sm:text-base">
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

      <section className="container-page py-12 sm:py-20">
        <div className="grid gap-8 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Reveal><p className="eyebrow">The process</p></Reveal>
            <Reveal delay={1}>
              <h2 className="mt-4 font-display text-display-md text-balance text-ink-700 sm:mt-6">
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
                  <li className="grid grid-cols-1 items-start gap-2 border-b border-hairline bg-paper-100 p-5 last:border-b-0 sm:grid-cols-[120px_1fr] sm:gap-6 sm:p-6 md:grid-cols-[200px_1fr] md:gap-10 md:p-8">
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

      <section className="container-page py-12 sm:py-20">
        <div className="grid gap-8 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Reveal><p className="eyebrow">Who&rsquo;s on it</p></Reveal>
            <Reveal delay={1}>
              <h2 className="mt-4 font-display text-display-md text-balance text-ink-700 sm:mt-6">
                A skilled team
                <br />
                <span className="italic text-ash-500">behind every build.</span>
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-5 max-w-sm text-pretty text-sm leading-relaxed text-ash-500 sm:mt-6 sm:text-base">
                Every site we ship covers the six roles below - held by
                our in-house team of web developers and brand designers.
                No subcontractors, no offshoring, no junior swap-ins.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-6">
              {ROLES.map((r, i) => (
                <Reveal key={r.role} delay={i}>
                  <div className="border-b border-hairline pb-4">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ash-400">
                      0{i + 1}
                    </dt>
                    <dd className="mt-2 font-display text-xl text-ink-700">
                      {r.role}
                    </dd>
                    <p className="mt-2 text-sm leading-relaxed text-ash-500">
                      {r.note}
                    </p>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="container-page py-12 pb-20 sm:py-20 sm:pb-32">
        <Reveal>
          <div className="rounded-card border border-hairline bg-paper-100/75 p-6 text-ink-700 sm:p-10 md:p-16">
            <div className="grid items-end gap-6 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-lime-300">
                  Add a swash
                </p>
                <h2 className="mt-4 font-display text-display-lg text-balance sm:mt-6">
                  Have a brief in mind?
                  <br />
                  <span className="italic text-ash-500">Send it our way.</span>
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
