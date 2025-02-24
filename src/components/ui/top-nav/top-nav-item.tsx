'use client';

import * as React from 'react';

import { cn } from '@/utils';
import Link from 'next/link';

export function TopNavItem({
  className,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      data-slot="top-nav-item"
      data-active={false}
      className={cn(
        'data-[active=true]:text-accent text-foreground focus-visible:ring-ring flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors hover:bg-zinc-200 focus-visible:ring-2 focus-visible:outline-none [&_svg]:size-4',
        className
      )}
      {...props}
    />
  );
}
