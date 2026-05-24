import Link from 'next/link';
import { WORK } from '@/data/work';
import { WorkCard } from '@/components/WorkCard';
import { Reveal } from '@/components/Reveal';

export const metadata = {
  title: 'Work · Swash',
  description:
    'Every brief Swash has answered — across HVAC, ecommerce, SaaS, restaurants, real estate, and skincare.',
};

export default function WorkPage() {
  return (
    <>
      <section className="relative pt-40 pb-16">
        <div className="container-wide">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="eyebrow">The work</p>
              <h1 className="mt-6 font-display text-display-xl text-balance text-ink-700">
                Briefs we&rsquo;ve answered.
                <br />
                <span className="italic font-light text-ash-500">
                  Brands we&rsquo;ve made.
                </span>
              </h1>
            </div>
            <div className="md:col-span-4 md:col-start-9">
              <p className="text-pretty text-base leading-relaxed text-ash-500">
                Six industries. Six budgets. The same care, the same craft,
                whether the brief was a single-page launch or a flagship
                rebuild.
              </p>
              <Link
                href="/preview"
                className="link-arrow mt-6 text-sm"
                data-cursor="link"
              >
                See three live demo sites
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-wide pb-24">
        <div className="grid gap-6 md:grid-cols-2">
          {WORK.map((item, i) => (
            <Reveal key={item.slug} delay={i % 2}>
              <WorkCard item={item} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-page pb-32">
        <div className="rounded-card border border-hairline bg-bone-200/40 p-10 text-center md:p-16">
          <Reveal>
            <p className="eyebrow">Your turn</p>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mx-auto mt-6 max-w-[20ch] font-display text-display-lg text-balance text-ink-700">
              See yourself in any of those?
              <br />
              <span className="italic font-light text-ash-500">
                Let&rsquo;s talk.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link href="/brief" className="btn-primary">
                Start a brief
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="mailto:hello@swash.studio" className="btn-ghost" data-cursor="link">
                Or email us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
