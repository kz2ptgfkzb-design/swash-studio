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
        a: 'A single-page site, light brand polish, and a working form. Starts around the price of a good camera. We size the work to the budget you set - we never quietly stretch past it.',
      },
      {
        q: 'What is the largest project you take?',
        a: 'No cap. The biggest engagement we have run was a 14-week flagship build for a multi-market DTC brand. If the brief justifies the scope, we can resource it.',
      },
      {
        q: 'Do you do payment plans?',
        a: 'Yes. Two options - pay in full once you sign off on the build, or split into two equal payments (the first on sign-off, the second before launch). Either way, the site only goes fully live after the final payment is received. No third-party financing, no hidden interest, no surprises.',
      },
      {
        q: 'What if I do not love the demo?',
        a: 'Send back any changes you want - text, voice memo, scribbled screenshots, however you think. We revise within 24 hours and send a fresh video. Unlimited revisions until you sign off. If we never land it, you walk away free.',
      },
    ],
  },
  {
    id: 'process',
    label: 'Process & timeline',
    items: [
      {
        q: 'How long until launch?',
        a: 'Launch happens on your timeline, not ours. The first video demo lands within 48 hours of your brief. If you sign off on that first demo, we can launch within days. Most clients want a few rounds of revisions first - a typical build moves from brief to live in two to six weeks depending on scope. The engagement letter locks the timeline in writing once you decide to move forward.',
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
        a: 'Yes. Shopify, Squarespace, Wix, WordPress, Webflow, Framer, custom - we have migrated from all of them. Redirects, SEO continuity, and analytics carry-over are part of the standard checklist.',
      },
      {
        q: 'Who actually does the work?',
        a: 'A skilled in-house team of web developers and brand designers. No subcontractors, no offshoring, no surprise junior swap-ins. The same team that builds your demo carries the project through to launch.',
      },
    ],
  },
  {
    id: 'after',
    label: 'After launch',
    items: [
      {
        q: 'What happens after the site launches?',
        a: '30 days of polish included on every engagement - bug fixes, small tweaks, the second-guesses that always come up post-launch. After that, we either hand off cleanly or you put us on a retainer.',
      },
      {
        q: 'Do you do hosting?',
        a: 'Yes. We offer hosting for a flat monthly fee - the exact number is discussed when we scope the project, so it fits your traffic and your stack. If you would rather host yourself, we will set you up on Vercel, Netlify, or your own server on launch day. Either way is fine; we will make the recommendation.',
      },
      {
        q: 'Can my team update the site?',
        a: 'Yes. Every site ships with a CMS for the content you actually update - blog, team, FAQs, services. We train your team on the CMS during week six.',
      },
      {
        q: 'What if I want changes later?',
        a: 'Two paths. (1) Do it yourself - every site ships with a CMS so your team can update copy, blog posts, FAQs, services, team listings, and images without touching us. We train your team on it during the build. (2) Put us on a monthly retainer - request any change anytime, we turn it around in 48 hours. Most clients pick the retainer for design or development changes and DIY the content stuff.',
      },
      {
        q: 'How does the retainer work?',
        a: 'Flat monthly fee. Request changes anytime - copy edits, image swaps, new sections, design tweaks, small features - and we turn each request around in 48 hours. No tickets, no portal, just email or message us. Month-to-month, no minimum term, pause or cancel any month. The exact fee depends on the scope of your site and how often you expect to request changes; we set it when you launch.',
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
