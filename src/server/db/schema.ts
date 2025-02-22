import { boolean, pgEnum, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

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
