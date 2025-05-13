import * as React from 'react';

import { cn } from '@/lib/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';

export const inputVariants = cva([
  // base
  'border-border-input placeholder:text-secondary bg-background rounded-input flex h-9 w-full border px-3 py-1 text-base transition-colors md:text-sm shadow-xs',
  // disabled
  'disabled:cursor-not-allowed disabled:opacity-50',
  // focus
  'focus-indicator',
  // file
  'file:text-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium',
  // error
  'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
]);

interface InputProps
  extends React.ComponentProps<'input'>,
    VariantProps<typeof inputVariants> {}

export function Input({ className, type, ...props }: InputProps) {
  return (
    <input type={type} className={cn(inputVariants(), className)} {...props} />
  );
}
