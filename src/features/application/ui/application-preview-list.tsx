import { cn } from '@/lib/utils/cn';
import React from 'react';
import { ApplicationPreview } from '../types';
import { ApplicationPreviewCard } from './application-preview-card';

export function ApplicationPreviewList({
  className,
  applications,
  ...props
}: React.ComponentProps<'div'> & {
  applications: ApplicationPreview[];
}) {
  return (
    <div
      data-slot="application-preview-list"
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        className
      )}
      {...props}
    >
      {applications.map((application) => (
        <ApplicationPreviewCard
          key={application.id}
          application={application}
        />
      ))}
      {applications.length === 0 && <ApplicationPreviewListEmpty />}
    </div>
  );
}

function ApplicationPreviewListEmpty() {
  return (
    <div className="border-border-secondary col-span-4 flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
      <p className="text-foreground font-medium">
        Du hast noch keine Bewerbungen abgegeben
      </p>
      <p className="text-secondary mt-2 text-sm">
        Wähle eine Veranstaltung aus, um eine Bewerbung zu erstellen.
      </p>
    </div>
  );
}
