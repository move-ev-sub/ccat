import { createAuthClient } from 'better-auth/client';
import { adminClient } from 'better-auth/client/plugins';
import { ac, admin, company, user } from './auth/permissions';

export const authClient = createAuthClient({
  plugins: [
    adminClient({
      ac,
      roles: {
        user,
        company,
        admin,
      },
    }),
  ],
});
