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
import { CreateEventForm } from './forms/create-event-form';

export function CreateEventDialog({
  className,
  ...props
}: React.ComponentProps<typeof DialogTrigger>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} className={className} {...props}>
          Neue Veranstaltung <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="space-y-0">
        <DialogHeader>
          <DialogTitle>Neue Veranstaltung erstellen</DialogTitle>
        </DialogHeader>
        <CreateEventForm className="mt-6" />
      </DialogContent>
    </Dialog>
  );
}
