import { cn } from '@/lib/utils/cn';
import React from 'react';

/**
 * Simple component that can be added to a form label to indicate that
 * the field is required.
 */
export function RequiredMark({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span className={cn('text-destructive', className)} {...props}>
      {' '}
      *
    </span>
  );
}
