import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { TiltCard } from '@/components/TiltCard';
import { Magnetic } from '@/components/Magnetic';
import { PHOTOS } from '@/data/photos';

export const metadata = {
  title: 'Live previews',
  description:
    'Four live builds - three real business rebuilds (a Pretoria dealership, a Randburg GP practice, and a US HVAC/R distributor) plus a fictional SaaS demo. Fully clickable, each with its own brand.',
};

type Demo = {
  slug: string;
  /** External URL - when set, the card links here instead of /preview/[slug] */
  href?: string;
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
    slug: 'mit-mak',
    href: 'https://mit-mak-motors.vercel.app',
    brand: 'Mit-Mak Motors',
    kind: 'Automotive · Dealership rebuild',
    tagline: 'Trusted. Awarded. Unmatched.',
    body:
      "Full rebuild of a real Pretoria pre-owned dealership. Black + racing red + graphite. 400+ car live inventory with search and compare, finance and sell-your-car flows, per-vehicle enquiry forms. The most complete build in the set - click anything.",
    accent: '#E10600',
    bg: '#0A0A0A',
    text: '#F5F5F5',
    swatch: ['#0A0A0A', '#E10600', '#9CA0A6', '#151515'],
  },
  {
    slug: 'doctors365',
    href: 'https://doctors365.vercel.app',
    brand: 'Doctors 365',
    kind: 'Healthcare · Practice rebuild',
    tagline: 'Healthcare that goes beyond the basics.',
    body:
      'Full rebuild of a real Randburg GP practice - family medicine, mental health, and medical weight loss. Deep teal + warm paper. Service pages, practitioner profiles, booking flows, CMS-driven clinical content.',
    accent: '#0EA5A4',
    bg: '#0F1B1E',
    text: '#F6F4EF',
    swatch: ['#0F1B1E', '#0EA5A4', '#F6F4EF', '#086665'],
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
    slug: 'remichel',
    href: 'https://remichel.vercel.app',
    brand: 'R.E. Michel',
    kind: 'HVAC/R distribution · B2B storefront rebuild',
    tagline: 'Customers first, coast to coast.',
    body:
      "Cinematic rebuild of one of America's largest family-owned HVAC/R wholesale distributors, in business since 1935. Graphite + flame red + cold blue. Their mark is a flame over a snowflake, so the whole build runs as a thermal engine: cold-to-hot gradients, airflow motion, engineered spec labels, a fast storefront over 35,000+ line items.",
    accent: '#EE2B37',
    bg: '#14171A',
    text: '#F5F6F7',
    swatch: ['#14171A', '#EE2B37', '#0C72BC', '#F6A03A'],
  },
];

export default function PreviewIndex() {
  return (
    <>
      <section className="relative pt-24 pb-10 sm:pt-32 sm:pb-16 md:pt-40">
        <div className="container-wide">
          <div className="grid items-end gap-6 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <p className="eyebrow">Live previews</p>
              <h1 className="mt-4 font-display text-display-xl text-balance text-ink-700 sm:mt-6">
                Same studio.
                <br />
                <span className="italic text-ash-500">Four different brands.</span>
              </h1>
            </div>
            <div className="md:col-span-5">
              <p className="text-pretty text-sm leading-relaxed text-ash-500 sm:text-base">
                Four live builds, end-to-end by Swash - full rebuilds of
                three real businesses (a Pretoria car dealership, a
                Randburg GP practice, and one of America&rsquo;s largest
                HVAC/R distributors), plus a fictional SaaS analytics
                brand. Each lives at its own URL, with its own brand.
                Click in, scroll around, fill in a form. No two look
                alike.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-wide pb-16 sm:pb-24">
        <ul className="space-y-5 sm:space-y-8">
          {DEMOS.map((d, i) => (
            <li key={d.slug}>
              <Reveal delay={i}>
                <TiltCard intensity={4} scale={1.005} glare className="relative">
                  <Link
                    href={d.href ?? `/preview/${d.slug}`}
                    target="_blank"
                    rel={d.href ? 'noopener' : undefined}
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
                        className="absolute left-4 top-4 rounded-pill px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] backdrop-blur-sm sm:left-7 sm:top-7 sm:px-3 sm:text-[10px] sm:tracking-[0.22em]"
                        style={{
                          background: `${d.text}10`,
                          color: d.text,
                        }}
                      >
                        {d.kind}
                      </div>

                      <div
                        className="absolute right-4 top-4 rounded-pill px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] backdrop-blur-sm sm:right-7 sm:top-7 sm:px-3 sm:text-[10px] sm:tracking-[0.22em]"
                        style={{
                          background: d.accent,
                          color: d.bg,
                        }}
                      >
                        Live demo →
                      </div>
                    </div>

                    {/* Info side */}
                    <div className="flex flex-col justify-between gap-6 p-6 sm:gap-10 sm:p-8 md:col-span-5 md:p-12">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash-400">
                          {String(i + 1).padStart(2, '0')} - Preview
                        </p>
                        <h2 className="mt-3 font-display text-display-md tracking-tight text-ink-700 transition-colors group-hover:text-lime-300 sm:mt-4">
                          {d.brand}
                        </h2>
                        <p className="mt-2 font-display italic text-lg text-ash-500 sm:text-xl">
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
  if (demo.slug === 'mit-mak') {
    return (
      <>
        <img
          src={PHOTOS.mitmak.hero}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/95 via-[#0A0A0A]/40 to-[#0A0A0A]/60" />
        <div className="absolute inset-0 p-10 flex flex-col justify-end">
          <div>
            <p
              style={{ fontFamily: 'var(--font-display)', color: demo.text }}
              className="text-[clamp(2.5rem,5.5vw,5rem)] font-bold leading-[0.92] tracking-tight"
            >
              Trusted. Awarded.
              <br />
              <span style={{ color: demo.accent }}>Unmatched.</span>
            </p>
            <p
              style={{ fontFamily: 'var(--font-mono)', color: demo.text }}
              className="mt-5 text-[11px] uppercase tracking-[0.32em] opacity-80"
            >
              400+ cars in stock · Pretoria · delivered nationwide
            </p>
          </div>
        </div>
      </>
    );
  }

  if (demo.slug === 'doctors365') {
    return (
      <>
        <img
          src={PHOTOS.doctors365.hero}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1B1E]/95 via-[#0F1B1E]/50 to-[#0F1B1E]/60" />
        <div className="absolute inset-0 p-10 flex flex-col justify-end">
          <div>
            <p
              style={{ color: demo.text }}
              className="text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-tight"
            >
              Healthcare that goes
              <br />
              <span style={{ color: demo.accent }}>beyond the basics.</span>
            </p>
            <p
              style={{ fontFamily: 'var(--font-mono)', color: demo.text }}
              className="mt-5 text-[11px] uppercase tracking-[0.32em] opacity-80"
            >
              Family GP · mental health · Randburg
            </p>
          </div>
        </div>
      </>
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

  // remichel - graphic mockup expressing the cold-to-hot "thermal engine" build
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 100% 0%, rgba(38,55,107,0.55) 0%, transparent 55%), radial-gradient(130% 100% at 0% 100%, rgba(176,37,44,0.6) 0%, transparent 55%)',
        }}
      />
      <div className="absolute inset-0 p-10 flex flex-col justify-end">
        <div>
          <p
            style={{ fontFamily: 'var(--font-display)', color: demo.text }}
            className="text-[clamp(2.5rem,5.5vw,5rem)] font-bold leading-[0.92] tracking-tight"
          >
            The{' '}
            <span
              style={{
                backgroundImage:
                  'linear-gradient(90deg,#0C72BC 0%,#F6A03A 55%,#EE2B37 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Thermal Engine.
            </span>
          </p>
          <p
            style={{ fontFamily: 'var(--font-mono)', color: demo.text }}
            className="mt-5 text-[11px] uppercase tracking-[0.32em] opacity-80"
          >
            HVAC/R distribution · 35,000+ line items · since 1935
          </p>
        </div>
      </div>
    </>
  );
}
