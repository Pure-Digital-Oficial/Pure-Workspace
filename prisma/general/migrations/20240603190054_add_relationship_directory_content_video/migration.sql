/*
  Warnings:

  - Added the required column `directory_id` to the `Content_Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pure_tv"."Content_Video" ADD COLUMN     "directory_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pure_tv"."Content_Video" ADD CONSTRAINT "Content_Video_directory_id_fkey" FOREIGN KEY ("directory_id") REFERENCES "pure_tv"."Directory"("directory_id") ON DELETE RESTRICT ON UPDATE CASCADE;
