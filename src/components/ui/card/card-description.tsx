import * as React from 'react';

import { cn } from '@/utils';

export function CardDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-secondary text-sm', className)}
      {...props}
    />
  );
}
