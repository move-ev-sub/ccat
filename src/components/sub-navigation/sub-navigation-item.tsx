'use client';

import { cn } from '@/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useSubNavContext } from './sub-navigation.context';

export function SubNavigationItem({
  className,
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
  }, [base, href, pathname]);

  return (
    <Link
      data-slot={'sub-navigation-item'}
      data-active={active}
      href={`${base}${href}`}
      className={cn(
        'text-foreground data-[active=true]:text-accent relative w-fit rounded-md text-sm font-medium',
        'focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline',
        className
      )}
      {...props}
    />
  );
}
