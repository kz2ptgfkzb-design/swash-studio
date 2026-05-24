'use client';

const ITEMS = [
  'HVAC dispatchers',
  'Coastal apparel',
  'Neighborhood bakeries',
  'Boutique brokerages',
  'B2B SaaS launches',
  'Skincare drops',
  'Dental practices',
  'Dropshipping storefronts',
  'Restaurant reservations',
  'Plumbing & electrical',
  'Law firm refreshes',
  'Creator portfolios',
  'Membership platforms',
  'Yoga studios',
];

export function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="relative border-y border-hairline bg-paper-200/30 py-6 overflow-hidden mask-fade-edges">
      <div className="flex w-max gap-12 animate-marquee">
        {doubled.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="flex items-center gap-12 whitespace-nowrap"
          >
            <span className="font-display italic text-2xl tracking-tight text-ink-700/80 md:text-3xl">
              {item}
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="text-ink_red-400"
            >
              <circle cx="6" cy="6" r="5" fill="currentColor" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
