-- AlterTable
ALTER TABLE "marketing"."pre_registration" ALTER COLUMN "branch_of_the_company" DROP NOT NULL,
ALTER COLUMN "completed_questionnaire" SET DEFAULT false,
ALTER COLUMN "pre_registration_date" SET DEFAULT CURRENT_TIMESTAMP;
