/*
  Warnings:

  - Added the required column `company_id` to the `Scheduling` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pure_tv"."Scheduling" ADD COLUMN     "company_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pure_tv"."Scheduling" ADD CONSTRAINT "Scheduling_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "general"."Company"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;
