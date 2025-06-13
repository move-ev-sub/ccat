import { z } from 'zod/v4';
import { stepSchema } from '../validations';

export type Step = z.infer<typeof stepSchema>;
