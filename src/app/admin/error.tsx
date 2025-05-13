'use client'; // Error boundaries must be Client Components

import { Button } from '@/components/ui/button';
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
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-96 w-full items-center justify-center py-12">
      <div className="w-full max-w-xl px-8">
        <h2 className="text-foreground text-lg font-medium">
          Es ist ein Fehler aufgetreten.
        </h2>
        <p className="text-secondary mt-2 max-w-prose text-sm">
          {error.message} {error.digest && `(${error.digest})`}
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Button variant={'accent'} onClick={reset}>
            Erneut versuchen
            <ArrowPathIcon />
          </Button>
          <Button variant={'outline'} asChild>
            <Link href={'/'}>
              Zur Startseite
              <ArrowRightIcon />
            </Link>
          </Button>
        </div>

        <p className="text-secondary mt-8 max-w-prose text-xs">
          Wenn der Fehler weiterhin besteht, bitte kontaktieren Sie den Support.
        </p>
      </div>
    </section>
  );
}
