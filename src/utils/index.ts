import { Degree, Gender } from '@prisma/client';
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
