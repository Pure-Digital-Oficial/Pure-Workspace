/*
  Warnings:

  - Added the required column `user_id` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Departament` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "general"."Company" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "general"."Departament" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "general"."Departament" ADD CONSTRAINT "Departament_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "general"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general"."Company" ADD CONSTRAINT "Company_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "general"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
