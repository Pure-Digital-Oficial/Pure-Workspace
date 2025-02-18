/*
  Warnings:

  - Added the required column `cover_image` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pure_blog"."Post" ADD COLUMN     "cover_image" TEXT NOT NULL;
