'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import {
  INDUSTRIES,
  GOALS,
  FEATURES_NEEDED,
  TIMELINES,
  BUDGETS,
  BRAND_STATUS,
} from '@/data/work';
import { cn } from '@/lib/utils';

const STEPS = [
  { n: 1, label: 'Business' },
  { n: 2, label: 'The build' },
  { n: 3, label: 'Timeline & budget' },
  { n: 4, label: 'Brand & details' },
  { n: 5, label: 'Contact' },
];

type Reference = { url: string; note: string };

type Brief = {
  industry: string;
  projectName: string;
  currentSite: string;
  goal: string;
  features: string[];
  timeline: string;
  budget: string;
  brandStatus: string;
  references: Reference[];
  notes: string;
  name: string;
  email: string;
  phone: string;
  bestReach: 'email' | 'phone' | 'either';
};

const MAX_REFS = 4;
const EMPTY_REF: Reference = { url: '', note: '' };

const INITIAL: Brief = {
  industry: '',
  projectName: '',
  currentSite: '',
  goal: '',
  features: [],
  timeline: '',
  budget: '',
  brandStatus: '',
  references: [{ ...EMPTY_REF }],
  notes: '',
  name: '',
  email: '',
  phone: '',
  bestReach: 'email',
};

export function BriefIntakeForm() {
  const router = useRouter();
  const search = useSearchParams();
  const initialIndustry = search.get('industry') || '';

  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<Brief>({ ...INITIAL, industry: initialIndustry });
  const [errors, setErrors] = useState<Partial<Record<keyof Brief, string>>>({});

  const progress = useMemo(() => (step / STEPS.length) * 100, [step]);

  const update = <K extends keyof Brief>(key: K, value: Brief[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleFeature = (id: string) => {
    setData((d) => ({
      ...d,
      features: d.features.includes(id)
        ? d.features.filter((f) => f !== id)
        : [...d.features, id],
    }));
  };

  const updateReference = (idx: number, patch: Partial<Reference>) => {
    setData((d) => ({
      ...d,
      references: d.references.map((r, i) => (i === idx ? { ...r, ...patch } : r)),
    }));
  };

  const addReference = () => {
    setData((d) => {
      if (d.references.length >= MAX_REFS) return d;
      return { ...d, references: [...d.references, { ...EMPTY_REF }] };
    });
  };

  const removeReference = (idx: number) => {
    setData((d) => {
      if (d.references.length <= 1) return { ...d, references: [{ ...EMPTY_REF }] };
      return { ...d, references: d.references.filter((_, i) => i !== idx) };
    });
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof Brief, string>> = {};
    if (step === 1) {
      if (!data.industry) next.industry = 'Pick the closest fit.';
      if (!data.projectName.trim()) next.projectName = 'A name or working name.';
    }
    if (step === 2) {
      if (!data.goal) next.goal = 'Pick one.';
    }
    if (step === 3) {
      if (!data.timeline) next.timeline = 'Pick one.';
      if (!data.budget) next.budget = 'Pick one - or "not sure".';
    }
    if (step === 4) {
      if (!data.brandStatus) next.brandStatus = 'Pick one.';
    }
    if (step === 5) {
      if (!data.name.trim()) next.name = "What's your name?";
      if (!data.email.trim()) next.email = 'We need somewhere to send the proposal.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        next.email = 'That email looks off.';
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const next = () => {
    if (!validate()) return;
    if (step === STEPS.length) {
      handleSubmit();
      return;
    }
    setDir(1);
    setStep((s) => s + 1);
  };

  const back = () => {
    if (step === 1) return;
    setDir(-1);
    setStep((s) => s - 1);
  };

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    setSubmitError(null);

    if (typeof window !== 'undefined') {
      try { sessionStorage.setItem('swash:lastBrief', JSON.stringify(data)); } catch {}
    }

    try {
      const res = await fetch('/api/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? 'Submission failed');
      }
      router.push('/brief/thanks');
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Submission failed');
      setSubmitting(false);
    }
  };

  return (
    <div className="container-page pb-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <div className="mb-4 flex items-center justify-between text-xs">
            <p className="font-mono uppercase tracking-[0.18em] text-ash-500">
              Step {step} of {STEPS.length} · {STEPS[step - 1].label}
            </p>
            <p className="font-mono uppercase tracking-[0.18em] text-ash-400">
              ~5 min
            </p>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-hairline">
            <motion.div
              className="h-full rounded-full bg-saffron-400"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            initial={{ opacity: 0, x: dir * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -dir * 24 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 1 && (
              <Step1
                data={data}
                update={update}
                errors={errors}
              />
            )}
            {step === 2 && (
              <Step2
                data={data}
                update={update}
                toggleFeature={toggleFeature}
                errors={errors}
              />
            )}
            {step === 3 && (
              <Step3 data={data} update={update} errors={errors} />
            )}
            {step === 4 && (
              <Step4
                data={data}
                update={update}
                errors={errors}
                updateReference={updateReference}
                addReference={addReference}
                removeReference={removeReference}
              />
            )}
            {step === 5 && (
              <Step5 data={data} update={update} errors={errors} />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex items-center justify-between border-t border-hairline pt-8">
          <button
            type="button"
            onClick={back}
            disabled={step === 1}
            className={cn(
              'btn px-5 py-3 text-sm',
              step === 1
                ? 'cursor-not-allowed text-ash-400'
                : 'text-ink-700 hover:bg-paper-200/60',
            )}
          >
            ← Back
          </button>

          <div className="flex flex-col items-end gap-2">
            {submitError && (
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#FF5C44]">
                {submitError} - try again or email hello@swash.studio
              </p>
            )}
            <button
              type="button"
              onClick={next}
              disabled={submitting}
              className={cn('btn-primary', submitting && 'opacity-60 cursor-wait')}
            >
              {submitting
                ? 'Sending...'
                : step === STEPS.length
                  ? 'Send the brief'
                  : 'Continue'}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepHeading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div className="mb-10 space-y-4">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="font-display text-display-md text-balance text-ink-700">
        {title}
      </h2>
      <p className="max-w-xl text-pretty text-base leading-relaxed text-ash-500">
        {sub}
      </p>
    </div>
  );
}

function ChipGrid({
  items,
  value,
  onChange,
  errorMsg,
}: {
  items: { id: string; label: string; hint?: string }[];
  value: string;
  onChange: (id: string) => void;
  errorMsg?: string;
}) {
  return (
    <>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {items.map((it) => {
          const active = value === it.id;
          return (
            <button
              key={it.id}
              type="button"
              onClick={() => onChange(it.id)}
              className={cn(
                'group flex items-start gap-3 rounded-card border px-5 py-4 text-left transition-all duration-300 ease-silk',
                active
                  ? 'border-lime-300 bg-lime-300 text-paper-100'
                  : 'border-hairline bg-paper-200/40 text-ink-700 hover:border-lime-300/50 hover:bg-paper-200/70',
              )}
            >
              <span
                className={cn(
                  'mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 transition-colors',
                  active ? 'border-paper-100 bg-paper-100' : 'border-ash-500 group-hover:border-lime-300',
                )}
              >
                {active && (
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1.5 4l1.8 1.8L6.5 2.5" stroke="#C8FE3D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span>
                <span className={cn('block text-sm font-semibold', active ? 'text-paper-100' : 'text-ink-700')}>
                  {it.label}
                </span>
                {it.hint && (
                  <span className={cn('mt-0.5 block text-xs', active ? 'text-paper-100/75' : 'text-ash-500')}>
                    {it.hint}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
      {errorMsg && (
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink_red-300">
          {errorMsg}
        </p>
      )}
    </>
  );
}

function ChipMultiGrid({
  items,
  values,
  onToggle,
}: {
  items: { id: string; label: string }[];
  values: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => {
        const active = values.includes(it.id);
        return (
          <button
            key={it.id}
            type="button"
            onClick={() => onToggle(it.id)}
            className={cn(
              'inline-flex items-center gap-2 rounded-pill border px-4 py-2 text-sm font-medium transition-all duration-300 ease-silk',
              active
                ? 'border-lime-300 bg-lime-300 text-paper-100'
                : 'border-hairline bg-paper-200/40 text-ink-400 hover:border-lime-300/50 hover:text-ink-700',
            )}
          >
            {active && <span>+</span>}
            {it.label}
          </button>
        );
      })}
    </div>
  );
}

function Step1({
  data,
  update,
  errors,
}: {
  data: Brief;
  update: <K extends keyof Brief>(k: K, v: Brief[K]) => void;
  errors: Partial<Record<keyof Brief, string>>;
}) {
  return (
    <div className="space-y-10">
      <StepHeading
        eyebrow="01 - Business"
        title="Tell us about the business."
        sub="A line on what you do and where you sit. We'll use this to shape the demo."
      />

      <div>
        <label className="label-field">What kind of business?</label>
        <ChipGrid
          items={INDUSTRIES}
          value={data.industry}
          onChange={(v) => update('industry', v)}
          errorMsg={errors.industry}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="label-field" htmlFor="projectName">
            Business or project name
          </label>
          <input
            id="projectName"
            value={data.projectName}
            onChange={(e) => update('projectName', e.target.value)}
            placeholder="e.g. Apex Mechanical"
            className="input-field"
          />
          {errors.projectName && (
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink_red-300">
              {errors.projectName}
            </p>
          )}
        </div>
        <div>
          <label className="label-field" htmlFor="currentSite">
            Current site (if any)
          </label>
          <input
            id="currentSite"
            value={data.currentSite}
            onChange={(e) => update('currentSite', e.target.value)}
            placeholder="https://"
            className="input-field"
          />
        </div>
      </div>
    </div>
  );
}

function Step2({
  data,
  update,
  toggleFeature,
  errors,
}: {
  data: Brief;
  update: <K extends keyof Brief>(k: K, v: Brief[K]) => void;
  toggleFeature: (id: string) => void;
  errors: Partial<Record<keyof Brief, string>>;
}) {
  return (
    <div className="space-y-10">
      <StepHeading
        eyebrow="02 - The build"
        title="What are we building?"
        sub="Pick the closest goal. Then check anything the site needs to do."
      />

      <div>
        <label className="label-field">The primary goal</label>
        <ChipGrid
          items={GOALS}
          value={data.goal}
          onChange={(v) => update('goal', v)}
          errorMsg={errors.goal}
        />
      </div>

      <div>
        <label className="label-field">Features it needs to handle</label>
        <ChipMultiGrid
          items={FEATURES_NEEDED}
          values={data.features}
          onToggle={toggleFeature}
        />
        <p className="mt-3 text-xs text-ash-400">
          Multi-select - pick everything that applies.
        </p>
      </div>
    </div>
  );
}

function Step3({
  data,
  update,
  errors,
}: {
  data: Brief;
  update: <K extends keyof Brief>(k: K, v: Brief[K]) => void;
  errors: Partial<Record<keyof Brief, string>>;
}) {
  return (
    <div className="space-y-10">
      <StepHeading
        eyebrow="03 - Timeline & budget"
        title="When and how big?"
        sub="We size the work to what you've got. No hidden tiers, no upsell."
      />

      <div>
        <label className="label-field">Timeline</label>
        <ChipGrid
          items={TIMELINES}
          value={data.timeline}
          onChange={(v) => update('timeline', v)}
          errorMsg={errors.timeline}
        />
      </div>

      <div>
        <label className="label-field">Budget shape</label>
        <ChipGrid
          items={BUDGETS}
          value={data.budget}
          onChange={(v) => update('budget', v)}
          errorMsg={errors.budget}
        />
        <p className="mt-3 text-xs text-ash-400">
          No prices listed. The shape helps us scope honestly.
        </p>
      </div>
    </div>
  );
}

function Step4({
  data,
  update,
  errors,
  updateReference,
  addReference,
  removeReference,
}: {
  data: Brief;
  update: <K extends keyof Brief>(k: K, v: Brief[K]) => void;
  errors: Partial<Record<keyof Brief, string>>;
  updateReference: (idx: number, patch: Partial<Reference>) => void;
  addReference: () => void;
  removeReference: (idx: number) => void;
}) {
  return (
    <div className="space-y-10">
      <StepHeading
        eyebrow="04 - Brand & details"
        title="Where's the brand at?"
        sub="So we know whether to plug into what you have or build it from scratch."
      />

      <div>
        <label className="label-field">Brand status</label>
        <ChipGrid
          items={BRAND_STATUS}
          value={data.brandStatus}
          onChange={(v) => update('brandStatus', v)}
          errorMsg={errors.brandStatus}
        />
      </div>

      <div>
        <div className="flex items-baseline justify-between">
          <label className="label-field">
            References - sites you love
          </label>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ash-400">
            optional · {data.references.length} / {MAX_REFS}
          </span>
        </div>

        <p className="-mt-1 mb-4 text-xs text-ash-400">
          Drop in up to {MAX_REFS} URLs of sites you want yours to feel
          like. A line on what you love about each helps a lot - type,
          motion, layout, the photography, the tone.
        </p>

        <ul className="space-y-2.5">
          {data.references.map((ref, i) => (
            <li
              key={i}
              className="grid gap-2 rounded-card border border-hairline bg-paper-50/40 p-3 sm:grid-cols-[1fr,1fr,auto] sm:items-center"
            >
              <input
                type="url"
                inputMode="url"
                value={ref.url}
                onChange={(e) => updateReference(i, { url: e.target.value })}
                placeholder="https://example.com"
                className="input-field py-3 text-sm"
                aria-label={`Reference ${i + 1} URL`}
              />
              <input
                value={ref.note}
                onChange={(e) => updateReference(i, { note: e.target.value })}
                placeholder="What do you love about it?"
                className="input-field py-3 text-sm"
                aria-label={`Reference ${i + 1} note`}
              />
              <button
                type="button"
                onClick={() => removeReference(i)}
                disabled={data.references.length <= 1 && !ref.url && !ref.note}
                aria-label={`Remove reference ${i + 1}`}
                className={cn(
                  'inline-flex h-10 w-10 items-center justify-center rounded-pill border text-ash-500 transition-all duration-300 ease-silk',
                  data.references.length <= 1 && !ref.url && !ref.note
                    ? 'border-hairline/60 cursor-not-allowed opacity-40'
                    : 'border-hairline hover:border-ink_red-400 hover:text-ink_red-400',
                )}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        {data.references.length < MAX_REFS && (
          <button
            type="button"
            onClick={addReference}
            data-cursor="link"
            className="mt-3 inline-flex items-center gap-2 rounded-pill border border-hairline px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ash-500 transition-all duration-300 ease-silk hover:border-ink-700 hover:text-ink-700"
          >
            <span className="grid h-3.5 w-3.5 place-items-center rounded-full border border-current">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M4 1v6M1 4h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
            Add another reference
          </button>
        )}
      </div>

      <div>
        <label className="label-field" htmlFor="notes">
          Anything else we should know?
        </label>
        <textarea
          id="notes"
          rows={6}
          value={data.notes}
          onChange={(e) => update('notes', e.target.value)}
          placeholder="Competitors you love, internal constraints, deadlines, names to avoid - the more we know, the sharper the demo we send back."
          className="input-field resize-none"
        />
      </div>
    </div>
  );
}

function Step5({
  data,
  update,
  errors,
}: {
  data: Brief;
  update: <K extends keyof Brief>(k: K, v: Brief[K]) => void;
  errors: Partial<Record<keyof Brief, string>>;
}) {
  return (
    <div className="space-y-10">
      <StepHeading
        eyebrow="05 - Contact"
        title="Last bit - where do we send the demo?"
        sub="A recorded video walkthrough of your site lands in your inbox within 48 hours. No newsletter, no follow-up sequence."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="label-field" htmlFor="name">
            Your name
          </label>
          <input
            id="name"
            value={data.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="First and last"
            className="input-field"
          />
          {errors.name && (
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink_red-300">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label className="label-field" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="you@business.com"
            className="input-field"
          />
          {errors.email && (
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink_red-300">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="label-field" htmlFor="phone">
            Phone (optional)
          </label>
          <input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="For quick scope questions"
            className="input-field"
          />
        </div>
        <div>
          <label className="label-field">Best way to reach you</label>
          <div className="flex gap-2">
            {(['email', 'phone', 'either'] as const).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => update('bestReach', opt)}
                className={cn(
                  'flex-1 rounded-pill border px-4 py-3 text-sm capitalize transition-all duration-300',
                  data.bestReach === opt
                    ? 'border-lime-300 bg-lime-300 text-paper-100 font-semibold'
                    : 'border-hairline bg-paper-200/40 text-ink-400 hover:border-lime-300/50 hover:text-ink-700',
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-card border border-hairline bg-paper-200/40 p-5">
        <p className="text-sm leading-relaxed text-ash-500">
          By sending this brief you&rsquo;re not committing to anything.
          Within 48 hours we&rsquo;ll send a video demo of your site -
          watch it, request any changes, pay nothing until you sign off.
        </p>
      </div>
    </div>
  );
}
