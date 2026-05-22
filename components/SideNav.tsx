'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export type SideNavSection = { id: string; label: string };

export function SideNav({ sections }: { sections: SideNavSection[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, [sections]);

  return (
    <aside className="pointer-events-none fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 lg:block">
      <ul className="pointer-events-auto flex flex-col gap-1.5">
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="group flex items-center gap-3"
              >
                <span
                  className={cn(
                    'block h-px transition-all duration-500 ease-silk',
                    isActive ? 'w-10 bg-glow-lime' : 'w-5 bg-ink-500 group-hover:w-8 group-hover:bg-bone-400',
                  )}
                />
                <span
                  className={cn(
                    'font-mono text-[10px] uppercase tracking-[0.18em] transition-all duration-500',
                    isActive ? 'text-bone-50 opacity-100' : 'text-bone-400 opacity-0 group-hover:opacity-100',
                  )}
                >
                  {s.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
