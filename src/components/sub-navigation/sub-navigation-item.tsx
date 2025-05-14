'use client';

import { tabsTriggerVariants } from '@/components/ui/tabs/tabs-trigger';
import { cn } from '@/lib/utils/cn';
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
      data-state={active ? 'active' : 'inactive'}
      href={`${base}${href}`}
      className={cn(tabsTriggerVariants({}), 'py-3', className)}
      {...props}
    />
  );
}
