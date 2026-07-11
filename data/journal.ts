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
    dek: 'A short field guide to reading the form on the other side of the inbox - and writing a proposal that earns the trust to start the work.',
    cover: photo('1499914485622-a88fac536970', 1600, 900),
    category: 'process',
    author: 'Swash Studio',
    role: 'Studio notes',
    date: 'March 8, 2026',
    readingTime: '6 min',
    body: [
      { type: 'p', text: 'A brief is a small document that does a large amount of work. It announces a problem, hints at a budget, and frames the relationship you and a future client are going to have for the next eight weeks. We treat every one that comes in like a letter from a friend asking for honest advice - because that is what it is, even when the letter is filled out in a form on our website.' },
      { type: 'h2', text: 'First read: what they are actually saying.' },
      { type: 'p', text: 'Most briefs say two things. The first is in the chips and dropdowns. The second is in the notes field at the bottom. The chips tell us the shape - industry, goals, features, timeline. The notes tell us the why. We always read the notes first. The why is the part that almost never makes it into the dropdowns, and the why is where the work is.' },
      { type: 'p', text: 'When the notes are five words, we ask one follow-up question. When the notes are five hundred words, we read them twice before we open a doc.' },
      { type: 'h2', text: 'Second read: what the budget is telling us.' },
      { type: 'p', text: "Budget is the most honest thing on the form. It is also the most misread. People often pick a tier that is one below what they can actually afford, because they want a deal. People also pick a tier that is one above what they actually have, because they want to seem serious. We try to read past the choice and toward the truth." },
      { type: 'p', text: "We do this by reading the budget against the goals. If the goals require a full brand and a multi-page ecom site, and the budget says “Starter,” we know the brief is mis-scoped. We do not just push them up a tier. We write a proposal that does the most honest version of the smallest possible scope, and we explain in plain language what gets cut and why." },
      { type: 'blockquote', text: 'The proposal we want to write is the one we would want to receive if we were on the other side of the desk.', cite: 'House note' },
      { type: 'h2', text: 'Third read: what is missing.' },
      { type: 'p', text: 'Briefs are always missing two or three pieces. The most common: nobody mentions the existing site’s analytics. Nobody mentions who internally will own the project after we hand it off. Nobody mentions the dates around it - a board meeting, a press launch, a fundraising deadline.' },
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
    dek: 'A short defense of the thing every web studio gets nagged about - and the only sentence we ever put on the pricing page that mattered.',
    cover: photo('1554224155-6726b3ff858f', 1600, 900),
    category: 'studio',
    author: 'Swash Studio',
    role: 'Studio notes',
    date: 'February 22, 2026',
    readingTime: '4 min',
    body: [
      { type: 'p', text: 'About once a quarter, somebody who has never sent us a brief sends us an email asking what we charge. It is the most reasonable question in the world. Our answer is always a version of the same paragraph: we do not publish prices because we have not yet read your brief. We can quote you in 48 hours after you send one. Here is why we built it that way.' },
      { type: 'h2', text: 'A price tag forces every brief into the same box.' },
      { type: 'p', text: 'If we put “a website starts at $9,800” on our pricing page, every conversation begins inside that number, even when the project does not belong there. The bakery rebuilding its menu and the B2B SaaS team launching a product line both have to argue against the same anchor. One of them feels priced out; the other feels under-served. We would rather start every conversation from zero and build up from the brief.' },
      { type: 'h2', text: 'A tier sheet always lies.' },
      { type: 'p', text: 'The studios that publish tiers know this. The tiers are marketing copy - three columns of similar features priced ascending. The actual proposals those studios send are nothing like the tiers. They are negotiated, custom-scoped, with line items that did not appear on the website. Publishing tiers is a lead magnet, not a price list. We just decided to skip the magnet.' },
      { type: 'blockquote', text: 'You cannot price work you have not yet looked at. You can only price work you have already pretended to scope.' },
      { type: 'h2', text: 'The five-tier "shape map" is the compromise.' },
      { type: 'p', text: 'We do publish five named shapes - Starter, Core, Studio, Flagship, and Not Sure Yet - without numbers. They are coarse enough to be honest. A Starter is a one-page launch. A Flagship is a multi-month rebuild with photography and motion. The shapes orient a stranger without anchoring them to a number we have not yet earned.' },
      { type: 'p', text: 'When a client picks a shape on the brief, we use it as a sanity check, not a quote. The proposal price is built from the deliverables in the scope, not from the tier label.' },
      { type: 'h2', text: 'The one sentence on the pricing page that mattered.' },
      { type: 'p', text: '"Tell us your budget. We’ll tell you what it builds." That sentence does more conversion work than any price list ever did. It tells the cautious client we will not waste their time with a number that does not fit, and it tells the ambitious one we are not going to talk them down. It puts the cost honesty on us, not on a comparison chart.' },
      { type: 'p', text: 'Pricing pages are not really about prices. They are about who we want to work with. Ours says: if you have a brief in your head and a budget you can write down, we can probably do something good with both. That is enough.' },
    ],
  },

];

export function getPostBySlug(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}

export function getOtherPosts(slug: string, count = 2) {
  return POSTS.filter((p) => p.slug !== slug).slice(0, count);
}
