'use server';

import { Prisma, Profile, Role } from '@prisma/client';
import prisma from '../db';
import {
  FullAdminProfile,
  FullCompanyProfile,
  FullUserProfile,
} from '../types/profile';
import { ServiceResult } from '../types/serviceResult';
import { isAdmin, isAuthenticated } from './auth';

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
      error: 'User is not authenticated.',
    };
  }

  if (!(await isAdmin())) {
    return {
      ok: false,
      error: 'User is not an admin.',
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
async function fetchPaginatedProfilesForRole<T extends Profile>({
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
      error: 'User is not authenticated.',
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
export async function fetchPaginatedProfiles(
  args: FetchPaginatedSpecificProfileArgs
): ReturnType<typeof fetchPaginatedProfilesForRole<Profile>> {
  return fetchPaginatedProfilesForRole<Profile>({
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
export async function fetchPaginatedAdminProfiles(
  args: FetchPaginatedSpecificProfileArgs
): ReturnType<typeof fetchPaginatedProfilesForRole<FullAdminProfile>> {
  return fetchPaginatedProfilesForRole<FullAdminProfile>({
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
export async function fetchPaginatedUserProfiles(
  args: FetchPaginatedSpecificProfileArgs
): ReturnType<typeof fetchPaginatedProfilesForRole<FullUserProfile>> {
  return fetchPaginatedProfilesForRole<FullUserProfile>({
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
export async function fetchPaginatedCompanyProfiles(
  args: FetchPaginatedSpecificProfileArgs
): ReturnType<typeof fetchPaginatedProfilesForRole<FullCompanyProfile>> {
  return fetchPaginatedProfilesForRole<FullCompanyProfile>({
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
      error: 'User is not authenticated.',
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
