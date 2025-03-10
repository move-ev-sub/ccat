'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog';
import { buttonVariants } from './button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from './form';
import { Input } from './input';

const confirmDestructiveSchema = z.object({
  audit: z.string(),
});

/**
 * The ConfirmDestructive component renders a alert dialog that asks the user to
 * confirm a destructive action. The user has to enter a specific audit text to
 * confirm the action. This component is used to prevent accidental destructive
 * actions.
 *
 * Only when the user has entered the correct audit text, the confirm button is
 * enabled and the action can be confirmed. Otherwise, the confirm button is
 * disabled.
 */
export function ConfirmDestructive({
  onSuccess,
  onDiscard,
  auditText = 'Confirm',
  title = 'Bist du sicher, dass du das tun möchtest?',
  description = 'Diese Aktion ist final und kann nicht rückgängig gemacht werden.',
  children,
  ...props
}: Omit<React.ComponentProps<typeof AlertDialog>, 'open' | 'onOpenChange'> & {
  /**
   * Callback for when the action is confirmed. This can only be called
   * when the user has entered the correct audit text.
   */
  onSuccess?: () => void;

  /**
   * Callback for when the action is discarded. Can be used to close the
   * dialog or perform other actions.
   */
  onDiscard?: () => void;

  /**
   * The audit text that the user has to enter to confirm the action.
   *
   * @default "Confirm"
   */
  auditText?: string;

  /**
   * The title of the dialog.
   *
   * @default "Bist du sicher, dass du das tun möchtest?"
   */
  title?: string;

  /**
   * The description of the dialog.
   *
   * @default "Diese Aktion ist final und kann nicht rückgängig gemacht werden."
   */
  description?: string;
}) {
  const form = useForm<z.infer<typeof confirmDestructiveSchema>>({
    resolver: zodResolver(confirmDestructiveSchema),
    defaultValues: {
      audit: '',
    },
  });

  // Can't destruct directly because FormFields need the complete form object
  const { watch } = form;

  // State to check if the audit field is correct
  const [auditSuccess, setAuditSucces] = React.useState(false);

  // Watch the audit field and check if the value is equal to the audit text
  React.useEffect(() => {
    watch((value) => setAuditSucces(value.audit === auditText));
  }, [watch, auditText]);

  return (
    <AlertDialog {...props}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogBody>
          <Form {...form}>
            <form className="space-y-6">
              <FormField
                control={form.control}
                name="audit"
                render={({ field }) => (
                  <FormItem>
                    <FormDescription className="text-secondary mb-2 text-sm">
                      Bestätige diese Aktion, indem du &qout;
                      <span className="text-foreground font-medium">
                        {auditText}
                      </span>
                      &qout; in das Feld unten eingibst (ohne
                      Anführungszeichen).
                    </FormDescription>
                    <FormControl>
                      <Input placeholder={auditText} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </AlertDialogBody>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onDiscard}>Abbrechen</AlertDialogCancel>
          <AlertDialogAction
            disabled={!auditSuccess} // only enable the button when the audit is correct
            onClick={onSuccess}
            className={buttonVariants({ variant: 'destructive' })}
          >
            Bestätigen
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
