import { ThemeProvider } from '@/components/theme-provider';
import '@/styles/globals.css';
import { cn } from '@/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const interSans = Inter({
  variable: '--font-inter-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Consulting Contact Application Tool',
  description:
    'Tool zur Verwaltung von Bewerbungen und Veranstaltungen für die Consulting Contact',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          interSans.variable,
          interSans.className,
          'bg-background antialiased'
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
