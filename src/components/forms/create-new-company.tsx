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
import { newEventSchema } from '@/server/schemas/event';
import React from 'react';
import { toast } from 'sonner';
import { Textarea } from '../ui/textarea';
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

const formSchema = newEventSchema.extend({
  logo: z.array(z.instanceof(File)),
});

export function CreateNewCompanyForm() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      status: 'draft',
      logo: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
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
              <FormLabel>Eventname</FormLabel>
              <FormControl>
                <Input placeholder="Consulting Contact 2025" {...field} />
              </FormControl>
              <FormDescription>
                Dies ist der Name des Events, der öffentlich angezeigt wird.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Beschreibung</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Die Consulting Contact 2025 wird organisiert von move e.V. und ..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Gib eine optionale Beschreibung des Events an. Diese ist
                öffentlich sichtbar.
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
                <FormLabel>logo</FormLabel>
                <FormControl>
                  <FileUpload
                    value={field.value}
                    onValueChange={field.onChange}
                    maxFileCount={4}
                    maxSize={4 * 1024 * 1024}
                    // progresses={progresses}
                    // pass the onUpload function here for direct upload
                    // onUpload={uploadFiles}
                    // disabled={isUploading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              {/* {uploadedFiles.length > 0 ? (
                <UploadedFilesCard uploadedFiles={uploadedFiles} />
              ) : null} */}
            </div>
          )}
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Lädt...' : 'Veranstaltung erstellen'}
        </Button>
        <FormError visible={!!error} message={error} />
      </form>
    </Form>
  );
}
