'use client';

import { GeneratePasswordInput } from '@/components/generate-passsword-input';
import { RequiredMark } from '@/components/required-mark';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils/cn';
import { createUser } from '@/server/services/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { createUserSchema } from '../../validations';

export function CreateUserForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: 'user',
      autoConfirmEmail: false,
    },
  });

  async function onSubmit(values: z.infer<typeof createUserSchema>) {
    setLoading(true);

    const res = await createUser({
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
      role: values.role,
    });

    if (!res.ok) {
      toast.error(res.error);
      setLoading(false);
      return;
    }

    toast.success('Nutzer erfolgreich erstellt');
    router.push(`/admin/users/${res.data.id}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid grid-cols-2 gap-6', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Vorname
                <RequiredMark />
              </FormLabel>
              <FormControl>
                <Input placeholder="Kevin" {...field} />
              </FormControl>
              <FormDescription>
                Wenn du eine neue Firma erstellst, kannst du hier den Namen der
                Firma eingeben.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nachname
                <RequiredMark />
              </FormLabel>
              <FormControl>
                <Input placeholder="Großkreuz" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>
                Email
                <RequiredMark />
              </FormLabel>
              <FormControl>
                <Input placeholder="kevin@großkreuz.de" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>
                Passwort
                <RequiredMark />
              </FormLabel>
              <FormControl>
                <GeneratePasswordInput placeholder="************" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>
                Rolle
                <RequiredMark />
              </FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Rolle auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">Benutzer</SelectItem>
                    <SelectItem value="company">Unternehmen</SelectItem>
                    <SelectItem value="admin" disabled>
                      Administrator
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="autoConfirmEmail"
          render={({ field }) => (
            <FormItem className="col-span-2 flex items-start justify-start gap-3">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled
                />
              </FormControl>
              <div className="space-y-2">
                <FormLabel className="cursor-not-allowed">
                  E-Mail automatisch bestätigt
                </FormLabel>
                <FormDescription>
                  Wenn diese Option aktiviert ist, wird die E-Mail des Nutzers
                  automatisch bestätigt. (Diese Funktion ist derzeit nicht
                  verfügbar)
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={loading}
          className="col-span-2 w-full"
          variant={'accent'}
        >
          {loading ? 'Lädt...' : 'Nutzer erstellen'}
        </Button>
      </form>
    </Form>
  );
}
