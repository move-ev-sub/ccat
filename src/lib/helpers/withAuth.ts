import { adminOpts, auth } from '@/lib/api/auth';
import { AUTH_ERROR_CODES, GENERAL_ERROR_CODES } from '@/lib/error/codes';
import { PermissionTypes, PermissionValues, ServiceResult } from '@/types/';
import { Session } from '@/types/auth';
import { InferAdminRolesFromOption } from 'better-auth/plugins';
import { headers } from 'next/headers';

type AuthorizationOptions = {
  permissions: {
    [K in PermissionTypes]?: PermissionValues<K>[];
  };
};

type AuthorizationModeOptions =
  | {
      mode: 'role';
      role: InferAdminRolesFromOption<typeof adminOpts>;
    }
  | {
      mode: 'user';
      userId?: string;
    }
  | { mode?: never };

type WithAuthHandlerArgs<TArgs extends unknown[]> = {
  args: TArgs;
  session: Session;
};

/**
 * Higher-order function that wraps server actions with standardized authentication, authorization, and error handling.
 *
 * This function ensures that:
 * 1. The user is authenticated (has a valid session)
 * 2. The user has the required permissions (if specified)
 * 3. Errors are handled consistently
 *
 * @template TArgs - Tuple type of the arguments that the handler function accepts
 * @template TReturn - The return type of the handler function
 *
 * @param handler - The server action function to wrap. It receives an object containing:
 *                 - args: The arguments passed to the wrapped function
 *                 - session: The authenticated session
 *
 * @param authz - Optional authorization configuration:
 *   - `permissions`: Object specifying required permissions for each permission type
 *     (e.g., { company: ['create'], subEvent: ['fetchAll'] })
 *   - `mode`: Optional authorization mode:
 *     - `'user'`: Authorize as a specific user (defaults to current user if userId not specified)
 *     - `'role'`: Authorize as a specific role (defaults to 'user' if role not specified)
 *     - `undefined`: Authorize as the current user (default behavior)
 *
 * @returns A wrapped function that:
 *   - Returns { ok: false, error: AUTH_ERROR_CODES.USER_NOT_AUTHENTICATED } if not authenticated
 *   - Returns { ok: false, error: AUTH_ERROR_CODES.USER_NOT_AUTHORIZED } if not authorized
 *   - Returns { ok: false, error: string, cause?: unknown } for other errors
 *   - Returns { ok: true, data: TReturn } on success
 *
 * @example
 * // Basic usage with authentication only
 * const getData = withAuth<[string], { name: string }>(async ({ args: [id], session }) => {
 *   return { ok: true, data: { name: 'test' } };
 * });
 *
 * @example
 * // With permission requirements
 * const createCompany = withAuth<[CompanyData], Company>(
 *   async ({ args: [data], session }) => {
 *     return { ok: true, data: await createCompany(data) };
 *   },
 *   { permissions: { company: ['create'] } }
 * );
 *
 * @example
 * // With role-based authorization
 * const adminAction = withAuth<[AdminData], AdminResult>(
 *   async ({ args: [data], session }) => {
 *     return { ok: true, data: await performAdminAction(data) };
 *   },
 *   {
 *     mode: 'role',
 *     role: 'admin',
 *     permissions: {
 *       company: ['create', 'fetchAll'],
 *       subEvent: ['fetchAll', 'fetchPublished']
 *     }
 *   }
 * );
 */
export function withAuth<TArgs extends unknown[], TReturn>(
  handler: (
    params: WithAuthHandlerArgs<TArgs>
  ) => Promise<ServiceResult<TReturn>>,
  authz?: AuthorizationOptions & AuthorizationModeOptions
) {
  // Return a regular function (not async) that returns a Promise
  return function (...args: TArgs): Promise<ServiceResult<TReturn>> {
    // Create an async IIFE to handle the async operations
    return (async () => {
      try {
        const headersList = await headers();
        const session = await auth.api.getSession({
          headers: headersList,
        });

        if (!session) {
          return {
            ok: false,
            error: AUTH_ERROR_CODES.USER_NOT_AUTHENTICATED,
          };
        }

        // 2. Authorization check (if permissions required)
        if (authz) {
          const id = session.user.id;
          const headersList = await headers();

          const authorized = await auth.api.userHasPermission({
            body: {
              ...(authz.mode === 'user'
                ? { userId: authz.userId ?? id }
                : authz.mode === 'role'
                  ? { role: authz.role ?? 'user' }
                  : { userId: id }),
              permissions: authz.permissions,
            },
            headers: headersList,
          });

          if (!authorized.success) {
            return {
              ok: false,
              error: AUTH_ERROR_CODES.USER_NOT_AUTHORIZED,
            };
          }
        }

        return await handler({ args, session });
      } catch (error) {
        console.error('withAuth error:', error);

        if (error instanceof Error) {
          return {
            ok: false,
            error: error.message,
            cause: error.cause,
          };
        }

        return {
          ok: false,
          error: GENERAL_ERROR_CODES.UNKNOWN_ERROR,
        };
      }
    })();
  };
}
