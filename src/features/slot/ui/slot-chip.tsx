import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Slot } from '@/generated/prisma/client';
import { cn } from '@/lib/utils/cn';
import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/16/solid';
import { format } from 'date-fns';
import React from 'react';

export function SlotChip({
  value,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  value: Slot;
}) {
  return (
    <div
      data-slot={'slot-chip'}
      className={cn(
        'border-b-border-secondary flex items-center rounded-md border shadow-xs',
        className
      )}
      {...props}
    >
      <div className="flex h-8 items-center justify-center border-r px-3 py-1.5">
        <span className="text-foreground block text-sm font-medium">
          {format(value.startDate, 'HH:mm')} - {format(value.endDate, 'HH:mm')}
        </span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="focus-indicator bg-background-muted flex size-8 items-center justify-center focus-visible:rounded-md">
            <EllipsisVerticalIcon className="text-secondary size-4" />
            <span className="sr-only">Slot bearbeiten</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <PencilIcon />
            Bearbeiten
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive">
            <TrashIcon />
            Löschen
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
