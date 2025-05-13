'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signInWithPassword } from '@/server/services/auth';
import { cn } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const loginFormSchema = z.object({
  email: z
    .string({
      required_error: 'Email ist erforderlich',
    })
    .email({
      message: 'Ungültige E-Mail-Adresse',
    }),
  password: z
    .string({
      required_error: 'Passwort ist erforderlich',
    })
    .min(6, {
      message: 'Passwort muss mindestens 6 Zeichen lang sein',
    }),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const [loading, setLoading] = React.useState(false);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setLoading(true);

    const res = await signInWithPassword(values.email, values.password);

    if (!res.ok) {
      toast.error(res.error);
    }

    setLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('space-y-6', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="max@mustermann.de"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passwort</FormLabel>
              <FormControl>
                <Input type="password" placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={loading}
          className="w-full"
          variant={'accent'}
        >
          {loading ? 'Lädt...' : 'Anmelden'}
        </Button>
      </form>
    </Form>
  );
}
