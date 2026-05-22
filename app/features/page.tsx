import { Suspense } from 'react';
import { FeaturesBrowser } from '@/components/FeaturesBrowser';

export const metadata = {
  title: 'All releases · Aurora Editions Winter 26',
  description:
    'Every release in the Winter 26 edition — filterable by category, searchable by name.',
};

export default function FeaturesPage() {
  return (
    <>
      <section className="relative pt-40">
        <div className="container-wide">
          <span className="eyebrow">The Directory</span>
          <h1 className="mt-6 max-w-[16ch] font-display text-display-xl leading-[0.92] tracking-tighter text-bone-50">
            Every release, <span className="italic font-normal text-bone-400">listed.</span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-bone-300">
            Filter by category, search by name, or scroll the whole edition.
            Every card opens to a full spec.
          </p>
        </div>
      </section>

      <Suspense fallback={<FeaturesBrowserFallback />}>
        <div className="mt-16">
          <FeaturesBrowser />
        </div>
      </Suspense>
    </>
  );
}

function FeaturesBrowserFallback() {
  return (
    <div className="container-wide pb-24">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[5/4] animate-pulse rounded-card border border-ink-700 bg-ink-800/40"
          />
        ))}
      </div>
    </div>
  );
}
