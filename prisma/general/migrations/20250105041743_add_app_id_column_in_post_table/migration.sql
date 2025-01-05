/*
  Warnings:

  - Added the required column `app_id` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pure_blog"."Post" ADD COLUMN     "app_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pure_blog"."Post" ADD CONSTRAINT "Post_app_id_fkey" FOREIGN KEY ("app_id") REFERENCES "general"."Application"("app_id") ON DELETE RESTRICT ON UPDATE CASCADE;
