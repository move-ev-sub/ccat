'use client';

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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { updateOwnSettings } from '@/features/user/services/userService';
import { auth } from '@/lib/api/auth';
import { cn } from '@/lib/utils/cn';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  firstName: z.string().min(1, {
    message: 'Vorname ist erforderlich',
  }),
  lastName: z.string().min(1, {
    message: 'Nachname ist erforderlich',
  }),
  email: z.string().email({
    message: 'Ungültige E-Mail-Adresse',
  }),
  notifyMe: z.boolean().optional(),
  emailReminders: z.boolean().optional(),
});

export function PersonalSettingsForm({
  className,
  user,
  ...props
}: React.ComponentProps<'form'> & {
  user: (typeof auth.$Infer.Session)['user'];
}) {
  const [loading, setLoading] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      emailReminders: user.emailReminders,
      notifyMe: user.notifyMe,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!form.formState.isDirty) {
      return;
    }

    setLoading(true);

    const res = await updateOwnSettings({
      firstName: values.firstName,
      lastName: values.lastName,
      notifyMe: values.notifyMe ?? false,
      emailReminders: values.emailReminders ?? false,
    });

    if (!res.ok) {
      toast.error(res.error);
      setLoading(false);
      return;
    }

    form.reset(values);
    toast.success('Einstellungen wurden gespeichert.');

    setLoading(false);
  }

  const triggerSubmit = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { bubbles: true }));
    }
  };

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === 's') {
        triggerSubmit();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('space-y-20', className)}
        ref={formRef}
        {...props}
      >
        {/* ============================ PERSONAL INFORMATION ============================ */}
        <FormSection id="personal-information">
          <FormSectionDescriptionCell>
            <FormSectionTitle>Persönliche Informationen</FormSectionTitle>
          </FormSectionDescriptionCell>

          <FormSectionContentCell>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vorname</FormLabel>
                  <FormControl>
                    <Input placeholder="Max" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nachname</FormLabel>
                  <FormControl>
                    <Input placeholder="Mustermann" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>E-Mail</FormLabel>
                  <FormControl aria-disabled={true}>
                    <Input
                      disabled
                      placeholder="m.mustermann@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Derzeit kannst du deine E-Mail-Adresse nicht ändern. Wenn du
                    deine E-Mail ändern musst, wende dich bitte an unser Support
                    Team.
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />
          </FormSectionContentCell>
        </FormSection>

        <Separator />

        {/* ============================ NOTIFICATIONS ============================ */}
        <FormSection id="notifications">
          <FormSectionDescriptionCell>
            <FormSectionTitle>Benachrichtigungen</FormSectionTitle>
          </FormSectionDescriptionCell>

          <FormSectionContentCell className="block space-y-8">
            <FormField
              control={form.control}
              name="emailReminders"
              render={({ field }) => (
                <FormItem className="flex items-start justify-start gap-4">
                  <FormControl className="shrink-0">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="grow space-y-2">
                    <FormLabel>E-Mail Benachrichtigungen</FormLabel>
                    <FormDescription>
                      Wir senden dir E-Mails, wenn du in unserer App etwas
                      passiert.
                    </FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notifyMe"
              render={({ field }) => (
                <FormItem className="flex items-start justify-start gap-4">
                  <FormControl className="shrink-0">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="grow space-y-2">
                    <FormLabel>Erinnerungen</FormLabel>
                    <FormDescription>
                      Wir lassen dich nicht vergessen, wenn du etwas wichtiges
                      vergessen hast oder ein wichtiges Ereignis ansteht.
                    </FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </FormSectionContentCell>
        </FormSection>

        <Separator />

        {/* ============================ SECURITY ============================ */}
        <FormSection id="security">
          <FormSectionDescriptionCell>
            <FormSectionTitle>Sicherheit</FormSectionTitle>
          </FormSectionDescriptionCell>

          <FormSectionContentCell>
            <div className="col-span-2 space-y-2">
              <Label className="block">Benutzerrolle</Label>
              <Select value={user.role ?? undefined} disabled>
                <SelectTrigger>
                  <SelectValue placeholder="Rolle nicht festgelegt" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="company">Unternehmen</SelectItem>
                  <SelectItem value="user">Benutzer</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-secondary max-w-prose text-xs">
                Deine Benutzerrolle kann nur durch einen Administrator geändert
                werden. Deine eigene Rolle kannst du nicht selbst ändern.
              </p>
            </div>
            <div className="col-span-2 space-y-2">
              <Label className="block">Passwort</Label>
              <Input type="password" value={'******************'} disabled />

              <p className="text-secondary max-w-prose text-xs">
                Aus Sicherheitsgründen kannst du dein Passwort nicht anzeigen.
                Wenn du dein Passwort ändern möchtest, kannst du hier ein{' '}
                <Link
                  className="text-accent focus-indicator rounded-md font-medium"
                  href="/auth/password"
                >
                  neues Passwort festlegen{' '}
                </Link>
                .
              </p>
            </div>
          </FormSectionContentCell>
        </FormSection>

        <Separator />

        {/* ============================ DANGER ZONE ============================ */}
        <FormSection id="danger-zone">
          <FormSectionDescriptionCell>
            <FormSectionTitle>Gefahrenzone</FormSectionTitle>
          </FormSectionDescriptionCell>

          <FormSectionContentCell className="block">
            <div className="flex items-start justify-between gap-8 rounded-md bg-red-50 p-6 dark:bg-red-950">
              <div className="space-y-2">
                <Label className="block">Konto löschen</Label>
                <p className="text-secondary max-w-prose text-xs">
                  Wenn du dein Konto löschst, werden alle deine Daten
                  unwiederruflich gelöscht. Diese Aktion kann nicht rückgängig
                  gemacht werden.
                </p>
              </div>
              <Button variant="destructive" className="whitespace-nowrap">
                Konto löschen
              </Button>
            </div>
          </FormSectionContentCell>
        </FormSection>
        <div
          data-active={form.formState.isDirty}
          className={cn(
            'border-border-secondary bg-background-muted fixed bottom-12 left-1/2 flex w-[calc(100%-4rem)] -translate-x-1/2 transform items-center justify-center gap-4 rounded-lg border p-1.5 pl-3 text-sm font-medium sm:w-fit',
            'transition-transform',
            'data-[active=false]:translate-y-32'
          )}
        >
          <p className="whitespace-nowrap">Du hast ungespeicherte Änderungen</p>
          <Button
            data-loading={loading}
            className="group relative rounded-md"
            type="submit"
            disabled={loading}
            onSelect={triggerSubmit}
          >
            <span
              aria-hidden={loading}
              className="flex items-center gap-3 group-data-[loading=true]:opacity-0"
            >
              Speichern
              <span className="border-background/40 bg-background/10 block rounded-sm border px-1.5 py-0.5 text-xs">
                ⌘S
              </span>
            </span>
            <span className="absolute inset-0 flex h-full w-full items-center justify-center opacity-0 group-data-[loading=true]:opacity-100">
              Lädt...
            </span>
          </Button>
        </div>
      </form>
    </Form>
  );
}

function FormSection({ className, ...props }: React.ComponentProps<'section'>) {
  return (
    <section
      data-slot={'form-section'}
      className={cn(
        'grid grid-cols-1 gap-8 sm:grid-cols-3 md:grid-cols-4',
        className
      )}
      {...props}
    />
  );
}

function FormSectionDescriptionCell({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot={'form-section-description-cell'}
      className={cn('md:col-span-2', className)}
      {...props}
    />
  );
}

function FormSectionTitle({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot={'form-section-title'}
      className={cn('text-foreground text-base font-medium', className)}
      {...props}
    />
  );
}

function FormSectionContentCell({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot={'form-section-content-cell'}
      className={cn(
        'grid grid-cols-1 gap-8 sm:col-span-2 sm:grid-cols-2',
        className
      )}
      {...props}
    />
  );
}
