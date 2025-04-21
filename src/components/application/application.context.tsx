/**
 * @fileoverview The application context is used to store the application data
 * for the current user. The data is stored in the browser's local storage and
 * is used to populate the application form as well as to persist the data
 * when the user navigates through the application process.
 *
 * This context does not manage the current step of the application process.
 * For that, see the StepContext.
 */
'use client';

import { generalFormSchema } from '@/components/application/general-form';
import { format } from 'date-fns';
import React from 'react';
import { z } from 'zod';

type ApplicationData = {
  general: z.infer<typeof generalFormSchema>;
};

type ApplicationContextType = {
  data: ApplicationData;
  setData: (data: ApplicationData) => void;
};

const ApplicationContext = React.createContext<ApplicationContextType>(
  {} as ApplicationContextType
);

export function useApplicationContext() {
  const context = React.useContext(ApplicationContext);

  if (!context) {
    throw new Error(
      'useApplicationContext must be used within a ApplicationProvider'
    );
  }

  return context;
}

const DEFAULT_APPLICATION_DATA: ApplicationData = {
  general: {
    firstName: '',
    lastName: '',
    birthDate: new Date(),
    gender: 'PREFFER_NOT_TO_SAY',
    university: '',
    currentDegree: 'ABITUR',
    targetDegree: 'BACHELOR',
    expectedGraduationYear: parseInt(format(new Date(), 'yyyy')),
    fieldOfStudy: '',
    semester: 0,
    currentGpa: 0,
    abiturGrade: 0,
    experienceAbroad: 0,
    experienceConsulting: 0,
  },
};

export function ApplicationProvider({ children }: React.PropsWithChildren) {
  const [data, setData] = React.useState<ApplicationData>(
    DEFAULT_APPLICATION_DATA
  );

  return (
    <ApplicationContext.Provider value={{ data, setData }}>
      {children}
    </ApplicationContext.Provider>
  );
}
