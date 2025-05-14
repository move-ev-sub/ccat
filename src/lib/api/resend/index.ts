import { env } from '@/env';
import { Resend } from 'resend';

/**
 * ---------------------------------- RESEND ----------------------------------
 */
const resend = new Resend(env.RESEND_API_KEY);

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForResend = globalThis as unknown as {
  resend: typeof resend;
};

if (env.NODE_ENV !== 'production') globalForResend.resend = resend;

export default resend;
