import postgres from 'postgres';

import { env } from '@/env';
import { PrismaClient } from '@prisma/client';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const conn = globalForDb.conn ?? postgres(env.DATABASE_URL);
if (env.NODE_ENV !== 'production') globalForDb.conn = conn;

export const db = drizzle(conn, { schema });

/**
 * ---------------------------------- PRISMA ----------------------------------
 */
const prisma = new PrismaClient();

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: typeof prisma;
};

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export { prisma };
