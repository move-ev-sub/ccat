import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { PlusIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import React from 'react';

export default async function AdminEventSubeventsLayout({
  children,
  params: paramsPromise,
}: {
  children: React.ReactNode;
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await paramsPromise;

  return (
    //  Content Container
    <div className="py-12">
      <div className="container">
        {/* Page Header */}
        <div className="flex flex-wrap justify-between gap-6">
          {/* Page Title */}
          <div>
            <p className="text-foreground text-2xl font-medium sm:text-xl">
              Unterveranstaltungen
            </p>
            <p className="text-secondary mt-2 max-w-prose text-base sm:text-sm">
              Hier kannst du alle Unterveranstaltungen einsehen, bearbeiten und
              neue erstellen.
            </p>
          </div>
          <Button variant={'accent'} className="shrink-0" asChild>
            <Link href={`/admin/new/sub-event?eventId=${eventId}`}>
              Neu erstellen <PlusIcon />
            </Link>
          </Button>
        </div>
        <Separator className="mt-8" orientation="horizontal" />
      </div>
      <div className="container mt-12">{children}</div>
    </div>
  );
}
