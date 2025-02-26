'use client';

import { cn } from '@/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useSubNavContext } from './sub-navigation.context';

export function SubNavigationItem({
  className,
  children,
  href,
  ...props
}: React.ComponentProps<typeof Link>) {
  const pathname = usePathname();
  const [active, setActive] = React.useState(false);
  const { base } = useSubNavContext();

  React.useEffect(() => {
    if (href === '/') {
      setActive(pathname === base);
      return;
    }

    setActive(pathname.startsWith(base + href));
  }, [pathname]);

  return (
    <Link
      data-slot={'sub-navigation-item'}
      data-active={active}
      href={`${base}${href}`}
      className={cn(
        'text-foreground active:bg-background-muted data-[active=true]:text-accent data-[active=true]:bg-accent-50 dark:data-[active=true]:bg-accent-950 group relative w-fit px-4 py-3 text-sm font-medium sm:py-2.5',
        className
      )}
      {...props}
    >
      {children}
      <div className="bg-accent absolute bottom-0 left-0 hidden h-0.5 w-full group-data-[active=true]:block" />
    </Link>
  );
}
