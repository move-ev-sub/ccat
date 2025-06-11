'use client';

import { Step } from '@/flows/application/types';
import React from 'react';

// #region Types
// =============================================================
interface StepsContextType {
  steps: Step[];

  value: string;
  setValue: (value: string) => void;

  getStep: (id: string) => Step | undefined;
  getCurrentStep: () => Step | undefined;

  canGoBack: () => boolean;
  canGoForward: () => boolean;

  goForward: () => void;
  goBack: () => void;
}

// #region StepsContext
// =============================================================
export const StepsContext = React.createContext<StepsContextType>({
  steps: [],

  value: '',
  setValue: () => {},

  getStep: () => undefined,
  getCurrentStep: () => undefined,

  canGoBack: () => false,
  canGoForward: () => false,

  goForward: () => {},
  goBack: () => {},
});

// #region Hooks
// =============================================================
export function useStepsContext() {
  const ctx = React.useContext(StepsContext);

  if (!ctx) {
    throw new Error('useStepsContext must be used within a StepsProvider');
  }

  return ctx;
}

// #region Provider
// =============================================================
interface StepsProviderProps extends React.PropsWithChildren {
  steps: Step[];
}

export function StepsProvider({ children, steps }: StepsProviderProps) {
  const [value, setValue] = React.useState<string>(steps[0].id);

  function canGoBack() {
    return value !== steps[0].id;
  }

  function canGoForward() {
    return value !== steps[steps.length - 1].id;
  }

  function getCurrentStep() {
    return steps.find((step) => step.id === value);
  }

  function goBack() {
    if (!canGoBack()) {
      return;
    }

    const currentStepIndex = steps.indexOf(getCurrentStep()!);

    setValue(steps[currentStepIndex - 1].id);
  }

  function goForward() {
    if (!canGoForward()) {
      return;
    }

    const currentStepIndex = steps.indexOf(getCurrentStep()!);

    setValue(steps[currentStepIndex + 1].id);
  }

  return (
    <StepsContext.Provider
      value={{
        steps,
        value,
        setValue,
        getStep(id) {
          return steps.find((step) => step.id === id);
        },
        getCurrentStep,
        canGoBack,
        canGoForward,
        goBack,
        goForward,
      }}
    >
      {children}
    </StepsContext.Provider>
  );
}
