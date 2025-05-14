import { cn } from '@/lib/utils/cn';
import { HomeIcon } from '@heroicons/react/16/solid';
import React from 'react';
import { Crumb } from './crumb';

export function BreadCrumbs({
  className,
  children,
  ...props
}: React.ComponentProps<'nav'>) {
  return (
    <nav
      data-slot="breadcrumbs"
      className={cn('flex items-center justify-start gap-2.5', className)}
      {...props}
    >
      <Crumb href={'/'}>
        <HomeIcon />
      </Crumb>
      {children}
    </nav>
  );
}
