import {
  AdminProfile,
  CompanyProfile,
  Profile,
  UserProfile,
} from '@prisma/client';

export interface FullCompanyProfile extends Profile {
  companyProfile: CompanyProfile | null;
}

export interface FullAdminProfile extends Profile {
  adminProfile: AdminProfile | null;
}

export interface FullUserProfile extends Profile {
  userProfile: UserProfile | null;
}
