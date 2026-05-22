export type Category = {
  id: string;
  label: string;
  description: string;
  accent: 'lime' | 'violet' | 'aqua' | 'peach';
};

export const CATEGORIES: Category[] = [
  {
    id: 'storefront',
    label: 'Storefront',
    description: 'Pages, themes, and the surfaces your customers actually touch.',
    accent: 'lime',
  },
  {
    id: 'checkout',
    label: 'Checkout',
    description: 'One promise to keep: get the payment over the line.',
    accent: 'violet',
  },
  {
    id: 'marketing',
    label: 'Marketing',
    description: 'Channels, sequences, and the long tail of attention.',
    accent: 'peach',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    description: 'Read the room — and the order book.',
    accent: 'aqua',
  },
  {
    id: 'developer',
    label: 'Developer',
    description: 'APIs, primitives, and the stuff under the hood.',
    accent: 'violet',
  },
  {
    id: 'ai',
    label: 'Intelligence',
    description: 'Decisions the platform makes so you do not have to.',
    accent: 'lime',
  },
];

export type Feature = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  category: Category['id'];
  status: 'shipping' | 'rolling-out' | 'preview';
  hero: {
    eyebrow: string;
    title: string;
    body: string;
  };
  highlights: { title: string; body: string }[];
  meta: { label: string; value: string }[];
  related: string[];
};

export const FEATURES: Feature[] = [
  {
    slug: 'compose-studio',
    name: 'Compose Studio',
    tagline: 'A new canvas for building store pages — without the templating tax.',
    summary:
      'Drag, drop, and stack live components against a real preview. Save a section once and reuse it across every page in the catalog.',
    category: 'storefront',
    status: 'shipping',
    hero: {
      eyebrow: 'Storefront / Build',
      title: 'The page builder that thinks in components, not templates.',
      body: 'Compose Studio lets your merchandising team ship landing pages, collection layouts, and product detail experiments without waiting on a developer — and without the cruft of a traditional drag-and-drop tool. Every block is a real component, every change is versioned, and every page is fast by default.',
    },
    highlights: [
      {
        title: 'Component-first',
        body: 'Every block is shipped from your design system. Update once, watch every page update everywhere.',
      },
      {
        title: 'Live preview',
        body: 'No simulation, no proxy. You edit the page your customer sees.',
      },
      {
        title: 'Version-aware',
        body: 'Every save is a checkpoint. Roll back, branch, A/B from any point.',
      },
    ],
    meta: [
      { label: 'Plan', value: 'All plans' },
      { label: 'Region', value: 'Global' },
      { label: 'Status', value: 'Generally available' },
    ],
    related: ['mirror-mode', 'pinpoint-search', 'cortex-api'],
  },
  {
    slug: 'beacon-checkout',
    name: 'Beacon Checkout',
    tagline: 'A faster path from "add to cart" to "thanks for your order".',
    summary:
      'A one-tap checkout that remembers shipping, payment, and preferences across every store running on the platform.',
    category: 'checkout',
    status: 'shipping',
    hero: {
      eyebrow: 'Checkout / Conversion',
      title: 'A checkout that feels less like a form and more like a tap.',
      body: 'Beacon recognizes returning shoppers across every store in the network and prefills everything we know is safe to prefill. The result: fewer fields, more confidence, a checkout shoppers do not have to think about.',
    },
    highlights: [
      {
        title: 'Network-recognized',
        body: 'Shoppers are recognized on first arrival — no extra account, no extra step.',
      },
      {
        title: 'Tokenized by default',
        body: 'No raw card data crosses your storefront. Beacon tokenizes at the edge.',
      },
      {
        title: 'Merchant controls',
        body: 'Choose where Beacon shows up, what it prefills, and what stays off.',
      },
    ],
    meta: [
      { label: 'Plan', value: 'All plans' },
      { label: 'Region', value: 'US, EU, UK, AU, CA' },
      { label: 'Status', value: 'Generally available' },
    ],
    related: ['atlas-markets', 'aurora-ai', 'cortex-api'],
  },
  {
    slug: 'aurora-ai',
    name: 'Aurora AI',
    tagline: 'A commerce-aware assistant that lives where the work is.',
    summary:
      'Ask Aurora to write product copy, debug a theme issue, draft a campaign, or build a report. It already knows your store.',
    category: 'ai',
    status: 'rolling-out',
    hero: {
      eyebrow: 'Intelligence / Co-pilot',
      title: 'An assistant that has actually read your store.',
      body: 'Aurora connects to your catalog, your customers, your orders, and your theme — and reasons across all of it. Ask in plain language. Ship in one click. No prompt engineering required.',
    },
    highlights: [
      {
        title: 'Catalog-aware',
        body: 'Aurora reads every product, variant, and collection before it answers.',
      },
      {
        title: 'In-place actions',
        body: 'Edit copy, fix a theme bug, or launch a campaign without leaving the chat.',
      },
      {
        title: 'Approval flow',
        body: 'Every change Aurora makes is staged. You approve. It ships.',
      },
    ],
    meta: [
      { label: 'Plan', value: 'Plus and above' },
      { label: 'Region', value: 'Global' },
      { label: 'Status', value: 'Rolling out' },
    ],
    related: ['compose-studio', 'insight-pulse', 'halocast'],
  },
  {
    slug: 'insight-pulse',
    name: 'Insight Pulse',
    tagline: 'A live read on the heartbeat of your store.',
    summary:
      'Real-time dashboards that read like a stock ticker — orders, traffic sources, conversion, refunds, and inventory pressure.',
    category: 'analytics',
    status: 'shipping',
    hero: {
      eyebrow: 'Analytics / Live',
      title: 'Operate your store from a single, live dashboard.',
      body: 'Pulse pulls every meaningful signal into one screen and updates it in real time. Pin the metrics you care about, slice by channel or region, and get a notification when something looks off — before a customer tells you.',
    },
    highlights: [
      {
        title: 'Sub-second updates',
        body: 'Orders, sessions, and inventory all refresh under a second from the source of truth.',
      },
      {
        title: 'Anomaly alerts',
        body: 'Pulse learns your baselines and pings you when something drifts outside expected ranges.',
      },
      {
        title: 'Pin and share',
        body: 'Build views for ops, for marketing, for leadership. Share with a link.',
      },
    ],
    meta: [
      { label: 'Plan', value: 'All plans' },
      { label: 'Region', value: 'Global' },
      { label: 'Status', value: 'Generally available' },
    ],
    related: ['mirror-mode', 'aurora-ai', 'threadlink'],
  },
  {
    slug: 'threadlink',
    name: 'Threadlink',
    tagline: 'Inventory that stays in sync — across every channel, in real time.',
    summary:
      'A single source of truth for stock levels across stores, warehouses, marketplaces, and pop-ups.',
    category: 'storefront',
    status: 'shipping',
    hero: {
      eyebrow: 'Inventory / Sync',
      title: 'One stock count. Every channel. No more oversells.',
      body: 'Threadlink reconciles every place a unit lives — warehouse bins, POS drawers, marketplace listings, third-party fulfillment — and exposes a single, trusted count. Built on an event log, not a nightly cron.',
    },
    highlights: [
      {
        title: 'Event-sourced',
        body: 'Every movement is a recorded event. Replayable, auditable, never lost.',
      },
      {
        title: 'Multi-channel native',
        body: 'Sells on Amazon, Etsy, TikTok Shop, and your own store from the same source.',
      },
      {
        title: 'Safety stock rules',
        body: 'Hold back a buffer per channel without manual juggling.',
      },
    ],
    meta: [
      { label: 'Plan', value: 'Shopify and above' },
      { label: 'Region', value: 'Global' },
      { label: 'Status', value: 'Generally available' },
    ],
    related: ['atlas-markets', 'insight-pulse', 'beacon-checkout'],
  },
  {
    slug: 'halocast',
    name: 'Halocast',
    tagline: 'Broadcast marketing that does not feel like a broadcast.',
    summary:
      'Send segmented campaigns over email, SMS, and push from a single composer, with on-brand sends out of the box.',
    category: 'marketing',
    status: 'shipping',
    hero: {
      eyebrow: 'Marketing / Send',
      title: 'One composer. Every channel. On brand by default.',
      body: 'Halocast lets you write once and deliver to email, SMS, and mobile push — with channel-aware previews, deliverability scoring, and a segment builder that reads from the live customer graph.',
    },
    highlights: [
      {
        title: 'Channel-aware',
        body: 'Email, SMS, and push get the right treatment without re-authoring.',
      },
      {
        title: 'Deliverability scoring',
        body: 'See your sender reputation, content score, and bounce risk before you hit send.',
      },
      {
        title: 'Live segments',
        body: 'Segments rebuild as the underlying customer data changes — no rerun needed.',
      },
    ],
    meta: [
      { label: 'Plan', value: 'All plans' },
      { label: 'Region', value: 'Global' },
      { label: 'Status', value: 'Generally available' },
    ],
    related: ['loom-loyalty', 'aurora-ai', 'mirror-mode'],
  },
  {
    slug: 'pinpoint-search',
    name: 'Pinpoint Search',
    tagline: 'On-site search that ranks like Google and reads like a merchandiser.',
    summary:
      'Semantic search, typo tolerance, synonyms, and merchandising rules built into the storefront — no external service required.',
    category: 'storefront',
    status: 'shipping',
    hero: {
      eyebrow: 'Storefront / Discovery',
      title: 'A search bar that actually finds what shoppers are asking for.',
      body: 'Pinpoint reads the meaning behind a query, not just the keywords. Merchandisers can pin, hide, or boost results — and every behavior is logged so the ranker keeps getting smarter.',
    },
    highlights: [
      {
        title: 'Semantic ranking',
        body: 'Embedding-based retrieval finds matches a keyword search would miss.',
      },
      {
        title: 'Merchandising controls',
        body: 'Pin, hide, boost, or freeze results for any query, any segment.',
      },
      {
        title: 'Closed-loop learning',
        body: 'Pinpoint watches what shoppers tap and what they ignore. The ranker adapts.',
      },
    ],
    meta: [
      { label: 'Plan', value: 'All plans' },
      { label: 'Region', value: 'Global' },
      { label: 'Status', value: 'Generally available' },
    ],
    related: ['compose-studio', 'aurora-ai', 'insight-pulse'],
  },
  {
    slug: 'cortex-api',
    name: 'Cortex API',
    tagline: 'A storefront API rewritten around the operations your devs actually run.',
    summary:
      'Lower latency, fewer round-trips, and first-class typing for everything from cart to fulfillment.',
    category: 'developer',
    status: 'preview',
    hero: {
      eyebrow: 'Developer / Platform',
      title: 'The storefront API, rewritten from the operation up.',
      body: 'Cortex collapses the round-trips a modern storefront needs into a handful of typed operations. Built on a new query planner. Backwards compatible. Half the latency of the previous generation.',
    },
    highlights: [
      {
        title: 'Operation-first',
        body: 'Common storefront flows ship as single round-trips, not stitched together.',
      },
      {
        title: 'Typed end-to-end',
        body: 'Generated SDKs for TypeScript, Swift, Kotlin, and Ruby — kept in lockstep.',
      },
      {
        title: 'Backwards compatible',
        body: 'Cortex runs alongside the existing storefront API. No flag day.',
      },
    ],
    meta: [
      { label: 'Plan', value: 'All plans' },
      { label: 'Region', value: 'Global' },
      { label: 'Status', value: 'Developer preview' },
    ],
    related: ['compose-studio', 'beacon-checkout', 'atlas-markets'],
  },
  {
    slug: 'loom-loyalty',
    name: 'Loom Loyalty',
    tagline: 'A loyalty program that earns its place on the storefront.',
    summary:
      'Drop-in points, tiers, and referrals — with native UI primitives instead of a third-party iframe.',
    category: 'marketing',
    status: 'rolling-out',
    hero: {
      eyebrow: 'Marketing / Retention',
      title: 'Loyalty that feels like part of the store, not bolted on.',
      body: 'Loom ships points, tiers, perks, and referrals as native theme blocks. No third-party iframe, no clash with your brand, no janky modal. Just primitives your designer can shape to fit.',
    },
    highlights: [
      {
        title: 'Native blocks',
        body: 'Drop a points balance, tier badge, or perk grid anywhere on the theme.',
      },
      {
        title: 'Programmable rewards',
        body: 'Bonus rules, expirations, and stacking logic from a single config.',
      },
      {
        title: 'Cohort reporting',
        body: 'See how members spend versus non-members. Watch tiers move over time.',
      },
    ],
    meta: [
      { label: 'Plan', value: 'Shopify and above' },
      { label: 'Region', value: 'Global' },
      { label: 'Status', value: 'Rolling out' },
    ],
    related: ['halocast', 'insight-pulse', 'mirror-mode'],
  },
  {
    slug: 'mirror-mode',
    name: 'Mirror Mode',
    tagline: 'Run experiments on real traffic without writing code.',
    summary:
      'A native A/B and multi-armed bandit framework wired into every page, theme, and checkout step.',
    category: 'analytics',
    status: 'shipping',
    hero: {
      eyebrow: 'Analytics / Experimentation',
      title: 'Experimentation, finally first-class.',
      body: 'Mirror runs A/B tests, holdouts, and bandits on real traffic — from theme tweaks to checkout copy — with proper power calculations, sequential testing, and a clean stop condition built in.',
    },
    highlights: [
      {
        title: 'Proper statistics',
        body: 'Sequential testing, power calculations, and false-discovery control out of the box.',
      },
      {
        title: 'Bandits when you want them',
        body: 'Switch from A/B to multi-armed bandit on the same experiment, no rebuild.',
      },
      {
        title: 'Every surface',
        body: 'Run tests on PDPs, collections, checkout, emails — anywhere on the platform.',
      },
    ],
    meta: [
      { label: 'Plan', value: 'Shopify and above' },
      { label: 'Region', value: 'Global' },
      { label: 'Status', value: 'Generally available' },
    ],
    related: ['compose-studio', 'insight-pulse', 'aurora-ai'],
  },
  {
    slug: 'pulsegate',
    name: 'Pulsegate',
    tagline: 'A performance budget for your storefront, enforced at deploy.',
    summary:
      'Set budgets for Largest Contentful Paint, JS bundle size, and image weight. Pulsegate blocks regressions before they ship.',
    category: 'developer',
    status: 'rolling-out',
    hero: {
      eyebrow: 'Developer / Performance',
      title: 'Your performance budget, finally enforced.',
      body: 'Pulsegate runs synthetic and field measurements on every theme deploy and blocks the change if it breaks the budget you set. No more "we will fix the speed score later".',
    },
    highlights: [
      {
        title: 'Pre-merge checks',
        body: 'Synthetic runs gate every theme PR against your LCP, INP, and CLS budgets.',
      },
      {
        title: 'Real-user metrics',
        body: 'Field data from your actual shoppers feeds back into the same dashboard.',
      },
      {
        title: 'Auto-suggestions',
        body: 'When a budget breaks, Pulsegate suggests the specific image, script, or block that caused it.',
      },
    ],
    meta: [
      { label: 'Plan', value: 'Shopify and above' },
      { label: 'Region', value: 'Global' },
      { label: 'Status', value: 'Rolling out' },
    ],
    related: ['cortex-api', 'insight-pulse', 'compose-studio'],
  },
  {
    slug: 'atlas-markets',
    name: 'Atlas Markets',
    tagline: 'Sell into every market that matters — without copying the store.',
    summary:
      'Local pricing, local currency, local payment methods, local content — all branched from a single canonical store.',
    category: 'storefront',
    status: 'shipping',
    hero: {
      eyebrow: 'International / Markets',
      title: 'One store. Every market.',
      body: 'Atlas branches your storefront into per-market overrides — pricing, language, payment methods, shipping promises — without duplicating the catalog. Run twelve markets the way you used to run one.',
    },
    highlights: [
      {
        title: 'Catalog branches',
        body: 'Override a price, a translation, or a product description per market. Inherit the rest.',
      },
      {
        title: 'Local payment methods',
        body: 'Pay with the methods shoppers in each market actually use.',
      },
      {
        title: 'Geo-routed checkout',
        body: 'Shoppers land in the right market by default, with a clear path to switch.',
      },
    ],
    meta: [
      { label: 'Plan', value: 'Shopify and above' },
      { label: 'Region', value: 'Global' },
      { label: 'Status', value: 'Generally available' },
    ],
    related: ['beacon-checkout', 'threadlink', 'halocast'],
  },
];

export function getFeatureBySlug(slug: string) {
  return FEATURES.find((f) => f.slug === slug);
}

export function getFeaturesByCategory(catId: string | null) {
  if (!catId) return FEATURES;
  return FEATURES.filter((f) => f.category === catId);
}

export function getRelatedFeatures(slug: string) {
  const feat = getFeatureBySlug(slug);
  if (!feat) return [];
  return feat.related
    .map((s) => getFeatureBySlug(s))
    .filter((f): f is Feature => Boolean(f));
}

export function getCategoryById(id: string) {
  return CATEGORIES.find((c) => c.id === id);
}
