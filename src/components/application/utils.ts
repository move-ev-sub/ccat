import { Degree, Gender } from '@prisma/client';

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
