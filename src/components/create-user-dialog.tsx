'use client';

import { UserPlusIcon } from '@heroicons/react/16/solid';
import { CreateUserForm } from './forms/create-user-form';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

export function CreateUserDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'}>
          Nutzer anlegen <UserPlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Neuen Nutzer anlegen</DialogTitle>
        </DialogHeader>
        <CreateUserForm className="mt-6" />
      </DialogContent>
    </Dialog>
  );
}
