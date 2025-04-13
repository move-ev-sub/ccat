import { cn } from '@/utils';
import Link from 'next/link';
import React from 'react';

export function MobileNavigationItem({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof Link> & {
  variant?: 'default' | 'destructive';
}) {
  return (
    <Link
      data-slot={'mobile-navigation-item'}
      className={cn(
        'text-foreground [&_svg]:text-secondary hover:bg-background-muted active:bg-background-muted focus-indicator flex w-full items-center justify-start gap-2.5 rounded-lg px-2.5 py-1.5 font-medium sm:text-sm',
        variant === 'destructive' &&
          'active:bg-destructive/10 hover:bg-destructive/10 text-destructive focus-visible:ring-destructive [&_svg]:text-destructive',
        className
      )}
      {...props}
    />
  );
}
