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
        <AuthTitle>Bitte bestätige deine E-Mail-Adresse</AuthTitle>
        <AuthDescription>
          Vielen Dank für deine Registrierung! Bevor du dich anmelden kannst,
          musst du deine E-Mail-Adresse bestätigen. Wir haben dir eine E-Mail
          mit einem Link zum Bestätigen deiner E-Mail-Adresse geschickt. Es kann
          ein paar Minuten dauern, bis du die E-Mail erhältst.
        </AuthDescription>
      </AuthHeader>
      <Button asChild variant={'accent'}>
        <Link href={'/'}>
          Bereits bestätigt? Zur Anmeldung
          <ArrowRightIcon />
        </Link>
      </Button>
    </section>
  );
}
