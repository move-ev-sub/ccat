/**
 * PhasesCard Component
 *
 * A component that displays the phases of an event in a card format. It shows different phases
 * (preparation, application, selection, event, post-event) with their current status and dates.
 *
 * Features:
 * - Displays all phases of an event in a vertical list
 * - Shows different states for each phase (completed, current, upcoming)
 * - Includes loading state with skeleton UI
 * - Handles error states gracefully
 * - Shows phase dates for the current phase
 * - Uses icons to indicate phase status
 *
 * @component
 * @example
 * ```tsx
 * <PhasesCard eventId="event-123" />
 * ```
 *
 * @param {Object} props - Component props
 * @param {string} props.eventId - The ID of the event to display phases for
 */

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  fetchPhasesForEvent,
  isPhasesSetupCompleted,
} from '@/features/phase/services/phaseService';
import { Phase, PhaseType } from '@/generated/prisma/client';
import { cn } from '@/lib/utils/cn';

import {
  BoltIcon,
  CheckIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/16/solid';
import { format } from 'date-fns';
import { Suspense } from 'react';

/**
 * Main PhasesCard component that wraps the content in a Card and handles loading state
 */
export async function PhasesCard({ eventId }: { eventId: string }) {
  return (
    <Card className="relative">
      <CardContent>
        <p className="text-foreground text-base font-medium">Phasen</p>
        <p className="text-secondary mt-1 text-sm">in dieser Veranstaltung</p>
        <Suspense
          fallback={
            <Skeleton className="border-border-secondary mt-4 h-24 rounded-sm border" />
          }
        >
          <PhasesCardContent eventId={eventId} />
        </Suspense>
      </CardContent>
    </Card>
  );
}

/**
 * Error component for displaying error states in the PhasesCard
 *
 * @param {Object} props - Component props
 * @param {string} [props.error='Fehler beim Laden der Phasen'] - Error message to display
 * @param {string} [props.className] - Additional CSS classes
 */
async function PhasesCardError({
  error = 'Fehler beim Laden der Phasen',
  className,
  ...props
}: React.ComponentProps<'div'> & {
  error?: string;
}) {
  return (
    <div
      className={cn(
        'border-border bg-background-muted mt-4 flex h-24 items-center justify-center gap-2.5 rounded-sm border',
        className
      )}
      {...props}
    >
      <ExclamationTriangleIcon className="text-secondary size-4" />
      <span className="text-foreground block text-sm font-medium">{error}</span>
    </div>
  );
}

/**
 * Content component that fetches and displays the phases for an event
 *
 * @param {Object} props - Component props
 * @param {string} props.eventId - The ID of the event to fetch phases for
 */
async function PhasesCardContent({ eventId }: { eventId: string }) {
  const setupCompletedRes = await isPhasesSetupCompleted({ eventId });

  if (!setupCompletedRes.ok || !setupCompletedRes.data) {
    return <PhasesCardError error="Phasen sind noch nicht eingerichtet" />;
  }

  const res = await fetchPhasesForEvent({ eventId });

  if (!res.ok) {
    return <PhasesCardError error="Fehler beim Laden der Phasen" />;
  }

  const phases = res.data;

  return (
    <div className="mt-4 space-y-2">
      {phases.map((phase) => (
        <PhasesCardItem key={phase.id} phase={phase} />
      ))}
    </div>
  );
}

/**
 * Individual phase item component that displays phase information and status
 *
 * @param {Object} props - Component props
 * @param {Phase} props.phase - The phase data to display
 */
async function PhasesCardItem({
  phase,
}: {
  phase: Omit<Phase, 'createdById'>;
}) {
  const now = new Date();
  let state: 'COMPLETED' | 'CURRENT' | 'UPCOMING';

  if (new Date(phase.endDate) < now) {
    state = 'COMPLETED';
  } else if (new Date(phase.startDate) > now) {
    state = 'UPCOMING';
  } else {
    state = 'CURRENT';
  }

  return (
    <div
      className={cn(
        'border-border flex items-center justify-start gap-2 rounded-sm border px-3 py-1.5',
        state === 'CURRENT' && 'bg-background-muted'
      )}
    >
      <div>
        <span className="text-foreground block text-sm font-medium">
          {phaseTypeToText(phase.type)}
        </span>
        {state === 'CURRENT' && (
          <span className="text-secondary mt-1 block text-xs" role="status">
            {format(phase.startDate, 'dd.MM.')} -{' '}
            {format(phase.endDate, 'dd.MM.yyyy')}
          </span>
        )}
      </div>
      {state === 'COMPLETED' && (
        <CheckIcon className="text-success ml-auto size-4" />
      )}
      {state === 'CURRENT' && (
        <BoltIcon className="text-success ml-auto size-4" />
      )}
      {state === 'UPCOMING' && (
        <ClockIcon className="text-secondary ml-auto size-4" />
      )}
    </div>
  );
}

/**
 * Helper function to convert phase type to display text
 *
 * @param {PhaseType} type - The phase type to convert
 * @returns {string} The display text for the phase type
 */
async function phaseTypeToText(type: PhaseType) {
  switch (type) {
    case 'PREP':
      return 'Vorbereitungsphase';
    case 'APPLICATION':
      return 'Bewerbungsphase';
    case 'SELECTION_ONE':
      return '1. Auswahlphase';
    case 'SELECTION_TWO':
      return '2. Auswahlphase';
    case 'EVENT':
      return 'Veranstaltungsphase';
    case 'POST_EVENT':
      return 'Nachveranstaltungsphase';
    default:
      return type;
  }
}
