import Link from 'next/link';

export default function FeatureNotFound() {
  return (
    <section className="container-page grid min-h-[70vh] place-items-center text-center">
      <div>
        <p className="eyebrow">404 — Filed away</p>
        <h1 className="mt-6 font-display text-display-xl leading-[0.92] tracking-tighter text-bone-50">
          Not in this edition.
        </h1>
        <p className="mt-6 max-w-md text-pretty text-base text-bone-300 mx-auto">
          That release is not part of the Winter 26 drop. Head back to the
          directory to find what shipped.
        </p>
        <Link href="/features" className="btn-primary mt-8">
          Open the directory
        </Link>
      </div>
    </section>
  );
}
