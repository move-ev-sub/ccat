'use client';

import { EditSlotForm } from '@/components/forms/edit-slot';
import { Button } from '@/components/ui/button';
import { ConfirmDestructive } from '@/components/ui/confirm-destructive';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/utils';
import { EllipsisVerticalIcon, TrashIcon } from '@heroicons/react/16/solid';
import { Slot } from '@prisma/client';
import { format } from 'date-fns';
import React from 'react';

export function SlotItem({
  className,
  slot,
  ...props
}: Omit<React.ComponentProps<'div'>, 'slot'> & { slot: Slot }) {
  const formattedTime = `${format(slot.startDate, 'HH:mm')} - ${format(slot.endDate, 'HH:mm')}`;

  return (
    <div
      data-slot={'slot-item'}
      className={cn(
        'flex w-fit items-center justify-center text-sm font-medium',
        className
      )}
      {...props}
    >
      <span className="border-border flex h-9 items-center justify-center rounded-l-md border border-r-0 px-2.5 py-1.5">
        {formattedTime}
      </span>
      <Sheet>
        <SheetTrigger asChild>
          <button
            className={cn(
              'border-border bg-background-muted h-9 cursor-pointer rounded-r-md border px-2.5 py-1.5',
              'focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
            )}
          >
            <EllipsisVerticalIcon className="text-foreground size-4" />
          </button>
        </SheetTrigger>
        <SheetContent sheetTitle="Slot bearbeiten" side="right">
          <div className="border-border border-b p-6">
            <p className="text-foreground text-lg font-medium">
              Slot bearbeiten
            </p>
            <p className="text-secondary mt-1 text-sm">
              Erstellt am {format(slot.createdAt, 'dd.MM.yyyy')}
            </p>
          </div>
          <div className="p-6">
            <EditSlotForm
              slot={{
                createdAt: new Date(),
                endDate: new Date(),
                eventId: '',
                id: '',
                startDate: new Date(),
                createdById: '',
              }}
            />
          </div>
          <div className="border-border border-t p-6">
            <Label>Slot löschen</Label>
            <p className="text-secondary mt-1 text-sm">
              Wenn du diesen Slot löschst, wird er unwiderruflich gelöscht. Das
              kann nicht rückgängig gemacht werden.
            </p>
            <ConfirmDestructive>
              <Button variant={'destructive'} className="mt-4">
                <TrashIcon /> Löschen
              </Button>
            </ConfirmDestructive>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
