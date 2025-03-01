'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { uploadTestFile } from '@/server/actions/company';
import {
  ACCEPTED_FILE_TYPES,
  MAX_FILE_COUNT,
  MAX_FILE_SIZE,
  newCompanySchema,
} from '@/server/schemas/company';
import React from 'react';
import { toast } from 'sonner';
import { FileUpload } from '../file-upload';

// // Custom file type that extends the native File type
// interface CustomFile extends File {
//   preview?: string;
// }

// Define the file validation schema with zod
// const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
// const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/svg'];

// Custom validator for the files array
// const fileSchema = z
//   .array(
//     z
//       .custom<CustomFile>((val) => val instanceof File, {
//         message: 'Expected a file object',
//       })
//       .refine((file) => file.size <= MAX_FILE_SIZE, {
//         message: `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
//       })
//       .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
//         message: `File type must be one of: ${ACCEPTED_FILE_TYPES.join(', ')}`,
//       })
//   )
//   .max(3, 'You can upload a maximum of 3 files');

export function CreateNewCompanyForm() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>();

  const form = useForm<z.infer<typeof newCompanySchema>>({
    resolver: zodResolver(newCompanySchema),
    defaultValues: {
      name: '',
      email: '',
      logo: [],
    },
  });

  async function onSubmit(values: z.infer<typeof newCompanySchema>) {
    console.log(values);
    setLoading(true);
    setError(undefined);

    const res = await uploadTestFile(values.logo[0]);

    await toast(
      'Event wurde erfolgreich erstellt. Sie werden in Kürze weitergeleitet.'
    );

    console.log(res);
    console.log(
      'Event wurde erfolgreich erstellt. Sie werden in Kürze weitergeleitet.'
    );

    setLoading(false);
  }

  return (
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
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
  );
}
