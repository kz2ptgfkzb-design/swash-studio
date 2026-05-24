'use client';

import Link from 'next/link';
import { WORK } from '@/data/work';
import { WorkCard } from './WorkCard';
import { Reveal } from './Reveal';

export function WorkPreview() {
  const featured = WORK.slice(0, 4);
  return (
    <section id="work" className="relative py-28 md:py-40">
      <div className="container-wide">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <span className="eyebrow">Recent work</span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-6 font-display text-display-lg text-balance text-ink-700">
                A few briefs we&rsquo;ve answered
                <br />
                <span className="italic font-light text-ash-500">in the past year.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <Reveal delay={2}>
              <p className="text-pretty text-base leading-relaxed text-ash-500">
                Six different industries. Six different budgets. The same
                eye for the brand and the same care for the build.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Link href="/work" className="link-arrow text-sm" data-cursor="link">
                  See every project
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link href="/preview" className="link-arrow text-sm" data-cursor="link">
                  Or click into 3 live demos
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {featured.map((item, i) => (
            <Reveal key={item.slug} delay={i % 2 === 0 ? 0 : 1}>
              <WorkCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
