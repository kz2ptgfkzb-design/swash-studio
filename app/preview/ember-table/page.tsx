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
  ScrollClipReveal,
  SectionFadeIn,
} from '@/components/preview/PreviewUI';

export default function EmberTablePreview() {
  return (
    <div
      className="min-h-screen bg-[#F5ECD7] text-[#1A0F08]"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      <EmberNav />
      <EmberHero />
      <EmberPhilosophy />
      <EmberGallery />
      <EmberMenu />
      <EmberStory />
      <EmberHours />
      <EmberReservations />
      <EmberFooter />
    </div>
  );
}

function EmberLogo({ size = 30 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
        <path
          d="M18 4 C 22 10, 27 13, 27 20 a 9 9 0 0 1 -18 0 C 9 13, 14 10, 18 4 Z"
          fill="#C8462C"
        />
        <path d="M18 12 C 20 16, 22 16, 22 20 a 4 4 0 0 1 -8 0 C 14 16, 16 16, 18 12 Z" fill="#F5ECD7" />
      </svg>
      <span
        style={{ fontFamily: 'var(--font-editorial)' }}
        className="text-[20px] tracking-tight"
      >
        <span className="italic">Ember</span>
        <span className="text-[#C8462C]"> &amp; </span>
        <span className="italic">Table</span>
      </span>
    </span>
  );
}

function EmberNav() {
  return (
    <ScrollAwareNav
      bg="rgba(245,236,215,0.78)"
      border="rgba(26,15,8,0.10)"
      threshold={72}
    >
      <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between px-6 lg:px-10">
        <Link href="/preview/ember-table" className="text-[#F5ECD7] mix-blend-difference">
          <EmberLogo />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {['Menu', 'Story', 'Visit', 'Reserve'].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-sm text-[#F5ECD7]/90 mix-blend-difference transition-colors hover:text-[#C8462C]"
            >
              {l}
            </a>
          ))}
        </nav>
        <MagneticHover strength={0.22}>
          <a
            href="#reserve"
            className="rounded-full border border-[#F5ECD7]/30 bg-[#F5ECD7]/10 px-5 py-2.5 text-sm font-medium text-[#F5ECD7] backdrop-blur-sm transition-colors hover:bg-[#C8462C] hover:border-[#C8462C]"
          >
            Reservations
          </a>
        </MagneticHover>
      </div>
    </ScrollAwareNav>
  );
}

function EmberHero() {
  return (
    <FullBleedHero
      src={PHOTOS.ember.interior}
      minH="100svh"
      parallax={220}
      zoom={1.12}
      overlays={
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A0F08]/55 via-[#1A0F08]/35 to-[#1A0F08]/80" />
          <div className="absolute inset-0 bg-[radial-gradient(at_70%_55%,rgba(200,70,44,0.32),transparent_60%)]" />
          <div className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-overlay" />
        </>
      }
    >
      <div className="mx-auto w-full max-w-[1320px] px-6 pb-24 lg:px-10 lg:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="max-w-3xl text-[#F5ECD7]"
        >
          <p
            style={{ fontFamily: 'var(--font-mono)' }}
            className="text-[11px] uppercase tracking-[0.32em] text-[#FFB89A]"
          >
            Est. 2019 · Wood-fired · Open Wed – Sun
          </p>
          <h1
            style={{ fontFamily: 'var(--font-editorial)' }}
            className="mt-8 text-balance text-[clamp(3rem,9.5vw,9.5rem)] leading-[0.92] tracking-tight"
          >
            <span className="font-normal">Slow heat.</span>
            <br />
            <span className="italic text-[#FFCDB1]">Worth the wait.</span>
          </h1>
          <p className="mt-10 max-w-md text-pretty text-lg leading-relaxed text-[#F5ECD7]/85">
            A neighborhood bakehouse and table in the city&rsquo;s
            Outer Sunset — wood-fired sourdough by morning, a six-seat
            tasting at dusk, natural wine all day.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticHover>
              <a
                href="#reserve"
                className="inline-flex items-center gap-2 rounded-full bg-[#C8462C] px-6 py-3.5 text-sm font-medium text-[#F5ECD7] transition-transform hover:-translate-y-0.5"
              >
                Book a seat
                <span>→</span>
              </a>
            </MagneticHover>
            <MagneticHover strength={0.22}>
              <a
                href="#menu"
                className="inline-flex items-center gap-2 rounded-full border border-[#F5ECD7]/40 bg-[#F5ECD7]/5 px-6 py-3.5 text-sm font-medium text-[#F5ECD7] backdrop-blur-sm transition-colors hover:bg-[#F5ECD7] hover:text-[#1A0F08]"
              >
                See the menu
              </a>
            </MagneticHover>
          </div>
        </motion.div>

        {/* Today's bake floating card */}
        <motion.div
          initial={{ opacity: 0, y: 24, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 1.0, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-6 bottom-24 hidden w-[260px] overflow-hidden rounded-sm border border-[#F5ECD7]/25 bg-[#1A0F08]/55 backdrop-blur-md lg:block lg:right-10 lg:bottom-28"
        >
          <div className="relative aspect-[4/5]">
            <img
              src={PHOTOS.ember.hero}
              alt="Today's bake"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F08] via-[#1A0F08]/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p
                style={{ fontFamily: 'var(--font-mono)' }}
                className="text-[9px] uppercase tracking-[0.28em] text-[#FFB89A]"
              >
                Today&rsquo;s bake — 6:00 a.m.
              </p>
              <p
                style={{ fontFamily: 'var(--font-editorial)' }}
                className="mt-1.5 text-base italic text-[#F5ECD7]"
              >
                Country sourdough, sea salt
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center"
        >
          <div className="flex flex-col items-center gap-2 text-[#F5ECD7]/70">
            <span
              style={{ fontFamily: 'var(--font-mono)' }}
              className="text-[10px] uppercase tracking-[0.32em]"
            >
              The bakehouse
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

function EmberPhilosophy() {
  return (
    <section className="border-y border-[#1A0F08]/10 bg-[#E8DEC4] px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-[1100px] text-center">
        <p
          style={{ fontFamily: 'var(--font-mono)' }}
          className="text-[11px] uppercase tracking-[0.32em] text-[#C8462C]"
        >
          — our way of cooking —
        </p>
        <p
          style={{ fontFamily: 'var(--font-editorial)' }}
          className="mx-auto mt-8 max-w-[22ch] text-balance text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.18] tracking-tight"
        >
          <span className="italic">&ldquo;Cook one thing well, with fire and patience. Then cook it again tomorrow.&rdquo;</span>
        </p>
        <p
          style={{ fontFamily: 'var(--font-mono)' }}
          className="mt-6 text-[11px] uppercase tracking-[0.22em] text-[#1A0F08]/60"
        >
          Hana &amp; Theo, chef-proprietors
        </p>
      </div>
    </section>
  );
}

function EmberGallery() {
  const photos = [
    { src: PHOTOS.ember.breadStudio, label: 'Country loaf',     time: '6:00 a.m.' },
    { src: PHOTOS.ember.fire,        label: 'The oven',         time: 'always on' },
    { src: PHOTOS.ember.pasta,       label: 'Pasta of the day', time: '4:00 p.m.' },
    { src: PHOTOS.ember.plate,       label: 'Tonight’s plate', time: '18:30' },
    { src: PHOTOS.ember.chef,        label: 'Hana, in the kitchen', time: 'Wed – Sun' },
    { src: PHOTOS.ember.interior,    label: 'The counter',      time: 'six seats' },
  ];

  return (
    <section className="px-6 py-24 lg:px-10 md:py-32">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-14 grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <p style={{ fontFamily: 'var(--font-mono)' }} className="text-[11px] uppercase tracking-[0.32em] text-[#C8462C]">
              From the kitchen
            </p>
            <h2
              style={{ fontFamily: 'var(--font-editorial)' }}
              className="mt-6 text-balance text-[clamp(2.25rem,5vw,4rem)] leading-[0.98] tracking-tight"
            >
              A day at
              <br />
              <span className="italic">the bakehouse.</span>
            </h2>
          </div>
          <p className="md:col-span-4 md:col-start-9 text-pretty leading-relaxed text-[#1A0F08]/65">
            Shot last Saturday between the morning bake and the
            evening service. The bread is real. So is the fire.
          </p>
        </div>

        <ul className="grid gap-3 md:grid-cols-12 md:gap-4">
          {photos.map((p, i) => {
            const span = i === 0 ? 'md:col-span-6 md:row-span-2 aspect-[4/5]'
                       : i === 1 ? 'md:col-span-3 aspect-[4/5]'
                       : i === 2 ? 'md:col-span-3 aspect-[4/5]'
                       : 'md:col-span-4 aspect-[4/3]';
            return (
              <SectionFadeIn key={p.label} delay={i * 0.07}>
                <HoverMagnify
                  scale={1.06}
                  className={`relative rounded-sm border border-[#1A0F08]/10 ${span}`}
                >
                  <ParallaxImage
                    src={p.src}
                    alt={p.label}
                    range={70}
                    scaleFrom={1.08}
                    scaleTo={1.22}
                    className="absolute inset-0 h-full w-full"
                  />
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#1A0F08]/90 via-[#1A0F08]/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 z-10 p-5">
                    <p style={{ fontFamily: 'var(--font-editorial)' }} className="text-lg italic text-[#F5ECD7]">
                      {p.label}
                    </p>
                    <p style={{ fontFamily: 'var(--font-mono)' }} className="mt-1 text-[10px] uppercase tracking-[0.22em] text-[#F5ECD7]/70">
                      {p.time}
                    </p>
                  </div>
                </HoverMagnify>
              </SectionFadeIn>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function EmberMenu() {
  const sections = [
    {
      heading: 'The bake',
      sub: 'Wood-fired all morning · Available for take-away from 7 a.m.',
      items: [
        { name: 'Country loaf', desc: 'Whole grain, sea salt, 36-hour proof.', price: '14' },
        { name: 'Olive boule', desc: 'Castelvetrano, rosemary, fleur de sel.', price: '16' },
        { name: 'Miso milk bread', desc: 'White miso, brown butter, honey.', price: '12' },
        { name: 'Brown butter cardamom bun', desc: 'Saturdays only.', price: '7' },
      ],
    },
    {
      heading: 'The table',
      sub: 'Six seats · Wed – Sun, 18:30 seating · Tasting changes weekly',
      items: [
        { name: 'Beet &amp; whey, charred greens', desc: 'Local beets cooked in the embers.', price: '22' },
        { name: 'Pasta of the day', desc: 'Hand-rolled at 4 p.m.', price: '28' },
        { name: 'Wood-fired fish', desc: 'Whatever the dock gave us this morning.', price: '38' },
        { name: 'Tasting menu', desc: 'Five courses, optional wine pairing.', price: '95' },
      ],
    },
  ];

  return (
    <section id="menu" className="px-6 py-24 lg:px-10 md:py-36">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-16 text-center">
          <p
            style={{ fontFamily: 'var(--font-mono)' }}
            className="text-[11px] uppercase tracking-[0.32em] text-[#C8462C]"
          >
            The menu
          </p>
          <h2
            style={{ fontFamily: 'var(--font-editorial)' }}
            className="mx-auto mt-6 max-w-[20ch] text-balance text-[clamp(2.5rem,6vw,5rem)] leading-[0.98] tracking-tight"
          >
            What&rsquo;s in
            <br />
            <span className="italic">the oven today.</span>
          </h2>
        </div>

        <div className="grid gap-16 md:grid-cols-2 md:gap-12">
          {sections.map((sec) => (
            <div key={sec.heading}>
              <div className="border-b border-[#1A0F08]/15 pb-5">
                <h3
                  style={{ fontFamily: 'var(--font-editorial)' }}
                  className="text-3xl italic"
                >
                  {sec.heading}
                </h3>
                <p
                  style={{ fontFamily: 'var(--font-mono)' }}
                  className="mt-2 text-[10px] uppercase tracking-[0.22em] text-[#1A0F08]/60"
                >
                  {sec.sub}
                </p>
              </div>
              <ul className="mt-6 space-y-7">
                {sec.items.map((it) => (
                  <li key={it.name} className="grid grid-cols-[1fr_auto] gap-6 items-baseline">
                    <div>
                      <p
                        style={{ fontFamily: 'var(--font-editorial)' }}
                        className="text-xl"
                        dangerouslySetInnerHTML={{ __html: it.name }}
                      />
                      <p className="mt-1.5 text-sm leading-relaxed text-[#1A0F08]/65">
                        {it.desc}
                      </p>
                    </div>
                    <span
                      style={{ fontFamily: 'var(--font-mono)' }}
                      className="text-sm text-[#1A0F08]/65"
                    >
                      $ {it.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EmberStory() {
  return (
    <section id="story" className="border-t border-[#1A0F08]/10 bg-[#1A0F08] px-6 py-28 text-[#F5ECD7] lg:px-10 md:py-36">
      <div className="mx-auto max-w-[1100px]">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p
              style={{ fontFamily: 'var(--font-mono)' }}
              className="text-[11px] uppercase tracking-[0.32em] text-[#C8462C]"
            >
              How we got here
            </p>
            <h2
              style={{ fontFamily: 'var(--font-editorial)' }}
              className="mt-8 text-balance text-[clamp(2.25rem,5vw,4rem)] leading-[1.0] tracking-tight"
            >
              A bakery
              <br />
              <span className="italic text-[#C8462C]">that grew up.</span>
            </h2>
          </div>
          <div className="md:col-span-7 space-y-6 text-pretty leading-relaxed text-[#F5ECD7]/85 md:text-lg">
            <p>
              We opened in 2019 as a five-loaves-a-day bakery out of a
              friend&rsquo;s garage. It was supposed to be a side
              project until we figured out what to do next.
            </p>
            <p>
              The next thing turned out to be: keep doing this.
              Build a small kitchen. Add a six-seat counter. Cook one
              new dish every week. Don&rsquo;t open more locations.
            </p>
            <p>
              Five years later, the bakery still opens at six. The
              counter still seats six. The wine is still the wine
              the line cooks would drink. And we still cook everything
              in the same wood-fired oven Theo built that first month.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function EmberHours() {
  return (
    <section id="visit" className="px-6 py-24 lg:px-10 md:py-32">
      <div className="mx-auto max-w-[1320px] grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="relative aspect-[5/4] overflow-hidden rounded-sm border border-[#1A0F08]/15 bg-[#E8DEC4]">
            {/* Stylized map */}
            <svg viewBox="0 0 500 400" className="h-full w-full">
              <rect width="500" height="400" fill="#E8DEC4" />
              {/* streets */}
              <path d="M -10 220 L 510 200" stroke="#D8C8A8" strokeWidth="32" fill="none" />
              <path d="M -10 100 L 510 80" stroke="#D8C8A8" strokeWidth="20" fill="none" />
              <path d="M -10 320 L 510 300" stroke="#D8C8A8" strokeWidth="24" fill="none" />
              <path d="M 140 -10 L 110 410" stroke="#D8C8A8" strokeWidth="22" fill="none" />
              <path d="M 360 -10 L 330 410" stroke="#D8C8A8" strokeWidth="22" fill="none" />
              {/* blocks */}
              <rect x="170" y="120" width="150" height="60" fill="#DBC9A0" stroke="#C5B280" />
              <rect x="170" y="220" width="150" height="60" fill="#DBC9A0" stroke="#C5B280" />
              <rect x="20" y="120" width="80" height="60" fill="#DBC9A0" stroke="#C5B280" />
              <rect x="380" y="120" width="100" height="60" fill="#DBC9A0" stroke="#C5B280" />
              <rect x="20" y="220" width="80" height="60" fill="#DBC9A0" stroke="#C5B280" />
              <rect x="380" y="220" width="100" height="60" fill="#DBC9A0" stroke="#C5B280" />
              {/* pin */}
              <g>
                <circle cx="245" cy="200" r="32" fill="#C8462C" opacity="0.2" />
                <circle cx="245" cy="200" r="16" fill="#C8462C" />
                <circle cx="245" cy="200" r="6" fill="#F5ECD7" />
              </g>
            </svg>
            <div className="absolute right-4 bottom-4 rounded-sm bg-[#1A0F08] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#F5ECD7]">
              48 Carling Ave
            </div>
          </div>
        </div>

        <div className="md:col-span-5 space-y-10">
          <div>
            <p
              style={{ fontFamily: 'var(--font-mono)' }}
              className="text-[11px] uppercase tracking-[0.32em] text-[#C8462C]"
            >
              Find us
            </p>
            <h2
              style={{ fontFamily: 'var(--font-editorial)' }}
              className="mt-6 text-balance text-[clamp(2rem,4vw,3.25rem)] leading-tight tracking-tight"
            >
              48 Carling Ave,
              <br />
              <span className="italic">Outer Sunset.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-y-5 gap-x-8 border-t border-[#1A0F08]/15 pt-6">
            <p style={{ fontFamily: 'var(--font-mono)' }} className="text-[10px] uppercase tracking-[0.22em] text-[#1A0F08]/55">Wed – Fri</p>
            <p>7:00 — 14:00 · bakery</p>
            <p style={{ fontFamily: 'var(--font-mono)' }} className="text-[10px] uppercase tracking-[0.22em] text-[#1A0F08]/55">Wed – Sun</p>
            <p>18:30 — 22:30 · table</p>
            <p style={{ fontFamily: 'var(--font-mono)' }} className="text-[10px] uppercase tracking-[0.22em] text-[#1A0F08]/55">Sat – Sun</p>
            <p>8:00 — 15:00 · bakery + brunch</p>
            <p style={{ fontFamily: 'var(--font-mono)' }} className="text-[10px] uppercase tracking-[0.22em] text-[#1A0F08]/55">Mon – Tue</p>
            <p>Closed (the oven rests too)</p>
          </div>

          <div className="border-t border-[#1A0F08]/15 pt-6">
            <p style={{ fontFamily: 'var(--font-mono)' }} className="text-[10px] uppercase tracking-[0.22em] text-[#1A0F08]/55">
              Reservations
            </p>
            <p className="mt-2 text-lg">
              <a href="tel:5550102467" className="hover:text-[#C8462C]">(555) 010-2467</a>{' '}
              <span className="text-[#1A0F08]/55">·</span>{' '}
              <a href="mailto:hello@emberandtable.example" className="hover:text-[#C8462C]">hello@emberandtable.example</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function EmberReservations() {
  return (
    <section id="reserve" className="border-t border-[#1A0F08]/10 bg-[#3A2618] px-6 py-28 text-[#F5ECD7] lg:px-10 md:py-36">
      <div className="mx-auto max-w-[1100px] grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p
            style={{ fontFamily: 'var(--font-mono)' }}
            className="text-[11px] uppercase tracking-[0.32em] text-[#E89E72]"
          >
            Reserve a seat
          </p>
          <h2
            style={{ fontFamily: 'var(--font-editorial)' }}
            className="mt-6 text-balance text-[clamp(2.25rem,5vw,4rem)] leading-[1.0] tracking-tight"
          >
            Six seats.
            <br />
            <span className="italic text-[#E89E72]">One service.</span>
          </h2>
          <p className="mt-8 max-w-md text-pretty leading-relaxed text-[#F5ECD7]/75">
            One seating, six guests, Wednesday through Sunday. Pick a
            night and we&rsquo;ll confirm in the morning. If we&rsquo;re
            booked, we&rsquo;ll put you on the next opening.
          </p>
        </div>

        <form
          className="md:col-span-7 grid gap-4"
          onSubmit={(e) => { e.preventDefault(); alert('Demo only — wire to OpenTable or your reservation backend.'); }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              className="rounded-sm border border-[#F5ECD7]/20 bg-transparent px-4 py-3.5 text-[#F5ECD7] placeholder:text-[#F5ECD7]/40 focus:border-[#E89E72] focus:outline-none"
              placeholder="Your name"
              required
            />
            <input
              className="rounded-sm border border-[#F5ECD7]/20 bg-transparent px-4 py-3.5 text-[#F5ECD7] placeholder:text-[#F5ECD7]/40 focus:border-[#E89E72] focus:outline-none"
              placeholder="Phone (so we can confirm)"
              type="tel"
              required
            />
          </div>
          <input
            className="rounded-sm border border-[#F5ECD7]/20 bg-transparent px-4 py-3.5 text-[#F5ECD7] placeholder:text-[#F5ECD7]/40 focus:border-[#E89E72] focus:outline-none"
            placeholder="Email"
            type="email"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              className="rounded-sm border border-[#F5ECD7]/20 bg-transparent px-4 py-3.5 text-[#F5ECD7] placeholder:text-[#F5ECD7]/40 focus:border-[#E89E72] focus:outline-none"
              placeholder="Date (e.g. Sat Mar 14)"
            />
            <select className="rounded-sm border border-[#F5ECD7]/20 bg-transparent px-4 py-3.5 text-[#F5ECD7] focus:border-[#E89E72] focus:outline-none">
              <option className="text-[#1A0F08]">2 guests</option>
              <option className="text-[#1A0F08]">4 guests</option>
              <option className="text-[#1A0F08]">6 guests (full counter)</option>
            </select>
          </div>
          <textarea
            rows={4}
            placeholder="Anything we should know? Allergies, occasion, wine preferences."
            className="rounded-sm border border-[#F5ECD7]/20 bg-transparent px-4 py-3.5 text-[#F5ECD7] placeholder:text-[#F5ECD7]/40 focus:border-[#E89E72] focus:outline-none"
          />
          <button
            type="submit"
            className="mt-2 inline-flex justify-center rounded-full bg-[#C8462C] px-6 py-4 font-medium text-[#F5ECD7] transition-transform hover:-translate-y-0.5"
          >
            Request a seat
          </button>
          <p style={{ fontFamily: 'var(--font-mono)' }} className="text-[10px] uppercase tracking-[0.22em] text-[#F5ECD7]/50">
            Confirmation by 10 a.m. the next day.
          </p>
        </form>
      </div>
    </section>
  );
}

function EmberFooter() {
  return (
    <footer className="border-t border-[#1A0F08]/10 bg-[#F5ECD7] px-6 py-12 lg:px-10">
      <div className="mx-auto max-w-[1320px] grid gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div className="space-y-4">
          <EmberLogo size={34} />
          <p className="max-w-xs text-sm text-[#1A0F08]/60">
            A bakery and six-seat table in the city&rsquo;s Outer
            Sunset. Wood-fired since 2019.
          </p>
        </div>
        <div>
          <p style={{ fontFamily: 'var(--font-mono)' }} className="text-[10px] uppercase tracking-[0.22em] text-[#C8462C]">
            Visit
          </p>
          <p className="mt-3 text-sm text-[#1A0F08]/75">
            48 Carling Ave<br />
            San Francisco, CA 94122
          </p>
        </div>
        <div>
          <p style={{ fontFamily: 'var(--font-mono)' }} className="text-[10px] uppercase tracking-[0.22em] text-[#C8462C]">
            Reach
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-[#1A0F08]/75">
            <li><a href="tel:5550102467" className="hover:text-[#C8462C]">(555) 010-2467</a></li>
            <li>hello@emberandtable.example</li>
            <li>@emberandtable</li>
          </ul>
        </div>
        <div>
          <p style={{ fontFamily: 'var(--font-mono)' }} className="text-[10px] uppercase tracking-[0.22em] text-[#C8462C]">
            More
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-[#1A0F08]/75">
            <li><a href="#" className="hover:text-[#C8462C]">Private events</a></li>
            <li><a href="#" className="hover:text-[#C8462C]">Gift cards</a></li>
            <li><a href="#" className="hover:text-[#C8462C]">Job openings</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-[1320px] flex-col items-start justify-between gap-3 border-t border-[#1A0F08]/10 pt-5 text-xs text-[#1A0F08]/45 md:flex-row md:items-center">
        <p>© 2026 Ember &amp; Table. Wood-fired since 2019.</p>
        <Link href="/" className="hover:text-[#C8462C]">
          ← Back to Swash · website built by Swash
        </Link>
      </div>
    </footer>
  );
}
