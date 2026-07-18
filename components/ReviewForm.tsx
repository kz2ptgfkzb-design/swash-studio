'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Public review submission form. Posts to /api/review, which emails the
 * studio for moderation - nothing appears on the site until approved.
 */
export function ReviewForm() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [text, setText] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle');
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setError(null);
    if (!name.trim()) return setError("What's your name?");
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return setError('We need a valid email so we can verify the review.');
    }
    if (rating < 1) return setError('Pick a star rating.');
    if (!text.trim()) return setError('Write a line or two.');

    setState('sending');
    try {
      const res = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company, email, rating, text, website }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? 'Submission failed');
      }
      setState('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed - try again.');
      setState('idle');
    }
  };

  if (state === 'done') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-card border border-lime-300/40 bg-lime-300/10 p-6 sm:p-8"
      >
        <p className="font-display text-xl text-ink-700 sm:text-2xl">
          Thank you - review received.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ash-500">
          We read and verify every review before it goes live, so it may
          take a day or two to appear. We may reply to your email to
          confirm it&rsquo;s really you.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label-field" htmlFor="rev-name">Your name</label>
          <input
            id="rev-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="First and last"
            maxLength={120}
            className="input-field"
          />
        </div>
        <div>
          <label className="label-field" htmlFor="rev-company">
            Company or project <span className="normal-case text-ash-400">(optional)</span>
          </label>
          <input
            id="rev-company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Shown with your review"
            maxLength={120}
            className="input-field"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label-field" htmlFor="rev-email">Email</label>
          <input
            id="rev-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Never published - just for verification"
            maxLength={200}
            className="input-field"
          />
        </div>
        <div>
          <label className="label-field">Rating</label>
          <div
            className="flex items-center gap-1.5 pt-1.5"
            onMouseLeave={() => setHovered(0)}
            role="radiogroup"
            aria-label="Star rating"
          >
            {[1, 2, 3, 4, 5].map((n) => {
              const filled = (hovered || rating) >= n;
              return (
                <button
                  key={n}
                  type="button"
                  role="radio"
                  aria-checked={rating === n}
                  aria-label={`${n} star${n > 1 ? 's' : ''}`}
                  onMouseEnter={() => setHovered(n)}
                  onClick={() => setRating(n)}
                  className="p-1 transition-transform duration-200 ease-silk hover:scale-110"
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
                    <path
                      d="M12 2l2.9 6.26 6.6.7-4.9 4.5 1.35 6.54L12 16.77 6.05 20l1.35-6.54-4.9-4.5 6.6-.7z"
                      fill={filled ? '#C8FE3D' : 'transparent'}
                      stroke={filled ? '#C8FE3D' : '#5A5045'}
                      strokeWidth="1.4"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <label className="label-field" htmlFor="rev-text">Your review</label>
        <textarea
          id="rev-text"
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={2000}
          placeholder="What did we build, and how did it go? Plain words beat polish."
          className="input-field resize-none"
        />
      </div>

      {/* Honeypot - hidden from real users, bots fill it */}
      <input
        type="text"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-sm text-xs leading-relaxed text-ash-400">
          Every review is verified before it goes live. Your email is
          never published.
        </p>
        <div className="flex flex-col items-end gap-2">
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink_red-300"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
          <button
            type="button"
            onClick={submit}
            disabled={state === 'sending'}
            className={cn('btn-primary', state === 'sending' && 'cursor-wait opacity-60')}
          >
            {state === 'sending' ? 'Sending...' : 'Submit review'}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
