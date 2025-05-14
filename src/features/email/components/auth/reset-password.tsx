import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Tailwind,
  Text,
} from '@react-email/components';

interface ResetPasswordEmailProps {
  url: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export default function ResetPasswordEmail({ url }: ResetPasswordEmailProps) {
  return (
    <Tailwind>
      <Html
        className="bg-zinc-100 font-sans"
        style={{
          backgroundColor: '#F4F4F5',
        }}
      >
        <Head />
        <Body className="bg-zinc-100 font-sans">
          <Preview>
            Mit dem folgenden Link kannst du dein Passwort zurücksetzen
          </Preview>
          <Container
            className="bg-white px-6 py-8"
            style={{
              backgroundColor: '#FFFFFF',
            }}
          >
            <Img
              src={`${baseUrl}/move-logo.svg`}
              alt="move - studentische Unternehmensberatung e.V. logo"
              className="h-12 w-fit"
            />
            <Heading className="mt-8 text-xl font-medium text-zinc-800">
              Passwort zurücksetzen
            </Heading>
            <Text className="text-zinc-500">Hallo!</Text>
            <Text className="text-zinc-500">
              Du hast dein Passwort vergessen? Kein Problem! Mit dem folgenden
              Link kannst du dein Passwort zurücksetzen:
            </Text>

            <Link href={url} className="text-blue-500">
              {url}
            </Link>

            <Text className="text-zinc-500">
              Wenn du kein Passwort zurücksetzen möchtest, kannst du diese
              E-Mail einfach ignorieren.
            </Text>
            <Text className="text-zinc-500">
              Bei Fragen oder Problemen, kannst du dich jederzeit an uns wenden.
            </Text>
            <Text className="text-zinc-500">Dein move Team</Text>
          </Container>
          <Container className="mt-10 px-6 py-0">
            <Row>
              <Column>
                <Link
                  href={`${baseUrl}/`}
                  className="w-full text-center text-sm"
                >
                  Login
                </Link>
              </Column>

              <Column>
                <Link
                  href={`${baseUrl}/`}
                  className="w-full text-center text-sm"
                >
                  Startseite
                </Link>
              </Column>

              <Column>
                <Link
                  href={`${baseUrl}/`}
                  className="w-full text-center text-sm"
                >
                  Impressum
                </Link>
              </Column>

              <Column>
                <Link
                  href={`${baseUrl}/`}
                  className="w-full text-center text-sm"
                >
                  Datenschutz
                </Link>
              </Column>
              <Column>
                <Link
                  href={`${baseUrl}/`}
                  className="w-full text-center text-sm"
                >
                  Kontakt
                </Link>
              </Column>
            </Row>
            <Text className="text-xs text-zinc-600">
              Du erhältst diese E-Mail, weil du dich versucht hast, dein
              Passwort zurückzusetzen. Solltest du nicht versucht haben, dein
              Passwort zurückzusetzen, kannst du diese E-Mail einfach
              ignorieren.
            </Text>
            <Text className="text-xs text-zinc-600">
              &copy; {new Date().getFullYear()} move - studentische
              Unternehmensberatung e.V., Universitätsstraße 14, 48143 Münster -
              Alle Rechte vorbehalten.
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}

ResetPasswordEmail.defaultProps = {
  url: 'https://move.uni-muenster.de',
} satisfies ResetPasswordEmailProps;
