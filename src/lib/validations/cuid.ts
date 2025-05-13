import { z } from 'zod';
import { GENERAL_ERROR_CODES } from '../error/codes';

export const cuidSchema = z.string().regex(/^c[^\s-]{24,}$/, {
  message: GENERAL_ERROR_CODES.INVALID_CUID,
});
