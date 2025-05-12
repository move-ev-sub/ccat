/*
  Warnings:

  - You are about to drop the `admin_profiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `applications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `company_profiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `phases` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `slots` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sub_applications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sub_events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `universities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_profiles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `emailReminders` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notifyMe` to the `user` table without a default value. This is not possible if the table is not empty.

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
ALTER TABLE "user" ADD COLUMN     "emailReminders" BOOLEAN NOT NULL,
ADD COLUMN     "notifyMe" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "admin_profiles";

-- DropTable
DROP TABLE "applications";

-- DropTable
DROP TABLE "company_profiles";

-- DropTable
DROP TABLE "events";

-- DropTable
DROP TABLE "phases";

-- DropTable
DROP TABLE "profiles";

-- DropTable
DROP TABLE "slots";

-- DropTable
DROP TABLE "sub_applications";

-- DropTable
DROP TABLE "sub_events";

-- DropTable
DROP TABLE "universities";

-- DropTable
DROP TABLE "user_profiles";

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "EventStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phase" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "eventId" TEXT NOT NULL,
    "type" "PhaseType" NOT NULL DEFAULT 'PREP',
    "startDate" TIMESTAMPTZ(3) NOT NULL,
    "endDate" TIMESTAMPTZ(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "Phase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubEvent" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "maxParticipants" INTEGER NOT NULL DEFAULT 30,
    "startDate" TIMESTAMPTZ(3) NOT NULL,
    "endDate" TIMESTAMPTZ(3) NOT NULL,
    "hostId" TEXT NOT NULL,
    "slotId" TEXT NOT NULL,
    "coverLetterRequirement" "CoverLetterRequirement" NOT NULL DEFAULT 'NOT_REQUIRED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "SubEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slot" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "startDate" TIMESTAMPTZ(3) NOT NULL,
    "endDate" TIMESTAMPTZ(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "Slot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'SAVED',
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'PREFFER_NOT_TO_SAY',
    "universityId" TEXT NOT NULL,
    "currentDegree" "Degree" NOT NULL,
    "targetDegree" "Degree" NOT NULL,
    "fieldOfStudy" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,
    "expectedGraduationYear" TIMESTAMP(3) NOT NULL,
    "currentGpa" DOUBLE PRECISION NOT NULL,
    "abiturGrade" DOUBLE PRECISION NOT NULL,
    "experienceAbroad" INTEGER NOT NULL,
    "experienceInternships" INTEGER NOT NULL,
    "experienceConsulting" INTEGER NOT NULL,
    "cvUrl" TEXT NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubApplication" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "subEventId" TEXT NOT NULL,
    "coverLetter" TEXT NOT NULL,
    "prioritized" BOOLEAN NOT NULL DEFAULT false,
    "status" "SubApplicationStatus" NOT NULL,
    "priorization" "SubApplicationPrioritzation" NOT NULL,
    "userId" TEXT,

    CONSTRAINT "SubApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "University" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "University_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_id_key" ON "Event"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Phase_id_key" ON "Phase"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SubEvent_id_key" ON "SubEvent"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Slot_id_key" ON "Slot"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Application_id_key" ON "Application"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SubApplication_id_key" ON "SubApplication"("id");

-- CreateIndex
CREATE UNIQUE INDEX "University_id_key" ON "University"("id");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phase" ADD CONSTRAINT "Phase_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phase" ADD CONSTRAINT "Phase_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubEvent" ADD CONSTRAINT "SubEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubEvent" ADD CONSTRAINT "SubEvent_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubEvent" ADD CONSTRAINT "SubEvent_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "Slot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubEvent" ADD CONSTRAINT "SubEvent_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slot" ADD CONSTRAINT "Slot_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slot" ADD CONSTRAINT "Slot_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubApplication" ADD CONSTRAINT "SubApplication_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubApplication" ADD CONSTRAINT "SubApplication_subEventId_fkey" FOREIGN KEY ("subEventId") REFERENCES "SubEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubApplication" ADD CONSTRAINT "SubApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
