import Link from 'next/link';
import { POSTS } from '@/data/journal';
import { Reveal } from '@/components/Reveal';
import { TiltCard } from '@/components/TiltCard';

export const metadata = {
  title: 'Journal · Swash',
  description:
    'Notes from inside the studio - how we scope briefs, why we price the way we do, what we learn shipping work.',
};

const CATEGORY_LABEL: Record<string, string> = {
  process: 'Process',
  craft: 'Craft',
  studio: 'Studio',
};

export default function JournalPage() {
  const [featured, ...rest] = POSTS;

  return (
    <>
      <section className="relative pt-40 pb-16">
        <div className="container-wide">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="eyebrow">Journal</p>
              <h1 className="mt-6 font-display text-display-xl text-balance text-ink-700">
                Notes from
                <br />
                <span className="italic text-ash-500">inside the studio.</span>
              </h1>
            </div>
            <div className="md:col-span-5">
              <p className="text-pretty text-base leading-relaxed text-ash-500">
                Short essays on how we work - the way we read a brief,
                the way we price, the way we ship. Written by the
                team, not by a content shop.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured post */}
      <section className="container-wide pb-12">
        <Reveal>
          <TiltCard intensity={3} scale={1.005} glare className="relative">
            <Link
              href={`/journal/${featured.slug}`}
              data-cursor="image"
              className="group grid overflow-hidden rounded-card border border-hairline bg-paper-200/60 transition-colors duration-500 ease-silk hover:border-ink-700/30 md:grid-cols-12"
            >
              <div className="relative aspect-[4/3] md:col-span-7 md:aspect-auto overflow-hidden">
                <img
                  src={featured.cover}
                  alt={featured.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-ink-50/45 via-transparent to-transparent" />
                <div className="absolute left-6 top-6 rounded-pill bg-ink-50/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-paper-100 backdrop-blur-sm">
                  Featured · {CATEGORY_LABEL[featured.category]}
                </div>
              </div>
              <div className="flex flex-col justify-between gap-8 p-8 md:col-span-5 md:p-12">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash-400">
                    {featured.date} · {featured.readingTime} read
                  </p>
                  <h2 className="mt-5 font-display text-display-md tracking-tight text-ink-700 transition-colors group-hover:text-lime-300">
                    {featured.title}
                  </h2>
                  <p className="mt-5 max-w-md text-pretty leading-relaxed text-ash-500">
                    {featured.dek}
                  </p>
                </div>
                <div className="flex items-center gap-3 border-t border-hairline pt-5">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-ink-700 font-mono text-xs text-paper-100">
                    {featured.author.split(' ').map((p) => p[0]).join('')}
                  </span>
                  <div>
                    <p className="text-sm text-ink-700">{featured.author}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ash-400">
                      {featured.role}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </TiltCard>
        </Reveal>
      </section>

      {/* The rest */}
      <section className="container-wide pb-24">
        <p className="eyebrow mb-8">More from the studio</p>
        <ul className="grid gap-6 md:grid-cols-2">
          {rest.map((post, i) => (
            <li key={post.slug}>
              <Reveal delay={i}>
                <TiltCard intensity={4} scale={1.01} glare>
                  <Link
                    href={`/journal/${post.slug}`}
                    data-cursor="image"
                    className="group block overflow-hidden rounded-card border border-hairline bg-paper-200/60 transition-colors hover:border-ink-700/30"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={post.cover}
                        alt={post.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-ink-50/50 via-transparent to-transparent" />
                      <div className="absolute left-5 top-5 rounded-pill bg-ink-50/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-paper-100 backdrop-blur-sm">
                        {CATEGORY_LABEL[post.category]}
                      </div>
                    </div>
                    <div className="p-7">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash-400">
                        {post.date} · {post.readingTime} read
                      </p>
                      <h3 className="mt-4 font-display text-2xl tracking-tight text-ink-700 transition-colors group-hover:text-lime-300 md:text-3xl">
                        {post.title}
                      </h3>
                      <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-ash-500">
                        {post.dek}
                      </p>
                      <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-ash-400">
                        {post.author} · {post.role}
                      </p>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
