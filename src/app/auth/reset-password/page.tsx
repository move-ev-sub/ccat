import {
  AuthDescription,
  AuthHeader,
  AuthTitle,
} from '@/components/auth/auth-header';
import { RequestPasswordResetForm } from '@/components/auth/forms/request-password-reset-form';
import { cn } from '@/utils';
import Link from 'next/link';

export default async function ResetPasswordPage() {
  return (
    <section className="container max-w-lg space-y-10">
      <AuthHeader>
        <AuthTitle>Passwort zurücksetzen</AuthTitle>
        <AuthDescription>
          Gib deine E-Mail-Adresse ein und wir senden dir einen Link mit dem du
          dein Passwort zurücksetzen kannst.
        </AuthDescription>
      </AuthHeader>

      <RequestPasswordResetForm />

      <p className="text-secondary text-sm">
        Passwort doch noch im Kopf?{' '}
        <Link
          href={'/auth/login'}
          className={cn(
            'text-accent rounded-md font-medium',
            'focus-indicator'
          )}
        >
          Zurück zur Anmeldung
        </Link>
      </p>
    </section>
  );
}
