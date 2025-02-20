/*
  Warnings:

  - Added the required column `url_image` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pure_blog"."Category" ADD COLUMN     "url_image" TEXT NOT NULL;
