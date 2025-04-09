import { cn } from '@/utils';
import Link from 'next/link';
import React from 'react';

export function CardLink({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      data-slot={'card-link'}
      className={cn(
        'text-foreground block rounded-md font-medium',
        'focus-indicator',
        className
      )}
      {...props}
    >
      {/**
       * Instead of making the entire card a link, we make the link a span
       * and add a pseudo element to the card. This makes it easier for screen
       * readers to understand the link.
       */}
      <span className="absolute inset-0 z-10" />
      {children}
    </Link>
  );
}
