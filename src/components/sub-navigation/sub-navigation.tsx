'use client';

import { tabsListVariants } from '@/components/ui/tabs/tabs-list';
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
      className={cn(tabsListVariants({}), className)}
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
