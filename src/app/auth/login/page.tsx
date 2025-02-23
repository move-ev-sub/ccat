import { LoginForm } from '@/components/forms/login';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default async function LoginPage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 px-8">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Melde dich an um auf das CCAT zuzugreifen.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <LoginForm />
        </CardContent>
      </Card>
      <p className="text-secondary text-center text-sm">
        Du hast noch keinen Account?{' '}
        <Link
          href="/auth/register"
          className="text-primary text-foreground hover:text-accent font-medium transition-colors"
        >
          Registrieren
        </Link>
      </p>
    </main>
  );
}
