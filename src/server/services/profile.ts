'use server';

import { messages as t } from '@/i18n';
import { createClient } from '@/utils/supabase/server';
import {
  AdminProfile,
  CompanyProfile,
  Prisma,
  Profile,
  Role,
  UserProfile,
} from '@prisma/client';
import prisma from '../db';
import {
  FullAdminProfile,
  FullCompanyProfile,
  FullUserProfile,
} from '../types/profile';
import { ServiceResult } from '../types/serviceResult';
import { getUser, isAdmin, isAuthenticated } from './auth';

// ---------------------------------- TYPES ----------------------------------
interface PaginationArgs {
  page: number;
  pageSize: number;
}

interface FilterArgs {
  role: Role | 'ALL';
  filters: Prisma.ProfileWhereInput;
}

interface SortArgs {
  sorts?: Prisma.ProfileOrderByWithRelationInput;
}

interface FetchProfileArgs {
  filter: Partial<Omit<FilterArgs, 'role'>> & {
    role: FilterArgs['role'];
  };
  sort?: SortArgs;
}

interface FetchSpecificProfileArgs extends Omit<FetchProfileArgs, 'filter'> {
  filter?: Omit<FilterArgs, 'role'>;
}

interface FetchPaginatedProfileArgs extends FetchProfileArgs {
  pagination: PaginationArgs;
}

interface FetchPaginatedSpecificProfileArgs
  extends Omit<FetchPaginatedProfileArgs, 'filter'> {
  filter?: Omit<FilterArgs, 'role'>;
}

interface FetchProfileCountArgs {
  filter: Partial<Omit<FilterArgs, 'role'>> & {
    role: FilterArgs['role'];
  };
}

interface FetchSpecificProfileCountArgs
  extends Omit<FetchProfileCountArgs, 'filter'> {
  filter?: Omit<FilterArgs, 'role'>;
}

export interface FullUnknownProfile extends Profile {
  userProfile: UserProfile | null;
  adminProfile: AdminProfile | null;
  companyProfile: CompanyProfile | null;
}

// --------------------------------- METHODS ---------------------------------

/**
 * Fetches ALL profiles from the database for a given role. This function should only
 * be used, when the advantage of client-side pagination outweighs the disadvantage of
 * fetching all profiles at once.
 *
 *
 */
async function fetchProfilesForRole<T extends Profile>({
  filter: { role, filters },
}: FetchProfileArgs): Promise<ServiceResult<T[]>> {
  // Only authenticated users can fetch ALL profiles
  if (!(await isAuthenticated())) {
    return {
      ok: false,
      error: t.errors.notAuthenticated(),
    };
  }

  if (!(await isAdmin())) {
    return {
      ok: false,
      error: t.errors.noAdmin(),
    };
  }

  const res = await prisma.profile.findMany({
    where: {
      ...filters,
      ...(role !== 'ALL' && {
        role: role,
      }),
    },
    // include the sub-profiles based on the role
    ...(role === 'ADMIN' && {
      include: {
        adminProfile: true,
      },
    }),
    ...(role === 'COMPANY' && {
      include: {
        companyProfile: true,
      },
    }),
    ...(role === 'USER' && {
      include: {
        userProfile: true,
      },
    }),
  });

  return {
    ok: true,
    data: res as T[],
  };
}

/**
 * Fetches ALL User profiles from the database.
 *
 * @see fetchProfilesForRole<Profile>
 *
 * @returns A list of profiles.
 */
export async function fetchUserProfiles(
  args?: FetchSpecificProfileArgs
): ReturnType<typeof fetchProfilesForRole<FullUserProfile>> {
  return fetchProfilesForRole<FullUserProfile>({
    ...args,
    filter: {
      ...args?.filter,
      role: 'USER',
    },
  });
}

/**
 * Fetches ALL Company profiles from the database.
 *
 * @see fetchProfilesForRole<FullCompanyProfile>
 *
 * @returns A list of profiles.
 */
export async function fetchCompanyProfiles(
  args?: FetchSpecificProfileArgs
): ReturnType<typeof fetchProfilesForRole<FullCompanyProfile>> {
  return fetchProfilesForRole<FullCompanyProfile>({
    ...args,
    filter: {
      ...args?.filter,
      role: 'COMPANY',
    },
  });
}

/**
 * Fetches profiles for a given role from the database in a paginated manner. Only
 * authenticated users can fetch ALL profiles. Profiles are fetched in a paginated manner.
 * This means that only a subset of profiles are fetched at a time. The `page` parameter
 * specifies which page of profiles to fetch, and the `limit` parameter specifies how many
 * profiles to fetch per page.
 *
 * When the Role is set to a specific role, only profiles with that role are fetched. This
 * also means, that the role specific profile is included in the response. If no role is
 * specified, all profiles are fetched and no sub-profiles are included in the response.
 *
 * @param page Number of the page to fetch.
 * @param limit Number of profiles to fetch per page.
 * @param role The role to filter by.
 *
 * @returns A paginated list of profiles of the specified role.
 *
 * @todo TODO: Implement caching for profiles.
 * @todo TODO: The Row Count is currently returned with each response. This is not necessary
 *             and should be moved to its own logic, as the Row Count only changes when the
 *             filters change.
 */
async function fetchProfilesForRolePaginated<T extends Profile>({
  filter: { role, filters },
  pagination: { page, pageSize },
}: FetchPaginatedProfileArgs): Promise<
  ServiceResult<{
    page: number;
    profiles: T[];
    count: number;
  }>
> {
  // Only authenticated users can fetch ALL profiles
  if (!(await isAuthenticated())) {
    return {
      ok: false,
      error: t.errors.notAuthenticated(),
    };
  }

  const res = await prisma.profile.findMany({
    skip: page * pageSize,
    take: pageSize,
    where: {
      ...filters,
    },
    // Only set a WHERE clause if the role is not 'ALL'
    ...(role !== 'ALL' && {
      where: {
        ...filters,
        AND: { role: role },
      },
    }),
    // include the sub-profiles based on the role
    ...(role === 'ADMIN' && {
      include: {
        adminProfile: true,
      },
    }),
    ...(role === 'COMPANY' && {
      include: {
        companyProfile: true,
      },
    }),
    ...(role === 'USER' && {
      include: {
        userProfile: true,
      },
    }),
  });

  const count = await fetchProfilesCount({
    ...(filters && {
      filter: {
        filters: filters,
      },
    }),
  });

  if (!count.ok) {
    return {
      ok: false,
      error: count.error,
    };
  }

  return {
    ok: true,
    data: {
      page: page,
      profiles: res as T[],
      count: count.data,
    },
  };
}

/**
 * Fetches all profiles from the database in a paginated manner.
 *
 * @see fetchPaginatedProfilesForRole<Profile>
 *
 * @param page Number of the page to fetch.
 * @param limit Number of profiles to fetch per page.
 *
 * @returns A paginated list of profiles.
 */
export async function fetchProfilesPaginated(
  args: FetchPaginatedSpecificProfileArgs
): ReturnType<typeof fetchProfilesForRolePaginated<Profile>> {
  return fetchProfilesForRolePaginated<Profile>({
    ...args,
    filter: {
      ...args.filter,
      role: 'ALL',
    },
  });
}

/**
 * Fetches all admin profiles from the database in a paginated manner.
 *
 * @see fetchPaginatedProfilesForRole<FullAdminProfile>
 *
 * @param page Number of the page to fetch.
 * @param limit Number of profiles to fetch per page.
 *
 * @returns A paginated list of admin profiles.
 */
export async function fetchAdminProfilesPaginated(
  args: FetchPaginatedSpecificProfileArgs
): ReturnType<typeof fetchProfilesForRolePaginated<FullAdminProfile>> {
  return fetchProfilesForRolePaginated<FullAdminProfile>({
    ...args,
    filter: {
      ...args.filter,
      role: 'ADMIN',
    },
  });
}

/**
 * Fetches all user profiles from the database in a paginated manner.
 *
 * @see fetchPaginatedProfilesForRole<FullUserProfile>
 *
 * @param page Number of the page to fetch.
 * @param limit Number of profiles to fetch per page.
 *
 * @returns A paginated list of user profiles.
 */
export async function fetchUserProfilesPaginated(
  args: FetchPaginatedSpecificProfileArgs
): ReturnType<typeof fetchProfilesForRolePaginated<FullUserProfile>> {
  return fetchProfilesForRolePaginated<FullUserProfile>({
    ...args,
    filter: {
      ...args.filter,
      role: 'USER',
    },
  });
}

/**
 * Fetches all company profiles from the database in a paginated manner.
 *
 * @see fetchPaginatedProfilesForRole<FullCompanyProfile>
 *
 * @param page Number of the page to fetch.
 * @param limit Number of profiles to fetch per page.
 *
 * @returns A paginated list of company profiles.
 */
export async function fetchCompanyProfilesPaginated(
  args: FetchPaginatedSpecificProfileArgs
): ReturnType<typeof fetchProfilesForRolePaginated<FullCompanyProfile>> {
  return fetchProfilesForRolePaginated<FullCompanyProfile>({
    ...args,
    filter: {
      ...args.filter,
      role: 'COMPANY',
    },
  });
}

/**
 * Fetches the total number of profiles for a given role in the database.
 *
 * @param {Role | 'ALL'} role The role to filter by.
 * @returns {Promise<ServiceResult<number>>} The total number of profiles.
 */
async function fetchProfilesCountForRole({
  filter: { role, filters },
}: FetchProfileCountArgs): Promise<ServiceResult<number>> {
  // Only authenticated users can fetch ALL profiles
  if (!(await isAuthenticated())) {
    return {
      ok: false,
      error: t.errors.notAuthenticated(),
    };
  }

  const count = await prisma.profile.count({
    where: {
      ...filters,
      ...(role !== 'ALL' && {
        role: role,
      }),
    },
  });

  return {
    ok: true,
    data: count,
  };
}

/**
 * Fetches the total number of profiles in the database.
 *
 * @returns {Promise<ServiceResult<number>>} The total number of profiles.
 */
export async function fetchProfilesCount(
  args?: FetchSpecificProfileCountArgs
): ReturnType<typeof fetchProfilesCountForRole> {
  return fetchProfilesCountForRole({
    filter: {
      ...args?.filter,
      role: 'ALL',
    },
  });
}

/**
 * Fetches the total number of user profiles in the database.
 *
 * @returns {Promise<ServiceResult<number>>} The total number of user profiles.
 */
export async function fetchUserProfilesCount(
  args?: FetchSpecificProfileCountArgs
): ReturnType<typeof fetchProfilesCountForRole> {
  return fetchProfilesCountForRole({
    filter: {
      ...args?.filter,
      role: 'USER',
    },
  });
}

/**
 * Fetches the total number of company profiles in the database.
 *
 * @returns {Promise<ServiceResult<number>>} The total number of company profiles.
 */
export async function fetchCompanyProfilesCount(
  args?: FetchSpecificProfileCountArgs
): ReturnType<typeof fetchProfilesCountForRole> {
  return fetchProfilesCountForRole({
    filter: {
      ...args?.filter,
      role: 'COMPANY',
    },
  });
}

/**
 * Fetches the total number of admin profiles in the database.
 * @returns {Promise<ServiceResult<number>>} The total number of admin profiles.
 */
export async function fetchAdminProfilesCount(
  args?: FetchSpecificProfileCountArgs
) {
  return fetchProfilesCountForRole({
    filter: {
      ...args?.filter,
      role: 'ADMIN',
    },
  });
}

/**
 * Fetches the full Profile for the current user
 */
export async function fetchCurrentProfile(): Promise<
  ServiceResult<FullUnknownProfile>
> {
  const client = await createClient();

  // Only for authenticated users
  if (!(await isAuthenticated(client))) {
    return {
      ok: false,
      error: 'User is not authenticated',
    };
  }

  const user = await getUser(client);

  if (!user) {
    return {
      ok: false,
      error: 'Could not get user object.',
    };
  }

  try {
    const res = await prisma.profile.findFirstOrThrow({
      where: {
        id: user.id,
      },
      include: {
        adminProfile: true,
        userProfile: true,
        companyProfile: true,
      },
    });

    if (!(await hasCorespondingProfile({ unknownProfile: res }))) {
      return {
        ok: false,
        error:
          'No matching (extended) profile could be found for the current user.',
      };
    }

    return {
      ok: true,
      data: res,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        ok: false,
        error: error.message,
      };
    }

    return {
      ok: false,
      error: 'An unknow error ocurred.',
    };
  }
}

/**
 * Checks for a FullUnknownProfile, if the profile matches the profileType
 */
async function hasCorespondingProfile({
  unknownProfile,
}: {
  unknownProfile: FullUnknownProfile;
}): Promise<boolean> {
  if (unknownProfile.role == 'ADMIN' && unknownProfile.adminProfile !== null) {
    return true;
  }

  if (
    unknownProfile.role == 'COMPANY' &&
    unknownProfile.companyProfile !== null
  ) {
    return true;
  }

  if (unknownProfile.role == 'USER' && unknownProfile.userProfile !== null) {
    return true;
  }

  return false;
}
