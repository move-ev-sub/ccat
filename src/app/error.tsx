'use client';

import { Button } from '@/components/ui/button';
import { messages as t } from '@/i18n';
import { ArrowPathIcon, ArrowRightIcon } from '@heroicons/react/16/solid';
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
      <h1 className="text-accent-600 flex items-center text-3xl font-semibold">
        {t.pages.error.title()}
      </h1>
      <p className="text-foreground mt-8 text-lg font-medium">
        {t.pages.error.title()}
      </p>
      <p className="text-secondary mt-1 text-sm">
        {t.pages.notFound.description()}
      </p>
      {/* Home Button */}
      <div className="mt-12 flex flex-col gap-4 sm:flex-row">
        <Button variant={'accent'} onClick={() => reset()}>
          {t.pages.error.tryAgain()} <ArrowPathIcon />
        </Button>
        <Button asChild variant={'outline'}>
          <Link href="/">
            {t.pages.error.goHome()} <ArrowRightIcon />
          </Link>
        </Button>
      </div>
    </div>
  );
}
