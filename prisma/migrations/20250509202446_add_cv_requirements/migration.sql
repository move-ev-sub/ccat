-- CreateEnum
CREATE TYPE "CoverLetterRequirement" AS ENUM ('REQUIRED', 'OPTIONAL', 'NOT_REQUIRED');

-- AlterEnum
ALTER TYPE "SubApplicationPrioritzation" ADD VALUE 'UNSET';

-- AlterTable
ALTER TABLE "sub_events" ADD COLUMN     "coverLetterRequirement" "CoverLetterRequirement" NOT NULL DEFAULT 'NOT_REQUIRED';
