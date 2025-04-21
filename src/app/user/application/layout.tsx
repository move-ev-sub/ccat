'use client';

import {
  ProgressBar,
  ProgressBarItem,
} from '@/components/application/application-navigation';
import { ApplicationProvider } from '@/components/application/application.context';
import { StepContent, StepProvider } from '@/components/application/step';
import { PageContainer } from '@/components/page-container';
import React from 'react';

interface ApplicationLayoutProps extends React.PropsWithChildren {
  select: React.ReactNode;
  prioritize: React.ReactNode;
  check: React.ReactNode;
}

export default function ApplicationLayout({
  children,
  select,
  prioritize,
  check,
}: ApplicationLayoutProps) {
  // Add a confirmation dialog when the user tries to leave the page
  // to prevent data loss
  React.useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = ''; // This is required for Chrome to show the confirmation dialog
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <main>
      <ApplicationProvider>
        <StepProvider steps={['general', 'select', 'prioritize', 'check']}>
          <PageContainer className="container">
            <header>
              <ProgressBar>
                <ProgressBarItem
                  value="general"
                  label="Persönliche Informationen"
                />
                <ProgressBarItem
                  value="select"
                  label="Veranstaltung auswählen"
                />
                <ProgressBarItem
                  value="prioritize"
                  label="Prioritäten setzen"
                />
                <ProgressBarItem
                  value="check"
                  label="Überprüfen und abschicken"
                />
              </ProgressBar>
            </header>
            <div className="mt-20">
              <StepContent value="general">{children}</StepContent>
              <StepContent value="select">{select}</StepContent>
              <StepContent value="prioritize">{prioritize}</StepContent>
              <StepContent value="check">{check}</StepContent>
            </div>
          </PageContainer>
        </StepProvider>
      </ApplicationProvider>
    </main>
  );
}
