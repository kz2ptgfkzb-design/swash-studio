import Link from 'next/link';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="Aurora Editions"
    >
      <span className="relative grid h-7 w-7 place-items-center rounded-md bg-bone-50 text-ink-950 transition-transform duration-500 ease-silk group-hover:rotate-[8deg]">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 1.2C4.5 4 1.5 6 1.5 7s3 3 5.5 5.8C9.5 10 12.5 8 12.5 7s-3-3-5.5-5.8Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="font-display text-[15px] font-medium tracking-tight text-bone-50">
        Aurora<span className="text-bone-400"> / Editions</span>
      </span>
    </Link>
  );
}
