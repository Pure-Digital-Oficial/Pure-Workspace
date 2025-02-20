/*
  Warnings:

  - Added the required column `image_name` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pure_blog"."Category" ADD COLUMN     "image_name" TEXT NOT NULL;
