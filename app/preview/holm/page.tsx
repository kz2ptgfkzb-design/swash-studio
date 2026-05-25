'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { PHOTOS } from '@/data/photos';
import {
  ScrollAwareNav,
  FullBleedHero,
  ParallaxImage,
  HoverMagnify,
  MagneticHover,
  SectionFadeIn,
} from '@/components/preview/PreviewUI';

export default function HolmPreview() {
  return (
    <div
      className="min-h-screen bg-[#F0EAD9] text-[#0B1830]"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      <HolmNav />
      <HolmHero />
      <HolmListings />
      <HolmNeighborhoods />
      <HolmPhilosophy />
      <HolmAgents />
      <HolmProcess />
      <HolmContact />
      <HolmFooter />
    </div>
  );
}

function HolmLogo({ size = 26 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
        <rect x="3" y="3" width="22" height="22" stroke="#0B1830" strokeWidth="1.5" fill="none" />
        <path d="M9 8 L9 20 M19 8 L19 20 M9 14 L19 14" stroke="#0B1830" strokeWidth="1.5" />
        <circle cx="14" cy="14" r="2" fill="#E58669" />
      </svg>
      <span
        style={{ fontFamily: 'var(--font-editorial)' }}
        className="text-[20px] tracking-tight"
      >
        Holm
      </span>
    </span>
  );
}

function HolmNav() {
  return (
    <ScrollAwareNav
      bg="rgba(11,24,48,0.55)"
      border="rgba(240,234,217,0.12)"
      threshold={64}
    >
      <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between px-6 lg:px-10">
        <Link href="/preview/holm" className="text-[#F0EAD9] mix-blend-difference">
          <HolmLogo />
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {['Listings', 'Neighborhoods', 'Agents', 'Sell with us'].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm text-[#F0EAD9]/90 mix-blend-difference transition-colors hover:text-[#E58669]"
            >
              {l}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="rounded-none border border-[#F0EAD9]/30 bg-[#F0EAD9]/10 px-5 py-2.5 text-sm font-medium text-[#F0EAD9] backdrop-blur-sm transition-colors hover:bg-[#E58669] hover:border-[#E58669] hover:text-[#0B1830]"
        >
          Schedule a viewing
        </a>
      </div>
    </ScrollAwareNav>
  );
}

function HolmHero() {
  return (
    <FullBleedHero
      src={PHOTOS.holm.hero}
      minH="100svh"
      parallax={220}
      zoom={1.12}
      overlays={
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1830] via-[#0B1830]/20 to-[#0B1830]/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1830]/55 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-overlay" />
        </>
      }
    >
      <div className="mx-auto w-full max-w-[1320px] px-6 pb-20 lg:px-10 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <p
            style={{ fontFamily: 'var(--font-mono)' }}
            className="text-[11px] uppercase tracking-[0.32em] text-[#E58669]"
          >
            Est. 2017 · Boutique · 4 agents
          </p>
          <h1
            style={{ fontFamily: 'var(--font-editorial)' }}
            className="mt-6 max-w-[16ch] text-balance text-[clamp(2.5rem,8vw,8.5rem)] leading-[0.94] tracking-tight text-[#F0EAD9]"
          >
            A boutique for the
            <br />
            <span className="italic">city&rsquo;s quieter listings.</span>
          </h1>
          <p className="mt-8 max-w-md text-pretty text-lg leading-relaxed text-[#F0EAD9]/85">
            Four agents. One firm. Listings we actually believe in.
            Holm represents homes - and the people selling them -
            without the spreadsheet feel.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticHover>
              <a
                href="#listings"
                className="rounded-none bg-[#E58669] px-6 py-3.5 text-sm font-medium text-[#0B1830] transition-colors hover:bg-[#F0EAD9]"
              >
                See current listings →
              </a>
            </MagneticHover>
            <MagneticHover strength={0.22}>
              <a
                href="#contact"
                className="rounded-none border border-[#F0EAD9]/40 bg-[#F0EAD9]/5 px-6 py-3.5 text-sm font-medium text-[#F0EAD9] backdrop-blur-sm transition-colors hover:bg-[#F0EAD9] hover:text-[#0B1830]"
              >
                Schedule a viewing
              </a>
            </MagneticHover>
          </div>
        </motion.div>

        {/* Bottom-bar meta */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 grid max-w-3xl gap-6 border-t border-[#F0EAD9]/15 pt-6 text-[#F0EAD9]/80 md:grid-cols-3"
        >
          {[
            { k: '4', l: 'Agents · since 2017' },
            { k: '83%', l: 'Listings sold above ask' },
            { k: '14 days', l: 'Median time to offer' },
          ].map((s) => (
            <div key={s.l}>
              <p
                style={{ fontFamily: 'var(--font-editorial)' }}
                className="text-3xl text-[#E58669] md:text-4xl"
              >
                {s.k}
              </p>
              <p
                style={{ fontFamily: 'var(--font-mono)' }}
                className="mt-1 text-[10px] uppercase tracking-[0.22em] text-[#F0EAD9]/65"
              >
                {s.l}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center"
        >
          <div className="flex flex-col items-center gap-2 text-[#F0EAD9]/65">
            <span
              style={{ fontFamily: 'var(--font-mono)' }}
              className="text-[10px] uppercase tracking-[0.32em]"
            >
              Browse listings
            </span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="block h-6 w-px bg-current"
            />
          </div>
        </motion.div>
      </div>
    </FullBleedHero>
  );
}

function HolmListings() {
  const listings = [
    {
      img:    PHOTOS.holm.listingPrimary,
      price:  '$2,650,000',
      title:  'A glass house with a forty-foot oak',
      hood:   'Bernal Heights',
      meta:   '4 bd · 3 ba · 2,800 sq ft · 2024 build',
      featured: true,
    },
    {
      img:   PHOTOS.holm.listingTwo,
      price: '$1,495,000',
      title: 'A Edwardian flat with the original tiles',
      hood:  'Hayes Valley',
      meta:  '2 bd · 1 ba · 1,200 sq ft · 1908',
    },
    {
      img:   PHOTOS.holm.listingThree,
      price: '$895,000',
      title: 'A south-facing one-bed with a courtyard',
      hood:  'Mission',
      meta:  '1 bd · 1 ba · 740 sq ft · 1989',
    },
    {
      img:   PHOTOS.holm.listingFour,
      price: '$3,200,000',
      title: 'A two-flat building, ground up restoration',
      hood:  'Noe Valley',
      meta:  '5 bd · 4 ba · 3,400 sq ft · 1898 / 2023',
    },
  ];

  return (
    <section id="listings" className="px-6 py-24 lg:px-10 md:py-32">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-14 grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <p
              style={{ fontFamily: 'var(--font-mono)' }}
              className="text-[11px] uppercase tracking-[0.32em] text-[#E58669]"
            >
              Currently representing
            </p>
            <h2
              style={{ fontFamily: 'var(--font-editorial)' }}
              className="mt-6 text-balance text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.96] tracking-tight"
            >
              Four homes on
              <br />
              <span className="italic">the market this month.</span>
            </h2>
          </div>
          <p className="md:col-span-4 md:col-start-9 text-pretty leading-relaxed text-[#0B1830]/65">
            Every listing is one we&rsquo;d show our family. We say no
            twice as often as we say yes - that&rsquo;s the boutique
            part.
          </p>
        </div>

        <ul className="grid gap-6 md:grid-cols-12">
          {listings.map((l, i) => (
            <SectionFadeIn
              key={l.title}
              delay={i * 0.08}
              className={`relative ${l.featured ? 'md:col-span-12 lg:col-span-7' : 'md:col-span-6 lg:col-span-5'}`}
            >
              <Link href="#" className="group block">
                <HoverMagnify
                  scale={1.05}
                  className={`relative border border-[#0B1830]/10 ${l.featured ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}
                >
                  <ParallaxImage
                    src={l.img}
                    alt={l.title}
                    range={60}
                    scaleFrom={1.08}
                    scaleTo={1.2}
                    className="absolute inset-0 h-full w-full"
                  />
                  <div className="absolute right-4 top-4 z-10 rounded-none bg-[#F0EAD9] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#0B1830] shadow-sm">
                    {l.hood}
                  </div>
                  {l.featured && (
                    <div className="absolute left-4 top-4 z-10 rounded-none bg-[#E58669] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#0B1830] shadow-sm">
                      New · Open Sunday
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#0B1830]/45 via-transparent to-transparent p-5">
                    <span
                      style={{ fontFamily: 'var(--font-mono)' }}
                      className="inline-flex items-center gap-2 rounded-none bg-[#F0EAD9]/0 text-[10px] uppercase tracking-[0.22em] text-[#F0EAD9] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                    >
                      View listing →
                    </span>
                  </div>
                </HoverMagnify>

                <div className="mt-5 flex items-baseline justify-between gap-6 border-t border-[#0B1830]/15 pt-5">
                  <h3
                    style={{ fontFamily: 'var(--font-editorial)' }}
                    className="text-balance text-[clamp(1.25rem,2vw,1.875rem)] leading-snug tracking-tight transition-colors duration-500 group-hover:text-[#E58669]"
                  >
                    {l.title}
                  </h3>
                  <p
                    style={{ fontFamily: 'var(--font-editorial)' }}
                    className="shrink-0 text-2xl text-[#0B1830]"
                  >
                    {l.price}
                  </p>
                </div>
                <p
                  style={{ fontFamily: 'var(--font-mono)' }}
                  className="mt-2 text-[11px] uppercase tracking-[0.22em] text-[#0B1830]/55"
                >
                  {l.meta}
                </p>
              </Link>
            </SectionFadeIn>
          ))}
        </ul>

        <div className="mt-14 text-center">
          <Link
            href="#"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#0B1830] transition-colors hover:text-[#E58669]"
          >
            See every Holm listing, past and present
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function HolmNeighborhoods() {
  const hoods = [
    { name: 'Bernal Heights',  blurb: 'South-facing, view-heavy, dogs everywhere.', img: PHOTOS.holm.living },
    { name: 'Hayes Valley',    blurb: 'Edwardian flats with the original moulding.', img: PHOTOS.holm.kitchen },
    { name: 'Outer Sunset',    blurb: 'Foggy Saturdays, surfers, the new bakeries.', img: PHOTOS.holm.bedroom },
    { name: 'Mission',         blurb: 'Walk-up flats and the courtyards behind them.', img: PHOTOS.holm.bathroom },
  ];

  return (
    <section id="neighborhoods" className="border-y border-[#0B1830]/10 bg-[#E5DCC2] px-6 py-24 lg:px-10 md:py-32">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-14 grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <p
              style={{ fontFamily: 'var(--font-mono)' }}
              className="text-[11px] uppercase tracking-[0.32em] text-[#E58669]"
            >
              Where we work
            </p>
            <h2
              style={{ fontFamily: 'var(--font-editorial)' }}
              className="mt-6 text-balance text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.96] tracking-tight"
            >
              Four neighborhoods
              <br />
              <span className="italic">we know by name.</span>
            </h2>
          </div>
          <p className="md:col-span-4 md:col-start-9 text-pretty leading-relaxed text-[#0B1830]/65">
            We don&rsquo;t sell anywhere we can&rsquo;t walk to dinner.
            Holm operates inside four neighborhoods, deeply, instead of
            half the city, shallowly.
          </p>
        </div>

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {hoods.map((h, i) => (
            <SectionFadeIn key={h.name} delay={i * 0.08}>
              <HoverMagnify
                scale={1.06}
                className="relative aspect-[4/5] border border-[#0B1830]/10"
              >
                <ParallaxImage
                  src={h.img}
                  alt={h.name}
                  range={50}
                  scaleFrom={1.1}
                  scaleTo={1.2}
                  className="absolute inset-0 h-full w-full"
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0B1830] via-[#0B1830]/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 z-10 p-5">
                  <p style={{ fontFamily: 'var(--font-editorial)' }} className="text-2xl text-[#F0EAD9]">
                    {h.name}
                  </p>
                  <p style={{ fontFamily: 'var(--font-mono)' }} className="mt-2 text-[10px] uppercase tracking-[0.22em] text-[#F0EAD9]/75">
                    {h.blurb}
                  </p>
                </div>
              </HoverMagnify>
            </SectionFadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}

function HolmPhilosophy() {
  return (
    <section className="px-6 py-24 lg:px-10 md:py-32">
      <div className="mx-auto max-w-[1100px] text-center">
        <p
          style={{ fontFamily: 'var(--font-mono)' }}
          className="text-[11px] uppercase tracking-[0.32em] text-[#E58669]"
        >
          The Holm rule
        </p>
        <p
          style={{ fontFamily: 'var(--font-editorial)' }}
          className="mx-auto mt-10 max-w-[24ch] text-balance text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.18] tracking-tight"
        >
          <span className="italic">&ldquo;If we wouldn&rsquo;t buy it ourselves, we won&rsquo;t represent it.&rdquo;</span>
        </p>
        <p style={{ fontFamily: 'var(--font-mono)' }} className="mt-6 text-[10px] uppercase tracking-[0.22em] text-[#0B1830]/55">
          - Founding agreement, 2017
        </p>
      </div>
    </section>
  );
}

function HolmAgents() {
  const agents = [
    { img: PHOTOS.holm.agent1, name: 'Marek Halvorsen', role: 'Founder · Principal broker', tag: 'BRE # 01984-217' },
    { img: PHOTOS.holm.agent2, name: 'Inés Marchetti',  role: 'Senior agent',              tag: 'BRE # 02021-840' },
    { img: PHOTOS.holm.agent3, name: 'Theo Larsen',     role: 'Senior agent',              tag: 'BRE # 02038-456' },
    { img: PHOTOS.holm.agent4, name: 'Priya Kapoor',    role: 'Agent · Listings',          tag: 'BRE # 02044-991' },
  ];

  return (
    <section id="agents" className="border-y border-[#0B1830]/10 bg-[#0B1830] px-6 py-24 text-[#F0EAD9] lg:px-10 md:py-32">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-14 grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <p
              style={{ fontFamily: 'var(--font-mono)' }}
              className="text-[11px] uppercase tracking-[0.32em] text-[#E58669]"
            >
              Who you call
            </p>
            <h2
              style={{ fontFamily: 'var(--font-editorial)' }}
              className="mt-6 text-balance text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.96] tracking-tight"
            >
              Four agents.
              <br />
              <span className="italic">Same four since 2017.</span>
            </h2>
          </div>
          <p className="md:col-span-4 md:col-start-9 text-pretty leading-relaxed text-[#F0EAD9]/75">
            No teams, no juniors, no franchise. Every call goes to one
            of the four names below. Every offer is reviewed by all
            four.
          </p>
        </div>

        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {agents.map((a, i) => (
            <SectionFadeIn key={a.name} delay={i * 0.08}>
              <HoverMagnify
                scale={1.05}
                className="relative aspect-[4/5] border border-[#F0EAD9]/15"
              >
                <ParallaxImage
                  src={a.img}
                  alt={a.name}
                  range={40}
                  scaleFrom={1.06}
                  scaleTo={1.16}
                  className="absolute inset-0 h-full w-full"
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0B1830] via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 z-10 p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <p
                    style={{ fontFamily: 'var(--font-mono)' }}
                    className="text-[10px] uppercase tracking-[0.22em] text-[#E58669]"
                  >
                    Email →
                  </p>
                </div>
              </HoverMagnify>
              <div className="mt-5">
                <p style={{ fontFamily: 'var(--font-editorial)' }} className="text-2xl">
                  {a.name}
                </p>
                <p className="mt-1 text-sm text-[#F0EAD9]/75">
                  {a.role}
                </p>
                <p
                  style={{ fontFamily: 'var(--font-mono)' }}
                  className="mt-3 text-[10px] uppercase tracking-[0.22em] text-[#F0EAD9]/55"
                >
                  {a.tag}
                </p>
              </div>
            </SectionFadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}

function HolmProcess() {
  const steps = [
    { n: 'I',  title: 'A walk-through.',  body: 'We meet at the property, alone. No pitch deck, no pressure. We tell you honestly whether we think we can sell it well.' },
    { n: 'II', title: 'A written plan.',  body: 'Within a week: pricing rationale, marketing plan, timeline, fee in writing. You read it, push back, sign or pass.' },
    { n: 'III', title: 'The market.',     body: 'Photography (we use only two photographers we trust), staging budget, listing copy we write ourselves, the right launch day.' },
    { n: 'IV', title: 'The close.',       body: 'Offers reviewed by all four agents. We negotiate, you decide. Most Holm listings close above ask with two offers in.' },
  ];

  return (
    <section id="sell-with-us" className="px-6 py-24 lg:px-10 md:py-32">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-16 grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <p
              style={{ fontFamily: 'var(--font-mono)' }}
              className="text-[11px] uppercase tracking-[0.32em] text-[#E58669]"
            >
              Sell with us
            </p>
            <h2
              style={{ fontFamily: 'var(--font-editorial)' }}
              className="mt-6 text-balance text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.96] tracking-tight"
            >
              Four conversations.
              <br />
              <span className="italic">Then a sold sign.</span>
            </h2>
          </div>
          <p className="md:col-span-4 md:col-start-9 text-pretty leading-relaxed text-[#0B1830]/65">
            How we represent a seller, written down. Plain, honest, and
            slower than the firm down the street. On purpose.
          </p>
        </div>

        <ol className="grid gap-px overflow-hidden border border-[#0B1830]/10 bg-[#0B1830]/10 md:grid-cols-2">
          {steps.map((s) => (
            <li key={s.n} className="bg-[#F0EAD9] p-8 md:p-12">
              <p
                style={{ fontFamily: 'var(--font-editorial)' }}
                className="text-5xl text-[#E58669]"
              >
                {s.n}
              </p>
              <h3
                style={{ fontFamily: 'var(--font-editorial)' }}
                className="mt-6 text-2xl leading-tight tracking-tight"
              >
                {s.title}
              </h3>
              <p className="mt-4 max-w-md text-pretty leading-relaxed text-[#0B1830]/70">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function HolmContact() {
  return (
    <section id="contact" className="border-t border-[#0B1830]/10 bg-[#E5DCC2] px-6 py-24 lg:px-10 md:py-32">
      <div className="mx-auto max-w-[1100px] grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p
            style={{ fontFamily: 'var(--font-mono)' }}
            className="text-[11px] uppercase tracking-[0.32em] text-[#E58669]"
          >
            Schedule a viewing
          </p>
          <h2
            style={{ fontFamily: 'var(--font-editorial)' }}
            className="mt-6 text-balance text-[clamp(2.25rem,5vw,4rem)] leading-[1.0] tracking-tight"
          >
            Quietly,
            <br />
            <span className="italic">in your own time.</span>
          </h2>
          <p className="mt-6 max-w-md text-pretty leading-relaxed text-[#0B1830]/70">
            Tell us which listing, when works, and how we should
            reach you. One of the four agents calls back within the
            day - never a junior, never an auto-responder.
          </p>

          <div className="mt-10 space-y-2 font-mono text-sm">
            <p><strong>Phone:</strong> (555) 010-3849</p>
            <p><strong>Email:</strong> hello@holmrealty.example</p>
            <p><strong>Office:</strong> 1814 Valencia, by appointment</p>
          </div>
        </div>

        <form
          className="md:col-span-7 grid gap-4"
          onSubmit={(e) => { e.preventDefault(); alert('Demo only - wire to your CRM.'); }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              required
              placeholder="Your name"
              className="rounded-none border border-[#0B1830]/20 bg-[#F0EAD9] px-4 py-3.5 text-[#0B1830] placeholder:text-[#0B1830]/45 focus:border-[#0B1830] focus:outline-none"
            />
            <input
              required
              type="tel"
              placeholder="Phone (best number)"
              className="rounded-none border border-[#0B1830]/20 bg-[#F0EAD9] px-4 py-3.5 text-[#0B1830] placeholder:text-[#0B1830]/45 focus:border-[#0B1830] focus:outline-none"
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            className="rounded-none border border-[#0B1830]/20 bg-[#F0EAD9] px-4 py-3.5 text-[#0B1830] placeholder:text-[#0B1830]/45 focus:border-[#0B1830] focus:outline-none"
          />
          <select className="rounded-none border border-[#0B1830]/20 bg-[#F0EAD9] px-4 py-3.5 text-[#0B1830] focus:border-[#0B1830] focus:outline-none">
            <option>Which listing? - pick one</option>
            <option>Bernal Heights · $2,650,000</option>
            <option>Hayes Valley · $1,495,000</option>
            <option>Mission · $895,000</option>
            <option>Noe Valley · $3,200,000</option>
            <option>I&rsquo;m looking to sell - call me</option>
          </select>
          <textarea
            rows={4}
            placeholder="Anything we should know before we meet."
            className="resize-none rounded-none border border-[#0B1830]/20 bg-[#F0EAD9] px-4 py-3.5 text-[#0B1830] placeholder:text-[#0B1830]/45 focus:border-[#0B1830] focus:outline-none"
          />
          <button
            type="submit"
            className="mt-2 inline-flex justify-center rounded-none bg-[#0B1830] px-6 py-4 font-medium text-[#F0EAD9] transition-colors hover:bg-[#E58669] hover:text-[#0B1830]"
          >
            Schedule a viewing →
          </button>
          <p style={{ fontFamily: 'var(--font-mono)' }} className="text-[10px] uppercase tracking-[0.22em] text-[#0B1830]/50">
            Reply from a Holm agent within the day.
          </p>
        </form>
      </div>
    </section>
  );
}

function HolmFooter() {
  return (
    <footer className="border-t border-[#0B1830]/10 bg-[#F0EAD9] px-6 py-12 lg:px-10">
      <div className="mx-auto max-w-[1320px] grid gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div className="space-y-4">
          <HolmLogo size={30} />
          <p className="max-w-xs text-sm text-[#0B1830]/65">
            Boutique brokerage. Four agents, four neighborhoods, a
            promise that&rsquo;s been in writing since 2017.
          </p>
        </div>
        <div>
          <p style={{ fontFamily: 'var(--font-mono)' }} className="text-[10px] uppercase tracking-[0.22em] text-[#E58669]">
            Reach
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-[#0B1830]/75">
            <li><a href="tel:5550103849" className="hover:text-[#E58669]">(555) 010-3849</a></li>
            <li>hello@holmrealty.example</li>
            <li>1814 Valencia, SF</li>
          </ul>
        </div>
        <div>
          <p style={{ fontFamily: 'var(--font-mono)' }} className="text-[10px] uppercase tracking-[0.22em] text-[#E58669]">
            Sell
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-[#0B1830]/75">
            <li><a href="#sell-with-us" className="hover:text-[#E58669]">How we work</a></li>
            <li><a href="#" className="hover:text-[#E58669]">Recent sales</a></li>
            <li><a href="#" className="hover:text-[#E58669]">Market reports</a></li>
          </ul>
        </div>
        <div>
          <p style={{ fontFamily: 'var(--font-mono)' }} className="text-[10px] uppercase tracking-[0.22em] text-[#E58669]">
            Hours
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-[#0B1830]/75">
            <li>Open houses · Sun 1-4</li>
            <li>By appointment · M-Sa</li>
            <li>Phone · 9 - 7 pm</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-[1320px] flex-col items-start justify-between gap-3 border-t border-[#0B1830]/10 pt-5 text-xs text-[#0B1830]/45 md:flex-row md:items-center">
        <p>© 2026 Holm Real Estate. DRE # 02021-118. Equal housing opportunity.</p>
        <Link href="/" className="hover:text-[#E58669]">
          ← Back to Swash · website built by Swash
        </Link>
      </div>
    </footer>
  );
}
