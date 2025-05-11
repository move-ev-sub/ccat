/*
  Warnings:

  - The primary key for the `admin_profiles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `applications` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `company_profiles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `events` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `phases` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `profiles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `profiles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `slots` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `sub_applications` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `sub_events` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `companyProfileId` column on the `sub_events` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `profileId` column on the `sub_events` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `universities` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user_profiles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `admin_profiles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `applications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `eventId` on the `applications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `applications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `universityId` on the `applications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `company_profiles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `events` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `createdById` on the `events` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `phases` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `eventId` on the `phases` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `createdById` on the `phases` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `slots` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `eventId` on the `slots` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `createdById` on the `slots` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `sub_applications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `applicationId` on the `sub_applications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `subEventId` on the `sub_applications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `sub_events` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `eventId` on the `sub_events` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `createdById` on the `sub_events` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `hostId` on the `sub_events` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `slotId` on the `sub_events` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `universities` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `user_profiles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

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
DROP COLUMN "id",
ADD COLUMN     "id" VARCHAR(30) NOT NULL,
ADD CONSTRAINT "admin_profiles_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "applications" DROP CONSTRAINT "applications_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" VARCHAR(30) NOT NULL,
DROP COLUMN "eventId",
ADD COLUMN     "eventId" VARCHAR(30) NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" VARCHAR(30) NOT NULL,
DROP COLUMN "universityId",
ADD COLUMN     "universityId" VARCHAR(30) NOT NULL,
ADD CONSTRAINT "applications_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "company_profiles" DROP CONSTRAINT "company_profiles_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" VARCHAR(30) NOT NULL,
ADD CONSTRAINT "company_profiles_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "events" DROP CONSTRAINT "events_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" VARCHAR(30) NOT NULL,
DROP COLUMN "createdById",
ADD COLUMN     "createdById" VARCHAR(30) NOT NULL,
ADD CONSTRAINT "events_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "phases" DROP CONSTRAINT "phases_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" VARCHAR(30) NOT NULL,
DROP COLUMN "eventId",
ADD COLUMN     "eventId" VARCHAR(30) NOT NULL,
DROP COLUMN "createdById",
ADD COLUMN     "createdById" VARCHAR(30) NOT NULL,
ADD CONSTRAINT "phases_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" VARCHAR(30) NOT NULL,
ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "slots" DROP CONSTRAINT "slots_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" VARCHAR(30) NOT NULL,
DROP COLUMN "eventId",
ADD COLUMN     "eventId" VARCHAR(30) NOT NULL,
DROP COLUMN "createdById",
ADD COLUMN     "createdById" VARCHAR(30) NOT NULL,
ADD CONSTRAINT "slots_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "sub_applications" DROP CONSTRAINT "sub_applications_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" VARCHAR(30) NOT NULL,
DROP COLUMN "applicationId",
ADD COLUMN     "applicationId" VARCHAR(30) NOT NULL,
DROP COLUMN "subEventId",
ADD COLUMN     "subEventId" VARCHAR(30) NOT NULL,
ADD CONSTRAINT "sub_applications_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "sub_events" DROP CONSTRAINT "sub_events_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" VARCHAR(30) NOT NULL,
DROP COLUMN "eventId",
ADD COLUMN     "eventId" VARCHAR(30) NOT NULL,
DROP COLUMN "createdById",
ADD COLUMN     "createdById" VARCHAR(30) NOT NULL,
DROP COLUMN "companyProfileId",
ADD COLUMN     "companyProfileId" VARCHAR(30),
DROP COLUMN "hostId",
ADD COLUMN     "hostId" VARCHAR(30) NOT NULL,
DROP COLUMN "profileId",
ADD COLUMN     "profileId" VARCHAR(30),
DROP COLUMN "slotId",
ADD COLUMN     "slotId" VARCHAR(30) NOT NULL,
ADD CONSTRAINT "sub_events_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "universities" DROP CONSTRAINT "universities_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" VARCHAR(30) NOT NULL,
ADD CONSTRAINT "universities_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user_profiles" DROP CONSTRAINT "user_profiles_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" VARCHAR(30) NOT NULL,
ADD CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "admin_profiles_id_key" ON "admin_profiles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "applications_id_key" ON "applications"("id");

-- CreateIndex
CREATE UNIQUE INDEX "company_profiles_id_key" ON "company_profiles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "events_id_key" ON "events"("id");

-- CreateIndex
CREATE UNIQUE INDEX "phases_id_key" ON "phases"("id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_id_key" ON "profiles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "slots_id_key" ON "slots"("id");

-- CreateIndex
CREATE UNIQUE INDEX "sub_applications_id_key" ON "sub_applications"("id");

-- CreateIndex
CREATE UNIQUE INDEX "sub_events_id_key" ON "sub_events"("id");

-- CreateIndex
CREATE UNIQUE INDEX "universities_id_key" ON "universities"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_id_key" ON "user_profiles"("id");

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
