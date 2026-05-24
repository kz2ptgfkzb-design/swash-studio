import Link from 'next/link';

export default function WorkNotFound() {
  return (
    <section className="container-page grid min-h-[70vh] place-items-center text-center">
      <div>
        <p className="eyebrow">404 — Not in the archive</p>
        <h1 className="mt-6 font-display text-display-xl text-ink-700">
          That brief isn&rsquo;t
          <br />
          <span className="italic text-ash-500">on the shelf.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-pretty text-base text-ash-500">
          Head back to the full archive, or send us a new one.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/work" className="btn-primary">See all work</Link>
          <Link href="/brief" className="btn-ghost">Start a brief</Link>
        </div>
      </div>
    </section>
  );
}
