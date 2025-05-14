'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PlusIcon } from '@heroicons/react/16/solid';
import React from 'react';
import { CreateNewSlotForm } from './create-slot-form';

export function CreateSlotDialog({
  className,
  eventId,
  ...props
}: React.ComponentProps<typeof DialogTrigger> & {
  eventId: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} className={className} {...props}>
          Neuer Slot <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="space-y-0">
        <DialogHeader>
          <DialogTitle>Erstelle einen neuen Slot</DialogTitle>
        </DialogHeader>
        <CreateNewSlotForm className="mt-6" eventId={eventId} />
      </DialogContent>
    </Dialog>
  );
}
