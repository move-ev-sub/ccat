'use server';

import { Phase, PhaseType, Prisma } from '@/generated/prisma/client';
import { messages as t } from '@/i18n';
import { toEndOfDay, toStartOfDay } from '@/utils/date';
import prisma from '../db';
import { withAuth } from '../helpers';

/**
 * Updates a phase for an event. If the id is not provided, a new phase will be
 * created.
 *
 * The function is wrapped with the `withAuth` helper to ensure that the user
 * has the required permissions.
 *
 * @requires {permission} [phase:update]
 *
 * @returns The updated or created phase.
 */
export const updatePhase = withAuth<
  [
    {
      /**
       * The id of the phase
       */
      id?: string;

      /**
       * The start date of the phase. This should be in the future. Start dates will
       * always be formatted to start at 00:00:00.
       */
      from: Date;

      /**
       * The end date of the phase. This should be in the future. End dates will always
       * be formatted to end at 23:59:59.
       */
      to: Date;
    },
  ],
  Phase
>(
  async ({ id, from, to }) => {
    // All event phases must start in the future when editing them.
    if (from < new Date()) {
      throw new Error(t.errors.dateNotInFuture());
    }

    const startDate = toStartOfDay(from);
    const endDate = toEndOfDay(to);

    // The start date must be before the end date. We check this after formatting
    // the dates since some phases might start at 00:00:00 and end at 23:59:59.
    if (startDate > endDate) {
      throw new Error(t.errors.dateBeforeEnddate());
    }

    const res = await prisma.phase.update({
      where: {
        id: id,
      },
      data: {
        startDate,
        endDate,
      },
    });

    if (!res) {
      throw new Error(t.errors.updateFailed('phase'));
    }

    return {
      ok: true,
      data: res,
    };
  },
  {
    permissions: { phase: ['update'] },
  }
);

/**
 * Creates a new phase for an event. If a phase of the same type already exists,
 * the function will throw an error.
 *
 * The start and end date of the phase will be formatted to start at 00:00:00
 * and end at 23:59:59 respectively. Both dates must be in the future.
 *
 * The function is wrapped with the `withAuth` helper to ensure that the user
 * has the required permissions.
 *
 * @requires {permission} [phase:create]
 *
 * @returns The created or updated phase.
 */
export const createPhase = withAuth<
  [
    {
      /**
       * The id of the event the phase belongs to.
       */
      eventId: string;

      /**
       * The start date of the phase. This should be in the future. Start dates will
       * always be formatted to start at 00:00:00.
       */
      from: Date;

      /**
       * The end date of the phase. This should be in the future. End dates will always
       * be formatted to end at 23:59:59.
       */
      to: Date;

      /**
       * The type of the phase. This can not be changed once the phase has been created.
       */
      type: PhaseType;
    },
  ],
  Phase
>(
  async ({ eventId, from, to, type }, session) => {
    // Check if a phase of the given type already exists for the selected event
    const exists = await existsPhase({ eventId, type });

    if (!exists.ok) {
      throw new Error(t.errors.phaseCheckFailed() + exists.error);
    }

    // If the phase already exists, we can not create a new one.
    if (exists.data) {
      throw new Error(t.errors.eventAlreadyHasPhase(type.toString()));
    }

    // All event phases must start in the future except for the preparation phase.
    if (from < new Date() && type !== 'PREP') {
      throw new Error(t.errors.dateNotInFuture());
    }

    const startDate = toStartOfDay(from);
    const endDate = toEndOfDay(to);

    // The start date must be before the end date. We check this after formatting
    // the dates since some phases might start at 00:00:00 and end at 23:59:59.
    if (startDate > endDate) {
      throw new Error(t.errors.dateBeforeEnddate());
    }

    const res = await prisma.phase.create({
      data: {
        startDate,
        endDate,
        eventId,
        type,
        createdById: session.user.id,
      },
    });

    if (!res) {
      throw new Error(t.errors.notCreated('Event'));
    }

    return {
      ok: true,
      data: res,
    };
  },
  {
    permissions: {
      phase: ['create'],
    },
  }
);

/**
 * Checks if a phase (type) exists for an event by searching for the event id and the
 * phase type. The user must be authenticated to perform this action.
 *
 * The function is wrapped with the `withAuth` helper to ensure that the user
 * has the required permissions.
 *
 * @requires {permission} [phase:fetchAll]
 *
 * @returns True if the phase exists, false otherwise.
 */

export const existsPhase = withAuth<
  [
    {
      /**
       * The id of the event the phase belongs to.
       */
      eventId: string;

      /**
       * The type of the phase which should be checked.
       */
      type: PhaseType;
    },
  ],
  boolean
>(
  async ({ eventId, type }) => {
    const res = await prisma.phase.findFirst({
      where: {
        eventId,
        type,
      },
      select: {
        id: true,
      },
    });

    return {
      ok: true,
      data: !!res,
    };
  },
  {
    permissions: {
      phase: ['fetchAll'],
    },
  }
);

/**
 * Fetches all phases for an event. The user must be authenticated to perform
 * this action. For security reasons, the createdById field is not returned in
 * the response.
 *
 * @param sort The sort order of the phases.
 * @param eventId The id of the event the phases belong to.
 * @returns The phases for the event.
 */

export const fetchPhasesForEvent = withAuth<
  [
    {
      /**
       * The id of the event the phases belong to.
       */
      eventId: string;

      /**
       * The sort order of the phases.
       */
      sort?: Prisma.PhaseFindManyArgs['orderBy'];
    },
  ],
  Omit<Phase, 'createdById'>[]
>(
  async ({ eventId, sort }) => {
    const res = await prisma.phase.findMany({
      where: {
        eventId: eventId,
      },
      omit: {
        createdById: true,
      },
      orderBy: sort,
    });

    if (!res) {
      throw new Error(t.errors.failedToFetch('phases'));
    }

    return {
      ok: true,
      data: res,
    };
  },
  {
    permissions: {
      phase: ['fetchAll'],
    },
  }
);

/**
 * Checks if all phases for an event have been set up. This is used to determine
 * if the event is ready to be published. The user must be an admin to perform
 * this action as it requires access to all phases of the event.
 *
 * The function is wrapped with the `withAuth` helper to ensure that the user
 * has the required permissions.
 *
 * @requires {permission} [phase:fetchAll]
 *
 * @returns True if the phases are setup, false otherwise.
 */
export const isPhasesSetupCompleted = withAuth<
  [
    {
      eventId: string;
    },
  ],
  boolean
>(
  async ({ eventId }) => {
    const res = await prisma.phase.findMany({
      where: {
        eventId,
      },
      select: {
        id: true,
        type: true,
      },
    });

    if (!res) {
      throw new Error(t.errors.failedToFetch('phases'));
    }

    let completed = true;

    for (const type of Object.values(PhaseType)) {
      if (!(await containsPhaseType(res, type))) {
        completed = false;
        break;
      }
    }

    return {
      ok: true,
      data: completed,
    };
  },
  {
    permissions: {
      phase: ['fetchAll'],
    },
  }
);

/**
 * Checks if a list of phases contains a phase of a specific type.
 *
 * @returns True if the list contains a phase of the specified type, false otherwise.
 */
async function containsPhaseType(
  phases: Partial<Phase>[],
  type: PhaseType
): Promise<boolean> {
  return phases.some((phase) => phase.type === type);
}

/**
 * Fetches the current phase for an event. The current phase is the phase that
 * is currently active. The user must be authenticated to perform this action.
 *
 * The function is wrapped with the `withAuth` helper to ensure that the user
 * has the required permissions.
 *
 * @requires {permission} [phase:fetchAll]
 *
 * @returns The current phase for the event.
 */

export const getCurrentPhase = withAuth<
  [
    {
      eventId: string;
    },
  ],
  Phase | null
>(
  async ({ eventId }) => {
    const res = await prisma.phase.findFirst({
      where: {
        eventId,
        startDate: {
          lte: new Date(),
        },
        endDate: {
          gte: new Date(),
        },
      },
    });

    if (!res) {
      throw new Error(t.errors.failedToFetch('current phase'));
    }

    return {
      ok: true,
      data: res,
    };
  },
  {
    permissions: {
      phase: ['fetchAll'],
    },
  }
);
