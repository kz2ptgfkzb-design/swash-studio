import Link from 'next/link';
import { notFound } from 'next/navigation';
import { WORK, getWorkBySlug, getRelatedWork } from '@/data/work';
import { WorkCard } from '@/components/WorkCard';
import { Reveal } from '@/components/Reveal';
import { Magnetic } from '@/components/Magnetic';
import { cn } from '@/lib/utils';

export function generateStaticParams() {
  return WORK.map((w) => ({ slug: w.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const w = getWorkBySlug(params.slug);
  if (!w) return { title: 'Not found' };
  return {
    title: `${w.client} · Swash`,
    description: w.summary,
  };
}

const ACCENT_BG: Record<string, string> = {
  ink: 'bg-ink-700',
  saffron: 'bg-saffron-300',
  olive: 'bg-[#5C6B47]',
  rust: 'bg-[#B6553F]',
  sage: 'bg-[#7C8F77]',
};

const ACCENT_FG: Record<string, string> = {
  ink: 'text-paper-50',
  saffron: 'text-ink-700',
  olive: 'text-paper-50',
  rust: 'text-paper-50',
  sage: 'text-paper-50',
};

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const work = getWorkBySlug(params.slug);
  if (!work) notFound();
  const related = getRelatedWork(work.slug);
  const cs = work.caseStudy;

  return (
    <>
      <section className="relative pt-24 pb-8 sm:pt-32 sm:pb-12 md:pt-40">
        <div className="container-wide">
          <Link href="/work" className="link-arrow text-xs" data-cursor="link">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" style={{ transform: 'rotate(180deg)' }}>
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All work
          </Link>

          <div className="mt-8 grid items-end gap-6 sm:mt-10 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ash-400">
                {work.industry} · {work.year}
              </p>
              <h1 className="mt-3 font-display text-display-xl text-balance text-ink-700 sm:mt-4">
                {work.client}
              </h1>
              <p className="mt-4 max-w-2xl text-pretty font-display italic text-lg leading-snug text-ash-500 sm:mt-6 sm:text-2xl md:text-3xl">
                {work.summary}
              </p>
            </div>

            <div className="md:col-span-4">
              <dl className="grid grid-cols-2 gap-5 border-l-0 border-t border-hairline pl-0 pt-6 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0 sm:gap-6">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ash-400">Timeline</dt>
                  <dd className="mt-1 font-display text-xl text-ink-700">{cs.timeline}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ash-400">Year</dt>
                  <dd className="mt-1 font-display text-xl text-ink-700">{work.year}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ash-400">Scope</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {work.scope.map((s) => (
                      <span key={s} className="rounded-pill bg-paper-200/60 px-3 py-1 text-xs text-ink-700">{s}</span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="container-wide pb-12">
        <Reveal>
          <div
            className={cn(
              'relative aspect-[16/9] overflow-hidden rounded-card',
              ACCENT_BG[work.accent],
              ACCENT_FG[work.accent],
            )}
          >
            <div className="absolute inset-0 bg-noise opacity-[0.06] mix-blend-overlay" />
            <div className="absolute left-5 top-5 sm:left-8 sm:top-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-70">{work.industry}</p>
              <p className="mt-2 font-display text-2xl sm:text-3xl md:text-5xl">{work.client}</p>
            </div>
            {work.metric && (
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 sm:bottom-8 sm:left-8 sm:right-8">
                <p className="font-display text-4xl leading-none sm:text-7xl md:text-9xl">{work.metric.value}</p>
                <p className="max-w-[45%] text-right font-mono text-[10px] uppercase tracking-[0.18em] opacity-80 sm:text-[11px]">{work.metric.label}</p>
              </div>
            )}
          </div>
        </Reveal>
      </section>

      <section className="container-page py-12 sm:py-20">
        <div className="grid gap-8 md:grid-cols-12 md:gap-16">
          <aside className="md:col-span-3">
            <p className="eyebrow sm:sticky sm:top-28">The brief</p>
          </aside>
          <div className="md:col-span-9 space-y-10 sm:space-y-12">
            <Reveal>
              <div>
                <h2 className="font-display text-display-md text-balance text-ink-700">
                  The challenge.
                </h2>
                <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-ink-400 sm:mt-6 sm:text-lg">
                  {cs.challenge}
                </p>
              </div>
            </Reveal>

            <Reveal delay={1}>
              <div>
                <h2 className="font-display text-display-md text-balance text-ink-700">
                  How we approached it.
                </h2>
                <ol className="mt-5 grid gap-4 sm:mt-6">
                  {cs.approach.map((step, i) => (
                    <li key={i} className="grid grid-cols-[auto_1fr] gap-4 rounded-card border border-hairline bg-paper-50/40 p-5 sm:gap-6 sm:p-6">
                      <span className="font-mono text-sm text-ink_red-400">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="text-pretty leading-relaxed text-ink-400">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal delay={2}>
              <div>
                <h2 className="font-display text-display-md text-balance text-ink-700">
                  The outcome.
                </h2>
                <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-ink-400 sm:mt-6 sm:text-lg">
                  {cs.outcome}
                </p>
                <dl className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-card border border-hairline bg-hairline sm:mt-8 sm:grid-cols-3">
                  {cs.outcomes.map((o, i) => (
                    <div key={i} className="bg-paper-100 p-5 sm:p-6 md:p-8">
                      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ash-400">
                        {String(i + 1).padStart(2, '0')}
                      </dt>
                      <dd className="mt-3 font-display text-display-md leading-none tracking-tight text-ink-700">
                        {o.value}
                      </dd>
                      <p className="mt-2 text-sm text-ink-400">{o.label}</p>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            {cs.testimonial && (
              <Reveal delay={3}>
                <blockquote className="rounded-card border border-hairline bg-paper-100 p-6 sm:p-10 md:p-14">
                  <svg width="34" height="26" viewBox="0 0 34 26" fill="none" className="text-ink_red-400">
                    <path
                      d="M0 26V14C0 6.3 5.2 0.8 13 0V5.2C8.6 5.7 5.7 8.7 5.7 13H13V26H0ZM21 26V14C21 6.3 26.2 0.8 34 0V5.2C29.6 5.7 26.7 8.7 26.7 13H34V26H21Z"
                      fill="currentColor"
                    />
                  </svg>
                  <p className="mt-5 text-pretty font-display text-lg leading-snug text-ink-700 sm:mt-6 sm:text-2xl md:text-3xl">
                    {cs.testimonial.quote}
                  </p>
                  <footer className="mt-6 border-t border-hairline pt-5 sm:mt-8">
                    <p className="font-display text-base text-ink-700">{cs.testimonial.name}</p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ash-400">
                      {cs.testimonial.role}
                    </p>
                  </footer>
                </blockquote>
              </Reveal>
            )}

            <Reveal delay={4}>
              <div>
                <p className="eyebrow">Team</p>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {cs.team.map((t) => (
                    <li
                      key={t}
                      className="rounded-pill border border-hairline bg-paper-50/60 px-4 py-2 text-sm text-ink-700"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-wide py-8 pb-16 sm:py-12 sm:pb-24">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3 sm:mb-10">
          <h2 className="font-display text-display-md text-balance text-ink-700">
            More work.
          </h2>
          <Link href="/work" className="link-arrow text-sm" data-cursor="link">
            See everything
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
          {related.map((r) => (
            <WorkCard key={r.slug} item={r} />
          ))}
        </div>
      </section>

      <section className="container-page py-8 pb-20 sm:py-12 sm:pb-32">
        <div className="rounded-card border border-hairline bg-paper-100/75 p-6 text-ink-700 sm:p-10 md:p-16">
          <div className="grid items-end gap-6 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-lime-300">
                Your turn
              </p>
              <h2 className="mt-4 font-display text-display-lg text-balance sm:mt-6">
                Something like this in mind?
                <br />
                <span className="italic text-ash-500">Send the brief.</span>
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
      </section>
    </>
  );
}
