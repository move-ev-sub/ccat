'use client';

import React from 'react';

// #region Context
// ===========================================================
type StepContextType = {
  steps: string[];
  currentStep: string;
  setCurrentStep: (step: string) => void;

  canGoBack: () => boolean;
  canGoForward: () => boolean;
  nextStep: () => void;
  previousStep: () => void;
};

const StepContext = React.createContext<StepContextType>({} as StepContextType);

export function StepProvider({
  children,
  steps,
}: React.PropsWithChildren & { steps: string[] }) {
  const [currentStep, setCurrentStep] = React.useState<string>(steps[0]);

  const canGoBack = () => {
    return currentStep !== steps[0];
  };

  const canGoForward = () => {
    return currentStep !== steps[steps.length - 1];
  };

  const nextStep = () => {
    if (!canGoForward()) {
      return null;
    }

    setCurrentStep(steps[steps.indexOf(currentStep) + 1]);
  };

  const previousStep = () => {
    if (!canGoBack()) {
      return null;
    }

    setCurrentStep(steps[steps.indexOf(currentStep) - 1]);
  };

  return (
    <StepContext.Provider
      value={{
        steps,
        currentStep,
        setCurrentStep,
        canGoBack,
        canGoForward,
        nextStep,
        previousStep,
      }}
    >
      {children}
    </StepContext.Provider>
  );
}

export function useStepContext() {
  const context = React.useContext(StepContext);

  if (!context) {
    throw new Error('useStepContext must be used within a StepProvider');
  }

  return context;
}

// #region StepContent
// ===========================================================
export function StepContent({
  value,
  ...props
}: React.ComponentProps<'section'> & {
  value: string;
}) {
  const ctx = useStepContext();
  const active = value === ctx.currentStep;
  const id = React.useId();

  if (!active) {
    return null;
  }

  return <section id={id} data-slot={'step-content'} {...props} />;
}
