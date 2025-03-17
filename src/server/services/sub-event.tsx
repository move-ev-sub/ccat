'use server';

import { SubEvent } from '@prisma/client';
import { validate as uuidValidate } from 'uuid';
import prisma from '../db';
import { ServiceResult } from '../types/serviceResult';
import { getUser, isAdmin } from './auth';

/**
 * The parameters for creating a sub-event.
 *
 * @see {@link createSubEvent}
 */
interface CreateSubEventParams {
  /**
   * The name of the sub-event
   */
  name: string;
  /**
   * The start date of the sub-event
   */
  startDate: Date;
  /**
   * The end date of the sub-event
   */
  endDate: Date;
  /**
   * The UUID of the parent event
   */
  eventId: string;
  /**
   * The maximum number of participants allowed for the sub-event
   */
  maxParticipants: number;
  /**
   * The description of the sub-event
   */
  description?: string;
  /**
   * The UUID of the host company
   */
  hostId: string;
  /**
   * The UUID of the slot
   */
  slotId: string;
}

/**
 * Creates a new sub-event within an existing event.
 *
 * This function handles the creation of a sub-event with various validations:
 * - Validates the event ID format
 * - Ensures the start date is before the end date
 * - Verifies that max participants is a positive number
 * - Checks if the user has admin privileges
 *
 * @example
 * ```typescript
 * const result = await createSubEvent({
 *   name: "Workshop with Company",
 *   startDate: new Date("2024-03-20T10:00:00"),
 *   endDate: new Date("2024-03-20T11:00:00"),
 *   eventId: "123e4567-e89b-12d3-a456-426614174000",
 *   maxParticipants: 25,
 *   description: "An interactive workshop session"
 * });
 *
 * if (result.ok) {
 *   console.log("Sub-event created:", result.data);
 * } else {
 *   console.error("Failed to create sub-event:", result.error);
 * }
 * ```
 *
 * @param {Object} params - The parameters for creating a sub-event
 * @param {string} params.name - The name of the sub-event
 * @param {Date} params.startDate - The start date and time of the sub-event
 * @param {Date} params.endDate - The end date and time of the sub-event
 * @param {string} params.eventId - The UUID of the parent event
 * @param {number} params.maxParticipants - The maximum number of participants allowed
 * @param {string} [params.description] - Optional description of the sub-event
 *
 * @returns {Promise<ServiceResult<SubEvent>>} A promise that resolves to a ServiceResult containing either:
 * - The created SubEvent object if successful
 * - An error message if the creation fails
 *
 * @throws {Error} If the database operation fails
 *
 * @remarks
 * - Only admin users can create sub-events
 * - The function automatically sets the createdById to the current user's ID
 * - The created sub-event will be associated with the specified event
 * - The function uses Prisma for database operations
 * - All dates are stored in UTC format
 */
export async function createSubEvent({
  name,
  startDate,
  endDate,
  eventId,
  maxParticipants,
  description,
  hostId,
  slotId,
}: CreateSubEventParams): Promise<ServiceResult<SubEvent>> {
  console.log('EventID', eventId);
  console.log('HostID', hostId);
  console.log('SlotID', slotId);

  // Check if provided uuids are valid
  if (
    !uuidValidate(eventId) ||
    !uuidValidate(hostId) ||
    !uuidValidate(slotId)
  ) {
    return {
      ok: false,
      error: 'At least one of the provided UUIDs is invalid.',
    };
  }

  // Check if start date is before end date
  if (startDate >= endDate) {
    return {
      ok: false,
      error: 'Start date must be before end date.',
    };
  }

  // Check if dates are in the future
  if (startDate < new Date() || endDate < new Date()) {
    return {
      ok: false,
      error: 'Both start and end date must be in the future.',
    };
  }

  // Check if max participants is positive
  if (maxParticipants <= 0) {
    return {
      ok: false,
      error: 'Max participants must be positive.',
    };
  }

  // Only admins can create new sub events
  if (!(await isAdmin())) {
    return {
      ok: false,
      error: 'User is not authorized to create sub events.',
    };
  }

  const user = await getUser();

  if (!user) {
    return {
      ok: false,
      error: 'Could not find user object.',
    };
  }

  const createdById = user.id;

  try {
    const res = await prisma.subEvent.create({
      data: {
        name,
        startDate,
        endDate,
        eventId,
        createdById,
        maxParticipants,
        description,
        hostId,
        slotId,
      },
    });

    if (!res) {
      return {
        ok: false,
        error: 'Failed to create sub event.',
      };
    }

    return {
      ok: true,
      data: res,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        ok: false,
        error: `Failed to create sub event: ${error.message}`,
      };
    }

    console.log('Type of error', typeof error);

    return {
      ok: false,
      error: `Failed to create sub event: ${error}`,
    };
  }
}
