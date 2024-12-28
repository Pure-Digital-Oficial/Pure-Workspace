/*
  Warnings:

  - You are about to drop the column `legal_natural` on the `Company_Data` table. All the data in the column will be lost.
  - Added the required column `legal_nature` to the `Company_Data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "general"."Company_Data" DROP COLUMN "legal_natural",
ADD COLUMN     "legal_nature" TEXT NOT NULL;
