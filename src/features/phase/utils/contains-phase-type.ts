import { Phase, PhaseType } from '@/generated/prisma/client';

/**
 * Checks if a list of phases contains a phase of a specific type.
 *
 * @returns True if the list contains a phase of the specified type, false otherwise.
 */
export async function containsPhaseType(
  phases: Partial<Phase>[],
  type: PhaseType
): Promise<boolean> {
  return phases.some((phase) => phase.type === type);
}
