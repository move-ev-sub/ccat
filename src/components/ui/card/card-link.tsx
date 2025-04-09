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
      <span className="absolute inset-0 z-10" />
      {children}
    </Link>
  );
}
