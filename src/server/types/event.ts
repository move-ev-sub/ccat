import { eventsTable } from '../db/schema';

export type EventSelectResult = typeof eventsTable.$inferSelect;

export type EventInsertData = typeof eventsTable.$inferInsert;
