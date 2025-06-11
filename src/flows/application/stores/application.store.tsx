/**
 * @fileoverview The Application Store is used to store the applicants application
 * data throughout the application process. The store is divided into two slices:
 * - General Slice: Stores the general application data (first name, last name, etc.)
 * - Sub Applications Slice: Stores the sub applications data (sub events, cover letters, etc.)
 *
 * The Sub Applications Slice consists of a Record of Slot Entries where each possbile Slot
 * for the event is its own entry. Each Slot Entry contains a list of Sub Events which belong
 * to that specific slot.
 *
 * The Sub Events are extended with the cover letter requirement and the cover letter
 * text.
 *
 * @important The terms "sub event" and "sub application" are used interchangeably in
 * the codebase. This is because each sub application belongs to a one single sub event
 * and only one sub application can be selected for a sub event.
 */
'use client';

import { generalSchema } from '@/flows/application/validations/forms';
import { CoverLetterRequirement, Prisma } from '@/generated/prisma/client';
import React from 'react';
import { z } from 'zod/v4';
import { createStore, StateCreator, useStore } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// #region Constants
// ============================================================

/** A unique key to determine the store in the session storage */
const STORE_KEY = 'create_application_store';

// #region Types
// ============================================================

/**
 * A selection is what contains the data for a "sub application". This means that when a user
 * slects an event which they want to apply to, the data for that event is stored in the store
 * as a "Selection"
 */
export interface SelectionTest
  extends Omit<
    Prisma.SubApplicationCreateInput,
    'application' | 'subEvent' | 'id'
  > {
  eventName: string;
  subEventId: string;
  slotId: string;
}

/**
 * A selection is what contains the data for a "sub application". This means that when a user
 * slects an event which they want to apply to, the data for that event is stored in the store
 * as a "Selection"
 */
export interface Selection {
  /**
   * The id of the slot that the selection belongs to
   */
  slotId: string;

  /**
   * The id of the selection. This is equivalent to the sub event id which the selection
   * belongs to. This means that the selection is unique within the slot.
   */
  id: string;

  /**
   * The name of the sub event that the selection belongs to
   */
  subEventName: string;

  /**
   * The description of the sub event that the selection belongs to
   */
  subEventDescription: string;

  /**
   * The cover letter of the selection. Users have the option append a cover letter to their
   * application as a text.
   */
  coverLetter?: string;

  /**
   * Wether the sub event which the selection belongs to requires a cover letter. This comes
   * from the sub event's cover letter requirement.
   */
  coverLetterRequirement: CoverLetterRequirement;

  /**
   * The start date of the sub event that the selection belongs to
   */
  startDate: Date;

  /**
   * The end date of the sub event that the selection belongs to
   */
  endDate: Date;
}

/**
 * A slot entry is a an entry within a record. The Record contains all possible slots
 * for an event. Eeach Slot Entry contains a list of Selections which belong to that specific
 * slot and a prioritized selection.
 */
export interface SlotEntry {
  /**
   * The SlotEntry's id. This is equivalent to the slot id which the slot entry belongs to.
   */
  id: string;

  /**
   * The start date of the slot that the slot entry belongs to
   */
  startDate: Date;

  /**
   * The end date of the slot that the slot entry belongs to
   */
  endDate: Date;

  /**
   * The prioritized selection of the slot entry. This is the selection that the user has
   * selected as the most important.
   */
  prioritizedSelection: string | null;

  /**
   * An array of all the selections that a user has made for the slot entry.
   */
  selections: Selection[];
}

// #region Slice Types
// ============================================================

interface InternalState {
  eventId: string;
}

/**
 * State for the General Slice
 */
interface GeneralState {
  general: z.infer<typeof generalSchema>;
}

/**
 * Actions for the General Slice
 */
interface GeneralActions {
  /**
   * Sets the general application data. This is the data that is not specific to a sub event.
   *
   * @param general The general application data to set. This comes from the general form.
   */
  setGeneral: (general: z.infer<typeof generalSchema>) => void;
}

type GeneralSlice = GeneralState & GeneralActions;

/**
 * State for the Selections Slice.
 */
interface SelectionsState {
  /**
   * A record of all the slots for an event. The key is the slot id and the value
   * is the slot entry.
   *
   * @see {@link SlotEntry}
   */
  slots: Record<string, SlotEntry>;
}

/**
 * Actions for the Selections Slice
 */
interface SelectionsActions {
  /**
   * Sets the prioritized selection for a slot. The prioritized selection is the selection
   * that the user has selected as the most important.
   *
   * @param slotId The id of the slot to set the prioritized selection for.
   * @param selectionId The id of the selection to set as the prioritized selection.
   */
  setPrioritizedSelection: (slotId: string, selectionId: string) => void;

  /**
   * Gets the id of the prioritized selection for a slot.
   *
   * @param slotId The id of the slot to get the prioritized selection for.
   * @returns The id of the prioritized selection for the slot.
   */
  getPrioritizedSelection: (slotId: string) => string | null;

  /**
   * Checks wether a selection has been added to the slot entry for a give sub event.
   *
   * @param slotId The id of the slot to check the sub event for.
   * @param subEventId The id of the sub event to check if it has been added to the slot entry.
   * @returns True if the sub event has been added to the slot entry, false otherwise.
   */
  isSubEventAdded: (slotId: string, subEventId: string) => boolean;

  /**
   * Adds a new selection to the slot entry.
   *
   * @warning This does not check if the selection already exists in the slot entry. Each sub event id
   * can only exist once in a slot entries selections array.
   *
   * @param selection The selection to add to the slot entry.
   */
  addSelection: (selection: Selection) => void;

  /**
   * Removes a selection from the slot entry. If the selection which is being removed is the
   * prioritized selection, the prioritized selection will be set to null.
   *
   * @param slotId The id of the slot to remove the selection from.
   * @param selectionId The id of the selection to remove from the slot entry.
   */
  removeSelection: (slotId: string, selectionId: string) => void;

  /**
   * Appends a cover letter to a selection.
   *
   * @param slotId The id of the slot to add the cover letter to.
   * @param selectionId The id of the selection to add the cover letter to.
   * @param coverLetter The cover letter to add to the selection.
   */
  addCoverLetter: (
    slotId: string,
    selectionId: string,
    coverLetter: string
  ) => void;
}

type SelectionsSlice = SelectionsState & SelectionsActions;

type Slices = GeneralSlice & SelectionsSlice & InternalState;

// #region default state
// ============================================================

export const defaultState: SelectionsState & GeneralState & InternalState = {
  eventId: '',
  general: {
    firstName: '',
    lastName: '',
    birthDate: new Date(),
    gender: 'MALE',
    currentDegree: 'ABITUR',
    university: '',
    abiturGrade: '0.0',
    targetDegree: 'BACHELOR',
    expectedGraduationYear: 0,
    fieldOfStudy: '',
    semester: 0,
    currentGpa: '0.0',
    experienceConsulting: 0,
    experienceAbroad: 0,
    cv: [],
  },
  slots: {},
};

// #region Internal Slice
// ============================================================
export const createInternalSlice: StateCreator<
  Slices,
  [['zustand/immer', never], ['zustand/persist', unknown]],
  [],
  InternalState
> = () => ({
  eventId: defaultState.eventId,
});

// #region General Slice
// ============================================================
export const createGeneralSlice: StateCreator<
  Slices,
  [['zustand/immer', never], ['zustand/persist', unknown]],
  [],
  GeneralSlice
> = (set) => ({
  // state
  general: defaultState.general,

  // actions
  setGeneral(general) {
    set({ general });
  },
});

// #region Sub Application Slice
// ============================================================
export const createSubApplicationSlice: StateCreator<
  Slices,
  [['zustand/immer', never], ['zustand/persist', unknown]],
  [],
  SelectionsSlice
> = (set, get) => ({
  // state
  slots: defaultState.slots,

  setPrioritizedSelection(slotId, selectionId) {
    set((state) => {
      state.slots[slotId].prioritizedSelection = selectionId;
    });
  },

  getPrioritizedSelection(slotId) {
    return get().slots[slotId].prioritizedSelection;
  },

  isSubEventAdded(slotId, subEventId) {
    return get().slots[slotId].selections.some(
      (selection) => selection.id === subEventId
    );
  },

  addSelection(selection) {
    set((state) => {
      state.slots[selection.slotId].selections.push(selection);
    });
  },

  removeSelection(slotId, selectionId) {
    set((state) => {
      state.slots[slotId].selections = state.slots[slotId].selections.filter(
        (selection) => selection.id !== selectionId
      );

      if (state.slots[slotId].prioritizedSelection === selectionId) {
        state.slots[slotId].prioritizedSelection = null;
      }
    });
  },

  addCoverLetter(slotId, selectionId, coverLetter) {
    set((state) => {
      const selection = state.slots[slotId].selections.find(
        (selection) => selection.id === selectionId
      );

      if (!selection) {
        throw new Error(`Selection ${selectionId} not found`);
      }

      selection.coverLetter = coverLetter;
    });
  },
});

// #region Store
// ============================================================
export const createApplicationStore = (
  initialState?: Partial<SelectionsState> & Partial<GeneralState>
) => {
  return createStore<Slices>()(
    immer(
      persist(
        (...args) => ({
          ...createGeneralSlice(...args),
          ...createSubApplicationSlice(...args),
          ...createInternalSlice(...args),
          ...initialState,
        }),
        {
          name: STORE_KEY,
          storage: createJSONStorage(() => sessionStorage),
        }
      )
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
  initialState?: Partial<SelectionsState> &
    Partial<GeneralState> &
    Partial<InternalState>;
}

export function ApplicationStoreProvider({
  children,
  initialState,
}: ApplicationStoreProviderProps) {
  const storeRef = React.useRef<ApplicationStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createApplicationStore(initialState);
  }

  return (
    <ApplicationStoreContext.Provider value={storeRef.current}>
      {children}
    </ApplicationStoreContext.Provider>
  );
}

/**
 * The useApplicationStore hook is used to access the application store whenever
 * a component needs to read or write to the store.
 *
 * @example
 * ```tsx
 * const { general, setGeneral } = useApplicationStore((state) => state));
 * ```
 *
 * @param selector A function that selects a slice of the store.
 * @returns The selected slice of the store.
 */
export function useApplicationStore<T>(selector: (store: Slices) => T): T {
  const applicationStoreContext = React.useContext(ApplicationStoreContext);

  if (!applicationStoreContext) {
    throw new Error(
      'useApplicationStore must be used within a ApplicationStoreProvider'
    );
  }

  return useStore(applicationStoreContext, selector);
}
