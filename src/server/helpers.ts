'use server';

import { AUTH_ERROR_CODES, GENERAL_ERROR_CODES } from '@/error/codes';
import { adminOpts, auth, Session } from '@/utils/auth';
import { statement } from '@/utils/auth/permissions';
import { InferAdminRolesFromOption } from 'better-auth/plugins';
import { headers } from 'next/headers';
import { ServiceResult } from './types/serviceResult';

type PermissionTypes = keyof typeof statement;
type PermissionValues<T extends PermissionTypes> =
  (typeof statement)[T][number];

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
 * @param handler - The server action function to wrap. It receives the session as its first argument
 *                 followed by any additional arguments passed to the wrapped function.
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
 * const getData = withAuth<[string], { name: string }>(async (session, id) => {
 *   return { ok: true, data: { name: 'test' } };
 * });
 *
 * @example
 * // With permission requirements
 * const createCompany = withAuth<[CompanyData], Company>(
 *   async (session, data) => {
 *     return { ok: true, data: await createCompany(data) };
 *   },
 *   { permissions: { company: ['create'] } }
 * );
 *
 * @example
 * // With role-based authorization
 * const adminAction = withAuth<[AdminData], AdminResult>(
 *   async (session, data) => {
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
    session: Session,
    ...args: TArgs
  ) => Promise<ServiceResult<TReturn>>,
  authz?: AuthorizationOptions & AuthorizationModeOptions
) {
  return async function (...args: TArgs): Promise<ServiceResult<TReturn>> {
    try {
      const session = await auth.api.getSession({
        headers: await headers(),
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

        const authorized = await auth.api.userHasPermission({
          body: {
            ...(authz.mode === 'user'
              ? { userId: authz.userId ?? id }
              : authz.mode === 'role'
                ? { role: authz.role ?? 'user' }
                : { userId: id }),
            permissions: authz.permissions,
          },
          // TODO: We might need to add headers here
          // headers: await headers(),
        });

        if (!authorized.success) {
          return {
            ok: false,
            error: AUTH_ERROR_CODES.USER_NOT_AUTHORIZED,
          };
        }
      }

      return await handler(session, ...args);
    } catch (error) {
      if (error instanceof Error) {
        return {
          ok: false,
          error: error.message,
          cause: error.cause,
        };
      }

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
  };
}
