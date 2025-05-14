import { PhaseType } from '@/generated/prisma/client';
import { cuidSchema } from '@/lib/validations/cuid';
import { z } from 'zod';

export const updatePhaseSchema = z.object({
  /**
   * The id of the phase
   */
  id: cuidSchema,

  /**
   * The start date of the phase. This should be in the future. Start dates will
   * always be formatted to start at 00:00:00.
   */
  from: z.date(),

  /**
   * The end date of the phase. This should be in the future. End dates will always
   * be formatted to end at 23:59:59.
   */
  to: z.date(),
});

export const createPhaseSchema = z.object({
  /**
   * The id of the event the phase belongs to.
   */
  eventId: cuidSchema,

  /**
   * The start date of the phase. This should be in the future. Start dates will
   * always be formatted to start at 00:00:00.
   */
  from: z.date(),

  /**
   * The end date of the phase. This should be in the future. End dates will always
   * be formatted to end at 23:59:59.
   */
  to: z.date(),

  /**
   * The type of the phase. This can not be changed once the phase has been created.
   */
  type: z.nativeEnum(PhaseType),
});

export const existsPhaseSchema = z.object({
  /**
   * The id of the event the phase belongs to.
   */
  eventId: cuidSchema,

  /**
   * The type of the phase which should be checked.
   */
  type: z.nativeEnum(PhaseType),
});

export const fetchPhasesForEventSchema = z.object({
  /**
   * The id of the event the phases belong to.
   */
  eventId: cuidSchema,
});

export const isPhasesSetupCompletedSchema = z.object({
  /**
   * The id of the event the phases belong to.
   */
  eventId: cuidSchema,
});

export const getCurrentPhaseSchema = z.object({
  /**
   * The id of the event the phases belong to.
   */
  eventId: cuidSchema,
});
