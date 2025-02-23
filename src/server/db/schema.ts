import { sql } from 'drizzle-orm';
import {
  boolean,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const profileType = pgEnum('profile_type', ['user', 'company', 'admin']);

export const profilesTable = pgTable('profiles', {
  id: uuid().primaryKey().unique().defaultRandom(),
  type: profileType().notNull().default('user'),
});

export const userProfilesTable = pgTable('user_profiles', {
  id: uuid()
    .primaryKey()
    .unique()
    .references(() => profilesTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  notifyMe: boolean('notify_me').notNull().default(false),
  emailNotifications: boolean('email_notifications').notNull().default(false),
});

export const companyProfilesTable = pgTable('company_profiles', {
  id: uuid()
    .primaryKey()
    .unique()
    .references(() => profilesTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  name: varchar('name', {
    length: 255,
  }).notNull(),
});

export const adminProfilesTable = pgTable('admin_profiles', {
  id: uuid()
    .primaryKey()
    .unique()
    .references(() => profilesTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  firstName: varchar('first_name', {
    length: 255,
  }).notNull(),
  lastName: varchar('last_name', {
    length: 255,
  }).notNull(),
});

export const eventStatusEnum = pgEnum('event_status', [
  'draft',
  'published',
  'archived',
]);

export const eventsTable = pgTable('events', {
  id: uuid().primaryKey().unique().defaultRandom(),
  name: varchar('name', {
    length: 255,
  }).notNull(),
  description: varchar('description'),
  status: eventStatusEnum().notNull().default('draft'),
  createdBy: uuid('created_by')
    .notNull()
    // TODO: Add a default value for createdBy
    .default('40c8a8ca-d68f-41f3-a626-284edcc7e717')
    .references(() => profilesTable.id, {
      onDelete: 'set default',
    }),
  lastUpdated: timestamp('last_updated', {
    withTimezone: true,
  })
    .notNull()
    .default(sql`now()`),
});
