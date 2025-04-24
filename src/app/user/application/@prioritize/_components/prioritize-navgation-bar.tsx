import {
  BackButton,
  NextButton,
} from '@/components/application/application-navigation';
import { useStepContext } from '@/components/application/step';
import { cn } from '@/utils';
import React from 'react';

export function PrioritizeNavigationBar({
  className,
  ...props
}: React.ComponentProps<'nav'>) {
  const { nextStep } = useStepContext();

  function onNext() {
    nextStep();
  }

  return (
    <nav
      data-slot={'application-navigation-bar'}
      className={cn('flex items-center justify-between', className)}
      {...props}
    >
      <BackButton />
      <NextButton type="submit" onClick={onNext}>
        Weiter
      </NextButton>
    </nav>
  );
}
