import {
  sendConfirmEmail,
  sendResetPasswordEmail,
} from '@/features/email/services/emailService';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { admin as adminPlugin } from 'better-auth/plugins';
import prisma from '../prisma';
import { ac, admin, company, user } from './permissions';

export const adminOpts = {
  adminRoles: ['admin'],
  defaultRole: 'user',

  ac,
  roles: {
    user,
    company,
    admin,
  },
};

export const auth = betterAuth({
  logger: {
    level: 'debug',
  },
  rateLimit: {
    enabled: false,
  },
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
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
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
  user: {
    additionalFields: {
      firstName: {
        type: 'string',
        required: true,
        input: true,
      },
      lastName: {
        type: 'string',
        required: true,
        input: true,
      },
      emailReminders: {
        type: 'boolean',
        required: true,
        input: true,
        defaultValue: false,
      },
      notifyMe: {
        type: 'boolean',
        required: true,
        input: true,
        defaultValue: false,
      },
    },
  },
  plugins: [
    adminPlugin(adminOpts),
    // Needs to be the last plugin in the array
    nextCookies(),
  ],
});

export type Session = typeof auth.$Infer.Session;
