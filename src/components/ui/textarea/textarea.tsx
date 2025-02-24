import * as React from 'react';

import { cn } from '@/utils';

export function Textarea({
  className,
  ...props
}: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-border placeholder:text-secondary focus-visible:border-ring focus-visible:ring-ring bg-background flex min-h-24 w-full rounded-lg border px-3 py-2 text-base transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className
      )}
      {...props}
    />
  );
}
