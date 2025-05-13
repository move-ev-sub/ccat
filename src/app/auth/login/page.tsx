import {
  AuthDescription,
  AuthHeader,
  AuthTitle,
} from '@/features/auth/ui/auth-header';
import { LoginForm } from '@/features/auth/ui/login-form';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';

export default async function LoginPage() {
  return (
    <section className="container max-w-lg space-y-10">
      <AuthHeader>
        <AuthTitle>Anmelden</AuthTitle>
        <AuthDescription>
          Du hast noch kein Konto?{' '}
          <Link
            href={'/auth/register'}
            className={cn(
              'text-accent rounded-md font-medium',
              'focus-indicator'
            )}
          >
            Jetzt registrieren
          </Link>
        </AuthDescription>
      </AuthHeader>

      <LoginForm />

      <p className="text-secondary text-sm">
        Passwort vergessen?{' '}
        <Link
          href={'/auth/reset-password'}
          className={cn(
            'text-accent rounded-md font-medium',
            'focus-indicator'
          )}
        >
          Jetzt zurücksetzen
        </Link>
      </p>
    </section>
  );
}
