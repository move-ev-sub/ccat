import { RegisterForm } from '@/components/forms/register';
import Link from 'next/link';

export default async function RegisterPage() {
  return (
    <main className="grid min-h-svh grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col items-center justify-center px-8 py-12">
        <div className="w-full max-w-sm">
          <div>
            <h1 className="text-foreground text-xl font-medium">
              Registrieren
            </h1>
            <p className="text-secondary mt-2 text-sm">
              Erstelle einen Account um Bewerbungen einzureichen.
            </p>
          </div>
          <div className="mt-10">
            <RegisterForm />
          </div>
          <div className="mt-10">
            <p className="text-secondary text-sm">
              Du hast bereits einen Account?{' '}
              <Link
                href="/auth/login"
                className="text-foreground hover:text-accent font-medium transition-colors"
              >
                Anmelden
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="border-border hidden border-l bg-zinc-50 md:block dark:bg-zinc-950"></div>
    </main>
  );
}
