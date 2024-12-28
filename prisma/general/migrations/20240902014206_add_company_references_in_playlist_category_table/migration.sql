/*
  Warnings:

  - Added the required column `company_id` to the `Playlist_Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pure_tv"."Playlist_Category" ADD COLUMN     "company_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pure_tv"."Playlist_Category" ADD CONSTRAINT "Playlist_Category_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "general"."Company"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;
