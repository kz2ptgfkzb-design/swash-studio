import { Suspense } from 'react';
import { BriefIntakeForm } from '@/components/BriefIntakeForm';

export const metadata = {
  title: 'Start a brief',
  description:
    'Five minutes. Tell us about the business, the build, and the budget. Within 48 hours we send a video demo of your site - request changes from there.',
};

const PROMISES = [
  { title: 'Video demo in 48 hours', body: 'A real, working preview of your site. Recorded walkthrough, lands in your inbox.' },
  { title: 'Request changes, free', body: 'Watch the demo, send back notes. We revise - no extra cost, no call needed.' },
  { title: 'Walk away anytime', body: 'You owe nothing for the brief, the demo, or the revisions.' },
  { title: 'Skilled in-house team', body: 'Web developers and brand designers on staff. No subcontractors, no offshoring.' },
];

export default function BriefPage() {
  return (
    <>
      <section className="relative pt-24 pb-8 sm:pt-32 sm:pb-12 md:pt-40">
        <div className="container-page">
          <div className="grid items-end gap-6 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <p className="eyebrow">The brief</p>
              <h1 className="mt-4 font-display text-display-xl text-balance text-ink-700 sm:mt-6">
                Tell us what
                <br />
                <span className="italic text-ash-500">you&rsquo;re building.</span>
              </h1>
            </div>
            <div className="md:col-span-5">
              <p className="text-pretty text-sm leading-relaxed text-ash-500 sm:text-base">
                Five steps, about five minutes. Within forty-eight hours
                we send a <span className="text-ink-700">video demo of
                your site</span> - a real, working preview. Watch it,
                send back any changes you want. No call required.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-8">
        <div className="grid gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-8 lg:col-span-9">
            <Suspense fallback={<FormFallback />}>
              <BriefIntakeForm />
            </Suspense>
          </div>

          <aside className="md:col-span-4 lg:col-span-3">
            <div className="sticky top-28 space-y-6 rounded-card border border-hairline bg-paper-50/60 p-6">
              <p className="eyebrow">What you can count on</p>
              <ul className="space-y-5">
                {PROMISES.map((p, i) => (
                  <li key={p.title} className="flex gap-4">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink-700 font-mono text-[10px] text-paper-50">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-ink-700">{p.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-ash-500">
                        {p.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-t border-hairline pt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ash-400">
                  Or reach us directly
                </p>
                <a
                  href="mailto:hello@swash.studio"
                  className="mt-2 block text-sm text-ink-700 hover:text-ink_red-400"
                  data-cursor="link"
                >
                  hello@swash.studio
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function FormFallback() {
  return (
    <div className="h-[600px] animate-pulse rounded-card border border-hairline bg-paper-200/40" />
  );
}
