import { cn } from '@/lib/utils/cn';
import { ChevronRightIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import React from 'react';

export function Crumb({
  className,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <>
      <Link
        data-slot={'crumb'}
        className={cn(
          'text-foreground hover:text-accent text-sm font-medium [&_svg]:size-4',
          className
        )}
        {...props}
      />
      <ChevronRightIcon className="text-secondary size-4 last:hidden" />
    </>
  );
}
