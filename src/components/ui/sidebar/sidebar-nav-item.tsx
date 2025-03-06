'use client';

import { cn } from '@/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { SheetClose } from '../sheet';
import { useSidebarContext } from './sidebar-context';
import { useSidebarNavContext } from './sidebar-nav.context';

export function SidebarNavItem({
  className,
  href,
  ...props
}: React.ComponentProps<typeof Link>) {
  const pathname = usePathname();
  const { base } = useSidebarNavContext();
  const { mobile } = useSidebarContext();

  const actualHref = base ? (base + href).toString() : href;

  const active: boolean = React.useMemo(() => {
    if (href == '/') {
      return pathname + '/' == actualHref.toString();
    } else {
      return pathname.startsWith(actualHref.toString());
    }
  }, [actualHref, href, pathname]);

  return (
    <ItemWrapper mobile={mobile}>
      <Link
        data-slot="sidebar-nav-item"
        data-state={active ? 'active' : 'inactive'}
        className={cn(
          // base
          'text-foreground hover:bg-primary-200 dark:hover:bg-primary-900 flex items-center justify-start gap-1.5 rounded-lg px-(--sidebar-item-padding) py-1.5 text-sm font-medium transition-colors [&_svg]:size-4',
          // focus
          'focus-visible:ring-ring focus-visible:ring-offset-background-muted focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
          // active
          'data-[state=active]:text-accent',
          className
        )}
        href={actualHref}
        {...props}
      />
    </ItemWrapper>
  );
}

function ItemWrapper({
  mobile,
  children,
  ...props
}: React.ComponentProps<'li'> & {
  mobile?: boolean;
}) {
  return mobile ? (
    <li {...props}>
      <SheetClose asChild>{children}</SheetClose>
    </li>
  ) : (
    <li {...props}>{children}</li>
  );
}
