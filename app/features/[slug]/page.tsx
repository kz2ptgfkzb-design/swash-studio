import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  FEATURES,
  getFeatureBySlug,
  getRelatedFeatures,
  getCategoryById,
} from '@/data/features';
import { FeatureCard } from '@/components/FeatureCard';
import { FeatureHero } from '@/components/FeatureHero';
import { Reveal } from '@/components/Reveal';

export function generateStaticParams() {
  return FEATURES.map((f) => ({ slug: f.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const feat = getFeatureBySlug(params.slug);
  if (!feat) return { title: 'Not found' };
  return {
    title: `${feat.name} · Aurora Editions Winter 26`,
    description: feat.summary,
  };
}

export default function FeaturePage({ params }: { params: { slug: string } }) {
  const feat = getFeatureBySlug(params.slug);
  if (!feat) notFound();
  const cat = getCategoryById(feat.category);
  const related = getRelatedFeatures(feat.slug);

  return (
    <>
      <FeatureHero feature={feat} />

      <section className="container-page py-24 md:py-32">
        <div className="grid gap-16 md:grid-cols-12">
          <aside className="md:col-span-3">
            <div className="md:sticky md:top-28 space-y-8">
              <div>
                <p className="eyebrow">Metadata</p>
                <dl className="mt-4 space-y-3">
                  {feat.meta.map((m) => (
                    <div key={m.label} className="space-y-1">
                      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone-500">
                        {m.label}
                      </dt>
                      <dd className="text-sm text-bone-100">{m.value}</dd>
                    </div>
                  ))}
                  <div className="space-y-1">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone-500">
                      Category
                    </dt>
                    <dd className="text-sm text-bone-100">
                      <Link
                        href={`/features?cat=${feat.category}`}
                        className="underline decoration-bone-500 underline-offset-4 hover:text-glow-lime"
                      >
                        {cat?.label}
                      </Link>
                    </dd>
                  </div>
                </dl>
              </div>

              <Link href="/features" className="link-arrow text-sm">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: 'rotate(180deg)' }}>
                  <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to directory
              </Link>
            </div>
          </aside>

          <article className="md:col-span-9 space-y-16">
            <Reveal>
              <p className="font-display text-display-md leading-[1.08] tracking-tight text-balance text-bone-50">
                {feat.hero.body}
              </p>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-3">
              {feat.highlights.map((h, i) => (
                <Reveal key={h.title} delay={i}>
                  <div className="h-full rounded-card border border-ink-700 bg-ink-800/50 p-6 transition-colors hover:border-bone-300/20">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-glow-lime">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-4 font-display text-xl tracking-tight text-bone-50">
                      {h.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-bone-300">
                      {h.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div className="rounded-card border border-ink-700 bg-ink-900 p-8 md:p-12">
                <span className="eyebrow">From the team</span>
                <p className="mt-6 text-pretty font-display text-2xl leading-snug tracking-tight text-bone-100">
                  {`"${feat.summary}"`}
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-bone-50 font-mono text-xs text-ink-950">
                    AE
                  </span>
                  <div>
                    <p className="text-sm text-bone-100">Aurora Editions Team</p>
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-bone-400">
                      Edition 014, Winter 26
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </article>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-wide pb-24">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="font-display text-display-md tracking-tight text-bone-50">
              Related releases
            </h2>
            <Link href="/features" className="link-arrow text-sm">
              See all
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {related.map((r) => (
              <FeatureCard key={r.slug} feature={r} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
