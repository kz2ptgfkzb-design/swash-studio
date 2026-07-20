import Link from 'next/link';
import type { ReactNode } from 'react';

/**
 * Shared shell for /privacy and /terms. Keeps the two legal pages visually
 * consistent with the rest of the site (dark theme, cream text, container).
 */
export function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <section className="relative pt-24 pb-20 sm:pt-32 sm:pb-28 md:pt-40">
      <div className="container-page">
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 font-display text-display-lg text-balance text-ink-700 sm:mt-6">
            {title}
          </h1>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ash-400">
            {updated}
          </p>
          <p className="mt-6 text-pretty text-sm leading-relaxed text-ash-500 sm:text-base">
            {intro}
          </p>

          <div className="legal-body mt-10 space-y-8">{children}</div>

          <div className="mt-14 border-t border-hairline pt-6">
            <Link href="/" className="link-arrow text-sm" data-cursor="link">
              Back home
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-xl text-ink-700 sm:text-2xl">{heading}</h2>
      <div className="mt-3 space-y-3 text-pretty text-sm leading-relaxed text-ash-500 sm:text-[15px]">
        {children}
      </div>
    </div>
  );
}
