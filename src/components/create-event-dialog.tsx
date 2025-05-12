'use client';

import { PlusIcon } from '@heroicons/react/16/solid';
import React from 'react';
import { CreateEventForm } from './forms/create-event-form';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

export function CreateEventDialog({
  className,
  ...props
}: React.ComponentProps<typeof DialogTrigger>) {
  const [open, setOpen] = React.useState(false);

  const onError = () => {
    setOpen(false);
  };

  const onSuccess = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'outline'} className={className} {...props}>
          Neue Veranstaltung <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="space-y-0">
        <DialogHeader>
          <DialogTitle>Neue Veranstaltung erstellen</DialogTitle>
        </DialogHeader>
        <CreateEventForm
          className="mt-6"
          onError={onError}
          onSuccess={onSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}
