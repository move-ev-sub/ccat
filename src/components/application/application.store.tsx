/**
 * @fileoverview The application store is used to store the application data
 * for the current user. The data is stored in the browser's session storage and
 * is used to populate the application form as well as to persist the data
 * when the user navigates through the application process.
 *
 * This store does not manage the current step of the application process.
 * For that, see the StepContext.
 */
'use client';

import React from 'react';
import { z } from 'zod';
import { createStore, useStore } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { generalFormSchema } from './general-form';

// #region Store
// ============================================================
type ApplicationState = {
  general: z.infer<typeof generalFormSchema>;
};

export type ApplicationActions = {
  setGeneral: (general: z.infer<typeof generalFormSchema>) => void;
};

export type ApplicationStore = ApplicationState & ApplicationActions;

export const defaultInitState: ApplicationState = {
  general: {
    firstName: '',
    lastName: '',
    abiturGrade: 0,
    birthDate: new Date(),
    gender: 'MALE',
    currentDegree: 'ABITUR',
    university: '',
    targetDegree: 'BACHELOR',
    expectedGraduationYear: 0,
    fieldOfStudy: '',
    semester: 0,
    currentGpa: 0,
    experienceConsulting: 0,
    experienceAbroad: 0,
  },
};

export function initApplicationStore(): ApplicationState {
  return defaultInitState;
}

export const createApplicationStore = (
  initialState: ApplicationState = defaultInitState
) => {
  return createStore<ApplicationStore>()(
    persist(
      (set) => ({
        general: initialState.general,
        setGeneral(general) {
          set({ general });
        },
      }),
      {
        name: 'application-store',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  );
};

// #region Context
// ============================================================

export type ApplicationStoreApi = ReturnType<typeof createApplicationStore>;

export const ApplicationStoreContext = React.createContext<
  ApplicationStoreApi | undefined
>(undefined);

export interface ApplicationStoreProviderProps {
  children: React.ReactNode;
  initialState?: ApplicationState;
}

export function ApplicationStoreProvider({
  children,
}: ApplicationStoreProviderProps) {
  const storeRef = React.useRef<ApplicationStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createApplicationStore(initApplicationStore());
  }

  return (
    <ApplicationStoreContext.Provider value={storeRef.current}>
      {children}
    </ApplicationStoreContext.Provider>
  );
}

export function useApplicationStore<T>(
  selector: (store: ApplicationStore) => T
): T {
  const applicationStoreContext = React.useContext(ApplicationStoreContext);

  if (!applicationStoreContext) {
    throw new Error(
      'useApplicationStore must be used within a ApplicationStoreProvider'
    );
  }

  return useStore(applicationStoreContext, selector);
}
