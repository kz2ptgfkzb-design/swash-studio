export type CaseStudy = {
  challenge: string;
  approach: string[];
  outcome: string;
  testimonial?: { quote: string; name: string; role: string };
  timeline: string;
  team: string[];
  outcomes: { value: string; label: string }[];
};

export type WorkItem = {
  slug: string;
  client: string;
  industry: string;
  summary: string;
  scope: string[];
  year: string;
  accent: 'ink' | 'saffron' | 'olive' | 'rust' | 'sage';
  metric?: { value: string; label: string };
  caseStudy: CaseStudy;
};

export const WORK: WorkItem[] = [
  {
    slug: 'apex-mechanical',
    client: 'Apex Mechanical',
    industry: 'HVAC · Commercial',
    summary:
      'A trade brand that reads as serious without losing the warmth. Local-SEO-first build, with a same-day-quote form wired to a real dispatcher.',
    scope: ['Brand', 'Site', 'Forms', 'Local SEO'],
    year: '2026',
    accent: 'rust',
    metric: { value: '3.2×', label: 'lead volume v. prior site' },
    caseStudy: {
      challenge:
        'Apex had been a referral-only commercial HVAC shop for fifteen years. Two new competitors moved into the metro running heavy local SEO, and the phone slowed. The old site was a 2014 template with no clear service hierarchy and a contact form that emailed an inbox no one read.',
      approach: [
        'Audited the local SEO landscape — every competitor, every search term, every gap.',
        'Rebuilt the brand voice around "no nonsense, on time" — leaving the warmth in the wordmark and the proof in the copy.',
        'Wrote service pages that target the exact terms commercial property managers search.',
        'Wired the quote form to the dispatcher\'s phone, with SMS confirmations either way.',
      ],
      outcome:
        'Within 90 days, monthly quote requests went from 38 to 122. Average response time on a quote dropped from 6 hours to 22 minutes. Apex hired two new techs in the next quarter.',
      testimonial: {
        quote:
          'Renée Ostrowski said: "The brief took ten minutes. The proposal landed the next morning. We launched three weeks later, and the booking rate doubled in the first month."',
        name: 'Renée Ostrowski',
        role: 'Founder, Apex Mechanical',
      },
      timeline: '4 weeks',
      team: ['Stenseth (lead)', 'Yarrow (brand)', 'Halloran (build)', 'Devaux (copy)'],
      outcomes: [
        { value: '3.2×', label: 'monthly leads' },
        { value: '22 min', label: 'avg quote response (from 6h)' },
        { value: '+2', label: 'new field techs hired' },
      ],
    },
  },
  {
    slug: 'saltwater-co',
    client: 'Saltwater Co.',
    industry: 'DTC · Apparel',
    summary:
      'A coastal apparel brand rebuilt around a quieter palette and a single-product-page-as-a-story format. Shopify, headless front end.',
    scope: ['Brand', 'Storefront', 'PDP', 'Email'],
    year: '2026',
    accent: 'sage',
    metric: { value: '42%', label: 'AOV lift, 90 days' },
    caseStudy: {
      challenge:
        'Saltwater had a loud, surf-shop aesthetic that no longer matched the way their customers shopped. Conversion was healthy but AOV was stuck — shoppers bought a single shirt and bounced. They wanted to feel less like a tee brand and more like a coastal house brand.',
      approach: [
        'Toned the palette down to driftwood, salt, and a single deep ink-red.',
        'Replaced the grid PDP with a long-scroll story format — fabric, fit, where it was photographed.',
        'Built cross-sell into the PDP narrative — pair this shirt with the trunks photographed beside it.',
        'Rewrote the welcome and abandoned-cart sequences in a quieter, more confident voice.',
      ],
      outcome:
        'AOV up 42% within 90 days. Time-on-PDP up 2.6×. Email-driven revenue up 31%. Returns held flat.',
      testimonial: {
        quote:
          '"We sold tees for six years. After this, we sell a way of dressing. The PDP changes alone paid for the project in the first month."',
        name: 'Jonas Hellberg',
        role: 'CEO, Saltwater Co.',
      },
      timeline: '8 weeks',
      team: ['Yarrow (brand)', 'Halloran (build)', 'Oh (motion)', 'Devaux (copy)'],
      outcomes: [
        { value: '+42%', label: 'AOV, 90-day rolling' },
        { value: '2.6×', label: 'time on PDP' },
        { value: '+31%', label: 'email-driven revenue' },
      ],
    },
  },
  {
    slug: 'kilncraft',
    client: 'Kilncraft Bakehouse',
    industry: 'Restaurant · Hospitality',
    summary:
      'A neighborhood bakery with a press kit, a slow-loading hero on launch day, and a reservations flow that hands off cleanly to the host stand.',
    scope: ['Brand', 'Site', 'Booking', 'Print'],
    year: '2025',
    accent: 'saffron',
    metric: { value: '4×', label: 'press mentions (90d)' },
    caseStudy: {
      challenge:
        'Kilncraft was opening their second location and rebranding from a casual cafe into a destination bakehouse. The old brand felt indistinguishable from twelve other neighborhood spots. The new brand needed to land with food press AND walk-in customers in the same week.',
      approach: [
        'Brand built around the rhythm of a wood-fired kiln — slow heat, deliberate cooling, repeat.',
        'Site designed as a quiet flagship — one signature loaf featured per week, photographed by the team.',
        'Press kit built into the site with one-click downloads for editors.',
        'Reservation flow that respects the host-stand workflow, not a generic OpenTable embed.',
      ],
      outcome:
        'Featured in four food publications in the first 90 days. Reservations at the new location ran at 94% capacity through opening month.',
      testimonial: {
        quote:
          '"The food editors found us through the press kit page. That alone has changed how we open future locations."',
        name: 'Inés Marchetti',
        role: 'Founder, Kilncraft',
      },
      timeline: '6 weeks',
      team: ['Stenseth (lead)', 'Yarrow (brand)', 'Devaux (copy)', 'Imani (production)'],
      outcomes: [
        { value: '4', label: 'food-press features, 90d' },
        { value: '94%', label: 'reservation fill, opening month' },
        { value: '2', label: 'locations operating in brand' },
      ],
    },
  },
  {
    slug: 'tidemark-realty',
    client: 'Tidemark Realty',
    industry: 'Real Estate · Boutique',
    summary:
      'A four-agent boutique brokerage. Property pages built around real photography, paired with a quiet, agent-led intake.',
    scope: ['Brand', 'Site', 'CMS', 'Photo direction'],
    year: '2025',
    accent: 'ink',
    metric: { value: '+58%', label: 'qualified inquiries' },
    caseStudy: {
      challenge:
        'Tidemark wanted the brand of a national luxury brokerage on the budget of a four-agent boutique. The competition was either too corporate or too vintage; nothing felt current AND credible at the price point Tidemark sat at.',
      approach: [
        'Brand built around the typography of a great hotel — quiet, considered, slightly editorial.',
        'Custom property page layout with photographer credits and neighborhood notes.',
        'Agent profiles that feel like staff pages at a magazine, not Realtor.com.',
        'CMS designed so the agents can publish a new listing in under three minutes.',
      ],
      outcome:
        'Qualified inquiries up 58%. Time-on-listing-page up 3.1×. Brokerage signed two new agents who specifically cited the brand as why they joined.',
      testimonial: {
        quote:
          '"Buyers email us comparing us to firms with twenty agents. Two senior agents joined the firm citing the brand. The site is doing recruiting we do not pay for."',
        name: 'David Tideway',
        role: 'Founder, Tidemark Realty',
      },
      timeline: '5 weeks',
      team: ['Stenseth (lead)', 'Yarrow (brand)', 'Halloran (build)', 'Imani (CMS)'],
      outcomes: [
        { value: '+58%', label: 'qualified inquiries' },
        { value: '3.1×', label: 'time on listing pages' },
        { value: '+2', label: 'senior agents joined' },
      ],
    },
  },
  {
    slug: 'overlay-labs',
    client: 'Overlay Labs',
    industry: 'SaaS · B2B',
    summary:
      'A growth-stage analytics tool. Refreshed marketing site, docs surface, and an in-product onboarding tour that reads like the marketing.',
    scope: ['Site', 'Docs', 'In-product UI'],
    year: '2025',
    accent: 'olive',
    metric: { value: '+18%', label: 'free-trial conversion' },
    caseStudy: {
      challenge:
        'Overlay\'s marketing site, docs, and in-product UI all looked like different products. New users would convert on the marketing site, hit the in-product tour, and feel like they\'d been handed off to a different company. Activation dragged.',
      approach: [
        'Single design language across marketing → docs → in-product onboarding.',
        'Marketing site rewritten around three customer outcomes, not four product features.',
        'Docs reorganized by user goal, not API surface.',
        'In-product first-run tour designed to teach the one thing that drives activation.',
      ],
      outcome:
        'Free-trial → paid conversion up 18%. Median time-to-first-action dropped from 14 minutes to 4. Support tickets in the first 30 days down 27%.',
      testimonial: {
        quote:
          '"Most studios sell you a look. Swash sold us a brand we still recognize three years in. The motion system alone has been worth its weight."',
        name: 'David Anand',
        role: 'CEO, Overlay Labs',
      },
      timeline: '10 weeks',
      team: ['Stenseth (lead)', 'Halloran (build)', 'Oh (motion)', 'Devaux (copy)'],
      outcomes: [
        { value: '+18%', label: 'free-trial conversion' },
        { value: '4 min', label: 'median time-to-first-action (from 14)' },
        { value: '-27%', label: 'first-30-day support tickets' },
      ],
    },
  },
  {
    slug: 'mira-skin',
    client: 'Mira',
    industry: 'DTC · Skincare',
    summary:
      'A founder-led skincare line preparing for a Sephora launch. Quietly opulent. Ingredient-led PDPs. A first-purchase flow we kept honest.',
    scope: ['Brand', 'Storefront', 'Packaging tie-in'],
    year: '2024',
    accent: 'saffron',
    metric: { value: '11k', label: 'pre-launch waitlist' },
    caseStudy: {
      challenge:
        'Mira was a one-product founder-led skincare brand going from Instagram to a Sephora endcap in six months. The brand had to read as credible to a beauty buyer AND personal to a founder-loyal customer. Two audiences, one site, no compromises.',
      approach: [
        'Brand foundation built around the founder\'s point of view — ingredient-led, slowly built.',
        'PDP designed around what a chemist would want to see — full ingredient breakdown, sourcing, why each one.',
        'Founder narrative woven through the site without it becoming a memoir.',
        'A waitlist flow honest about timing — no fake urgency, no countdown timer theater.',
      ],
      outcome:
        '11k pre-launch waitlist. Sephora buyer cited the brand as a key factor in shelf placement. Launch sold through first allocation in 11 days.',
      testimonial: {
        quote:
          '"They priced the work to fit what we had, and the site shipped at the level of brands ten times our size. That is the trick, I think."',
        name: 'Mira Holloway',
        role: 'Founder, Mira',
      },
      timeline: '7 weeks',
      team: ['Yarrow (brand)', 'Halloran (build)', 'Devaux (copy)', 'Imani (production)'],
      outcomes: [
        { value: '11k', label: 'pre-launch waitlist' },
        { value: '11 days', label: 'time to sell-through, first allocation' },
        { value: '4.9★', label: 'avg Sephora review (first 90 days)' },
      ],
    },
  },
];

export const INDUSTRIES = [
  { id: 'home-services', label: 'Home services', hint: 'HVAC, plumbing, electrical, roofing, landscaping' },
  { id: 'ecommerce', label: 'Ecommerce', hint: 'DTC, retail, marketplace' },
  { id: 'dropshipping', label: 'Dropshipping', hint: 'Single-product or multi-product stores' },
  { id: 'restaurant', label: 'Restaurant & hospitality', hint: 'Cafés, bars, hotels, catering' },
  { id: 'professional', label: 'Professional services', hint: 'Law, accounting, consulting, agencies' },
  { id: 'healthcare', label: 'Healthcare', hint: 'Practices, clinics, dental, wellness' },
  { id: 'real-estate', label: 'Real estate', hint: 'Brokerages, agents, listings' },
  { id: 'saas', label: 'SaaS or product', hint: 'Software, apps, tech products' },
  { id: 'creator', label: 'Creator or personal', hint: 'Portfolio, personal brand, newsletter' },
  { id: 'nonprofit', label: 'Nonprofit', hint: 'Mission-driven, donation flows' },
  { id: 'other', label: 'Something else', hint: 'Tell us what we missed' },
];

export const GOALS = [
  { id: 'new-brand', label: 'Build a new brand site' },
  { id: 'replace', label: 'Replace an existing site' },
  { id: 'campaign', label: 'A campaign or product launch' },
  { id: 'audit', label: 'Audit + redesign what we have' },
];

export const FEATURES_NEEDED = [
  { id: 'ecom', label: 'Ecommerce / checkout' },
  { id: 'booking', label: 'Booking or reservations' },
  { id: 'cms', label: 'CMS for content updates' },
  { id: 'lead-capture', label: 'Lead capture forms' },
  { id: 'blog', label: 'Blog or editorial' },
  { id: 'members', label: 'Member or login area' },
  { id: 'integrations', label: 'CRM / tool integrations' },
  { id: 'localization', label: 'Multi-language' },
  { id: 'seo', label: 'SEO from the ground up' },
  { id: 'animation', label: 'Heavy motion / animation' },
  { id: 'brand', label: 'Brand identity & logo' },
  { id: 'print', label: 'Print collateral too' },
];

export const TIMELINES = [
  { id: 'asap', label: 'ASAP', hint: 'Under 2 weeks' },
  { id: '2-4', label: '2 – 4 weeks', hint: 'Quick turn' },
  { id: '1-2m', label: '1 – 2 months', hint: 'Standard pace' },
  { id: 'flex', label: 'Flexible', hint: "We'll move when it's right" },
];

export const BUDGETS = [
  { id: 'starter', label: 'Starter', hint: 'A clean, single-page site to get going' },
  { id: 'core', label: 'Core', hint: 'Multi-page, branded, set up for growth' },
  { id: 'studio', label: 'Studio', hint: 'A full brand + site + motion system' },
  { id: 'flagship', label: 'Flagship', hint: 'A flagship build — no ceiling' },
  { id: 'unsure', label: 'Not sure yet', hint: "Help us figure it out" },
];

export const BRAND_STATUS = [
  { id: 'full', label: 'Full brand', hint: 'Logo, palette, type — locked' },
  { id: 'logo', label: 'Logo only', hint: 'A mark, no system yet' },
  { id: 'wip', label: 'Work in progress', hint: 'Halfway there' },
  { id: 'scratch', label: 'From scratch', hint: 'You decide everything' },
];

export function getWorkBySlug(slug: string) {
  return WORK.find((w) => w.slug === slug);
}

export function getRelatedWork(slug: string, count = 2) {
  const idx = WORK.findIndex((w) => w.slug === slug);
  if (idx === -1) return [];
  const after = WORK.slice(idx + 1);
  const before = WORK.slice(0, idx);
  return [...after, ...before].slice(0, count);
}
