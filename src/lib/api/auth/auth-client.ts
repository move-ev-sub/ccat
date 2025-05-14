import { createAuthClient } from 'better-auth/client';
import { adminClient, inferAdditionalFields } from 'better-auth/client/plugins';
import { auth } from './auth';
import { ac, admin, company, user } from './permissions';

export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields<typeof auth>(),
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
