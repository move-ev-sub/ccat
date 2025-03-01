import { Accept } from 'react-dropzone';
import { z } from 'zod';

export const MAX_FILE_COUNT = 1;
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_FILE_TYPES: Accept = {
  'image/jpeg': [],
  'image/png': [],
  'image/svg': [],
};

export const newCompanySchema = z.object({
  name: z.string().min(6),
  email: z.string().email(),
  logo: z.array(z.instanceof(File)).max(1),
});

export const logoSchema = z
  .array(z.instanceof(File))
  .max(1, { message: 'Du kannst nur eine Datei hochladen.' })
  .refine((files) => files.length === MAX_FILE_COUNT, {
    message: 'Du kannst nur eine Datei hochladen.',
  })
  .refine((file) => file instanceof File, {
    message: 'Erwartet ein Dateiobjekt',
  })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
  });
//   .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
//     message: `File type must be one of: ${ACCEPTED_FILE_TYPES.join(', ')}`,
//   });
