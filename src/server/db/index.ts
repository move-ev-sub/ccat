import { env } from '@/env';
import { PrismaClient } from '@prisma/client';

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
