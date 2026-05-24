export type FaqItem = { q: string; a: string };
export type FaqGroup = { id: string; label: string; items: FaqItem[] };

export const FAQ: FaqGroup[] = [
  {
    id: 'pricing',
    label: 'Pricing & budget',
    items: [
      {
        q: "Why don't you publish prices?",
        a: 'Because a fixed price tag forces every brief into the same box. A bakery rebuilding its menu and a B2B SaaS launching a product line have nothing in common except they both need a website. We price the work to the brief, not the brief to the price.',
      },
      {
        q: 'What is the smallest project you take?',
        a: 'A single-page site, light brand polish, and a working form. Starts around the price of a good camera. We size the work to the budget you set — we never quietly stretch past it.',
      },
      {
        q: 'What is the largest project you take?',
        a: 'No cap. The biggest engagement we have run was a 14-week flagship build for a multi-market DTC brand. If the brief justifies the scope, we can resource it.',
      },
      {
        q: 'Do you do payment plans?',
        a: 'Yes — 40% on signing, 40% at milestone two, 20% at launch is our default. We will work with you on something else if cash flow needs it.',
      },
      {
        q: 'What if I do not love the proposal?',
        a: 'You walk away, free. The brief is not a commitment. We write proposals because we want to win the work — if we got it wrong, tell us why and we will rewrite it.',
      },
    ],
  },
  {
    id: 'process',
    label: 'Process & timeline',
    items: [
      {
        q: 'How long until launch?',
        a: 'Two weeks for a single-page site. Four to six weeks for a typical multi-page brand site. Eight to twelve for a full ecommerce or flagship rebuild. The proposal locks the timeline in writing.',
      },
      {
        q: 'Will I have to write copy?',
        a: 'We write the first draft of every page. You edit. We rewrite. Most clients spend two to three hours total on copy over the engagement.',
      },
      {
        q: 'Do you need photography?',
        a: 'If you have it, we will use it. If you do not, we will either source licensed imagery, art-direct a shoot (separate quote), or design around custom illustrations / motion. Every brief gets a recommendation.',
      },
      {
        q: 'Can you migrate from my existing platform?',
        a: 'Yes. Shopify, Squarespace, Wix, WordPress, Webflow, Framer, custom — we have migrated from all of them. Redirects, SEO continuity, and analytics carry-over are part of the standard checklist.',
      },
      {
        q: 'Who actually does the work?',
        a: 'Our six in-house people. No subcontractors, no offshoring, no surprise junior swap-ins. The names on the proposal are the names on the project.',
      },
    ],
  },
  {
    id: 'after',
    label: 'After launch',
    items: [
      {
        q: 'What happens after the site launches?',
        a: '30 days of polish included on every engagement — bug fixes, small tweaks, the second-guesses that always come up post-launch. After that, we either hand off cleanly or you put us on a retainer.',
      },
      {
        q: 'Do you do hosting?',
        a: 'We do not host long-term, but we set up your hosting on launch — Vercel, Netlify, your own server. Hosting fees are yours; we make sure they are reasonable (usually $20 – $200 / month depending on traffic).',
      },
      {
        q: 'Can my team update the site?',
        a: 'Yes. Every site ships with a CMS for the content you actually update — blog, team, FAQs, services. We train your team on the CMS during week six.',
      },
      {
        q: 'What if I want changes later?',
        a: 'Retainer or by-the-hour. Retainers start at four hours a month. By-the-hour is billed weekly with a clear estimate before any work starts.',
      },
    ],
  },
  {
    id: 'fit',
    label: 'Fit & scope',
    items: [
      {
        q: 'Do you work with my industry?',
        a: 'Almost certainly yes. Recent work has shipped for HVAC dispatchers, DTC skincare lines, neighborhood bakeries, Series-A SaaS teams, real-estate brokerages, restaurants, dental practices, and creators. If you do not see your industry, tell us in the brief.',
      },
      {
        q: 'Do you work outside the US?',
        a: 'Yes. We have shipped work in eight countries. Time-zone flexibility is built into how we sprint.',
      },
      {
        q: 'Can you help with branding only?',
        a: 'Yes. We do brand-only engagements (logo, system, voice) without a site build. Some clients use those to brief their own developers.',
      },
      {
        q: 'Can you work with my existing dev team?',
        a: 'Yes. We hand off Figma + brand specs + a clean front-end if that is the shape of the engagement. We will also code-review what your team ships if you want a second set of eyes.',
      },
    ],
  },
];
