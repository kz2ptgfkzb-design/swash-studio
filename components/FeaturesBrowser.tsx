'use client';

import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { CATEGORIES, FEATURES } from '@/data/features';
import { FeatureCard } from './FeatureCard';
import { cn } from '@/lib/utils';

export function FeaturesBrowser() {
  const router = useRouter();
  const params = useSearchParams();
  const initialCat = params.get('cat');
  const [cat, setCat] = useState<string | null>(initialCat);
  const [q, setQ] = useState('');

  useEffect(() => {
    setCat(params.get('cat'));
  }, [params]);

  const filtered = useMemo(() => {
    let list = FEATURES;
    if (cat) list = list.filter((f) => f.category === cat);
    if (q.trim()) {
      const needle = q.toLowerCase();
      list = list.filter(
        (f) =>
          f.name.toLowerCase().includes(needle) ||
          f.tagline.toLowerCase().includes(needle) ||
          f.summary.toLowerCase().includes(needle),
      );
    }
    return list;
  }, [cat, q]);

  function setCategory(id: string | null) {
    setCat(id);
    const url = new URL(window.location.href);
    if (id) url.searchParams.set('cat', id);
    else url.searchParams.delete('cat');
    router.replace(url.pathname + url.search, { scroll: false });
  }

  return (
    <div className="container-wide pb-24">
      <div className="sticky top-16 z-20 -mx-6 mb-10 border-b border-ink-700 bg-ink-950/85 px-6 py-5 backdrop-blur-xl md:-mx-10 md:px-10 lg:-mx-14 lg:px-14">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategory(null)}
              className={cn('chip', !cat && 'chip-active')}
            >
              All
              <span className="text-bone-500">{FEATURES.length.toString().padStart(2, '0')}</span>
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={cn('chip', cat === c.id && 'chip-active')}
              >
                {c.label}
                <span className="text-bone-500">
                  {FEATURES.filter((f) => f.category === c.id).length.toString().padStart(2, '0')}
                </span>
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search the edition..."
              className="w-full rounded-pill border border-ink-700 bg-ink-900 px-4 py-2.5 pl-9 text-sm text-bone-100 placeholder:text-bone-500 focus:border-bone-300 focus:outline-none"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-bone-400"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" />
              <path d="M9.5 9.5l3 3" stroke="currentColor" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      <p className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-bone-400">
        {filtered.length.toString().padStart(2, '0')}{' '}
        {filtered.length === 1 ? 'release' : 'releases'} listed
      </p>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={`${cat}-${q}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((f, i) => (
            <motion.div
              key={f.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              <FeatureCard feature={f} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <div className="grid place-items-center rounded-card border border-dashed border-ink-700 py-24">
          <p className="text-bone-400">No releases match that query.</p>
        </div>
      )}
    </div>
  );
}
