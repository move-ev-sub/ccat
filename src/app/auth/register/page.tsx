import {
  AuthDescription,
  AuthHeader,
  AuthTitle,
} from '@/components/auth/auth-header';
import { RegisterForm } from '@/components/auth/forms/register-form';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';

export default async function RegisterPage() {
  return (
    <section className="container max-w-lg space-y-10">
      <AuthHeader>
        <AuthTitle>Registrieren</AuthTitle>
        <AuthDescription>
          Du hast bereits ein Konto?{' '}
          <Link
            href={'/auth/login'}
            className={cn(
              'text-accent rounded-md font-medium',
              'focus-indicator'
            )}
          >
            Jetzt anmelden
          </Link>
        </AuthDescription>
      </AuthHeader>

      <RegisterForm />

      <p className="text-secondary text-sm">
        Du hast Probleme mit der Registrierung?{' '}
        <Link
          href={'mailto:support@app.consultingcontact.de'}
          className={cn(
            'text-accent rounded-md font-medium',
            'focus-indicator'
          )}
        >
          Kontaktiere uns
        </Link>
      </p>
    </section>
  );
}
