-- CreateEnum
CREATE TYPE "marketing"."PreRestrationStep" AS ENUM ('INITIAL', 'FINAL');

-- CreateTable
CREATE TABLE "marketing"."pre_registration" (
    "pre_registration_id" TEXT NOT NULL,
    "sending_id" TEXT NOT NULL,
    "step" "marketing"."PreRestrationStep" NOT NULL DEFAULT 'INITIAL',
    "branch_of_the_company" TEXT NOT NULL,
    "completed_questionnaire" BOOLEAN NOT NULL,
    "pre_registration_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pre_registration_pkey" PRIMARY KEY ("pre_registration_id")
);
