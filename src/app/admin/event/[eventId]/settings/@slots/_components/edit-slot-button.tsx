'use client';

import { EditSlotForm } from '@/components/forms/edit-slot';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { PencilIcon } from '@heroicons/react/16/solid';
import React from 'react';

export function EditSlotButton({}) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <DropdownMenuItem onSelect={() => setOpen(true)}>
        <PencilIcon /> Bearbeiten
      </DropdownMenuItem>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side={'right'} sheetTitle="Slot bearbeiten">
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
          <div className=""></div>
        </SheetContent>
      </Sheet>
    </>
  );
}
