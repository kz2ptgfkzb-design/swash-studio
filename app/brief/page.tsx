import { Suspense } from 'react';
import { BriefIntakeForm } from '@/components/BriefIntakeForm';

export const metadata = {
  title: 'Start a brief · Swash',
  description:
    'Five minutes. Tell us about the business, the build, and the budget. We come back with a written, fixed-fee proposal within 48 hours.',
};

const PROMISES = [
  { title: 'Fixed-fee in 48 hours', body: 'Written scope, deliverables, milestones, fixed price.' },
  { title: 'No call required', body: 'The brief is enough to get a real proposal back.' },
  { title: 'Walk away anytime', body: 'You owe nothing for the brief or the proposal.' },
  { title: 'Same six people', body: 'In-house team only. Names match through launch day.' },
];

export default function BriefPage() {
  return (
    <>
      <section className="relative pt-40 pb-12">
        <div className="container-page">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="eyebrow">The brief</p>
              <h1 className="mt-6 font-display text-display-xl text-balance text-ink-700">
                Tell us what
                <br />
                <span className="italic text-ash-500">you&rsquo;re building.</span>
              </h1>
            </div>
            <div className="md:col-span-5">
              <p className="text-pretty text-base leading-relaxed text-ash-500">
                Five steps, about five minutes. We&rsquo;ll come back with
                a written, fixed-fee proposal within forty-eight hours —
                usually sooner. No call required to get started.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-8">
        <div className="grid gap-12 md:grid-cols-12">
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
