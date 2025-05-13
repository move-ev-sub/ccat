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
import { cn } from '@/lib/utils/cn';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { requestPasswordReset } from '../services/authService';

const requestPasswordResetFormSchema = z.object({
  email: z
    .string({
      required_error: 'Email ist erforderlich',
    })
    .email({
      message: 'Ungültige E-Mail-Adresse',
    }),
});

export function RequestPasswordResetForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof requestPasswordResetFormSchema>>({
    resolver: zodResolver(requestPasswordResetFormSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(
    values: z.infer<typeof requestPasswordResetFormSchema>
  ) {
    setLoading(true);

    const res = await requestPasswordReset({
      email: values.email,
    });

    if (!res.ok) {
      toast.error(res.error);
      setLoading(false);
      return;
    }

    router.push('/auth/reset-password/request-sent');

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
        <Button
          type="submit"
          disabled={loading}
          className="w-full"
          variant={'accent'}
        >
          {loading ? 'Lädt...' : 'Passwort zurücksetzen'}
        </Button>
      </form>
    </Form>
  );
}
