import { env } from '@/env';
import { PrismaClient } from '@/generated/prisma/client';

/**
 * ---------------------------------- PRISMA ----------------------------------
 */
const prisma = new PrismaClient({
  log: ['error', 'warn', 'info', 'query'],
  errorFormat: 'pretty',
});

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: typeof prisma;
};

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
