import * as React from 'react';

import { cn } from '@/utils';

export function Navbar({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <nav
      data-slot="navbar"
      className={cn(
        'border-border bg-background-muted border-b px-8 py-2.5',
        className
      )}
      {...props}
    />
  );
}
