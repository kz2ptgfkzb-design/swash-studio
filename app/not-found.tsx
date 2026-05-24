import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container-page grid min-h-[80vh] place-items-center text-center">
      <div>
        <p className="eyebrow">404 — Off the brief</p>
        <h1 className="mt-6 font-display text-display-2xl text-ink-700">
          Lost the
          <br />
          <span className="italic font-light text-ash-500">thread.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-pretty text-base text-ash-500">
          That page isn&rsquo;t here. Head back to the start, or send us
          a brief and we&rsquo;ll get you something better.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="btn-primary">Return home</Link>
          <Link href="/brief" className="btn-ghost">Start a brief</Link>
        </div>
      </div>
    </section>
  );
}
