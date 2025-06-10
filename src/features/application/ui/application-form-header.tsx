import { cn } from '@/lib/utils/cn';
import React from 'react';

export function ApplicationFormHeader({
  className,
  ...props
}: React.ComponentProps<'header'>) {
  return (
    <header
      className={cn('mx-auto w-full max-w-4xl px-8', className)}
      {...props}
    />
  );
}
