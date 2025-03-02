'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormError,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createCompany } from '@/server/actions/company';
import {
  ACCEPTED_FILE_TYPES,
  MAX_FILE_COUNT,
  MAX_FILE_SIZE,
  newCompanySchema,
} from '@/server/schemas/company';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { CompanyCreationConfirmDialog } from '../company-creation-confirm-dialog';
import { FileUpload } from '../file-upload';

/**
 * This is the type definition for the data object, which is used to store the
 * returned data from the server, as well as the open state of the alert dialog.
 */
type TData = {
  /**
   * The ID of the newly created company.
   *
   * @type {string}
   * @default undefined
   */
  id?: string;

  /**
   * The password of the newly created company.
   *
   * @type {string}
   * @default undefined
   */
  password?: string;

  /**
   * The open state of the alert dialog. This is used to determine whether the
   * alert dialog should be open or not.
   *
   * @type {boolean}
   * @default false
   */
  open: boolean;
};

/**
 * The CreateNewCompanyForm component handles form submissions for the creation
 * of new companies. The user needs to enter the name, email, and logo of the
 * company.
 *
 * After all values are entered, the user can submit the form which will trigger
 * a server action to create the company. If the company is successfully created,
 * the user will be presented with a dialog containing the password of the newly
 * created company. This password will only be shown once and can be used to log
 * into the company account.
 *
 * After the user confirms thaht they have saved the password, they will be
 * redirected to the newly created company's settings page. The company can now
 * login with the provided email and password.
 */
export function CreateNewCompanyForm() {
  /**
   * The loading state of the form. This is used to determine whether the form
   * is currently loading or not. If the form is loading, the submit button will
   * be disabled and display a loading indicator. This also disables the form
   * from being submitted multiple times.
   */
  const [loading, setLoading] = React.useState(false);

  /**
   * The error state of the form. This is used to display an error message if
   * an error occurs during the form submission. If an error occurs, the error
   * message will be displayed to the user and the form will not be submitted.
   *
   * This is not equivalent to error message from form validation. This is used
   * to display an error message if an error occurs during the form submission.
   */
  const [error, setError] = React.useState<string | undefined>();

  /**
   * The data state of the form. This is used to store the returned data from
   * the server, as well as the open state of the alert dialog. If the company
   * is successfully created, the data object will be updated with the returned
   * data from the server.
   */
  const [data, setData] = React.useState<TData>({
    open: false,
  });

  const router = useRouter();

  const form = useForm<z.infer<typeof newCompanySchema>>({
    resolver: zodResolver(newCompanySchema),
    defaultValues: {
      name: '',
      email: '',
      logo: [],
    },
  });

  /**
   * This function handles the form submission. When the user submits the form,
   * the form values will be validated and sent to the server to create the
   * company. If the company is successfully created, the alert dialog with the
   * password will be shown.
   *
   *
   * @param {z.infer<typeof newCompanySchema>} values The form values to be submitted.
   * @returns {Promise<void>}
   */
  async function onSubmit(
    values: z.infer<typeof newCompanySchema>
  ): Promise<void> {
    console.log(values);
    setLoading(true);
    setError(undefined);

    const res = await createCompany(values);

    if (res.status === 'error') {
      toast.error(res.error || 'Ein unbekannter Fehler ist aufgetreten.');
      setError(res.error);
      setLoading(false);
      return;
    }

    form.reset();
    setLoading(false);

    // This is not really a clean way to do this, but it works for now...
    setData({
      ...data,
      ...res.data,
      open: true, // This opens the alert dialog and displays the password.
    });
  }

  return (
    <>
      {/* The alert Dialog with the password */}
      <CompanyCreationConfirmDialog
        open={data.open}
        onOpenChange={(open) => setData({ ...data, open })}
        password={data.password ?? 'Password not available'}
        onConfirm={() =>
          // After the user confirms that they have saved the password, they will
          // be redirected to the newly created company's settings page.
          router.push(`/admin/settings/companies/company/${data.id}`)
        }
      />
      {/* The actual form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Bearing Point" {...field} />
                </FormControl>
                <FormDescription>
                  Name des Unternehmens. Dieser ist für Nutzer sichtbar.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="mk@" {...field} />
                </FormControl>
                <FormDescription>
                  Diese E-Mail wird ausschließlich für den Login verwendet. Hier
                  kann auch eine nicht-existierende E-Mail-Adresse eingegeben
                  werden.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <div className="space-y-6">
                <FormItem className="w-full">
                  <FormLabel>Logo</FormLabel>
                  <FormControl>
                    <FileUpload
                      value={field.value}
                      onValueChange={field.onChange}
                      accept={ACCEPTED_FILE_TYPES}
                      maxFileCount={MAX_FILE_COUNT}
                      maxSize={MAX_FILE_SIZE}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Lädt...' : 'Unternehmen erstellen'}
          </Button>
          <FormError visible={!!error} message={error} />
        </form>
      </Form>
    </>
  );
}
