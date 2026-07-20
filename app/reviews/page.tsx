import Link from 'next/link';
import { REVIEWS, GOOGLE_REVIEW_URL, type Review } from '@/data/reviews';
import { ReviewForm } from '@/components/ReviewForm';
import { Reveal } from '@/components/Reveal';

export const metadata = {
  title: 'Reviews',
  description:
    'What clients say about working with Swash - verified reviews, plus a form to leave your own.',
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} width="16" height="16" viewBox="0 0 24 24" aria-hidden>
          <path
            d="M12 2l2.9 6.26 6.6.7-4.9 4.5 1.35 6.54L12 16.77 6.05 20l1.35-6.54-4.9-4.5 6.6-.7z"
            fill={rating >= n ? '#C8FE3D' : 'transparent'}
            stroke={rating >= n ? '#C8FE3D' : '#5A5045'}
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <li className="flex h-full flex-col gap-4 rounded-card border border-hairline bg-paper-200/60 p-6 sm:p-8">
      <Stars rating={review.rating} />
      <p className="flex-1 text-pretty font-display text-lg leading-snug tracking-tight text-ink-700 sm:text-xl">
        {review.text}
      </p>
      <div className="border-t border-hairline pt-4">
        <p className="font-display text-base text-ink-700">{review.name}</p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ash-400">
          {review.company ? `${review.company} · ` : ''}{review.date}
          {review.source === 'google' ? ' · via Google' : ''}
        </p>
      </div>
    </li>
  );
}

export default function ReviewsPage() {
  return (
    <>
      <section className="relative pt-24 pb-10 sm:pt-32 sm:pb-16 md:pt-40">
        <div className="container-page">
          <div className="grid items-end gap-6 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <p className="eyebrow">Reviews</p>
              <h1 className="mt-4 font-display text-display-xl text-balance text-ink-700 sm:mt-6">
                In their words.
                <br />
                <span className="italic text-ash-500">Verified, every one.</span>
              </h1>
            </div>
            <div className="md:col-span-5">
              <p className="text-pretty text-sm leading-relaxed text-ash-500 sm:text-base">
                Every review here is written by a real client and verified
                by us before it goes live. No purchased reviews, no
                invented names - if it&rsquo;s on this page, someone
                actually worked with us and said it.
              </p>
              {GOOGLE_REVIEW_URL && (
                <a
                  href={GOOGLE_REVIEW_URL}
                  target="_blank"
                  rel="noopener"
                  className="link-arrow mt-5 text-sm"
                  data-cursor="link"
                >
                  Or review us on Google
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page pb-12 sm:pb-16">
        {REVIEWS.length > 0 ? (
          <ul className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <Reveal key={`${r.name}-${i}`} delay={i % 3}>
                <ReviewCard review={r} />
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal>
            <div className="rounded-card border border-hairline bg-paper-200/40 p-8 text-center sm:p-12">
              <p className="font-display text-xl text-ink-700 sm:text-2xl">
                The studio is newly launched - reviews land here as
                clients ship.
              </p>
              <p className="mx-auto mt-3 max-w-md text-pretty text-sm leading-relaxed text-ash-500">
                Worked with us? Yours can be the first. Send it below and
                we&rsquo;ll verify and publish it.
              </p>
            </div>
          </Reveal>
        )}
      </section>

      <section className="container-page pb-20 sm:pb-32">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="rounded-card border border-hairline bg-paper-50/40 p-6 sm:p-10">
              <p className="eyebrow">Leave a review</p>
              <h2 className="mt-3 font-display text-display-md text-balance text-ink-700 sm:mt-4">
                Worked with us? Say it straight.
              </h2>
              <p className="mt-3 max-w-lg text-pretty text-sm leading-relaxed text-ash-500 sm:text-base">
                Good, bad, or mixed - we publish verified reviews as
                written. If something wasn&rsquo;t right, we&rsquo;d
                rather hear it here than nowhere.
              </p>
              <div className="mt-8">
                <ReviewForm />
              </div>
            </div>
          </Reveal>

          <p className="mt-8 text-center text-sm text-ash-500">
            Haven&rsquo;t worked with us yet?{' '}
            <Link href="/brief" className="text-ink-700 underline decoration-lime-300 underline-offset-4" data-cursor="link">
              Start a brief
            </Link>{' '}
            - video demo in 48 hours.
          </p>
        </div>
      </section>
    </>
  );
}
