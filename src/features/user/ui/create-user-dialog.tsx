'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CreateUserForm } from '@/features/user/ui/forms/create-user-form';
import { UserPlusIcon } from '@heroicons/react/16/solid';

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
