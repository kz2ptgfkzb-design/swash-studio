import Link from 'next/link';
import { SERVICES } from '@/data/services';
import { Reveal } from '@/components/Reveal';
import { Magnetic } from '@/components/Magnetic';

export const metadata = {
  title: 'Services · Swash',
  description:
    'The six services Swash offers - brand identity, website design, ecommerce, motion, campaign pages, and audits. Bundle them, pick one, mix as the brief asks.',
};

const CATEGORY_LABEL: Record<string, string> = {
  brand: 'Brand',
  site: 'Site',
  motion: 'Motion',
  growth: 'Growth',
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative pt-40 pb-16">
        <div className="container-page">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="eyebrow">Services</p>
              <h1 className="mt-6 font-display text-display-xl text-balance text-ink-700">
                Six things we do.
                <br />
                <span className="italic text-ash-500">
                  Pick one, bundle them, or stack the lot.
                </span>
              </h1>
            </div>
            <div className="md:col-span-5">
              <p className="text-pretty text-base leading-relaxed text-ash-500">
                Every engagement is scoped to the brief. Most pair a
                brand with a site; some are pure motion work, some are
                audits, some are one-week launch pages. Read each spec
                below, then send a brief.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-wide pb-24">
        <ul className="space-y-6">
          {SERVICES.map((s, i) => (
            <li key={s.slug} id={s.slug}>
              <Reveal>
                <article className="grid gap-10 rounded-card border border-hairline bg-paper-50/40 p-8 md:grid-cols-12 md:p-12">
                  <header className="md:col-span-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink_red-400">
                        {String(i + 1).padStart(2, '0')} · {CATEGORY_LABEL[s.category]}
                      </span>
                    </div>
                    <h2 className="mt-6 font-display text-display-md text-balance text-ink-700">
                      {s.title}
                    </h2>
                    <p className="mt-4 max-w-md text-pretty font-display italic text-xl leading-snug text-ash-500">
                      {s.tagline}
                    </p>
                    <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-hairline pt-6">
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ash-400">
                          Typical start
                        </dt>
                        <dd className="mt-1 text-sm text-ink-700">{s.starts}</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ash-400">
                          Duration
                        </dt>
                        <dd className="mt-1 text-sm text-ink-700">{s.duration}</dd>
                      </div>
                    </dl>
                  </header>

                  <div className="md:col-span-8">
                    <p className="text-pretty text-base leading-relaxed text-ink-400">
                      {s.body}
                    </p>
                    <div className="mt-8">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash-400">
                        What you get
                      </p>
                      <ul className="mt-4 space-y-2.5">
                        {s.deliverables.map((d) => (
                          <li
                            key={d}
                            className="flex items-start gap-3 text-sm leading-relaxed text-ink-400"
                          >
                            <svg
                              className="mt-1.5 shrink-0 text-ink_red-400"
                              width="10"
                              height="10"
                              viewBox="0 0 10 10"
                              fill="none"
                            >
                              <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Magnetic strength={0.2}>
                      <Link
                        href={`/brief?service=${s.slug}`}
                        className="mt-10 inline-flex"
                        data-cursor="link"
                      >
                        <span className="btn-primary">
                          Brief us on this
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </Link>
                    </Magnetic>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
