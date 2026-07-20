import Link from 'next/link';
import { notFound } from 'next/navigation';
import { POSTS, getPostBySlug, getOtherPosts, type JournalBlock } from '@/data/journal';
import { Reveal } from '@/components/Reveal';
import { Magnetic } from '@/components/Magnetic';

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getPostBySlug(params.slug);
  if (!p) return { title: 'Not found' };
  return {
    title: p.title,
    description: p.dek,
    openGraph: {
      title: p.title,
      description: p.dek,
      images: [p.cover],
    },
  };
}

export default function JournalPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();
  const others = getOtherPosts(post.slug, 2);

  return (
    <>
      <article>
        <section className="container-page pt-24 pb-8 sm:pt-32 sm:pb-12 md:pt-40">
          <Link href="/journal" className="link-arrow text-xs" data-cursor="link">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" style={{ transform: 'rotate(180deg)' }}>
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All journal entries
          </Link>

          <div className="mt-8 max-w-3xl sm:mt-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash-400">
              {post.date} · {post.readingTime} read · {post.category}
            </p>
            <h1 className="mt-4 font-display text-display-xl text-balance text-ink-700 sm:mt-6">
              {post.title}
            </h1>
            <p className="mt-5 max-w-2xl text-pretty font-display italic text-lg leading-snug text-ash-500 sm:mt-6 sm:text-xl md:text-2xl">
              {post.dek}
            </p>

            <div className="mt-6 flex items-center gap-3 border-t border-hairline pt-5 sm:mt-8 sm:pt-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-ink-700 font-mono text-xs text-paper-100">
                {post.author.split(' ').map((p) => p[0]).join('')}
              </span>
              <div>
                <p className="text-sm text-ink-700">{post.author}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ash-400">
                  {post.role}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container-wide pb-16">
          <Reveal>
            <div className="relative aspect-[16/8] overflow-hidden rounded-card border border-hairline">
              <img
                src={post.cover}
                alt={post.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-50/30 via-transparent to-transparent" />
            </div>
          </Reveal>
        </section>

        <section className="container-page pb-16 sm:pb-24">
          <div className="mx-auto max-w-2xl space-y-5 sm:space-y-6">
            {post.body.map((block, i) => (
              <Reveal key={i} delay={i % 3}>
                <BlockRenderer block={block} />
              </Reveal>
            ))}
          </div>
        </section>
      </article>

      <section className="container-wide pb-16 sm:pb-24">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3 sm:mb-8">
          <h2 className="font-display text-display-md text-ink-700">
            Keep reading.
          </h2>
          <Link href="/journal" className="link-arrow text-sm" data-cursor="link">
            All entries
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/journal/${o.slug}`}
              data-cursor="image"
              className="group overflow-hidden rounded-card border border-hairline bg-paper-200/60 transition-colors hover:border-ink-700/30"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={o.cover}
                  alt={o.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                />
              </div>
              <div className="p-5 sm:p-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash-400">
                  {o.date} · {o.readingTime}
                </p>
                <h3 className="mt-3 font-display text-xl tracking-tight text-ink-700 transition-colors group-hover:text-lime-300 sm:mt-4 sm:text-2xl md:text-3xl">
                  {o.title}
                </h3>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-ash-500">
                  {o.dek}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page py-8 pb-20 sm:py-12 sm:pb-32">
        <div className="rounded-card border border-hairline bg-paper-100/75 p-6 text-ink-700 sm:p-10 md:p-16">
          <div className="grid items-end gap-6 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-lime-300">
                Read enough?
              </p>
              <h2 className="mt-4 font-display text-display-lg text-balance sm:mt-6">
                Send the brief.
                <br />
                <span className="italic text-ash-500">We&rsquo;ll do the rest.</span>
              </h2>
            </div>
            <div className="md:col-span-5 md:text-right">
              <Magnetic strength={0.25}>
                <Link
                  href="/brief"
                  className="btn bg-lime-300 text-paper-100 px-6 py-3.5 hover:bg-paper-100 hover:text-ink-700 hover:-translate-y-0.5"
                  data-cursor="link"
                >
                  Start a brief
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function BlockRenderer({ block }: { block: JournalBlock }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 className="font-display text-display-sm text-balance text-ink-700 mt-12">
          {block.text}
        </h2>
      );
    case 'p':
      return (
        <p className="text-pretty text-base leading-relaxed text-ink-400 sm:text-lg md:text-[19px]">
          {block.text}
        </p>
      );
    case 'blockquote':
      return (
        <figure className="my-8 border-l-2 border-lime-300 pl-5 sm:my-10 sm:pl-6 md:pl-8">
          <blockquote className="font-display text-xl italic leading-snug text-ink-700 sm:text-2xl md:text-3xl">
            {block.text}
          </blockquote>
          {block.cite && (
            <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-ash-400">
              - {block.cite}
            </figcaption>
          )}
        </figure>
      );
    case 'ul':
      return (
        <ul className="space-y-3 border-l-2 border-hairline pl-5 sm:pl-6">
          {block.items.map((it, i) => (
            <li key={i} className="flex items-start gap-3 text-base leading-relaxed text-ink-400 sm:text-lg">
              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-lime-300" />
              {it}
            </li>
          ))}
        </ul>
      );
    case 'image':
      return (
        <figure className="my-10">
          <img src={block.src} alt={block.caption ?? ''} className="w-full rounded-card border border-hairline" />
          {block.caption && (
            <figcaption className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-ash-400">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
  }
}
