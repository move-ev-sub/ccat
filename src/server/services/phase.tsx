import { toEndOfDay, toStartOfDay } from '@/utils/date';
import { createClient } from '@/utils/supabase/server';
import { Phase, PhaseType } from '@prisma/client';
import prisma from '../db';
import { ServiceResult } from '../types/serviceResult';
import { isAdmin, isAuthenticated } from './auth';

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
export async function upsertPhase({
  id,
  eventId,
  from,
  to,
  type,
}: {
  /**
   * The id of the phase. If the id is not provided, a new phase will be created.
   */
  id?: string;

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
      error: 'User is not authenticated to perform this action.',
    };
  }

  if (!(await isAdmin(client))) {
    return {
      ok: false,
      error:
        'User is not an admin therefore not authorized to perform this action.',
    };
  }

  const exists = await existsPhase({ eventId, type });

  if (!exists.ok) {
    return {
      ok: false,
      error: 'Failed to check if phase exists: ' + exists.error,
    };
  }

  // If the phase already exists, we can not create a new one.
  if (exists.data) {
    return {
      ok: false,
      error: `Event already has a phase of type ${type.toString()}.`,
    };
  }

  // All event phases must start in the future except for the preparation phase.
  if (from < new Date() && type !== 'PREP') {
    return {
      ok: false,
      error: 'Start date must be in the future.',
    };
  }

  const startDate = toStartOfDay(from);
  const endDate = toEndOfDay(to);

  // The start date must be before the end date. We check this after formatting
  // the dates since some phases might start at 00:00:00 and end at 23:59:59.
  if (startDate > endDate) {
    return {
      ok: false,
      error: 'Start date must be before end date.',
    };
  }

  const res = await prisma.phase.upsert({
    where: {
      id: id,
    },
    create: {
      startDate,
      endDate,
      eventId,
      type,
      createdById: '1',
    },
    update: {
      startDate,
      endDate,
    },
  });

  if (!res) {
    return {
      ok: false,
      error: 'Failed to create or update phase.',
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
      error: 'User is not authenticated to perform this action.',
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

  if (!res) {
    return {
      ok: false,
      error: 'Failed to check if phase exists.',
    };
  }

  return {
    ok: true,
    data: !!res,
  };
}

/**
 * Fetches all phases for an event. The user must be authenticated to perform
 * this action. For security reasons, the createdById field is not returned in
 * the response.
 */
export async function fetchPhasesForEvent({
  eventId,
}: {
  eventId: string;
}): Promise<ServiceResult<Omit<Phase, 'createdById'>[]>> {
  const res = await prisma.phase.findMany({
    where: {
      eventId: eventId,
    },
    omit: {
      createdById: true,
    },
  });

  if (!res) {
    return {
      ok: false,
      error: 'Failed to fetch phases for event.',
    };
  }

  return {
    ok: true,
    data: res,
  };
}
