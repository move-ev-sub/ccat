import { Degree, Gender } from '@/generated/prisma/client';
import { z } from 'zod/v4';

/**
 * Not really a clean solution, but it works for now
 *
 * @todo TODO: Find a better solution for managing the decimal schema
 *
 * @see https://github.com/colinhacks/zod/discussions/3339#discussioncomment-8859717
 */
// const gradeSchema = z
//   .string()
//   .transform((val) => Number(`${val}`.replace(',', '.')))
//   .pipe(
//     z
//       .number()
//       .min(1, 'Note muss zwischen 1,0 und 6,0 liegen')
//       .max(6, 'Note muss zwischen 1,0 und 6,0 liegen')
//   )
//   .or(
//     z
//       .number()
//       .min(1, 'Note muss zwischen 1,0 und 6,0 liegen')
//       .max(6, 'Note muss zwischen 1,0 und 6,0 liegen')
//   );

export const generalSchema = z.object({
  // ================== Personal Information ==================
  firstName: z.string().nonempty('Vorname darf nicht leer sein.'),
  lastName: z.string().nonempty('Nachname darf nicht leer sein.'),
  birthDate: z.date(),
  gender: z.enum(Gender, {
    message: 'Dieses Feld ist erforderlich',
  }),

  // ================== Academic Information ==================
  university: z.string().min(1),
  currentDegree: z.enum(Degree),
  targetDegree: z.enum([Degree.BACHELOR, Degree.MASTER]),
  expectedGraduationYear: z.number().min(1),
  fieldOfStudy: z.string().min(1),
  semester: z.number().min(1),
  currentGpa: z.string().refine(
    (val) => {
      if (val.includes(',')) {
        val = val.replace(',', '.');
      }

      const number = Number(val);
      return number >= 1 && number <= 6;
    },
    {
      message: 'Note muss zwischen 1,0 und 6,0 liegen',
    }
  ),
  abiturGrade: z.string().refine(
    (val) => {
      if (val.includes(',')) {
        val = val.replace(',', '.');
      }

      const number = Number(val);
      return number >= 1 && number <= 6;
    },
    {
      message: 'Note muss zwischen 1,0 und 6,0 liegen',
    }
  ),
  experienceAbroad: z.number(),
  experienceConsulting: z.number(),

  // ======================= Documents =======================
  cv: z.array(z.instanceof(File)).max(1),
});
