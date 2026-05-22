import Link from 'next/link';
import { Logo } from './Logo';

const COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Edition',
    links: [
      { label: 'Overview', href: '/' },
      { label: 'All features', href: '/features' },
      { label: 'Changelog', href: '/changelog' },
      { label: 'About', href: '/about' },
    ],
  },
  {
    title: 'Categories',
    links: [
      { label: 'Storefront', href: '/features?cat=storefront' },
      { label: 'Checkout', href: '/features?cat=checkout' },
      { label: 'Marketing', href: '/features?cat=marketing' },
      { label: 'Analytics', href: '/features?cat=analytics' },
      { label: 'Developer', href: '/features?cat=developer' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'Migration guide', href: '#' },
      { label: 'Press kit', href: '#' },
      { label: 'Status', href: '#' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-ink-700 bg-ink-900">
      <div className="container-wide pb-12 pt-20">
        <div className="grid gap-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="space-y-6">
            <Logo />
            <p className="max-w-sm text-sm leading-relaxed text-bone-400">
              A seasonal showcase template — bundled, branded, and ready to drop your own edition into.
            </p>
            <div className="flex gap-2">
              {['X', 'IG', 'YT', 'LI'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-pill border border-ink-700 text-[11px] tracking-wider text-bone-300 transition-colors hover:border-bone-50 hover:text-bone-50"
                  aria-label={s}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title} className="space-y-4">
              <p className="eyebrow">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-bone-200 transition-colors hover:text-glow-lime"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          aria-hidden
          className="pointer-events-none relative mt-16 select-none overflow-hidden"
        >
          <p className="font-display text-[18vw] font-semibold leading-[0.85] tracking-tighter text-ink-800">
            AURORA — WINTER 26
          </p>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-ink-700 pt-6 text-xs text-bone-400 md:flex-row md:items-center">
          <p>© 2026 Aurora Editions Template. Built for resale by independent designers.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="#" className="hover:text-bone-100">Privacy</Link>
            <Link href="#" className="hover:text-bone-100">Terms</Link>
            <Link href="#" className="hover:text-bone-100">License</Link>
            <Link href="#" className="hover:text-bone-100">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
