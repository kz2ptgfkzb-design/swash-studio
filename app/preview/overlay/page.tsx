'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

export default function OverlayPreview() {
  return (
    <div className="min-h-screen bg-[#F8F6F2] text-[#0A0A0A]" style={{ fontFamily: 'var(--font-sans)' }}>
      <OverlayNav />
      <OverlayHero />
      <OverlayLogos />
      <OverlayFeatures />
      <OverlayHow />
      <OverlayPricing />
      <OverlayQuote />
      <OverlayCta />
      <OverlayFooter />
    </div>
  );
}

function OverlayLogo({ size = 24 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
        <circle cx="11" cy="14" r="9" fill="#2447FF" />
        <circle cx="17" cy="14" r="9" fill="#0A0A0A" opacity="0.85" />
      </svg>
      <span className="text-[17px] font-semibold tracking-tight">overlay</span>
    </span>
  );
}

function OverlayNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#0A0A0A]/8 bg-[#F8F6F2]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-6 lg:px-10">
        <Link href="/preview/overlay"><OverlayLogo /></Link>
        <nav className="hidden items-center gap-7 text-sm md:flex">
          {['Product', 'Customers', 'Pricing', 'Docs', 'Changelog'].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-[#0A0A0A]/65 transition-colors hover:text-[#0A0A0A]">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3 text-sm">
          <a href="#" className="hidden text-[#0A0A0A]/65 hover:text-[#0A0A0A] md:inline">Sign in</a>
          <a
            href="#cta"
            className="inline-flex items-center gap-1.5 rounded-md bg-[#0A0A0A] px-4 py-2 font-medium text-[#F8F6F2] transition-transform hover:-translate-y-0.5"
          >
            Start free
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}

function OverlayHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={ref} className="relative overflow-hidden px-6 pt-24 pb-12 lg:px-10">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#2447FF]/30 bg-[#2447FF]/8 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#2447FF]" style={{ fontFamily: 'var(--font-mono)' }}>
              <span className="h-1.5 w-1.5 rounded-full bg-[#2447FF]" />
              v4.2 · Session Replay now in beta
            </span>
            <h1 className="mt-7 text-balance text-[clamp(2.75rem,7vw,6.5rem)] font-semibold leading-[0.95] tracking-tight">
              See what your users
              <br />
              <span className="text-[#0A0A0A]/40">actually do.</span>
            </h1>
            <p className="mt-7 max-w-lg text-pretty text-lg leading-relaxed text-[#0A0A0A]/65">
              Overlay is the analytics tool engineers reach for first.
              Funnels, retention, session replay — wired to your warehouse,
              priced like infrastructure, not enterprise software.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#cta" className="inline-flex items-center gap-2 rounded-md bg-[#2447FF] px-5 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5">
                Start free
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#how" className="inline-flex items-center gap-2 rounded-md border border-[#0A0A0A]/15 px-5 py-3 text-sm font-medium text-[#0A0A0A] transition-colors hover:bg-[#0A0A0A] hover:text-[#F8F6F2]">
                Read the docs
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#0A0A0A]/55" style={{ fontFamily: 'var(--font-mono)' }}>
              <span>// No credit card</span>
              <span>// Self-host or cloud</span>
              <span>// SOC 2 Type II</span>
              <span>// GDPR + HIPAA</span>
            </div>
          </div>
        </div>

        <motion.div style={{ y }} className="mt-16 md:mt-20">
          <OverlayDashboardMock />
        </motion.div>
      </div>
    </section>
  );
}

function OverlayDashboardMock() {
  return (
    <div className="relative overflow-hidden rounded-[14px] border border-[#0A0A0A]/12 bg-white shadow-[0_24px_80px_-20px_rgba(0,0,0,0.18)]">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-[#0A0A0A]/8 bg-[#F0EDE7] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
        <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
        <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        <div className="ml-4 flex h-7 w-full max-w-md items-center gap-2 rounded-md bg-white px-3 text-xs text-[#0A0A0A]/55" style={{ fontFamily: 'var(--font-mono)' }}>
          <span className="text-[#2447FF]">⊕</span>
          app.overlay.dev/funnels/checkout
        </div>
      </div>

      {/* Dashboard body */}
      <div className="grid grid-cols-12 gap-0 min-h-[440px]">
        {/* Sidebar */}
        <aside className="col-span-2 border-r border-[#0A0A0A]/8 bg-[#FAFAF7] p-4">
          <div className="mb-6 flex items-center gap-2 text-[13px] font-medium">
            <span className="h-2 w-2 rounded-full bg-[#2447FF]" />
            Overlay
          </div>
          <ul className="space-y-1 text-[13px]">
            {['Overview', 'Events', 'Funnels', 'Replay', 'Retention', 'SQL'].map((l, i) => (
              <li
                key={l}
                className={`rounded-md px-2.5 py-1.5 ${i === 2 ? 'bg-[#2447FF]/10 font-medium text-[#2447FF]' : 'text-[#0A0A0A]/70'}`}
              >
                {l}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main */}
        <div className="col-span-10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Checkout funnel</h3>
              <p className="font-mono text-xs text-[#0A0A0A]/55" style={{ fontFamily: 'var(--font-mono)' }}>
                last 14 days · 48,222 sessions
              </p>
            </div>
            <div className="flex gap-2 text-xs">
              <span className="rounded-full bg-[#0A0A0A]/5 px-3 py-1">14 d</span>
              <span className="rounded-full bg-[#0A0A0A]/5 px-3 py-1">30 d</span>
              <span className="rounded-full bg-[#0A0A0A]/5 px-3 py-1">QTD</span>
            </div>
          </div>

          {/* Funnel bars */}
          <ul className="mt-7 space-y-4">
            {[
              { label: 'Visited /pricing', value: 100, count: '48,222' },
              { label: 'Clicked "Start free"', value: 64, count: '30,862' },
              { label: 'Submitted email', value: 41, count: '19,771' },
              { label: 'Verified email', value: 33, count: '15,913' },
              { label: 'Completed onboarding', value: 22, count: '10,609' },
              { label: 'Made first request', value: 18, count: '8,680' },
            ].map((s, i) => (
              <li key={s.label}>
                <div className="mb-1.5 flex justify-between text-xs">
                  <span className="text-[#0A0A0A]/75">{s.label}</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }} className="text-[#0A0A0A]/55">
                    {s.count} · {s.value}%
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-[#0A0A0A]/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-[#2447FF]"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function OverlayLogos() {
  const logos = ['STRIPELINE', 'NIMBUS', 'KILNCRAFT', 'TIDEMARK', 'APEX/CO', 'OAKWELL', 'NORTHFORM', 'SALTWATER'];
  return (
    <section className="border-y border-[#0A0A0A]/8 bg-[#F0EDE7] px-6 py-12 lg:px-10">
      <div className="mx-auto max-w-[1320px]">
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.32em] text-[#0A0A0A]/55" style={{ fontFamily: 'var(--font-mono)' }}>
          The data team at 2,400 companies runs on Overlay
        </p>
        <ul className="mt-7 grid grid-cols-2 items-center gap-x-10 gap-y-6 sm:grid-cols-4 md:grid-cols-8">
          {logos.map((l) => (
            <li key={l} className="text-center font-mono text-sm font-semibold tracking-[0.12em] text-[#0A0A0A]/60" style={{ fontFamily: 'var(--font-mono)' }}>
              {l}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function OverlayFeatures() {
  const features = [
    {
      title: 'Real-user funnels',
      body: 'Drop a snippet, get every funnel you can dream of. Slice by cohort, plan, country, anything in your warehouse.',
      icon: (
        <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8 text-[#2447FF]">
          <path d="M4 6h24l-7 10v10l-10 4V16L4 6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: 'Session replay',
      body: 'See every click, scroll, and rage-quit. Privacy controls bake every PII redaction into the SDK, not the dashboard.',
      icon: (
        <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8 text-[#2447FF]">
          <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2" />
          <path d="M13 11l8 5-8 5z" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: 'Warehouse-native',
      body: 'Snowflake, BigQuery, Redshift, Postgres. Query our event store from your warehouse without ETL.',
      icon: (
        <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8 text-[#2447FF]">
          <ellipse cx="16" cy="8" rx="11" ry="4" stroke="currentColor" strokeWidth="2" />
          <path d="M5 8v8c0 2 5 4 11 4s11-2 11-4V8M5 16v8c0 2 5 4 11 4s11-2 11-4v-8" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      title: 'Retention cohorts',
      body: 'Drop in any cohort definition in SQL or chips. Watch week-on-week, month-on-month, all the way out.',
      icon: (
        <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8 text-[#2447FF]">
          <path d="M4 22l6-8 5 5 8-10 5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="4" cy="22" r="2" fill="currentColor" />
          <circle cx="28" cy="15" r="2" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: 'SQL editor',
      body: 'Full SQL access from day one. Saved queries, scheduled reports, dashboards built on the same engine.',
      icon: (
        <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8 text-[#2447FF]">
          <rect x="4" y="6" width="24" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M4 12h24M9 18h6M9 22h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: 'A/B framework',
      body: 'Built-in feature flags + experiments. Roll out by user, by cohort, by warehouse query. Stop at significance.',
      icon: (
        <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8 text-[#2447FF]">
          <path d="M16 4v24M16 4l8 8M16 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <section id="product" className="px-6 py-24 lg:px-10 md:py-32">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#2447FF]" style={{ fontFamily: 'var(--font-mono)' }}>
              The product
            </p>
            <h2 className="mt-6 text-balance text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[0.96] tracking-tight">
              Built for the engineer
              <br />
              <span className="text-[#0A0A0A]/45">who has to answer the question.</span>
            </h2>
          </div>
          <p className="md:col-span-5 text-pretty text-base leading-relaxed text-[#0A0A0A]/65">
            Most analytics tools are dashboards with a SQL editor bolted
            on. Overlay starts with the SQL editor — and gives you
            dashboards, replay, and experiments built on the same engine.
          </p>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-[#0A0A0A]/10 bg-[#0A0A0A]/10 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <li key={f.title} className="flex h-full flex-col gap-4 bg-[#F8F6F2] p-7">
              {f.icon}
              <h3 className="text-xl font-semibold">{f.title}</h3>
              <p className="text-sm leading-relaxed text-[#0A0A0A]/65">{f.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function OverlayHow() {
  const steps = [
    {
      n: '01',
      title: 'Drop the snippet.',
      body: 'One npm install, one line of code. Or load it via script tag — your call.',
      code: `npm i @overlay/sdk\n\nimport { track } from '@overlay/sdk';\ntrack('checkout_started', { plan: 'pro' });`,
    },
    {
      n: '02',
      title: 'Define cohorts.',
      body: 'In chips or in SQL. Saved cohorts work in funnels, replay, retention, everywhere.',
      code: `cohort: active_paid_users\n  WHERE plan != 'free'\n    AND last_seen > NOW() - 14`,
    },
    {
      n: '03',
      title: 'Answer the question.',
      body: 'Funnel converts X percent for cohort Y last month. Replay the drop-offs. Ship the fix.',
      code: `SELECT step, COUNT(*) \nFROM funnel('checkout', cohort:active_paid_users)\nGROUP BY 1`,
    },
  ];

  return (
    <section id="how" className="bg-[#0A0A0A] px-6 py-24 text-[#F8F6F2] lg:px-10 md:py-32">
      <div className="mx-auto max-w-[1320px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#7B9BFF]" style={{ fontFamily: 'var(--font-mono)' }}>
          How it works
        </p>
        <h2 className="mt-6 max-w-3xl text-balance text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[0.96] tracking-tight">
          From npm install
          <br />
          <span className="text-[#7B9BFF]">to first funnel</span> in under 10 minutes.
        </h2>

        <ol className="mt-14 space-y-px overflow-hidden rounded-lg border border-white/10 bg-white/10">
          {steps.map((s) => (
            <li key={s.n} className="grid gap-8 bg-[#0A0A0A] p-8 md:grid-cols-[120px_1fr_1.2fr] md:gap-12 md:p-10">
              <div className="font-mono text-2xl text-[#7B9BFF]" style={{ fontFamily: 'var(--font-mono)' }}>
                {s.n}
              </div>
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-[#F8F6F2]/65">{s.body}</p>
              </div>
              <pre
                className="overflow-x-auto rounded-md border border-white/10 bg-[#13141A] p-5 text-[12px] leading-relaxed text-[#E9EBF3]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {s.code}
              </pre>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function OverlayPricing() {
  const [yearly, setYearly] = useState(true);
  const tiers = [
    {
      name: 'Hobby',
      blurb: 'For solo builders and side projects.',
      price: 0,
      features: ['100k events / mo', '7-day retention', '1 project', 'Community support'],
      cta: 'Start free',
    },
    {
      name: 'Team',
      blurb: 'For growing product teams.',
      featured: true,
      price: yearly ? 49 : 59,
      yearly: true,
      features: ['5M events / mo', '90-day retention', 'Unlimited projects', 'Session replay (1k / mo)', 'Slack alerts', 'SOC 2 report'],
      cta: 'Start 14-day trial',
    },
    {
      name: 'Scale',
      blurb: 'For data teams with real data volumes.',
      price: yearly ? 299 : 349,
      yearly: true,
      features: ['Custom events', 'Unlimited retention', 'Warehouse sync', 'Session replay (50k / mo)', 'SSO + SCIM', 'HIPAA BAA', 'Dedicated CSM'],
      cta: 'Talk to sales',
    },
  ];

  return (
    <section id="pricing" className="px-6 py-24 lg:px-10 md:py-32">
      <div className="mx-auto max-w-[1320px]">
        <div className="text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#2447FF]" style={{ fontFamily: 'var(--font-mono)' }}>
            Pricing
          </p>
          <h2 className="mt-6 text-balance text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[0.96] tracking-tight">
            Priced like infrastructure.
            <br />
            <span className="text-[#0A0A0A]/45">Not enterprise software.</span>
          </h2>

          <div className="mt-10 inline-flex rounded-full border border-[#0A0A0A]/15 bg-white p-1">
            <button
              onClick={() => setYearly(false)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${!yearly ? 'bg-[#0A0A0A] text-white' : 'text-[#0A0A0A]/60 hover:text-[#0A0A0A]'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${yearly ? 'bg-[#0A0A0A] text-white' : 'text-[#0A0A0A]/60 hover:text-[#0A0A0A]'}`}
            >
              Yearly · save 17%
            </button>
          </div>
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <li
              key={t.name}
              className={`flex h-full flex-col gap-6 rounded-2xl border p-8 ${
                t.featured
                  ? 'border-[#2447FF] bg-[#0A0A0A] text-[#F8F6F2] shadow-[0_24px_60px_-20px_rgba(36,71,255,0.5)]'
                  : 'border-[#0A0A0A]/10 bg-white text-[#0A0A0A]'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{t.name}</h3>
                {t.featured && (
                  <span className="rounded-full bg-[#2447FF] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white" style={{ fontFamily: 'var(--font-mono)' }}>
                    Most picked
                  </span>
                )}
              </div>
              <p className={t.featured ? 'text-sm text-[#F8F6F2]/65' : 'text-sm text-[#0A0A0A]/65'}>{t.blurb}</p>
              <div>
                <p className="font-semibold tracking-tight">
                  <span className="text-5xl">${t.price}</span>
                  <span className={t.featured ? 'text-sm text-[#F8F6F2]/55' : 'text-sm text-[#0A0A0A]/55'}>
                    {' '}/ mo{t.yearly && yearly ? ', billed yearly' : ''}
                  </span>
                </p>
              </div>
              <ul className="space-y-2.5 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <svg className={`mt-1 shrink-0 ${t.featured ? 'text-[#7B9BFF]' : 'text-[#2447FF]'}`} width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#cta"
                className={`mt-auto inline-flex w-full items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5 ${
                  t.featured ? 'bg-[#2447FF] text-white' : 'bg-[#0A0A0A] text-[#F8F6F2]'
                }`}
              >
                {t.cta} →
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function OverlayQuote() {
  return (
    <section id="customers" className="border-y border-[#0A0A0A]/8 bg-[#F0EDE7] px-6 py-24 lg:px-10 md:py-32">
      <div className="mx-auto max-w-[1100px] text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#2447FF]" style={{ fontFamily: 'var(--font-mono)' }}>
          Customer story
        </p>
        <p className="mx-auto mt-10 max-w-[24ch] text-balance text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.18] tracking-tight">
          &ldquo;We replaced three tools with Overlay in a weekend. Our
          engineers stopped asking the data team for funnels — they
          just answer the questions themselves now.&rdquo;
        </p>
        <div className="mt-8">
          <p className="font-semibold">David Anand</p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[#0A0A0A]/55" style={{ fontFamily: 'var(--font-mono)' }}>
            CEO, Stripeline
          </p>
        </div>
      </div>
    </section>
  );
}

function OverlayCta() {
  return (
    <section id="cta" className="px-6 py-24 lg:px-10 md:py-32">
      <div className="mx-auto max-w-[1100px] rounded-3xl bg-[#0A0A0A] p-12 text-center text-[#F8F6F2] md:p-20">
        <h2 className="mx-auto max-w-[20ch] text-balance text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[0.96] tracking-tight">
          See your first funnel
          <br />
          <span className="text-[#7B9BFF]">in ten minutes.</span>
        </h2>
        <p className="mx-auto mt-7 max-w-md text-base leading-relaxed text-[#F8F6F2]/65">
          Hobby tier is free forever. Team tier comes with a 14-day
          trial — no card. Cancel any time.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-md bg-[#2447FF] px-6 py-3.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
          >
            Start free
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-md border border-white/20 px-6 py-3.5 text-sm font-medium transition-colors hover:bg-white hover:text-[#0A0A0A]"
          >
            Book a demo
          </a>
        </div>
      </div>
    </section>
  );
}

function OverlayFooter() {
  const COLS = [
    {
      label: 'Product',
      links: ['Funnels', 'Replay', 'Retention', 'SQL', 'Experiments', 'Changelog'],
    },
    {
      label: 'Developers',
      links: ['Docs', 'SDKs', 'API reference', 'Status', 'Open source'],
    },
    {
      label: 'Company',
      links: ['About', 'Customers', 'Pricing', 'Careers', 'Blog'],
    },
    {
      label: 'Legal',
      links: ['Privacy', 'Terms', 'Security', 'DPA', 'SOC 2'],
    },
  ];
  return (
    <footer className="border-t border-[#0A0A0A]/8 bg-[#F8F6F2] px-6 py-14 lg:px-10">
      <div className="mx-auto max-w-[1320px] grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div className="space-y-4">
          <OverlayLogo size={28} />
          <p className="max-w-xs text-sm text-[#0A0A0A]/60">
            The analytics tool engineers reach for first. Built in San
            Francisco, used in 64 countries.
          </p>
        </div>
        {COLS.map((c) => (
          <div key={c.label}>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#2447FF]" style={{ fontFamily: 'var(--font-mono)' }}>
              {c.label}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-[#0A0A0A]/70">
              {c.links.map((l) => (
                <li key={l}><a href="#" className="hover:text-[#0A0A0A]">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 flex max-w-[1320px] flex-col items-start justify-between gap-3 border-t border-[#0A0A0A]/8 pt-6 text-xs text-[#0A0A0A]/45 md:flex-row md:items-center">
        <p>© 2026 Overlay Inc. All rights reserved.</p>
        <Link href="/" className="hover:text-[#2447FF]">
          ← Back to Swash · website built by Swash
        </Link>
      </div>
    </footer>
  );
}
