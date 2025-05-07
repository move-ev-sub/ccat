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

export default function ApplicationConfirm() {
  return (
    <Tailwind>
      <Head />
      <Html className="bg-zinc-100 font-sans">
        <Body>
          <Preview>move - Bewerbung bestätigt</Preview>
          <Container className="bg-white px-6 py-8">
            <Heading className="text-2xl font-medium text-zinc-800">
              Willkommen bei move
            </Heading>
            <Text className="text-zinc-500">
              Vielen Dank für deine Bewerbung bei move.
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
