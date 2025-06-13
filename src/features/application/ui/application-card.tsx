import { Badge } from '@/components/ui/badge';
import { Application } from '@/generated/prisma/client';
import { cn } from '@/lib/utils/cn';
import { ArrowRightIcon } from '@heroicons/react/16/solid';
import { format } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import { translateApplicationStatus } from '../utils/translate-application-status';

interface ApplicationCardProps extends React.ComponentProps<'div'> {
  application: Application;
}

export function ApplicationCard({
  application,
  className,
  ...props
}: ApplicationCardProps) {
  const { status, updatedAt } = application;

  return (
    <div
      data-slot={'application-card'}
      className={cn(
        'border-border-secondary group relative rounded-md border p-6 shadow-sm',
        className
      )}
      {...props}
    >
      <div className="flex flex-wrap-reverse items-center justify-between gap-2">
        <p className="text-foreground font-medium">{}</p>
        <Badge>
          <span className="bg-primary-400 ml-0.5 size-2 rounded-full" />
          {translateApplicationStatus(status)}
        </Badge>
      </div>
      <div className="mt-4 space-y-4">
        <p className="text-secondary text-sm">
          Zuletzt bearbeitet am {format(updatedAt, 'dd.MM.yyyy, HH:mm')} Uhr
        </p>
      </div>
      <Link
        href={'/'}
        className="text-accent focus-indicator mt-6 flex w-fit items-center justify-center gap-1.5 rounded-md text-sm font-medium"
      >
        <span className="absolute inset-0" />
        Bearbeiten{' '}
        <ArrowRightIcon className="size-4 transition-transform will-change-transform group-hover:translate-x-1.5" />
      </Link>
    </div>
  );
}
