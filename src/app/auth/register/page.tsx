import { RegisterForm } from '@/components/forms/register';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default async function RegisterPage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 px-8">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Registrieren</CardTitle>
          <CardDescription>
            Erstelle einen Account, um Zugriff auf alle Funktionen zu erhalten.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RegisterForm />
        </CardContent>
      </Card>
      <p className="text-secondary text-center text-sm">
        Du hast bereits einen Account?{' '}
        <Link
          href="/auth/login"
          className="text-primary text-foreground hover:text-accent font-medium transition-colors"
        >
          Anmelden
        </Link>
      </p>
    </main>
  );
}
