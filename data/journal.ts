export type JournalBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'blockquote'; text: string; cite?: string }
  | { type: 'ul'; items: string[] }
  | { type: 'image'; src: string; caption?: string };

export type JournalPost = {
  slug: string;
  title: string;
  dek: string;
  cover: string;
  category: 'process' | 'craft' | 'studio';
  author: string;
  role: string;
  date: string;
  readingTime: string;
  body: JournalBlock[];
};

const photo = (id: string, w = 1600, h = 900) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=80&auto=format`;

export const POSTS: JournalPost[] = [
  {
    slug: 'how-we-scope-a-brief',
    title: 'How we scope a brief.',
    dek: 'A short field guide to reading the form on the other side of the inbox — and writing a proposal that earns the trust to start the work.',
    cover: photo('1499914485622-a88fac536970', 1600, 900),
    category: 'process',
    author: 'M. Stenseth',
    role: 'Creative direction',
    date: 'March 8, 2026',
    readingTime: '6 min',
    body: [
      { type: 'p', text: 'A brief is a small document that does a large amount of work. It announces a problem, hints at a budget, and frames the relationship you and a future client are going to have for the next eight weeks. We treat every one that comes in like a letter from a friend asking for honest advice — because that is what it is, even when the letter is filled out in a form on our website.' },
      { type: 'h2', text: 'First read: what they are actually saying.' },
      { type: 'p', text: 'Most briefs say two things. The first is in the chips and dropdowns. The second is in the notes field at the bottom. The chips tell us the shape — industry, goals, features, timeline. The notes tell us the why. We always read the notes first. The why is the part that almost never makes it into the dropdowns, and the why is where the work is.' },
      { type: 'p', text: 'When the notes are five words, we ask one follow-up question. When the notes are five hundred words, we read them twice before we open a doc.' },
      { type: 'h2', text: 'Second read: what the budget is telling us.' },
      { type: 'p', text: "Budget is the most honest thing on the form. It is also the most misread. People often pick a tier that is one below what they can actually afford, because they want a deal. People also pick a tier that is one above what they actually have, because they want to seem serious. We try to read past the choice and toward the truth." },
      { type: 'p', text: "We do this by reading the budget against the goals. If the goals require a full brand and a multi-page ecom site, and the budget says “Starter,” we know the brief is mis-scoped. We do not just push them up a tier. We write a proposal that does the most honest version of the smallest possible scope, and we explain in plain language what gets cut and why." },
      { type: 'blockquote', text: 'The proposal we want to write is the one we would want to receive if we were on the other side of the desk.', cite: 'House note, pinned in the doc since 2024' },
      { type: 'h2', text: 'Third read: what is missing.' },
      { type: 'p', text: 'Briefs are always missing two or three pieces. The most common: nobody mentions the existing site’s analytics. Nobody mentions who internally will own the project after we hand it off. Nobody mentions the dates around it — a board meeting, a press launch, a fundraising deadline.' },
      { type: 'p', text: 'We list everything missing in a short “Things we will ask about” section at the top of the proposal. The list is short on purpose. We never want our proposal to feel like a survey.' },
      { type: 'h2', text: 'Writing the proposal.' },
      { type: 'ul', items: [
        'Open with the brief, restated in our own words. If we got the brief wrong, the client knows in the first paragraph.',
        'List the deliverables with quantities (1 brand book, 1 site, 5 pages, etc.) so the scope is countable, not adjectival.',
        'Write the timeline in weeks, not days. Days create false precision.',
        'Quote the fee in one number. No “up to,” no ranges. A fee is a promise to deliver the listed scope at that number.',
        'End with a written list of what is NOT included. This is often the most useful page in the document.',
      ]},
      { type: 'h2', text: 'And then we wait.' },
      { type: 'p', text: 'A proposal lands in someone’s inbox at a moment we cannot see. They might read it standing in a kitchen. They might read it on their phone in a meeting. They might forward it to a partner and forget. Our job is to write the kind of document that survives all three. Quiet, considered, in plain English, with the numbers in writing. The brief is the start of a conversation; the proposal is the part where we earn the right to keep talking.' },
    ],
  },

  {
    slug: 'why-we-dont-publish-prices',
    title: "Why we don't publish prices.",
    dek: 'A short defense of the thing every web studio gets nagged about — and the only sentence we ever put on the pricing page that mattered.',
    cover: photo('1554224155-6726b3ff858f', 1600, 900),
    category: 'studio',
    author: 'L. Devaux',
    role: 'Writing',
    date: 'February 22, 2026',
    readingTime: '4 min',
    body: [
      { type: 'p', text: 'About once a quarter, somebody who has never sent us a brief sends us an email asking what we charge. It is the most reasonable question in the world. Our answer is always a version of the same paragraph: we do not publish prices because we have not yet read your brief. We can quote you in 48 hours after you send one. Here is why we built it that way.' },
      { type: 'h2', text: 'A price tag forces every brief into the same box.' },
      { type: 'p', text: 'If we put “a website starts at $9,800” on our pricing page, every conversation begins inside that number, even when the project does not belong there. The bakery rebuilding its menu and the B2B SaaS team launching a product line both have to argue against the same anchor. One of them feels priced out; the other feels under-served. We would rather start every conversation from zero and build up from the brief.' },
      { type: 'h2', text: 'A tier sheet always lies.' },
      { type: 'p', text: 'The studios that publish tiers know this. The tiers are marketing copy — three columns of similar features priced ascending. The actual proposals those studios send are nothing like the tiers. They are negotiated, custom-scoped, with line items that did not appear on the website. Publishing tiers is a lead magnet, not a price list. We just decided to skip the magnet.' },
      { type: 'blockquote', text: 'You cannot price work you have not yet looked at. You can only price work you have already pretended to scope.' },
      { type: 'h2', text: 'The five-tier "shape map" is the compromise.' },
      { type: 'p', text: 'We do publish five named shapes — Starter, Core, Studio, Flagship, and Not Sure Yet — without numbers. They are coarse enough to be honest. A Starter is a one-page launch. A Flagship is a multi-month rebuild with photography and motion. The shapes orient a stranger without anchoring them to a number we have not yet earned.' },
      { type: 'p', text: 'When a client picks a shape on the brief, we use it as a sanity check, not a quote. The proposal price is built from the deliverables in the scope, not from the tier label.' },
      { type: 'h2', text: 'The one sentence on the pricing page that mattered.' },
      { type: 'p', text: '"Tell us your budget. We’ll tell you what it builds." That sentence does more conversion work than any price list ever did. It tells the cautious client we will not waste their time with a number that does not fit, and it tells the ambitious one we are not going to talk them down. It puts the cost honesty on us, not on a comparison chart.' },
      { type: 'p', text: 'Pricing pages are not really about prices. They are about who we want to work with. Ours says: if you have a brief in your head and a budget you can write down, we can probably do something good with both. That is enough.' },
    ],
  },

  {
    slug: 'notes-from-launching-pipeline-and-co',
    title: 'Notes from launching Pipeline & Co.',
    dek: 'Four weeks, a wood-fired phone line, and a same-day-quote form that landed on the dispatcher’s SMS. A diary from the inside of a trade-brand build.',
    cover: photo('1581094288338-2314dddb7ece', 1600, 900),
    category: 'craft',
    author: 'P. Halloran',
    role: 'Engineering',
    date: 'February 14, 2026',
    readingTime: '8 min',
    body: [
      { type: 'p', text: 'Apex came to us because the phone had gone quiet. Two new commercial HVAC outfits had moved into the metro running heavy local SEO. The Apex site was a 2014 template the founder still vaguely understood, with a contact form that emailed an inbox no one had checked in three years. Their referral pipeline still worked, but it was thinning. They wanted a brand that could earn its own leads.' },
      { type: 'h2', text: 'Week one: not the brand. The funnel.' },
      { type: 'p', text: 'Most trade rebrands start with the logo. We started with a spreadsheet — every commercial-HVAC search term that mattered in the metro, ranked by volume, paired with a list of which competitor currently held the top three results for each. The pattern in the data was obvious: nobody owned the long tail. Nobody had a service page for “rooftop unit retrofit, downtown San Mateo.” Nobody had a quote form that did not route through a chatbot. The lane was wide open. We wrote a content map before we touched a single visual.' },
      { type: 'h2', text: 'Week two: “no-nonsense, on time” as a voice exercise.' },
      { type: 'p', text: 'Renée Ostrowski, the founder, is a plain-language person. We did one ninety-minute voice session with her: read three pieces of copy she liked, read three pieces of copy she hated, write down the rules that separated them. By the end, we had four. Sentences are short. Numbers are specific. Every promise has a receipt. Never sell what you cannot deliver Tuesday morning.' },
      { type: 'p', text: 'Those four rules became the brand brief. Everything else — palette, type, logo — followed from them.' },
      { type: 'blockquote', text: 'If we cannot deliver it Tuesday morning, do not promise it on the homepage.', cite: 'Renée Ostrowski, Apex Mechanical' },
      { type: 'h2', text: 'Week three: the quote form.' },
      { type: 'p', text: 'The single most important page on the site is the quote form. We wrote it in plain language — name, phone, address, what is going on, anything else we should know. We wired it to two destinations: the dispatcher’s inbox AND her cell-phone SMS. We added a confirmation SMS to the customer the second the form was submitted, with the dispatcher’s direct line. The average response time on a quote went from six hours to twenty-two minutes within the first month.' },
      { type: 'p', text: 'The form has six fields. It could have ten. It could have an upload widget for photos. We left those off on purpose. Every additional field is a customer we lost.' },
      { type: 'h2', text: 'Week four: launch.' },
      { type: 'ul', items: [
        'Soft launch Monday at 6 a.m. — the dispatcher’s busiest hour.',
        'Hard launch Wednesday with a paid Google ad on three commercial terms.',
        'Press kit shipped to one local trade publication. Got covered on Friday.',
        'Sixty-two quote requests in the first ninety days.',
        'Two new field techs hired by week eight.',
      ]},
      { type: 'h2', text: 'What we got wrong.' },
      { type: 'p', text: 'The first version of the site put the phone number in the top-right of the nav. We thought it would draw the eye. It did, but the bigger CTA — Get a quote — actually outperformed the phone CTA by a factor of three. Plumbing customers, it turns out, want to write to you first. They want to send a photo of the leak. They want to read your reply before they pick up the phone. We moved the phone CTA to a smaller secondary slot and watched the form conversion rate climb another twelve percent.' },
      { type: 'h2', text: 'What we learned about trade brands.' },
      { type: 'p', text: 'Trade businesses get treated like they need utilitarian websites. They do not. They need warm websites — sites that read like a person picking up the phone, not a portal you have to fill out. Apex is a serious company, but the serious tone we leaned into in the first sprint was almost too cold. The version we shipped is plain-spoken and warm. That voice converts.' },
      { type: 'p', text: 'A trade site is also, weirdly, an emotional purchase. By the time someone has gone to the trouble of finding you, they are stressed. The site’s job is to lower their blood pressure. Pick up the phone. Send a photo. We will be there in 22 minutes. The brand is the answer to the worst part of the customer’s day.' },
    ],
  },
];

export function getPostBySlug(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}

export function getOtherPosts(slug: string, count = 2) {
  return POSTS.filter((p) => p.slug !== slug).slice(0, count);
}
