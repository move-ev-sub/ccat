import prisma from '@/server/db';
import {
  sendConfirmEmail,
  sendResetPasswordEmail,
} from '@/server/services/email';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendResetPasswordEmail({
        to: user.email,
        props: {
          url,
        },
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ url, user }) => {
      await sendConfirmEmail({
        to: user.email,
        props: {
          url,
        },
      });
    },
  },
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  plugins: [
    // Needs to be the last plugin in the array
    nextCookies(),
  ],
});
