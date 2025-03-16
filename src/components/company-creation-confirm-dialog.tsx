'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ClipboardIcon } from '@heroicons/react/16/solid';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import React from 'react';
import { Label } from './ui/label';

/**
 * The CompanyCreationConfirmDialog component is the alert dialog
 * which is displayed when a new company has been created. It shows
 * the password of the new company and allows the user to copy it
 * to the clipboard.
 */
export function CompanyCreationConfirmDialog({
  password,
  onConfirm,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root> & {
  /**
   * The password of the new company. Provided by the server.
   */
  password: string;

  /**
   * A callback that is called when the user confirms the dialog.
   */
  onConfirm: () => void;
}) {
  /**
   * Copies the provided password to the clipboard.
   */
  const onCopy = React.useCallback(() => {
    navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Ein neues Unternehmen wurde erstellt
          </AlertDialogTitle>
          <AlertDialogDescription>
            Das neue Unternehmen wurde erfolgreich erstellt. Das Unternehmen
            kann sich nun mit der angegebenen E-Mail-Adresse und dem folgendem
            Passwort einloggen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogBody className="w-full max-w-full overflow-hidden">
          <div>
            {/* onCopy Action is also called when the label is clicked */}
            <Label className="mb-2 block" htmlFor="copyPassword">
              Passwort
            </Label>
            <div className="flex items-center justify-start gap-2.5">
              <div className="border-border-secondary text-foreground bg-background-muted group grow rounded-lg border border-dashed px-3 py-1.5 text-start text-sm font-medium">
                {/**
                 * The actual password is only displayed when the group is hovered.
                 * Otherwise, the password is displayed as a series of dots.
                 */}
                <span className="hidden group-hover:block">{password}</span>
                <span className="block group-hover:hidden">
                  {'•'.repeat(password.length)}
                </span>
              </div>
              <button
                id="copyPassword"
                onClick={onCopy}
                className="border-border active:bg-background-muted hover:bg-background-muted cursor-pointer rounded-lg border p-2 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2"
              >
                <ClipboardIcon className="size-4" />
              </button>
            </div>
            <span className="text-destructive mt-2 block text-xs font-medium">
              Achtung: Das Passwort wird dir nur einmalig angezeigt. Bitte
              kopiere und speichere es sicher ab.
            </span>
          </div>
        </AlertDialogBody>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onConfirm}>Weiter</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
