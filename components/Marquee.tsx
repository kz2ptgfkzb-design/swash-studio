'use client';

const ITEMS = [
  'Composable storefronts',
  'Sub-second analytics',
  'One-tap checkout',
  'Network-recognized shoppers',
  'Performance budgets',
  'Native A/B tests',
  'Live inventory sync',
  'Multi-market catalogs',
  'In-place AI editing',
  'On-brand broadcast sends',
  'Semantic search',
  'Typed storefront API',
];

export function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="relative border-y border-ink-700 bg-ink-900 py-6 overflow-hidden mask-fade-edges">
      <div className="flex w-max gap-12 animate-marquee">
        {doubled.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="flex items-center gap-12 whitespace-nowrap"
          >
            <span className="font-display text-xl tracking-tight text-bone-200 md:text-2xl">
              {item}
            </span>
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              className="text-glow-lime"
            >
              <path
                d="M11 1c0 5 5 10 10 10-5 0-10 5-10 10 0-5-5-10-10-10 5 0 10-5 10-10Z"
                fill="currentColor"
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
