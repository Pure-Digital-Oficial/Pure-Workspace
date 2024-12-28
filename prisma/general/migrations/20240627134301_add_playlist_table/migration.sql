/*
  Warnings:

  - You are about to drop the column `category` on the `Playlist` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `Playlist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pure_tv"."Playlist" DROP COLUMN "category",
ADD COLUMN     "category_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "pure_tv"."Playlist_Category" (
    "playlist_category_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Playlist_Category_pkey" PRIMARY KEY ("playlist_category_id")
);

-- AddForeignKey
ALTER TABLE "pure_tv"."Playlist" ADD CONSTRAINT "Playlist_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "pure_tv"."Playlist_Category"("playlist_category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_tv"."Playlist_Category" ADD CONSTRAINT "Playlist_Category_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "general"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
