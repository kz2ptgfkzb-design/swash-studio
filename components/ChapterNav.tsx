'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type Chapter = { id: string; label: string };

const CHAPTERS: Chapter[] = [
  { id: 'why',      label: 'Why Swash' },
  { id: 'lab',      label: 'Studio Lab' },
  { id: 'services', label: 'Services' },
  { id: 'editions', label: 'Editions' },
  { id: 'work',     label: 'Work' },
  { id: 'process',  label: 'Process' },
  { id: 'pricing',  label: 'Pricing' },
  { id: 'faq',      label: 'Questions' },
];

/**
 * Shopify-Editions-style chapter rail. Appears once you've scrolled past the
 * hero. Each link smooth-scrolls to its section; the active section
 * highlights via IntersectionObserver.
 */
export function ChapterNav() {
  const [active, setActive] = useState<string>('');
  const [visible, setVisible] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);

  // Show the rail once the user is past 60% of the first viewport
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // IntersectionObserver - set the active chapter as sections cross center
  useEffect(() => {
    const sections = CHAPTERS
      .map(c => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport that's actually intersecting
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: 0,
      },
    );

    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Keep the active chip horizontally in view inside the rail
  useEffect(() => {
    if (!active || !railRef.current) return;
    const chip = railRef.current.querySelector<HTMLElement>(`[data-chapter="${active}"]`);
    if (!chip) return;
    const rail = railRef.current;
    const r = chip.getBoundingClientRect();
    const railRect = rail.getBoundingClientRect();
    const center = railRect.left + railRect.width / 2;
    const chipCenter = r.left + r.width / 2;
    const delta = chipCenter - center;
    rail.scrollBy({ left: delta, behavior: 'smooth' });
  }, [active]);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  return (
    <motion.div
      initial={false}
      animate={{
        y: visible ? 0 : -64,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed inset-x-0 top-16 z-40 flex justify-center"
      aria-hidden={!visible}
    >
      <div
        className="pointer-events-auto mx-2 sm:mx-4 inline-flex max-w-[calc(100vw-1rem)] sm:max-w-[calc(100vw-2rem)] items-center overflow-hidden rounded-pill border border-hairline bg-paper-100/85 backdrop-blur-xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.7)]"
      >
        <div
          ref={railRef}
          className="flex items-center gap-0.5 overflow-x-auto scroll-smooth p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {CHAPTERS.map(c => {
            const isActive = active === c.id;
            return (
              <button
                key={c.id}
                type="button"
                data-chapter={c.id}
                onClick={() => scrollTo(c.id)}
                data-cursor="link"
                className={`relative shrink-0 rounded-pill px-3 py-1.5 text-[11px] sm:px-4 sm:py-2 sm:text-[13px] font-semibold tracking-tight transition-colors duration-300 ${
                  isActive
                    ? 'text-paper-100'
                    : 'text-ink-400 hover:text-ink-700'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="chapter-pill"
                    className="absolute inset-0 -z-0 rounded-pill bg-lime-300"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
