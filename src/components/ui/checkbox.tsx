'use client';

import { CheckIcon } from '@heroicons/react/16/solid';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as React from 'react';

import { cn } from '@/lib/utils/cn';

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        // base
        'peer border-border-input size-4 shrink-0 rounded-sm border shadow-xs transition-shadow outline-none',
        // disabled
        'disabled:cursor-not-allowed disabled:opacity-50',
        // checked
        'data-[state=checked]:border-accent data-[state=checked]:bg-accent data-[state=checked]:text-white',
        // invalid
        'aria-invalid:ring-destructive/30 aria-invalid:border-destructive-border',
        // focus
        'focus-visible:ring-primary-100 dark:focus-visible:ring-primary-700 data-[state=checked]:focus-visible:ring-accent-100 data-[state=checked]:dark:focus-visible:ring-accent-900 focus-visible:ring-4 focus-visible:outline-none',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
