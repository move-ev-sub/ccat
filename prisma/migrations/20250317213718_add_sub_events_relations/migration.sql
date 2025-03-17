/*
  Warnings:

  - Added the required column `hostId` to the `sub_events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slotId` to the `sub_events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sub_events" ADD COLUMN     "companyProfileId" UUID,
ADD COLUMN     "hostId" UUID NOT NULL,
ADD COLUMN     "profileId" UUID,
ADD COLUMN     "slotId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "sub_events" ADD CONSTRAINT "sub_events_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_events" ADD CONSTRAINT "sub_events_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "slots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_events" ADD CONSTRAINT "sub_events_companyProfileId_fkey" FOREIGN KEY ("companyProfileId") REFERENCES "company_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_events" ADD CONSTRAINT "sub_events_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
