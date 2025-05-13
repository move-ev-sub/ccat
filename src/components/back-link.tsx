import { cn } from '@/lib/utils/cn';
import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import React from 'react';

export function BackLink({
  className,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      data-slot={'back-link'}
      className={cn(
        'text-foreground hover:text-accent flex w-fit items-center justify-start gap-1 rounded-md text-sm font-medium transition-colors',
        'focus-indicator',
        className
      )}
      {...props}
    >
      <ChevronLeftIcon className="size-4" />
      <span>Zurück</span>
    </Link>
  );
}
