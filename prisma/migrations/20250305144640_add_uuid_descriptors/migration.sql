-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'COMPANY');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "PhaseType" AS ENUM ('PREP', 'APPLICATION', 'SELECTION_ONE', 'SELECTION_TWO', 'EVENT', 'POST_EVENT');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('SAVED', 'SUBMITTED', 'CLOSED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'DIVERSE', 'PREFFER_NOT_TO_SAY');

-- CreateEnum
CREATE TYPE "Degree" AS ENUM ('HOCHSCHULREIFE', 'ABITUR', 'BACHELOR', 'MASTER');

-- CreateEnum
CREATE TYPE "SubApplicationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "SubApplicationPrioritzation" AS ENUM ('PRIO_1', 'PRIO_2', 'PRIO_3', 'PRIO_4', 'PRIO_5');

-- CreateTable
CREATE TABLE "profiles" (
    "id" UUID NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profiles" (
    "id" UUID NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "notifyMe" BOOLEAN NOT NULL DEFAULT false,
    "emailReminders" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_profiles" (
    "id" UUID NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "admin_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_profiles" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL DEFAULT 'https://move-ev.de/wp-content/uploads/2018/12/Logo_hell_Text_Rehcts.svg',

    CONSTRAINT "company_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "EventStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" UUID NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phases" (
    "id" UUID NOT NULL,
    "description" TEXT,
    "eventId" UUID NOT NULL,
    "type" "PhaseType" NOT NULL DEFAULT 'PREP',
    "startDate" TIMESTAMPTZ(3) NOT NULL,
    "endDate" TIMESTAMPTZ(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" UUID NOT NULL,

    CONSTRAINT "phases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_events" (
    "id" UUID NOT NULL,
    "eventId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "maxParticipants" INTEGER NOT NULL DEFAULT 30,
    "startDate" TIMESTAMPTZ(3) NOT NULL,
    "endDate" TIMESTAMPTZ(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" UUID NOT NULL,

    CONSTRAINT "sub_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "slots" (
    "id" UUID NOT NULL,
    "eventId" UUID NOT NULL,
    "startDate" TIMESTAMPTZ(3) NOT NULL,
    "endDate" TIMESTAMPTZ(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" UUID NOT NULL,

    CONSTRAINT "slots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applications" (
    "id" UUID NOT NULL,
    "eventId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'SAVED',
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'PREFFER_NOT_TO_SAY',
    "universityId" UUID NOT NULL,
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

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_applications" (
    "id" UUID NOT NULL,
    "applicationId" UUID NOT NULL,
    "subEventId" UUID NOT NULL,
    "coverLetter" TEXT NOT NULL,
    "prioritized" BOOLEAN NOT NULL DEFAULT false,
    "status" "SubApplicationStatus" NOT NULL,
    "priorization" "SubApplicationPrioritzation" NOT NULL,

    CONSTRAINT "sub_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "universities" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "universities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_id_key" ON "profiles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_id_key" ON "user_profiles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "admin_profiles_id_key" ON "admin_profiles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "company_profiles_id_key" ON "company_profiles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "events_id_key" ON "events"("id");

-- CreateIndex
CREATE UNIQUE INDEX "phases_id_key" ON "phases"("id");

-- CreateIndex
CREATE UNIQUE INDEX "sub_events_id_key" ON "sub_events"("id");

-- CreateIndex
CREATE UNIQUE INDEX "slots_id_key" ON "slots"("id");

-- CreateIndex
CREATE UNIQUE INDEX "applications_id_key" ON "applications"("id");

-- CreateIndex
CREATE UNIQUE INDEX "sub_applications_id_key" ON "sub_applications"("id");

-- CreateIndex
CREATE UNIQUE INDEX "universities_id_key" ON "universities"("id");

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
ALTER TABLE "sub_events" ADD CONSTRAINT "sub_events_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
