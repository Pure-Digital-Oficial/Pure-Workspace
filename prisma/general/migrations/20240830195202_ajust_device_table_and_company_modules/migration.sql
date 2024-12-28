/*
  Warnings:

  - A unique constraint covering the columns `[company_id]` on the table `Company_Data` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[company_id]` on the table `Company_Responsible` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `company_id` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pure_tv"."Device" ADD COLUMN     "company_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Company_Data_company_id_key" ON "general"."Company_Data"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "Company_Responsible_company_id_key" ON "general"."Company_Responsible"("company_id");

-- AddForeignKey
ALTER TABLE "pure_tv"."Device" ADD CONSTRAINT "Device_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "general"."Company"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;
