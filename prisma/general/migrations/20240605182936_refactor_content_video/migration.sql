/*
  Warnings:

  - You are about to drop the `Content_Video` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Playlist_X_Content_Video` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "pure_tv"."Content_Video" DROP CONSTRAINT "Content_Video_directory_id_fkey";

-- DropForeignKey
ALTER TABLE "pure_tv"."Content_Video" DROP CONSTRAINT "Content_Video_user_id_fkey";

-- DropForeignKey
ALTER TABLE "pure_tv"."Playlist_X_Content_Video" DROP CONSTRAINT "Playlist_X_Content_Video_content_video_id_fkey";

-- DropForeignKey
ALTER TABLE "pure_tv"."Playlist_X_Content_Video" DROP CONSTRAINT "Playlist_X_Content_Video_playlist_id_fkey";

-- DropTable
DROP TABLE "pure_tv"."Content_Video";

-- DropTable
DROP TABLE "pure_tv"."Playlist_X_Content_Video";

-- CreateTable
CREATE TABLE "pure_tv"."Content_Files" (
    "Content_Files_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "directory_id" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "duration" TEXT,
    "resolution" TEXT,
    "format" TEXT NOT NULL,
    "upload_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Content_Files_pkey" PRIMARY KEY ("Content_Files_id")
);

-- CreateTable
CREATE TABLE "pure_tv"."Playlist_X_Content_Files" (
    "Content_Files_id" TEXT NOT NULL,
    "playlist_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Playlist_X_Content_Files_pkey" PRIMARY KEY ("playlist_id","Content_Files_id")
);

-- AddForeignKey
ALTER TABLE "pure_tv"."Content_Files" ADD CONSTRAINT "Content_Files_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "general"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_tv"."Content_Files" ADD CONSTRAINT "Content_Files_directory_id_fkey" FOREIGN KEY ("directory_id") REFERENCES "pure_tv"."Directory"("directory_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_tv"."Playlist_X_Content_Files" ADD CONSTRAINT "Playlist_X_Content_Files_playlist_id_fkey" FOREIGN KEY ("playlist_id") REFERENCES "pure_tv"."Playlist"("playlist_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_tv"."Playlist_X_Content_Files" ADD CONSTRAINT "Playlist_X_Content_Files_Content_Files_id_fkey" FOREIGN KEY ("Content_Files_id") REFERENCES "pure_tv"."Content_Files"("Content_Files_id") ON DELETE RESTRICT ON UPDATE CASCADE;
