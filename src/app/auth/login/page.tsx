import { LoginForm } from '@/components/forms/login';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const client = await createClient();

  // If a user is already authenticated, redirect them to the home page
  if (client.auth.getUser() !== null) {
    redirect('/');
  }

  return (
    <main className="grid min-h-svh grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col items-center justify-center px-8 py-12">
        <div className="w-full max-w-sm">
          <div>
            <h1 className="text-foreground text-xl font-medium">Anmeldung</h1>
            <p className="text-secondary mt-2 text-sm">
              Melde dich an um auf das CCAT zuzugreifen.
            </p>
          </div>
          <div className="mt-10">
            <LoginForm />
          </div>
          <div className="mt-10">
            <p className="text-secondary text-sm">
              Du hast noch keinen Account?{' '}
              <Link
                href="/auth/register"
                className="text-foreground hover:text-accent font-medium transition-colors"
              >
                Registrieren
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="border-border hidden border-l bg-zinc-50 md:block dark:bg-zinc-950"></div>
    </main>
  );
}
