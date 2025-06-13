'use client';

import { Button } from '@/components/ui/button';
import { PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils/cn';
import { PlusIcon } from '@heroicons/react/16/solid';
import React from 'react';

interface DataTableFilterTriggerProps
  extends Omit<React.ComponentProps<typeof PopoverTrigger>, 'label'> {
  filterLength: number;
  label: string;
}

export function DataTableFilterTrigger({
  filterLength,
  className,
  label,
  ...props
}: DataTableFilterTriggerProps) {
  return (
    <PopoverTrigger asChild {...props}>
      <Button
        data-slot={'data-table-filter-trigger'}
        variant={'outline'}
        className={cn('border-dashed whitespace-nowrap', className)}
      >
        <PlusIcon />
        {label}
        {filterLength > 0 && (
          <>
            <span className="text-secondary">|</span>
            <span className="text-accent font-semibold">
              {filterLength} Filter
            </span>
          </>
        )}
      </Button>
    </PopoverTrigger>
  );
}
