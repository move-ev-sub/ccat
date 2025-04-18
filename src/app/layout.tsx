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

export const metadata: Metadata = {
  title: 'Consulting Contact Bewerbertool',
  description:
    'Tool zur Organisation des Bewerbungsprozesses für Consulting Contacts',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Consulting Contact Bewerbertool',
    description:
      'Tool zur Organisation des Bewerbungsprozesses für Consulting Contacts',
    url: 'https://consultingcontact.de',
  },
  viewport: {
    initialScale: 1,
    width: 'device-width',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Consulting Contact Bewerbertool',
    description:
      'Tool zur Organisation des Bewerbungsprozesses für Consulting Contacts',
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
