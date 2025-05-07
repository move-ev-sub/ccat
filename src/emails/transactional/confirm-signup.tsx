import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Row,
  Tailwind,
  Text,
} from '@react-email/components';

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export default function ApplicationConfirm({
  confirmLink,
}: {
  confirmLink: string;
}) {
  return (
    <Tailwind>
      <Head />
      <Html className="bg-zinc-100 font-sans">
        <Body>
          <Preview>Bestätige deine E-Mail-Adresse</Preview>
          <Container className="bg-white px-6 py-8">
            <Heading className="text-2xl font-medium text-zinc-800">
              Bestätige deine E-Mail-Adresse
            </Heading>
            <Text className="text-zinc-500">Hallo!</Text>
            <Text className="text-zinc-500">
              wir freuen uns sehr, dich bei der ConsultingContact willkomen
              heißen zu dürfen. Bevor du dich anmelden kannst, musst du deine
              E-Mail-Adresse bestätigen. Klicke dazu bitte auf den folgenden
              Link:
            </Text>
            <Link href={confirmLink}>Bestätige deine E-Mail-Adresse</Link>
            <Text className="text-zinc-500">
              Sobald deine E-Mail-Adresse bestätigt ist, kannst du dich mit
              deinem Account anmelden und deine Bewerbung einreichen.
            </Text>
            <Text className="text-zinc-500">
              Wir freuen uns darauf, von dir zu hören!
            </Text>
            <Text className="text-zinc-500 italic">
              Dein ConsultingContact Team
            </Text>
          </Container>
          <Container className="mt-4 px-6">
            <Row>
              <Column>
                <Link href={`${baseUrl}/`} className="text-sm">
                  Startseite
                </Link>
              </Column>
              <Column>
                <Link href={`${baseUrl}/`} className="text-sm">
                  Datenschutz
                </Link>
              </Column>
              <Column>
                <Link href={`${baseUrl}/`} className="text-sm">
                  Impressum
                </Link>
              </Column>
            </Row>
            <Text className="text-center text-sm text-zinc-500">
              &copy; {new Date().getFullYear()} move - studentische
              Unternehmenberatung e.V. - Alle Rechte vorbehalten.
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}

ApplicationConfirm.defaultProps = {
  confirmLink: 'https://move.studentenwerk.de',
};
