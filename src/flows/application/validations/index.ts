import { z } from 'zod/v4';

export const stepSchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string(),
});
