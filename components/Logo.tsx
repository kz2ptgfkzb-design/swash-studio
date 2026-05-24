'use client';

import Link from 'next/link';
import { SwashMark } from './SwashMark';
import { cn } from '@/lib/utils';

export function Logo({
  className,
  size = 'sm',
  asLink = true,
  variant = 'default',
}: {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  asLink?: boolean;
  variant?: 'default' | 'ink';
}) {
  const dim =
    size === 'sm' ? 38 :
    size === 'md' ? 60 :
    size === 'lg' ? 96 : 240;

  const wordSize =
    size === 'sm' ? 'text-[19px]' :
    size === 'md' ? 'text-[24px]' :
    size === 'lg' ? 'text-[36px]' : 'text-display-md';

  const wordColor = variant === 'ink' ? 'text-paper-50' : 'text-ink-700';

  const content = (
    <span
      className={cn(
        'group inline-flex items-center gap-2.5',
        wordColor,
        className,
      )}
      aria-label="Swash"
      data-cursor="link"
    >
      <span className="relative grid place-items-center transition-transform duration-700 ease-silk group-hover:-rotate-[6deg]">
        <SwashMark
          size={dim}
          animate={size !== 'sm'}
          variant={variant === 'ink' ? 'ink' : 'default'}
        />
      </span>
      <span
        className={cn(
          'font-display italic tracking-tight leading-none',
          wordSize,
        )}
      >
        Swash
      </span>
    </span>
  );

  if (!asLink) return content;
  return <Link href="/">{content}</Link>;
}
