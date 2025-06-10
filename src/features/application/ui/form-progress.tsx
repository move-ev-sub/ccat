'use client';

import { ApplicationRoutes } from '@/lib/consts/routes';
import { cn } from '@/lib/utils/cn';
import { usePathname } from 'next/navigation';
import React from 'react';

const ITEMS = [
  {
    label: 'Allgemeine Informationen',
    href: ApplicationRoutes.GENERAL_ROUTE,
  },
  {
    label: 'Eventauswahl',
    href: ApplicationRoutes.SELECT_ROUTE,
  },
  {
    label: 'Anschreiben anfügen',
    href: ApplicationRoutes.COVER_LETTERS_ROUTE,
  },
  {
    label: 'Priorität',
    href: ApplicationRoutes.PRIORITIZE_ROUTE,
  },
  {
    label: 'Überprüfen',
    href: ApplicationRoutes.REVIEW_ROUTE,
  },
];

export function FormProgress({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  const pathname = usePathname();
  const currentIndex = React.useMemo(() => {
    return ITEMS.findIndex((item) => item.href === pathname);
  }, [pathname]);

  return (
    <ul
      className={cn('grid gap-0.75', className)}
      style={{ gridTemplateColumns: `repeat(${ITEMS.length}, 1fr)` }}
      {...props}
    >
      {ITEMS.map((item, index) => (
        <FormProgressItem
          key={item.href}
          index={index}
          {...item}
          currentIndex={currentIndex}
        />
      ))}
    </ul>
  );
}

function FormProgressItem({
  label,
  index,
  className,
  currentIndex,
  ...props
}: React.ComponentProps<'li'> & {
  label: string;
  href: string;
  index: number;
  currentIndex: number;
}) {
  const status = React.useMemo(() => {
    if (index < currentIndex) return 'completed';
    if (index === currentIndex) return 'active';
    return 'pending';
  }, [index, currentIndex]);

  return (
    <li data-status={status} className={cn('group', className)} {...props}>
      <div className="flex items-center justify-start gap-0.75">
        <div
          className={cn(
            'bg-accent size-3 shrink-0 rounded-full',
            'group-data-[status=pending]:bg-border',
            'group-data-[status=active]:ring-accent group-data-[status=active]:ring-offset-background group-data-[status=active]:ring-2 group-data-[status=active]:ring-offset-2'
          )}
        />
        <div
          className={cn(
            'bg-border -z-10 h-0.5 grow rounded-full group-last:hidden',
            'group-data-[status=completed]:bg-accent'
          )}
        />
      </div>
      <div className="mt-4 pr-6">
        <span
          className={cn(
            'text-secondary block text-sm font-medium',
            'group-data-[status=active]:text-accent',
            'group-data-[status=completed]:text-foreground'
          )}
        >
          {label}
        </span>
      </div>
    </li>
  );
}
