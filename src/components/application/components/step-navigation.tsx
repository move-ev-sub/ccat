'use client';

import { cn } from '@/lib/utils/cn';
import { ApplicationRoutes } from '@/utils/consts';
import Link from 'next/link';
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

/**
 * Renders a list with all steps of the application process. This is used to
 * show the user where they are in the application process and what they have
 * to do next.
 *
 * @example
 * ```tsx
 * <StepNavigation />
 * ```
 */
export function StepNavigation({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul className={cn('space-y-6', className)} {...props}>
      {ITEMS.map((item, index) => (
        <StepItem key={item.href} index={index} {...item} />
      ))}
    </ul>
  );
}

function StepItem({
  label,
  href,
  index,
  ...props
}: React.ComponentProps<'li'> & {
  label: string;
  href: string;
  index: number;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <li {...props}>
      <Link
        data-state={active ? 'active' : 'inactive'}
        href={href}
        className={cn('group flex items-center justify-start gap-2 text-sm')}
      >
        <span
          className={cn(
            'border-border-secondary text-secondary focus-indicator flex size-5 items-center justify-center rounded-sm border shadow-xs transition-colors',
            'group-data-[state=active]:border-accent group-data-[state=active]:bg-accent group-data-[state=active]:text-white'
          )}
        >
          {index + 1}
        </span>
        <span className="group-data-[state=active]:text-accent font-medium transition-colors">
          {label}
        </span>
      </Link>
    </li>
  );
}
