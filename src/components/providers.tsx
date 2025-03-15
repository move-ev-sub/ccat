'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import * as React from 'react';
/**
 * The theme provider component handles the theme switching logic. This component
 * expects a `children` prop, which is the content that will be wrapped by the
 * theme provider.
 */
export function Providers({
  children,
}: React.PropsWithChildren): React.ReactNode {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
