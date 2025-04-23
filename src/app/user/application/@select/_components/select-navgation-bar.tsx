import {
  BackButton,
  NextButton,
} from '@/components/application/application-navigation';
import { useApplicationStore } from '@/components/application/application.store';
import { useStepContext } from '@/components/application/step';
import { cn } from '@/utils';
import React from 'react';

export function SelectNavigationBar({
  className,
  ...props
}: React.ComponentProps<'nav'>) {
  const { subApplications } = useApplicationStore((store) => store);
  const { nextStep } = useStepContext();

  const isDisabled = Object.values(subApplications).some(
    (subApplications) => subApplications.length === 0
  );

  function onNext() {
    if (isDisabled) {
      // TODO: Show error message
      return;
    }

    nextStep();
  }

  return (
    <nav
      data-slot={'application-navigation-bar'}
      className={cn('flex items-center justify-between', className)}
      {...props}
    >
      <BackButton />
      <NextButton type="submit" disabled={isDisabled} onClick={onNext}>
        Weiter
      </NextButton>
    </nav>
  );
}
