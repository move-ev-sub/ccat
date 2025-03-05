import { CompanyProfile, Profile } from '@prisma/client';

export interface FullCompanyProfile extends Profile {
  companyProfile: CompanyProfile | null;
}
