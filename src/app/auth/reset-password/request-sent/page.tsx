import { Button } from '@/components/ui/button';
import {
  AuthDescription,
  AuthHeader,
  AuthTitle,
} from '@/features/auth/ui/auth-header';
import { ArrowRightIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';

export default async function PasswordResetRequestSentPage() {
  return (
    <section className="container max-w-lg space-y-10">
      <AuthHeader>
        <AuthTitle>Link wurde gesendet 🎉</AuthTitle>
        <AuthDescription>
          Wenn eine E-Mail-Adresse mit deinem Kontoname in unserer Datenbank
          gefunden wird, haben wir dir einen Link zum Zurücksetzen deines
          Passworts geschickt.
        </AuthDescription>
      </AuthHeader>
      <Button asChild variant={'accent'}>
        <Link href={'/'}>
          Zurück zur Anmeldung
          <ArrowRightIcon />
        </Link>
      </Button>
    </section>
  );
}
