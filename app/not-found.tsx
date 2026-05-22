import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container-page grid min-h-[80vh] place-items-center text-center">
      <div>
        <p className="eyebrow">404 — Off the path</p>
        <h1 className="mt-6 font-display text-display-2xl leading-[0.9] tracking-tighter text-bone-50">
          Lost the
          <br />
          <span className="italic font-normal text-bone-400">thread.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-pretty text-base text-bone-300">
          That page is not part of this edition. Head back to the start.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="btn-primary">Return home</Link>
          <Link href="/features" className="btn-ghost">Open directory</Link>
        </div>
      </div>
    </section>
  );
}
