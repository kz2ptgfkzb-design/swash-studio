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

type UploadedFile = {
  name: string;
  type: string;
  size: number;
  content: string; // base64 (no data: prefix)
};

type Brief = {
  industry: string;
  projectName: string;
  currentSite: string;
  goal: string;
  features: string[];
  timeline: string;
  budget: string;
  budgetCurrency: string;
  budgetMin: string;
  budgetMax: string;
  hosting: string;
  ongoingUpdates: string;
  paymentPreference: string;
  brandStatus: string;
  brandColors: string[];
  logo: UploadedFile | null;
  assets: UploadedFile[];
  assetsLink: string;
  references: Reference[];
  notes: string;
  name: string;
  email: string;
  phone: string;
  bestReach: 'email' | 'phone' | 'either';
};

const MAX_REFS = 4;
const EMPTY_REF: Reference = { url: '', note: '' };

const MAX_ASSETS = 4;
const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5MB per file
const ACCEPT_LOGO = 'image/png,image/jpeg,image/svg+xml,image/webp,application/pdf';
const ACCEPT_ASSETS = 'image/*,application/pdf';
const MAX_COLORS = 5;

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Strip the "data:...;base64," prefix
      const idx = result.indexOf(',');
      resolve(idx >= 0 ? result.slice(idx + 1) : result);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

const HOSTING_OPTIONS = [
  { id: 'yes',    label: 'Yes - host it for me',   hint: 'Flat monthly fee, we handle uptime, backups, security.' },
  { id: 'self',   label: 'No - I will host it',    hint: 'We will set you up on Vercel, Netlify, or your own server.' },
  { id: 'unsure', label: 'Not sure yet',           hint: 'We will walk through both options with you.' },
];

const UPDATES_OPTIONS = [
  { id: 'retainer', label: 'Monthly retainer',     hint: 'Request any change anytime - we turn it around in 48 hours.' },
  { id: 'self',     label: 'We will handle it',    hint: 'Every site ships with a CMS your team can update directly.' },
  { id: 'unsure',   label: 'Not sure yet',         hint: 'Decide after launch - no pressure either way.' },
];

const CURRENCIES = [
  { id: 'USD', symbol: '$', label: 'USD $' },
  { id: 'EUR', symbol: '€', label: 'EUR €' },
  { id: 'GBP', symbol: '£', label: 'GBP £' },
  { id: 'ZAR', symbol: 'R', label: 'ZAR R' },
];

const PAYMENT_OPTIONS = [
  { id: 'full',   label: 'Pay in full',            hint: 'Single payment after you sign off on the build.' },
  { id: 'split',  label: 'Split into two',         hint: 'Half on sign-off, half before launch.' },
  { id: 'unsure', label: 'Not sure yet',           hint: 'We will figure out what works best.' },
];

const INITIAL: Brief = {
  industry: '',
  projectName: '',
  currentSite: '',
  goal: '',
  features: [],
  timeline: '',
  budget: '',
  budgetCurrency: 'USD',
  budgetMin: '',
  budgetMax: '',
  hosting: '',
  ongoingUpdates: '',
  paymentPreference: '',
  brandStatus: '',
  brandColors: [],
  logo: null,
  assets: [],
  assetsLink: '',
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

  // File upload state
  const [fileError, setFileError] = useState<string | null>(null);

  const readFile = async (file: File): Promise<UploadedFile | null> => {
    if (file.size > MAX_FILE_BYTES) {
      setFileError(`"${file.name}" is ${formatBytes(file.size)} - over the ${formatBytes(MAX_FILE_BYTES)} limit per file.`);
      return null;
    }
    try {
      const content = await fileToBase64(file);
      return { name: file.name, type: file.type, size: file.size, content };
    } catch {
      setFileError(`Could not read "${file.name}". Try a different file.`);
      return null;
    }
  };

  const handleLogoUpload = async (file: File | null) => {
    setFileError(null);
    if (!file) { setData(d => ({ ...d, logo: null })); return; }
    const uploaded = await readFile(file);
    if (uploaded) setData(d => ({ ...d, logo: uploaded }));
  };

  const removeLogo = () => setData(d => ({ ...d, logo: null }));

  const handleAssetsUpload = async (files: FileList | null) => {
    setFileError(null);
    if (!files || files.length === 0) return;
    const current = data.assets.length;
    const room = MAX_ASSETS - current;
    if (room <= 0) {
      setFileError(`You've already added ${MAX_ASSETS} files. Remove one before adding another.`);
      return;
    }
    const toRead = Array.from(files).slice(0, room);
    const uploaded = (await Promise.all(toRead.map(readFile))).filter((f): f is UploadedFile => f !== null);
    setData(d => ({ ...d, assets: [...d.assets, ...uploaded] }));
  };

  const removeAsset = (idx: number) => {
    setData(d => ({ ...d, assets: d.assets.filter((_, i) => i !== idx) }));
  };

  // Color picker
  const addColor = (hex: string = '#C8FE3D') => {
    setData(d => d.brandColors.length >= MAX_COLORS ? d : { ...d, brandColors: [...d.brandColors, hex] });
  };

  const updateColor = (idx: number, hex: string) => {
    setData(d => ({ ...d, brandColors: d.brandColors.map((c, i) => i === idx ? hex : c) }));
  };

  const removeColor = (idx: number) => {
    setData(d => ({ ...d, brandColors: d.brandColors.filter((_, i) => i !== idx) }));
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
      if (!data.paymentPreference) next.paymentPreference = 'Pick one - or "not sure yet".';
      if (!data.hosting) next.hosting = 'Pick one - or "not sure yet".';
      if (!data.ongoingUpdates) next.ongoingUpdates = 'Pick one - or "not sure yet".';
    }
    if (step === 4) {
      if (!data.brandStatus) next.brandStatus = 'Pick one.';
      // Soft guard: total upload payload (base64) must stay under ~4MB
      // so Vercel's serverless body limit doesn't reject the POST.
      const totalBase64 =
        (data.logo?.content?.length ?? 0) +
        data.assets.reduce((sum, a) => sum + (a.content?.length ?? 0), 0);
      if (totalBase64 > 4 * 1024 * 1024) {
        setFileError('Your uploads are too large combined - try removing or compressing one. Total must stay under ~3MB raw.');
        return false;
      }
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
  const [hp, setHp] = useState(''); // honeypot - real users never fill this

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
        body: JSON.stringify({ ...data, website: hp }),
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
      {/* Honeypot - hidden from real users; bots that fill it are silently dropped. */}
      <input
        type="text"
        name="website"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
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
                fileError={fileError}
                handleLogoUpload={handleLogoUpload}
                removeLogo={removeLogo}
                handleAssetsUpload={handleAssetsUpload}
                removeAsset={removeAsset}
                addColor={addColor}
                updateColor={updateColor}
                removeColor={removeColor}
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
            placeholder="e.g. The Corner Bakery"
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
        eyebrow="03 - Timeline & how we work"
        title="When, how big, and how you want to work with us."
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

      <div>
        <div className="flex items-baseline justify-between">
          <label className="label-field">Budget range</label>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ash-400">
            optional · sharpens the quote
          </span>
        </div>
        <p className="-mt-1 mb-3 text-xs text-ash-400">
          If you have a number in mind, give us the range. We scope to it - never quietly past it.
        </p>
        <div className="grid grid-cols-[auto,1fr,auto,1fr] items-center gap-2 sm:gap-3">
          <select
            value={data.budgetCurrency}
            onChange={(e) => update('budgetCurrency', e.target.value)}
            aria-label="Currency"
            className="input-field w-auto cursor-pointer appearance-none py-3 pr-8 text-sm"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%238C8678' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.75rem center',
            }}
          >
            {CURRENCIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={data.budgetMin}
            onChange={(e) => update('budgetMin', e.target.value)}
            placeholder="From"
            aria-label="Budget from"
            className="input-field py-3 text-sm"
          />
          <span className="font-mono text-xs text-ash-400">-</span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={data.budgetMax}
            onChange={(e) => update('budgetMax', e.target.value)}
            placeholder="To"
            aria-label="Budget to"
            className="input-field py-3 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="label-field">How would you like to pay?</label>
        <ChipGrid
          items={PAYMENT_OPTIONS}
          value={data.paymentPreference}
          onChange={(v) => update('paymentPreference', v)}
          errorMsg={errors.paymentPreference}
        />
        <p className="mt-3 text-xs text-ash-400">
          The site only goes fully live once the final payment clears.
        </p>
      </div>

      <div>
        <label className="label-field">Do you want us to host the site?</label>
        <ChipGrid
          items={HOSTING_OPTIONS}
          value={data.hosting}
          onChange={(v) => update('hosting', v)}
          errorMsg={errors.hosting}
        />
      </div>

      <div>
        <label className="label-field">After launch, how do you want to handle updates?</label>
        <ChipGrid
          items={UPDATES_OPTIONS}
          value={data.ongoingUpdates}
          onChange={(v) => update('ongoingUpdates', v)}
          errorMsg={errors.ongoingUpdates}
        />
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
  fileError,
  handleLogoUpload,
  removeLogo,
  handleAssetsUpload,
  removeAsset,
  addColor,
  updateColor,
  removeColor,
}: {
  data: Brief;
  update: <K extends keyof Brief>(k: K, v: Brief[K]) => void;
  errors: Partial<Record<keyof Brief, string>>;
  updateReference: (idx: number, patch: Partial<Reference>) => void;
  addReference: () => void;
  removeReference: (idx: number) => void;
  fileError: string | null;
  handleLogoUpload: (file: File | null) => void;
  removeLogo: () => void;
  handleAssetsUpload: (files: FileList | null) => void;
  removeAsset: (idx: number) => void;
  addColor: (hex?: string) => void;
  updateColor: (idx: number, hex: string) => void;
  removeColor: (idx: number) => void;
}) {
  return (
    <div className="space-y-10">
      <StepHeading
        eyebrow="04 - Brand & assets"
        title="Where's the brand at?"
        sub="Tell us what you have. Drop in your logo, brand colors, any references or work samples that give us a feel for you."
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

      {/* Brand colors */}
      <div>
        <div className="flex items-baseline justify-between">
          <label className="label-field">Brand colors</label>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ash-400">
            optional · {data.brandColors.length} / {MAX_COLORS}
          </span>
        </div>
        <p className="-mt-1 mb-4 text-xs text-ash-400">
          Pick any hex you want - no fixed palette. Drop in what your brand already uses, or what you wish it did.
        </p>

        <div className="flex flex-wrap items-center gap-2">
          {data.brandColors.map((hex, i) => (
            <ColorSwatch
              key={i}
              hex={hex}
              onChange={(v) => updateColor(i, v)}
              onRemove={() => removeColor(i)}
            />
          ))}
          {data.brandColors.length < MAX_COLORS && (
            <button
              type="button"
              onClick={() => addColor()}
              data-cursor="link"
              className="inline-flex items-center gap-2 rounded-pill border border-hairline px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ash-500 transition-all duration-300 ease-silk hover:border-ink-700 hover:text-ink-700"
            >
              <span className="grid h-3.5 w-3.5 place-items-center rounded-full border border-current">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M4 1v6M1 4h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </span>
              Add a color
            </button>
          )}
        </div>
      </div>

      {/* Logo upload */}
      <div>
        <div className="flex items-baseline justify-between">
          <label className="label-field">Logo</label>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ash-400">
            optional · PNG / JPG / SVG / PDF · max 5MB
          </span>
        </div>
        <p className="-mt-1 mb-4 text-xs text-ash-400">
          Drop your existing logo if you have one. Vector (SVG/PDF) preferred. Skip if you don&apos;t.
        </p>

        {data.logo ? (
          <FilePreview
            file={data.logo}
            onRemove={removeLogo}
          />
        ) : (
          <FileDropArea
            id="logo-upload"
            accept={ACCEPT_LOGO}
            label="Click to upload your logo"
            onFiles={(files) => handleLogoUpload(files?.[0] ?? null)}
          />
        )}
      </div>

      {/* Assets / work samples */}
      <div>
        <div className="flex items-baseline justify-between">
          <label className="label-field">Assets &amp; inspiration</label>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ash-400">
            optional · {data.assets.length} / {MAX_ASSETS} · max 5MB each
          </span>
        </div>
        <p className="-mt-1 mb-4 text-xs text-ash-400">
          Drop a few small files here, OR share a Drive / Dropbox / WeTransfer link below for anything bigger.
        </p>

        {data.assets.length < MAX_ASSETS && (
          <FileDropArea
            id="assets-upload"
            accept={ACCEPT_ASSETS}
            label="Click to upload images"
            multiple
            onFiles={handleAssetsUpload}
          />
        )}

        {data.assets.length > 0 && (
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {data.assets.map((f, i) => (
              <li key={i}>
                <FilePreview file={f} onRemove={() => removeAsset(i)} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Cloud storage link - for anything too big to upload directly */}
      <div>
        <div className="flex items-baseline justify-between">
          <label className="label-field" htmlFor="assetsLink">
            Or share a link to all your assets
          </label>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ash-400">
            optional · best for big libraries
          </span>
        </div>
        <p className="-mt-1 mb-3 text-xs text-ash-400">
          Google Drive, Dropbox, WeTransfer, Notion - whatever folder holds your brand kit, photo library, or full asset stack. Make sure the link is set to &ldquo;anyone with the link can view.&rdquo;
        </p>
        <input
          id="assetsLink"
          type="url"
          inputMode="url"
          value={data.assetsLink}
          onChange={(e) => update('assetsLink', e.target.value)}
          placeholder="https://drive.google.com/..."
          className="input-field"
        />
      </div>

      {fileError && (
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink_red-300">
          {fileError}
        </p>
      )}

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
        <p className="mt-3 text-xs leading-relaxed text-ash-400">
          We only use your details to respond to your brief. See our{' '}
          <a href="/privacy" className="text-ash-500 underline decoration-hairline underline-offset-4 hover:text-ink-700">privacy policy</a>.
        </p>
      </div>
    </div>
  );
}

/* ─── Brand color swatch ─────────────────────────────────────────── */

function ColorSwatch({
  hex,
  onChange,
  onRemove,
}: {
  hex: string;
  onChange: (v: string) => void;
  onRemove: () => void;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-pill border border-hairline bg-paper-200/40 py-1 pl-1 pr-2">
      <label
        className="relative grid h-8 w-8 cursor-pointer place-items-center overflow-hidden rounded-full border border-hairline"
        style={{ background: hex }}
        aria-label="Pick a color"
      >
        <input
          type="color"
          value={hex}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </label>
      <span className="font-mono text-[11px] uppercase tracking-wider text-ink-400">
        {hex}
      </span>
      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove color"
        className="grid h-5 w-5 place-items-center rounded-full text-ash-500 transition-colors hover:bg-paper-200/80 hover:text-ink_red-300"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

/* ─── File drop area (click or drag) ─────────────────────────────── */

function FileDropArea({
  id,
  accept,
  label,
  multiple = false,
  onFiles,
}: {
  id: string;
  accept: string;
  label: string;
  multiple?: boolean;
  onFiles: (files: FileList | null) => void;
}) {
  const [dragging, setDragging] = useState(false);

  return (
    <label
      htmlFor={id}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        onFiles(e.dataTransfer.files);
      }}
      className={cn(
        'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-card border border-dashed px-6 py-8 text-center transition-all duration-300 ease-silk',
        dragging
          ? 'border-lime-300 bg-lime-300/10 text-ink-700'
          : 'border-hairline bg-paper-50/40 text-ash-500 hover:border-lime-300/50 hover:bg-paper-200/40 hover:text-ink-700',
      )}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
      <span className="text-sm font-medium">{label}</span>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ash-400">
        or drag &amp; drop here
      </span>
      <input
        id={id}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => onFiles(e.target.files)}
        className="hidden"
      />
    </label>
  );
}

/* ─── File preview card ──────────────────────────────────────────── */

function FilePreview({
  file,
  onRemove,
}: {
  file: UploadedFile;
  onRemove: () => void;
}) {
  const isImage = file.type.startsWith('image/');
  const dataUrl = isImage ? `data:${file.type};base64,${file.content}` : null;

  return (
    <div className="flex items-center gap-3 rounded-card border border-hairline bg-paper-50/40 p-3">
      <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-md border border-hairline bg-paper-200/40">
        {dataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={dataUrl} alt={file.name} className="h-full w-full object-cover" />
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ash-500">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm text-ink-700">{file.name}</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ash-400">
          {formatBytes(file.size)}
        </p>
      </div>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${file.name}`}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-pill border border-hairline text-ash-500 transition-all duration-300 ease-silk hover:border-ink_red-400 hover:text-ink_red-400"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 6h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
