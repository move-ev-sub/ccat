'use client';

import { cn } from '@/utils';
import { SidebarNavProvider } from './sidebar-nav.context';

export function SidebarNav({
  className,
  base,
  ...props
}: React.ComponentProps<'ul'> & {
  base?: string;
}) {
  return (
    <SidebarNavProvider
      value={{
        base: base ?? '',
      }}
    >
      <ul
        data-slot={'sidebar-nav'}
        className={cn('space-y-1', className)}
        {...props}
      />
    </SidebarNavProvider>
  );
}
