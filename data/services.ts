export type Service = {
  slug: string;
  title: string;
  tagline: string;
  body: string;
  deliverables: string[];
  starts: string;
  duration: string;
  category: 'brand' | 'site' | 'motion' | 'growth';
};

export const SERVICES: Service[] = [
  {
    slug: 'brand-identity',
    title: 'Brand identity',
    tagline: 'A mark, a voice, and the system around them.',
    body: 'We build brand systems from scratch — logo, wordmark, palette, typography, motion, voice. The deliverable is a Figma library plus a one-pager your team can ship from for the next five years.',
    deliverables: [
      'Logo mark + 3 lockups',
      'Color, type, and grid system',
      'Motion principles + sample',
      'Voice + tone guide',
      'Brand book (PDF + Figma)',
    ],
    starts: 'Week 1',
    duration: '2 – 3 weeks',
    category: 'brand',
  },
  {
    slug: 'website-design',
    title: 'Website design & build',
    tagline: 'The page customers actually land on.',
    body: 'A site designed from the brand foundation up — every page, every breakpoint, every interaction. Built on Next.js or Webflow, hosted wherever you like, handed over with documentation.',
    deliverables: [
      'Sitemap + content map',
      'Design in Figma (every breakpoint)',
      'Production build (Next.js or Webflow)',
      'CMS for the content you update',
      'Analytics, SEO, performance baked in',
    ],
    starts: 'Week 2',
    duration: '3 – 6 weeks',
    category: 'site',
  },
  {
    slug: 'ecommerce',
    title: 'Ecommerce storefronts',
    tagline: 'Designed to sell, not just to look good.',
    body: 'Shopify, headless, or fully custom. Built around the funnel, not around the template. PDP, cart, checkout, post-purchase — each one tuned with real merchant data.',
    deliverables: [
      'Catalog + collection architecture',
      'Custom PDP + cart',
      'Checkout + post-purchase flow',
      'Email + SMS hookups',
      'Conversion-tested launch plan',
    ],
    starts: 'Week 2',
    duration: '4 – 8 weeks',
    category: 'site',
  },
  {
    slug: 'motion',
    title: 'Motion + interaction',
    tagline: 'The way the site feels alive.',
    body: 'Scroll-driven sequences, micro-interactions, page transitions, animated illustrations. Designed to read at the brand voice — restrained where it should be, expressive where it has to be.',
    deliverables: [
      'Motion principles doc',
      'Scroll storyboards',
      'Interaction kit (hover, click, focus)',
      'Lottie + Framer Motion implementations',
      'Performance audit on every animation',
    ],
    starts: 'Week 3',
    duration: '1 – 2 weeks',
    category: 'motion',
  },
  {
    slug: 'campaign-pages',
    title: 'Campaign + launch pages',
    tagline: 'For the moments that matter most.',
    body: 'One-page sites for product launches, fundraisers, drops, events. Fast turn, sharp craft, built to outperform whatever else you have.',
    deliverables: [
      'Concept + narrative',
      'Design + build (one-page)',
      'Form + capture integration',
      'A/B variant ready',
      'Post-campaign archive plan',
    ],
    starts: 'Week 1',
    duration: '1 – 2 weeks',
    category: 'growth',
  },
  {
    slug: 'redesign-audit',
    title: 'Audit + redesign',
    tagline: 'When you have a site, but it stopped working.',
    body: 'We start with an audit — content, design, performance, conversion — then write a sharp redesign plan you can execute with us or on your own.',
    deliverables: [
      'Heuristic + analytics audit',
      'Conversion-funnel teardown',
      'Performance + a11y review',
      'Redesign blueprint',
      'Execution scope (optional)',
    ],
    starts: 'Week 1',
    duration: '1 week (audit) + scope',
    category: 'growth',
  },
];
