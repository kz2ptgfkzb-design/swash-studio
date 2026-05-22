import { CHANGELOG, TAG_STYLES } from '@/data/changelog';
import { Reveal } from '@/components/Reveal';
import { cn } from '@/lib/utils';

export const metadata = {
  title: 'Changelog · Aurora Editions Winter 26',
  description:
    'Every release in the Winter 26 edition, dated and labeled — new, improved, fixed, deprecated.',
};

export default function ChangelogPage() {
  return (
    <>
      <section className="relative pt-40 pb-16">
        <div className="container-page">
          <span className="eyebrow">The Long Log</span>
          <h1 className="mt-6 max-w-[14ch] font-display text-display-xl leading-[0.92] tracking-tighter text-bone-50">
            What shipped, <span className="italic font-normal text-bone-400">week by week.</span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-bone-300">
            A running log of every release inside the Winter 26 edition. Dated.
            Tagged. Built to be cited.
          </p>
        </div>
      </section>

      <section className="container-page pb-24">
        <ul className="space-y-0">
          {CHANGELOG.map((entry, ei) => (
            <li key={entry.date}>
              <Reveal delay={ei}>
                <div className="grid gap-10 border-t border-ink-700 py-12 md:grid-cols-[200px_1fr] md:gap-16">
                  <div className="md:sticky md:top-28 md:self-start">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-bone-400">
                      {entry.week}
                    </p>
                    <p className="mt-2 font-display text-2xl tracking-tight text-bone-50">
                      {formatDate(entry.date)}
                    </p>
                  </div>

                  <ul className="space-y-8">
                    {entry.items.map((item, i) => {
                      const tag = TAG_STYLES[item.tag];
                      return (
                        <li key={i} className="grid gap-3 border-l border-ink-700 pl-6">
                          <span
                            className={cn(
                              'inline-flex w-fit rounded-pill border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em]',
                              tag.cls,
                            )}
                          >
                            {tag.label}
                          </span>
                          <h3 className="font-display text-2xl leading-snug tracking-tight text-bone-50">
                            {item.title}
                          </h3>
                          <p className="max-w-[68ch] text-pretty text-sm leading-relaxed text-bone-300">
                            {item.body}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
          <li className="hairline" />
        </ul>
      </section>
    </>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
