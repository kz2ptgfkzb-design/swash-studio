'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { NowIndicator } from './NowIndicator';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Process', href: '/process' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
];

export function NavBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (pathname?.startsWith('/preview/')) return null;

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-silk',
          scrolled
            ? 'border-b border-hairline bg-paper-100/85 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="container-wide flex h-16 items-center justify-between">
          <Logo size="sm" />

          <div className="hidden items-center gap-6 lg:flex">
            <nav className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-pill px-3.5 py-2 text-sm text-ink-400 transition-colors hover:text-ink-700"
                  data-cursor="link"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <NowIndicator />
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/brief"
              className="btn-primary hidden md:inline-flex"
              data-cursor="link"
            >
              Start a brief
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              className="grid h-10 w-10 place-items-center rounded-pill border border-hairline text-ink-700 lg:hidden"
              data-cursor="link"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={cn(
                    'absolute left-0 top-0 h-[1.5px] w-full bg-current transition-transform duration-300',
                    open && 'translate-y-[5px] rotate-45',
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 top-[5px] h-[1.5px] w-full bg-current transition-opacity duration-300',
                    open && 'opacity-0',
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 bottom-0 h-[1.5px] w-full bg-current transition-transform duration-300',
                    open && '-translate-y-[5px] -rotate-45',
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-paper-100/97 backdrop-blur-md lg:hidden"
          >
            <div className="container-page flex flex-col gap-2 pt-24">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.04 * i, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-hairline py-5 font-display italic text-4xl text-ink-700"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/brief"
                onClick={() => setOpen(false)}
                className="btn-primary mt-6 w-full justify-center"
              >
                Start a brief
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
