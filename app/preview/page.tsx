import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { TiltCard } from '@/components/TiltCard';
import { Magnetic } from '@/components/Magnetic';
import { PHOTOS } from '@/data/photos';

export const metadata = {
  title: 'Live previews · Swash',
  description:
    'Three demo websites - plumber, restaurant, SaaS. Built with Swash, fully clickable. Each one is a different industry, palette, type system.',
};

type Demo = {
  slug: string;
  brand: string;
  kind: string;
  tagline: string;
  body: string;
  accent: string;
  bg: string;
  text: string;
  swatch: string[];
};

const DEMOS: Demo[] = [
  {
    slug: 'pipeline',
    brand: 'Pipeline & Co.',
    kind: 'Plumber · Home services',
    tagline: 'Plumbing that shows up.',
    body:
      "Utilitarian trade brand. Navy + safety yellow + bold display. Big phone CTA, service grid, areas served, reviews, written-quote form. Local-SEO-first, built for trust.",
    accent: '#FFD93D',
    bg: '#0E2236',
    text: '#F4EFE3',
    swatch: ['#0E2236', '#FFD93D', '#F4EFE3', '#091828'],
  },
  {
    slug: 'ember-table',
    brand: 'Ember & Table',
    kind: 'Restaurant · Hospitality',
    tagline: 'Slow heat. Worth the wait.',
    body:
      'Editorial neighborhood-restaurant brand. Cream + ember orange. Cormorant Garamond italics, slow scroll. Menu, story, hours, six-seat reservations.',
    accent: '#C8462C',
    bg: '#F5ECD7',
    text: '#1A0F08',
    swatch: ['#F5ECD7', '#C8462C', '#1A0F08', '#E8DEC4'],
  },
  {
    slug: 'overlay',
    brand: 'Overlay',
    kind: 'B2B SaaS · Analytics',
    tagline: 'See what your users actually do.',
    body:
      'Modern tech-startup site. Paper + ink + cobalt blue. Live dashboard mockup hero, features grid, 3-step "how it works" with code, monthly/yearly pricing, customer story.',
    accent: '#2447FF',
    bg: '#F8F6F2',
    text: '#0A0A0A',
    swatch: ['#F8F6F2', '#2447FF', '#0A0A0A', '#F0EDE7'],
  },
  {
    slug: 'holm',
    brand: 'Holm',
    kind: 'Real estate · Boutique brokerage',
    tagline: 'A boutique for the city’s quieter listings.',
    body:
      'Editorial brokerage. Cream + deep navy + soft coral. Photographic hero, four-property grid, neighborhoods we know, four-agent lineup, written process, viewing-request form. Real photography throughout.',
    accent: '#E58669',
    bg: '#F0EAD9',
    text: '#0B1830',
    swatch: ['#F0EAD9', '#E58669', '#0B1830', '#E5DCC2'],
  },
];

export default function PreviewIndex() {
  return (
    <>
      <section className="relative pt-40 pb-16">
        <div className="container-wide">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="eyebrow">Live previews</p>
              <h1 className="mt-6 font-display text-display-xl text-balance text-ink-700">
                Same studio.
                <br />
                <span className="italic text-ash-500">Four different brands.</span>
              </h1>
            </div>
            <div className="md:col-span-5">
              <p className="text-pretty text-base leading-relaxed text-ash-500">
                Four fictional websites built end-to-end with Swash - a
                plumber, a wood-fired restaurant, a SaaS analytics tool,
                and a boutique real-estate brokerage. Each lives at its
                own URL, with its own brand. Click in, scroll around,
                fill in a form. No two look alike.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-wide pb-24">
        <ul className="space-y-8">
          {DEMOS.map((d, i) => (
            <li key={d.slug}>
              <Reveal delay={i}>
                <TiltCard intensity={4} scale={1.005} glare className="relative">
                  <Link
                    href={`/preview/${d.slug}`}
                    target="_blank"
                    data-cursor="image"
                    className="group grid overflow-hidden rounded-card border border-hairline bg-paper-200/60 transition-colors duration-500 ease-silk hover:border-ink-700/30 md:grid-cols-12"
                  >
                    {/* Visual side */}
                    <div
                      className="relative aspect-[4/3] overflow-hidden md:col-span-7 md:aspect-auto"
                      style={{ background: d.bg, color: d.text }}
                    >
                      <PreviewMockup demo={d} />

                      <div
                        className="absolute left-7 top-7 rounded-pill px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] backdrop-blur-sm"
                        style={{
                          background: `${d.text}10`,
                          color: d.text,
                        }}
                      >
                        {d.kind}
                      </div>

                      <div
                        className="absolute right-7 top-7 rounded-pill px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] backdrop-blur-sm"
                        style={{
                          background: d.accent,
                          color: d.bg,
                        }}
                      >
                        Live demo →
                      </div>
                    </div>

                    {/* Info side */}
                    <div className="flex flex-col justify-between gap-10 p-8 md:col-span-5 md:p-12">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash-400">
                          {String(i + 1).padStart(2, '0')} - Preview
                        </p>
                        <h2 className="mt-4 font-display text-display-md tracking-tight text-ink-700 transition-colors group-hover:text-lime-300">
                          {d.brand}
                        </h2>
                        <p className="mt-2 font-display italic text-xl text-ash-500">
                          {d.tagline}
                        </p>
                        <p className="mt-6 text-pretty text-sm leading-relaxed text-ash-500">
                          {d.body}
                        </p>
                      </div>

                      <div className="space-y-4 border-t border-hairline pt-5">
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash-400">
                          Palette
                        </p>
                        <div className="flex gap-2">
                          {d.swatch.map((c) => (
                            <span
                              key={c}
                              title={c}
                              className="h-7 w-7 rounded-full border border-hairline"
                              style={{ background: c }}
                            />
                          ))}
                        </div>
                        <div className="pt-2">
                          <span className="link-arrow text-sm">
                            Open preview in new tab
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-page py-24 pb-32">
        <div className="rounded-card border border-hairline bg-paper-100/75 p-10 text-ink-700 md:p-16">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-lime-300">
                Want one of these for your business?
              </p>
              <h2 className="mt-6 font-display text-display-lg text-balance">
                Tell us the brief.
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

function PreviewMockup({ demo }: { demo: Demo }) {
  if (demo.slug === 'pipeline') {
    return (
      <div className="absolute inset-0 p-10 flex flex-col justify-between">
        <div className="grid grid-cols-12 gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className="col-span-2 h-1 rounded-full"
              style={{ background: i === 0 ? demo.accent : `${demo.text}20` }}
            />
          ))}
        </div>
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.32em]" style={{ color: demo.accent }}>
            Est. 2008 · 24/7
          </p>
          <p
            style={{ fontFamily: 'var(--font-display)', color: demo.text }}
            className="mt-3 text-[clamp(2.5rem,5.5vw,5rem)] font-bold leading-[0.92] tracking-tight"
          >
            Plumbing that
            <br />
            <span style={{ color: demo.accent }}>shows up.</span>
          </p>
          <span
            className="mt-6 inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-bold"
            style={{ background: demo.accent, color: demo.bg }}
          >
            ☎ (555) 010-0142
          </span>
        </div>
      </div>
    );
  }

  if (demo.slug === 'ember-table') {
    return (
      <div className="absolute inset-0 p-10 flex flex-col justify-between">
        <div className="flex items-center gap-3">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: demo.accent }}
          />
          <p className="font-mono text-[9px] uppercase tracking-[0.32em]" style={{ color: demo.accent }}>
            Wood-fired · Outer Sunset
          </p>
        </div>
        <div>
          <p
            style={{ fontFamily: 'var(--font-editorial)', color: demo.text }}
            className="text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.95] tracking-tight"
          >
            Slow heat.
            <br />
            <span className="italic" style={{ color: demo.accent }}>Worth the wait.</span>
          </p>
          <p
            style={{ fontFamily: 'var(--font-editorial)' }}
            className="mt-6 italic text-lg"
          >
            - the menu - reservations - find us
          </p>
        </div>
      </div>
    );
  }

  if (demo.slug === 'overlay') {
    return (
      <div className="absolute inset-0 p-10 flex flex-col justify-between">
        <div className="flex items-center gap-2">
          <span
            className="rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em]"
            style={{ background: `${demo.accent}18`, color: demo.accent }}
          >
            v4.2 · Session Replay (beta)
          </span>
        </div>
        <div>
          <p
            style={{ color: demo.text }}
            className="text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-tight"
          >
            See what your users
            <br />
            <span style={{ color: `${demo.text}55` }}>actually do.</span>
          </p>
          <div className="mt-6 flex gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium"
              style={{ background: demo.accent, color: 'white' }}
            >
              Start free →
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-xs font-medium"
              style={{ borderColor: `${demo.text}30`, color: demo.text }}
            >
              Docs
            </span>
          </div>
        </div>
      </div>
    );
  }

  // holm - uses a real photo as the preview, since the demo is photo-driven
  return (
    <>
      <img
        src={PHOTOS.holm.hero}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1830]/85 via-[#0B1830]/25 to-[#0B1830]/40" />
      <div className="absolute inset-0 p-10 flex flex-col justify-between">
        <div className="flex items-center gap-2">
          <span
            className="rounded-none px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.22em]"
            style={{ background: demo.accent, color: demo.bg }}
          >
            New · Open Sunday
          </span>
        </div>
        <div>
          <p
            style={{ fontFamily: 'var(--font-editorial)', color: '#F0EAD9' }}
            className="text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.96] tracking-tight"
          >
            A boutique for the
            <br />
            <span className="italic">city&rsquo;s quieter listings.</span>
          </p>
          <p
            style={{ fontFamily: 'var(--font-mono)', color: '#F0EAD9' }}
            className="mt-5 text-[11px] uppercase tracking-[0.32em] opacity-80"
          >
            4 listings · 4 neighborhoods · 4 agents
          </p>
        </div>
      </div>
    </>
  );
}
