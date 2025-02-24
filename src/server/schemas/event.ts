import { z } from 'zod';

export const newEventSchema = z.object({
  name: z.string().min(6, {
    message: 'Veranstaltungsname muss mindestens 6 Zeichen lang sein.',
  }),
  description: z.string().optional(),
  status: z.enum(['draft', 'published', 'archived']),
});

export type NewEventData = z.infer<typeof newEventSchema>;
