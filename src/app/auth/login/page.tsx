import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
          <div className="space-y-2">
            <Label htmlFor="email" className="block">
              E-Mail
            </Label>
            <Input id="email" type="email" placeholder="max@mustermann.de" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="block">
              Passwort
            </Label>
            <Input id="password" type="password" placeholder="********" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Anmelden</Button>
        </CardFooter>
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
