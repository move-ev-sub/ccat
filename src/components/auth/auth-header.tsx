import { cn } from '@/utils';
import React from 'react';

export function AuthHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot={'auth-header'}
      className={cn('space-y-4', className)}
      {...props}
    />
  );
}

export function AuthTitle({ className, ...props }: React.ComponentProps<'h1'>) {
  return (
    <h1
      data-slot={'auth-title'}
      className={cn('text-foreground text-2xl font-medium', className)}
      {...props}
    />
  );
}

export function AuthDescription({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot={'auth-description'}
      className={cn('text-secondary text-sm', className)}
      {...props}
    />
  );
}
