/*
  Warnings:

  - The primary key for the `admin_profiles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `applications` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `company_profiles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `events` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `phases` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `profiles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `slots` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `sub_applications` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `sub_events` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `universities` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user_profiles` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "admin_profiles" DROP CONSTRAINT "admin_profiles_id_fkey";

-- DropForeignKey
ALTER TABLE "applications" DROP CONSTRAINT "applications_eventId_fkey";

-- DropForeignKey
ALTER TABLE "applications" DROP CONSTRAINT "applications_universityId_fkey";

-- DropForeignKey
ALTER TABLE "applications" DROP CONSTRAINT "applications_userId_fkey";

-- DropForeignKey
ALTER TABLE "company_profiles" DROP CONSTRAINT "company_profiles_id_fkey";

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_createdById_fkey";

-- DropForeignKey
ALTER TABLE "phases" DROP CONSTRAINT "phases_createdById_fkey";

-- DropForeignKey
ALTER TABLE "phases" DROP CONSTRAINT "phases_eventId_fkey";

-- DropForeignKey
ALTER TABLE "slots" DROP CONSTRAINT "slots_createdById_fkey";

-- DropForeignKey
ALTER TABLE "slots" DROP CONSTRAINT "slots_eventId_fkey";

-- DropForeignKey
ALTER TABLE "sub_applications" DROP CONSTRAINT "sub_applications_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "sub_applications" DROP CONSTRAINT "sub_applications_subEventId_fkey";

-- DropForeignKey
ALTER TABLE "sub_events" DROP CONSTRAINT "sub_events_companyProfileId_fkey";

-- DropForeignKey
ALTER TABLE "sub_events" DROP CONSTRAINT "sub_events_createdById_fkey";

-- DropForeignKey
ALTER TABLE "sub_events" DROP CONSTRAINT "sub_events_eventId_fkey";

-- DropForeignKey
ALTER TABLE "sub_events" DROP CONSTRAINT "sub_events_hostId_fkey";

-- DropForeignKey
ALTER TABLE "sub_events" DROP CONSTRAINT "sub_events_profileId_fkey";

-- DropForeignKey
ALTER TABLE "sub_events" DROP CONSTRAINT "sub_events_slotId_fkey";

-- DropForeignKey
ALTER TABLE "user_profiles" DROP CONSTRAINT "user_profiles_id_fkey";

-- AlterTable
ALTER TABLE "admin_profiles" DROP CONSTRAINT "admin_profiles_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "admin_profiles_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "applications" DROP CONSTRAINT "applications_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "eventId" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "universityId" SET DATA TYPE TEXT,
ADD CONSTRAINT "applications_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "company_profiles" DROP CONSTRAINT "company_profiles_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "company_profiles_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "events" DROP CONSTRAINT "events_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "createdById" SET DATA TYPE TEXT,
ADD CONSTRAINT "events_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "phases" DROP CONSTRAINT "phases_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "eventId" SET DATA TYPE TEXT,
ALTER COLUMN "createdById" SET DATA TYPE TEXT,
ADD CONSTRAINT "phases_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "slots" DROP CONSTRAINT "slots_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "eventId" SET DATA TYPE TEXT,
ALTER COLUMN "createdById" SET DATA TYPE TEXT,
ADD CONSTRAINT "slots_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "sub_applications" DROP CONSTRAINT "sub_applications_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "applicationId" SET DATA TYPE TEXT,
ALTER COLUMN "subEventId" SET DATA TYPE TEXT,
ADD CONSTRAINT "sub_applications_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "sub_events" DROP CONSTRAINT "sub_events_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "eventId" SET DATA TYPE TEXT,
ALTER COLUMN "createdById" SET DATA TYPE TEXT,
ALTER COLUMN "companyProfileId" SET DATA TYPE TEXT,
ALTER COLUMN "hostId" SET DATA TYPE TEXT,
ALTER COLUMN "profileId" SET DATA TYPE TEXT,
ALTER COLUMN "slotId" SET DATA TYPE TEXT,
ADD CONSTRAINT "sub_events_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "universities" DROP CONSTRAINT "universities_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "universities_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user_profiles" DROP CONSTRAINT "user_profiles_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_profiles" ADD CONSTRAINT "admin_profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_profiles" ADD CONSTRAINT "company_profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phases" ADD CONSTRAINT "phases_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phases" ADD CONSTRAINT "phases_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_events" ADD CONSTRAINT "sub_events_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_events" ADD CONSTRAINT "sub_events_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_events" ADD CONSTRAINT "sub_events_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "slots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_events" ADD CONSTRAINT "sub_events_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_events" ADD CONSTRAINT "sub_events_companyProfileId_fkey" FOREIGN KEY ("companyProfileId") REFERENCES "company_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_events" ADD CONSTRAINT "sub_events_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slots" ADD CONSTRAINT "slots_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slots" ADD CONSTRAINT "slots_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "universities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_applications" ADD CONSTRAINT "sub_applications_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_applications" ADD CONSTRAINT "sub_applications_subEventId_fkey" FOREIGN KEY ("subEventId") REFERENCES "sub_events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
