'use client';

import { Button } from '@/components/ui/button';
import { messages as t } from '@/i18n';
import Link from 'next/link';
import { useEffect } from 'react';

export default function NotFound({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error('Ein Fehler ist aufgetreten:', error);
  }, [error]);

  return (
    <div className="bg-py-32 flex h-screen flex-col items-center justify-center text-center font-sans text-gray-800">
      <h1 className="text-accent-600 flex items-center text-7xl">404</h1>
      <p className="mt-5 mb-2 text-5xl text-white opacity-85">
        {t.pages.notFound.title()}
      </p>
      <p className="mb-8 text-lg text-gray-400">
        {t.pages.notFound.description()}
      </p>
      {/* Home Button */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button className="bg-accent-600 border-none px-6 py-3 text-2xl">
          <Link href="/">{t.pages.error?.goHome?.() ?? 'Zur Startseite'}</Link>
        </Button>
      </div>
    </div>
  );
}
