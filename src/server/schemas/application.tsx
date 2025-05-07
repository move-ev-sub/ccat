import { Accept } from 'react-dropzone';
import { z } from 'zod';

export const MAX_FILE_COUNT = 1;
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_FILE_TYPES: Accept = {
  'application/pdf': [],
};

export const newCompanySchema = z.object({
  logo: z.array(z.instanceof(File)).max(1),
});
