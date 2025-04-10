'use client';

import { Button } from '@/components/ui/button';
import { messages as t } from '@/i18n';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Ein Fehler ist aufgetreten:', error);
  }, [error]);

  return (
    <div className="bg-py-32 flex h-screen flex-col items-center justify-center text-center font-sans text-gray-800">
      {/* Fehlercode ohne Icon */}
      <h1 className="text-accent-600 m-0 text-7xl">Error</h1>

      {/* Fehlerbeschreibung */}
      <p className="my-6 mb-8 text-5xl text-white opacity-85">
        {t.pages.error?.title?.() ?? 'Uups! Etwas ist schiefgelaufen.'}
      </p>

      {/* Zwei gleichgestylte Buttons */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button
          className="bg-accent-600 border-none px-6 py-3 text-2xl"
          onClick={() => reset()}
        >
          {t.pages.error?.tryAgain?.() ?? 'Erneut versuchen'}
        </Button>
        <Button className="bg-accent-600 border-none px-6 py-3 text-2xl">
          <Link href="/">{t.pages.error?.goHome?.() ?? 'Zur Startseite'}</Link>
        </Button>
      </div>
    </div>
  );
}
