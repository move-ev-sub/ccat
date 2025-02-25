import { cn } from '@/utils';
import React from 'react';

export function SubNavigation({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sub-navigation"
      className={cn(
        'border-border flex max-w-screen items-center justify-start overflow-x-auto border-b px-8 md:hidden',
        className
      )}
      {...props}
    />
  );
}
