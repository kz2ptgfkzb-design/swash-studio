'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SwashMark } from '@/components/SwashMark';

export default function ThanksPage() {
  return (
    <section className="relative min-h-[88vh] pt-40 pb-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            className="mx-auto mb-10 w-fit"
          >
            <SwashMark size={180} variant="red" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="eyebrow"
          >
            Brief received
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 font-display text-display-xl text-balance text-ink-700"
          >
            That&rsquo;s a wrap.
            <br />
            <span className="italic text-ash-500">
              We&rsquo;ll be in touch.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mx-auto mt-6 max-w-md text-pretty text-base leading-relaxed text-ash-500"
          >
            We read every brief that comes in. Within forty-eight hours
            we&rsquo;ll send a <span className="text-ink-700">video demo
            of your site</span> — a working preview, not a pitch deck.
            Watch it, send back any changes you want.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            <Link href="/work" className="btn-primary" data-cursor="link">
              See past work
            </Link>
            <Link href="/" className="btn-ghost" data-cursor="link">
              Back to home
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-16 font-mono text-[11px] uppercase tracking-[0.18em] text-ash-400"
          >
            Need to reach us sooner? hello@swash.studio
          </motion.p>
        </div>
      </div>
    </section>
  );
}
