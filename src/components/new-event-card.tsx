'use client';

import { cn } from '@/utils';
import { PlusIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

export function NewEventCard({
  className,
  href,
  ...props
}: React.ComponentProps<typeof Link>) {
  const router = useRouter();

  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === 'm' && event.shiftKey) {
        event.preventDefault();
        console.log('New event');
        router.push(href.toString());
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [router, href]);

  return (
    <Link
      className={cn(
        'bg-background-muted border-border-secondary text-muted-foreground focus-visible:ring-ring focus-visible: ring-offset-background group flex min-h-48 items-center justify-center gap-1.5 rounded-xl border border-dashed p-8 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        className
      )}
      href={href}
      {...props}
    >
      <PlusIcon className="group-hover:text-accent group-focus-visible:text-accent size-4" />
      <span className="group-hover:text-accent group-focus-visible:text-accent">
        Neue Veranstaltung
      </span>
      <span className="border-border-secondary hidden rounded-md border bg-zinc-200 px-1.5 py-0.5 text-xs shadow-xs lg:block dark:bg-zinc-800">
        ⌘M⇧
      </span>
    </Link>
  );
}
