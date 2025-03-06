'use client';

import { cn } from '@/utils';
import React from 'react';
import { SubNavProvider } from './sub-navigation.context';

export function SubNavigation({
  className,
  children,
  base,
  ...props
}: React.ComponentProps<'div'> & {
  /**
   * The base path for all items in the sub navigation. This is used to determine the
   * active state of the items. The base path is consumed by the `SubNavigationItem` through
   * a Context.
   */
  base: string;
}) {
  return (
    <div
      data-slot="sub-navigation"
      className={cn(
        'border-border flex max-w-screen items-center justify-start gap-6 overflow-x-auto border-b px-8 py-4',
        className
      )}
      {...props}
    >
      <SubNavProvider
        value={{
          base,
        }}
      >
        {children}
      </SubNavProvider>
    </div>
  );
}
