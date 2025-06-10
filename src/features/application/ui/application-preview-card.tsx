import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils/cn';
import { ArrowRightIcon } from '@heroicons/react/16/solid';
import { format } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import { ApplicationPreview } from '../types';
import { translateApplicationStatus } from '../utils/translate-application-status';

export function ApplicationPreviewCard({
  className,
  application,
  ...props
}: React.ComponentProps<'div'> & {
  application: ApplicationPreview;
}) {
  return (
    <div
      data-slot="application-preview-card"
      className={cn(
        'border-border-secondary group relative rounded-md border p-6 shadow-sm',
        className
      )}
      {...props}
    >
      <div className="flex flex-wrap-reverse items-center justify-between gap-2">
        <p className="text-foreground font-medium">{application.event.name}</p>
        <Badge variant={'default'}>
          <span className="bg-primary-400 ml-0.5 size-2 rounded-full" />
          {translateApplicationStatus(application.status)}
        </Badge>
      </div>
      <div className="mt-4 space-y-4">
        <p className="text-secondary text-sm">
          Zuletzt bearbeitet am{' '}
          {format(application.updatedAt, 'dd.MM.yyyy, HH:mm')}
        </p>
      </div>
      <Link
        href={`/user/application/${application.id}`}
        className="text-accent focus-indicator mt-6 flex w-fit items-center justify-center gap-1.5 rounded-md text-sm font-medium"
      >
        <span className="absolute inset-0" />
        Bearbeiten{' '}
        <ArrowRightIcon className="size-4 transition-transform will-change-transform group-hover:translate-x-1.5" />
      </Link>
    </div>
  );
}
