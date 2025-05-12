import {
  Degree,
  Gender,
  SubApplicationPrioritzation,
  SubApplicationStatus,
} from '@/generated/prisma/client';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: 'accurate' | 'normal';
  } = {}
) {
  const { decimals = 0, sizeType = 'normal' } = opts;

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === 'accurate'
      ? (accurateSizes[i] ?? 'Bytes')
      : (sizes[i] ?? 'Bytes')
  }`;
}

/**
 * Translates an Gender enum value to a natural language string
 *
 * @param gender The enum value to translate
 * @returns The translated string
 */
export function translateGender(gender: Gender): string {
  switch (gender) {
    case Gender.MALE:
      return 'Männlich';
    case Gender.FEMALE:
      return 'Weiblich';
    case Gender.DIVERSE:
      return 'Divers';
    case Gender.PREFFER_NOT_TO_SAY:
      return 'Keine Angabe';
    default:
      return 'Keine Auswahl';
  }
}

/**
 * Translates a Degree enum value to a natural language string
 *
 * @param degree The enum value to translate
 * @returns The translated string
 */
export function translateDegree(degree: Degree): string {
  switch (degree) {
    case Degree.BACHELOR:
      return 'Bachelor';
    case Degree.MASTER:
      return 'Master';
    case Degree.ABITUR:
      return 'Abitur';
    case Degree.HOCHSCHULREIFE:
      return 'Hochschulreife';
    default:
      return 'Keine Auswahl';
  }
}

export function translatePriorization(
  priorization: SubApplicationPrioritzation
): string {
  switch (priorization) {
    case SubApplicationPrioritzation.PRIO_1:
      return 'Priorität 1';
    case SubApplicationPrioritzation.PRIO_2:
      return 'Priorität 2';
    case SubApplicationPrioritzation.PRIO_3:
      return 'Priorität 3';
    case SubApplicationPrioritzation.PRIO_4:
      return 'Priorität 4';
    case SubApplicationPrioritzation.PRIO_5:
      return 'Priorität 5';
    default:
      return 'Keine Auswahl';
  }
}

export function translateStatus(status: SubApplicationStatus): string {
  switch (status) {
    case SubApplicationStatus.ACCEPTED:
      return 'Akzeptiert';
    case SubApplicationStatus.REJECTED:
      return 'Abgelehnt';
    case SubApplicationStatus.PENDING:
      return 'Keine Entscheidung';
    default:
      return 'Keine Auswahl';
  }
}
