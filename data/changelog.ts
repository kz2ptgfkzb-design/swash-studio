export type ChangelogEntry = {
  date: string;
  week: string;
  items: { tag: 'new' | 'improved' | 'fixed' | 'deprecated'; title: string; body: string }[];
};

export const CHANGELOG: ChangelogEntry[] = [
  {
    date: '2026-02-18',
    week: 'Week 07',
    items: [
      {
        tag: 'new',
        title: 'Compose Studio enters general availability',
        body: 'The new page builder ships to every plan today. Existing template-based pages migrate in place — no flag day.',
      },
      {
        tag: 'new',
        title: 'Aurora AI: in-place theme edits',
        body: 'Aurora can now apply theme changes directly, staged behind an approval step. Roll back any edit from the audit log.',
      },
      {
        tag: 'improved',
        title: 'Cortex: 23% lower p95 latency on cart operations',
        body: 'A new query planner collapses cart-add → cart-update → cart-validate into a single round-trip in most regions.',
      },
    ],
  },
  {
    date: '2026-02-04',
    week: 'Week 05',
    items: [
      {
        tag: 'new',
        title: 'Mirror Mode bandits go GA',
        body: 'Multi-armed bandits join A/B and holdouts in the Mirror experimentation suite. Same experiment, different stop condition.',
      },
      {
        tag: 'improved',
        title: 'Threadlink: per-channel safety stock',
        body: 'Reserve buffer units per channel without per-listing manual juggling. Rules are versioned and previewable.',
      },
      {
        tag: 'fixed',
        title: 'Halocast: SMS preview character count edge cases',
        body: 'Unicode glyphs no longer over-report segment count in the SMS preview.',
      },
    ],
  },
  {
    date: '2026-01-21',
    week: 'Week 03',
    items: [
      {
        tag: 'new',
        title: 'Pulsegate enters rollout',
        body: 'Performance budgets are now enforceable at deploy time on Shopify and above. Define budgets per route, per device, per region.',
      },
      {
        tag: 'improved',
        title: 'Pinpoint: query understanding for sized garments',
        body: 'Queries like "warm hike pants men 32" route through size-aware synonyms before reaching the ranker.',
      },
      {
        tag: 'deprecated',
        title: 'Legacy theme inspector retired',
        body: 'The pre-Compose theme inspector is retired. Compose Studio supplants every capability, with a one-tap migration path.',
      },
    ],
  },
  {
    date: '2026-01-07',
    week: 'Week 01',
    items: [
      {
        tag: 'new',
        title: 'Atlas Markets: four new local payment methods',
        body: 'iDEAL (NL), Bancontact (BE), Konbini (JP), and Pix (BR) join the catalog of local payment methods.',
      },
      {
        tag: 'improved',
        title: 'Loom: redeemed-perks dashboard',
        body: 'Track redemption rate per perk, per tier, per cohort. Drill into individual journeys.',
      },
    ],
  },
  {
    date: '2025-12-17',
    week: 'Week 51',
    items: [
      {
        tag: 'new',
        title: 'Beacon Checkout: one-tap on subscription orders',
        body: 'Recurring orders now run through the same one-tap path as first-time purchases.',
      },
      {
        tag: 'fixed',
        title: 'Insight Pulse: anomaly window respects dst transitions',
        body: 'Pulse no longer flags an anomaly when a baseline window crosses a daylight-savings boundary.',
      },
    ],
  },
];

export const TAG_STYLES: Record<ChangelogEntry['items'][number]['tag'], { label: string; cls: string }> = {
  new: { label: 'New', cls: 'border-glow-lime/40 bg-glow-lime/10 text-glow-lime' },
  improved: { label: 'Improved', cls: 'border-glow-aqua/40 bg-glow-aqua/10 text-glow-aqua' },
  fixed: { label: 'Fixed', cls: 'border-glow-violet/40 bg-glow-violet/10 text-glow-violet' },
  deprecated: { label: 'Deprecated', cls: 'border-glow-peach/40 bg-glow-peach/10 text-glow-peach' },
};
