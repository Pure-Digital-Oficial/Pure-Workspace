-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "pure_tv";

-- CreateTable
CREATE TABLE "pure_tv"."Directory" (
    "directory_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Directory_pkey" PRIMARY KEY ("directory_id")
);

-- CreateTable
CREATE TABLE "pure_tv"."Content_Video" (
    "content_video_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "video_url" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "resolution" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "upload_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Content_Video_pkey" PRIMARY KEY ("content_video_id")
);

-- CreateTable
CREATE TABLE "pure_tv"."Playlist_X_Content_Video" (
    "content_video_id" TEXT NOT NULL,
    "playlist_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Playlist_X_Content_Video_pkey" PRIMARY KEY ("playlist_id","content_video_id")
);

-- CreateTable
CREATE TABLE "pure_tv"."Playlist" (
    "playlist_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("playlist_id")
);

-- CreateTable
CREATE TABLE "pure_tv"."Playlist_X_Scheduling" (
    "scheduling_id" TEXT NOT NULL,
    "playlist_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Playlist_X_Scheduling_pkey" PRIMARY KEY ("playlist_id","scheduling_id")
);

-- CreateTable
CREATE TABLE "pure_tv"."Scheduling" (
    "scheduling_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "device_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "looping" BOOLEAN NOT NULL,
    "priority" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Scheduling_pkey" PRIMARY KEY ("scheduling_id")
);

-- CreateTable
CREATE TABLE "pure_tv"."Device" (
    "device_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Device_pkey" PRIMARY KEY ("device_id")
);

-- AddForeignKey
ALTER TABLE "pure_tv"."Directory" ADD CONSTRAINT "Directory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "general"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_tv"."Content_Video" ADD CONSTRAINT "Content_Video_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "general"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_tv"."Playlist_X_Content_Video" ADD CONSTRAINT "Playlist_X_Content_Video_playlist_id_fkey" FOREIGN KEY ("playlist_id") REFERENCES "pure_tv"."Playlist"("playlist_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_tv"."Playlist_X_Content_Video" ADD CONSTRAINT "Playlist_X_Content_Video_content_video_id_fkey" FOREIGN KEY ("content_video_id") REFERENCES "pure_tv"."Content_Video"("content_video_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_tv"."Playlist" ADD CONSTRAINT "Playlist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "general"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_tv"."Playlist_X_Scheduling" ADD CONSTRAINT "Playlist_X_Scheduling_scheduling_id_fkey" FOREIGN KEY ("scheduling_id") REFERENCES "pure_tv"."Scheduling"("scheduling_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_tv"."Playlist_X_Scheduling" ADD CONSTRAINT "Playlist_X_Scheduling_playlist_id_fkey" FOREIGN KEY ("playlist_id") REFERENCES "pure_tv"."Playlist"("playlist_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_tv"."Scheduling" ADD CONSTRAINT "Scheduling_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "general"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_tv"."Scheduling" ADD CONSTRAINT "Scheduling_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "pure_tv"."Device"("device_id") ON DELETE RESTRICT ON UPDATE CASCADE;
