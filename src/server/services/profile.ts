import { Profile, Role } from '@prisma/client';
import prisma from '../db';
import {
  FullAdminProfile,
  FullCompanyProfile,
  FullUserProfile,
} from '../types/profile';
import { ServiceResult } from '../types/serviceResult';
import { isAuthenticated } from './auth';

/**
 * Fetches all profiles for a given role from the database. Only authenticated users can
 * fetch ALL profiles. Profiles are fetched in a paginated manner. This means that only a
 * subset of profiles are fetched at a time. The `page` parameter specifies which page of
 * profiles to fetch, and the `limit` parameter specifies how many profiles to fetch per
 * page.
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
 */
async function fetchPaginatedProfilesForRole<T extends Profile>(
  page: number,
  limit: number,
  role: Role | 'ALL'
): Promise<
  ServiceResult<{
    page: number;
    profiles: T[];
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
    skip: (page - 1) * limit,
    take: limit,
    // Only set a WHERE clause if the role is not 'ALL'
    ...(role !== 'ALL' && {
      where: {
        role: role,
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

  return {
    ok: true,
    data: {
      page: page,
      profiles: res as T[],
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
  page: number,
  limit: number
): ReturnType<typeof fetchPaginatedProfilesForRole<Profile>> {
  return fetchPaginatedProfilesForRole<Profile>(page, limit, 'ALL');
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
  page: number,
  limit: number
): ReturnType<typeof fetchPaginatedProfilesForRole<FullAdminProfile>> {
  return fetchPaginatedProfilesForRole<FullAdminProfile>(page, limit, 'ADMIN');
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
  page: number,
  limit: number
): ReturnType<typeof fetchPaginatedProfilesForRole<FullUserProfile>> {
  return fetchPaginatedProfilesForRole<FullUserProfile>(page, limit, 'USER');
}

/**
 * Fetches all company profiles from the database in a paginated manner.
 *
 * @see fetchPaginatedProfilesForRole<FullAdminProfile>
 *
 * @param page Number of the page to fetch.
 * @param limit Number of profiles to fetch per page.
 *
 * @returns A paginated list of company profiles.
 */
export async function fetchPaginatedCompanyProfiles(
  page: number,
  limit: number
): ReturnType<typeof fetchPaginatedProfilesForRole<FullCompanyProfile>> {
  return fetchPaginatedProfilesForRole<FullCompanyProfile>(
    page,
    limit,
    'COMPANY'
  );
}

/**
 * Fetches the total number of profiles for a given role in the database.
 *
 * @param {Role | 'ALL'} role The role to filter by.
 * @returns {Promise<ServiceResult<number>>} The total number of profiles.
 */
async function fetchProfilesCountForRole(
  role: Role | 'ALL'
): Promise<ServiceResult<number>> {
  // Only authenticated users can fetch ALL profiles
  if (!(await isAuthenticated())) {
    return {
      ok: false,
      error: 'User is not authenticated.',
    };
  }

  const count = await prisma.profile.count(
    role !== 'ALL'
      ? {
          where: {
            role: role,
          },
        }
      : undefined
  );

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
export async function fetchProfilesCount(): ReturnType<
  typeof fetchProfilesCountForRole
> {
  return fetchProfilesCountForRole('ALL');
}

/**
 * Fetches the total number of user profiles in the database.
 *
 * @returns {Promise<ServiceResult<number>>} The total number of user profiles.
 */
export async function fetchUserProfilesCount(): ReturnType<
  typeof fetchProfilesCountForRole
> {
  return fetchProfilesCountForRole('USER');
}

/**
 * Fetches the total number of company profiles in the database.
 *
 * @returns {Promise<ServiceResult<number>>} The total number of company profiles.
 */
export async function fetchCompanyProfilesCount(): ReturnType<
  typeof fetchProfilesCountForRole
> {
  return fetchProfilesCountForRole('COMPANY');
}

/**
 * Fetches the total number of admin profiles in the database.
 * @returns {Promise<ServiceResult<number>>} The total number of admin profiles.
 */
export async function fetchAdminProfilesCount() {
  return fetchProfilesCountForRole('ADMIN');
}
