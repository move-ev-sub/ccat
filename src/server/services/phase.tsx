'use server';

import { messages as t } from '@/i18n';
import { toEndOfDay, toStartOfDay } from '@/utils/date';
import { createClient } from '@/utils/supabase/server';
import { Phase, PhaseType, Prisma } from '@prisma/client';
import prisma from '../db';
import { ServiceResult } from '../types/serviceResult';
import { getUser, isAdmin, isAuthenticated } from './auth';

/**
 * Upadtes a phase for an event. If the phase does not exist, a new phase will
 *
 * The start and end date of the phase will be formatted to start at 00:00:00
 * and end at 23:59:59 respectively.
 *
 * @returns The created or updated phase.
 */
export async function updatePhase({
  id,
  from,
  to,
}: {
  /**
   * The id of the phase. If the id is not provided, a new phase will be created.
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
}): Promise<ServiceResult<Phase>> {
  const client = await createClient();

  if (!(await isAuthenticated(client))) {
    return {
      ok: false,
      error: t.errors.notAuthenticated(),
    };
  }

  if (!(await isAdmin(client))) {
    return {
      ok: false,
      error: t.errors.notAuthorized(),
    };
  }

  // All event phases must start in the future when editing them.
  if (from < new Date()) {
    return {
      ok: false,
      error: t.errors.dateNotInFuture(),
    };
  }

  const startDate = toStartOfDay(from);
  const endDate = toEndOfDay(to);

  // The start date must be before the end date. We check this after formatting
  // the dates since some phases might start at 00:00:00 and end at 23:59:59.
  if (startDate > endDate) {
    return {
      ok: false,
      error: t.errors.dateBeforeEnddate(),
    };
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
    return {
      ok: false,
      error: t.errors.updateFailed('phase'),
    };
  }

  return {
    ok: true,
    data: res,
  };
}

/**
 * Creates or updates a phase for an event. If the phase already exists, it
 * only the start and end date will be updated. The type of the phase will
 * and can not be changed.The user must be authenticated and an admin to perform
 * this action. This action will fail, if the event already has a phase of the
 * same type.
 *
 * The start and end date of the phase will be formatted to start at 00:00:00
 * and end at 23:59:59 respectively.
 *
 * @returns The created or updated phase.
 */
export async function createPhase({
  eventId,
  from,
  to,
  type,
}: {
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
}): Promise<ServiceResult<Phase>> {
  const client = await createClient();

  if (!(await isAuthenticated(client))) {
    return {
      ok: false,
      error: t.errors.notAuthenticated(),
    };
  }

  if (!(await isAdmin(client))) {
    return {
      ok: false,
      error: t.errors.notAuthorized(),
    };
  }

  const exists = await existsPhase({ eventId, type });

  if (!exists.ok) {
    return {
      ok: false,
      error: t.errors.phaseCheckFailed() + exists.error,
    };
  }

  // If the phase already exists, we can not create a new one.
  if (exists.data) {
    return {
      ok: false,
      error: t.errors.eventAlreadyHasPhase(type.toString()),
    };
  }

  // All event phases must start in the future except for the preparation phase.
  if (from < new Date() && type !== 'PREP') {
    return {
      ok: false,
      error: t.errors.dateNotInFuture(),
    };
  }

  const startDate = toStartOfDay(from);
  const endDate = toEndOfDay(to);

  // The start date must be before the end date. We check this after formatting
  // the dates since some phases might start at 00:00:00 and end at 23:59:59.
  if (startDate > endDate) {
    return {
      ok: false,
      error: t.errors.dateBeforeEnddate(),
    };
  }

  const user = await getUser(client);

  if (!user || !user.id) {
    return {
      ok: false,
      error: t.errors.failedToGetUser(),
    };
  }

  const res = await prisma.phase.create({
    data: {
      startDate,
      endDate,
      eventId,
      type,
      createdById: user.id,
    },
  });

  if (!res) {
    return {
      ok: false,
      error: t.errors.noEventCreated(),
    };
  }

  return {
    ok: true,
    data: res,
  };
}

/**
 * Checks if a phase exists for an event by searching for the event id and the
 * phase type. The user must be authenticated to perform this action.
 *
 * @returns True if the phase exists, false otherwise.
 */
export async function existsPhase({
  eventId,
  type,
}: {
  /**
   * The id of the event the phase belongs to.
   */
  eventId: string;

  /**
   * The type of the phase.
   */
  type: PhaseType;
}): Promise<ServiceResult<boolean>> {
  if (!(await isAuthenticated())) {
    return {
      ok: false,
      error: t.errors.notAuthenticated(),
    };
  }

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
}

/**
 * Fetches all phases for an event. The user must be authenticated to perform
 * this action. For security reasons, the createdById field is not returned in
 * the response.
 *
 * @param sort The sort order of the phases.
 * @param eventId The id of the event the phases belong to.
 * @returns The phases for the event.
 */
export async function fetchPhasesForEvent({
  eventId,
  sort = {
    startDate: 'asc',
  },
}: {
  eventId: string;
  sort?: Prisma.PhaseFindManyArgs['orderBy'];
}): Promise<ServiceResult<Omit<Phase, 'createdById'>[]>> {
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
    return {
      ok: false,
      error: t.errors.failedToFetch('phases'),
    };
  }

  return {
    ok: true,
    data: res,
  };
}

/**
 * Checks if all phases for an event have been set up. This is used to determine
 * if the event is ready to be published. The user must be an admin to perform
 * this action as it requires access to all phases of the event.
 */
export async function isPhasesSetupCompleted({
  eventId,
}: {
  eventId: string;
}): Promise<ServiceResult<boolean>> {
  if (!(await isAdmin())) {
    return {
      ok: false,
      error: t.errors.notAuthorized(),
    };
  }

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
    return {
      ok: false,
      error: t.errors.failedToFetch('phases'),
    };
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
}

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
 */
export async function getCurrentPhase({
  eventId,
}: {
  eventId: string;
}): Promise<ServiceResult<Phase | null>> {
  if (!(await isAuthenticated())) {
    return {
      ok: false,
      error: t.errors.notAuthenticated(),
    };
  }

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
    return {
      ok: true,
      data: null,
    };
  }

  return {
    ok: true,
    data: res,
  };
}
