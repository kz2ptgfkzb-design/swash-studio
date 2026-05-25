'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';

const COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Studio',
    links: [
      { label: 'Work', href: '/work' },
      { label: 'Services', href: '/services' },
      { label: 'Process', href: '/process' },
      { label: 'Journal', href: '/journal' },
      { label: 'About', href: '/about' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Built for',
    links: [
      { label: 'Home services', href: '/brief?industry=home-services' },
      { label: 'Ecommerce', href: '/brief?industry=ecommerce' },
      { label: 'Dropshipping', href: '/brief?industry=dropshipping' },
      { label: 'Restaurants', href: '/brief?industry=restaurant' },
      { label: 'SaaS', href: '/brief?industry=saas' },
      { label: 'Anything else', href: '/brief' },
    ],
  },
  {
    title: 'Reach us',
    links: [
      { label: 'hello@swash.studio', href: 'mailto:hello@swash.studio' },
      { label: 'Schedule a call', href: '/brief' },
      { label: 'Press kit', href: '#' },
      { label: 'For agencies', href: '#' },
    ],
  },
];

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/preview/')) return null;

  return (
    <footer className="relative mt-16 border-t border-hairline bg-paper-200/40 sm:mt-24">
      <div className="container-wide pb-10 pt-12 sm:pb-12 sm:pt-20">
        <div className="grid gap-10 sm:gap-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="space-y-6">
            <Logo size="sm" />
            <p className="max-w-sm text-sm leading-relaxed text-ash-500">
              A boutique studio that builds websites, brands, and the
              motion that ties them together. From one-person shops to
              Series-A teams. We meet your budget. We sharpen the work.
            </p>
            <div className="flex gap-2">
              {['IG', 'X', 'IN', 'BE'].map((s) => (
                <a
                  key={s}
                  href="#"
                  data-cursor="link"
                  className="grid h-9 w-9 place-items-center rounded-pill border border-hairline text-[11px] tracking-wider text-ash-500 transition-colors hover:border-ink-700 hover:bg-ink-700 hover:text-paper-50"
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
                      data-cursor="link"
                      className="text-sm text-ink-400 transition-colors hover:text-ink-700"
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
          className="pointer-events-none relative mt-10 select-none overflow-hidden sm:mt-16"
        >
          <p className="font-display italic text-[22vw] font-light leading-[0.82] tracking-tighter text-ink-700/[0.05] sm:text-[24vw]">
            Swash.
          </p>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-3 border-t border-hairline pt-5 text-xs text-ash-500 sm:mt-8 sm:gap-4 sm:pt-6 md:flex-row md:items-center">
          <p>© 2026 Swash Studio. Add a swash to everything.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="#" className="hover:text-ink-700" data-cursor="link">Privacy</Link>
            <Link href="#" className="hover:text-ink-700" data-cursor="link">Terms</Link>
            <Link href="#" className="hover:text-ink-700" data-cursor="link">Cookies</Link>
            <Link href="#" className="hover:text-ink-700" data-cursor="link">Press</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
