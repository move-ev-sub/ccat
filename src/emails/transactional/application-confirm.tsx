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

interface ApplicationConfirmEmailProps {
  name: string;
  eventName: string;
  subEvents: string[];
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export default function ApplicationConfirmEmail({
  name,
  eventName,
  subEvents,
}: ApplicationConfirmEmailProps) {
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
            Deine Bewerbung für {eventName} wurde erfolgreich abgeschickt.
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
              Bewerbung erfolgreich abgeschickt
            </Heading>
            <Text className="text-zinc-500">Hallo {name},</Text>
            <Text className="text-zinc-500">
              vielen Dank für deine Bewerbung für die Veranstaltung {eventName}.
              Mit dieser Nachricht möchten wir dir bestätigen, dass du dich
              erfolgreich auf die folgenden Unterveranstaltungen beworben hast:
            </Text>
            <ul>
              {subEvents?.map((subEvent, index) => (
                <li key={index}>
                  <Text className="my-1 font-medium text-zinc-800">
                    {subEvent}
                  </Text>
                </li>
              ))}
            </ul>
            <Text className="text-zinc-500">
              Nachdem die Auswahlphase abgeschlossen ist, werden wir uns
              schnellstmöglich wieder bei dir melden. Um keine Nachricht zu
              verpassen, füge unsere E-Mailadresse zu deinen Kontakten hinzu.
            </Text>
            <Text className="text-zinc-500">
              Solltest du noch Fragen haben, kannst du dich jederzeit an uns
              wenden. Viel Erfolg!
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
              Du erhältst diese E-Mail, weil du dich für die Veranstaltung
              {eventName} beworben hast. Solltest du keine Bewerbung abgegeben
              haben, kannst du diese E-Mail einfach ignorieren.
            </Text>
            <Text className="text-xs text-zinc-600">
              &copy; move - studentische Unternehmensberatung e.V.,
              Universitätsstraße 14, 48143 Münster - Alle Rechte vorbehalten.
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}

ApplicationConfirmEmail.defaultProps = {
  name: 'Christoph',
  eventName: 'React Summit',
  subEvents: [
    'Interview mit viadee',
    'Workshop mit Roland Berger',
    'Social mit McKinsey',
  ],
} satisfies ApplicationConfirmEmailProps;
