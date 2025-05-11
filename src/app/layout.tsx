import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/sonner';
import '@/styles/globals.css';
import { cn } from '@/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const interSans = Inter({
  variable: '--font-inter-sans',
  subsets: ['latin'],
});

const title = 'Consulting Contact Bewerbertool';
const description =
  'Tool zur Organisation des Bewerbungsprozesses für Consulting Contacts';

export const metadata: Metadata = {
  title: {
    default: title,
    template: '%s | Consulting Contact Bewerbertool',
  },
  description,
  generator: 'Next.js',
  applicationName: 'Consulting Contact Bewerbertool',
  referrer: 'strict-origin-when-cross-origin',
  keywords: ['Consulting Contact', 'Bewerbertool'],
  authors: [
    { name: 'Christoph Langer', url: 'https://github.com/chris23lngr' },
    { name: 'Lennard Lohmann', url: 'https://github.com/lennardlohmann' },
    { name: 'Ron Bellemann', url: 'https://github.com/1RoBe' },
  ],
  publisher: 'move - Studentische Unternehmensberatung e.V.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title,
    description,
    url: 'https://consultingcontact.de',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body
        className={cn(
          interSans.variable,
          interSans.className,
          'bg-background antialiased'
        )}
      >
        <Providers>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
