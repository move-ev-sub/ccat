'use client';

import { useStepsContext } from '@/flows/_lib/steps/steps.context';
import { Step } from '@/flows/application/types';
import { cn } from '@/lib/utils/cn';
import React from 'react';

// #region Types
// =============================================================
type StepsProgressStatus = 'current' | 'completed' | 'upcoming';

// #region StepsProgress
// =============================================================
export function StepsProgress({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  const { steps, value } = useStepsContext();

  const currentStepIndex = React.useMemo(
    () => steps.findIndex((step) => step.id === value),
    [steps, value]
  );

  return (
    <ul
      data-slot="steps-progress"
      className={cn(
        'mx-auto grid max-w-[var(--max-content-width)] gap-0.75 px-8',
        className
      )}
      style={{
        gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
      }}
      {...props}
    >
      {steps.map((step, index) => (
        <StepsProgressItem
          key={step.id}
          step={step}
          status={
            index < currentStepIndex
              ? 'completed'
              : index === currentStepIndex
                ? 'current'
                : 'upcoming'
          }
        />
      ))}
    </ul>
  );
}

// #region StepsProgressItem
// =============================================================
interface StepsProgressItemProps extends React.ComponentProps<'li'> {
  step: Step;
  status: StepsProgressStatus;
}

export function StepsProgressItem({
  className,
  step,
  status,
  ...props
}: StepsProgressItemProps) {
  return (
    <li
      data-slot="steps-progress-item"
      id={`steps-progress-item-${step.id}`}
      className={cn('group', className)}
      {...props}
    >
      <div className="mb-4 flex items-center justify-start gap-0.75">
        <div
          className={cn(
            'bg-accent size-4 shrink-0 rounded-full',
            status === 'current' &&
              'ring-offset-background ring-accent bg-accent/80 ring-2 ring-offset-2',
            status === 'upcoming' && 'bg-border'
          )}
        />
        <div
          className={cn(
            'bg-border -z-10 h-0.5 grow rounded-full group-last:hidden',
            status === 'completed' && 'bg-accent'
          )}
        />
      </div>
      <div className="max-w-full pr-6">
        <p className="text-foreground text-sm font-medium whitespace-normal">
          {step.label}
        </p>
      </div>
    </li>
  );
}
