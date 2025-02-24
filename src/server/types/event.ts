import { eventsTable } from '../db/schema';

export type EventSelectResult = typeof eventsTable.$inferSelect;
