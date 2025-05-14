'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { CreateNewSlotForm } from '@/features/slot/ui/create-slot-form';
import { useEventId } from '@/hooks/use-event-id';
import { PlusIcon } from '@heroicons/react/16/solid';
import React from 'react';

export function AddSlotButton({
  ...props
}: React.ComponentProps<typeof Sheet>) {
  const [open, setOpen] = React.useState(false);
  const eventId = useEventId();

  // TODO: handle case where eventId is null
  if (!eventId) return null;

  return (
    <Sheet open={open} onOpenChange={setOpen} {...props}>
      <SheetTrigger asChild>
        <Button variant={'outline'} className="h-9">
          Hinzufügen <PlusIcon />
        </Button>
      </SheetTrigger>
      <SheetContent sheetTitle="Slot hinzufügen" side="right">
        <div className="px-6 py-12">
          <p className="text-foreground font-medium">Slot hinzufügen</p>
          <Separator className="mt-4 mb-6" />
          <CreateNewSlotForm eventId={eventId} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
