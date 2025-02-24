import * as React from 'react';

import { cn } from '@/utils';

export function TopNav({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="top-nav"
      className={cn('flex items-center justify-start gap-2', className)}
      {...props}
    />
  );
}
