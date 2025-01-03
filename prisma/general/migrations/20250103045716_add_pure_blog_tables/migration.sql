-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "pure_blog";

-- CreateTable
CREATE TABLE "pure_blog"."Post" (
    "post_id" TEXT NOT NULL,
    "status" "general"."Status" NOT NULL DEFAULT 'ACTIVE',
    "title" TEXT NOT NULL,
    "sub_title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "pure_blog"."Media" (
    "media_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("media_id")
);

-- CreateTable
CREATE TABLE "pure_blog"."Comment" (
    "comment_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("comment_id")
);

-- CreateTable
CREATE TABLE "pure_blog"."Sub_Category" (
    "sub_category_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sub_Category_pkey" PRIMARY KEY ("sub_category_id")
);

-- CreateTable
CREATE TABLE "pure_blog"."Category" (
    "category_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "pure_blog"."Post_X_Sub_Category" (
    "sub_category_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_X_Sub_Category_pkey" PRIMARY KEY ("sub_category_id","post_id")
);

-- AddForeignKey
ALTER TABLE "pure_blog"."Post" ADD CONSTRAINT "Post_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "general"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_blog"."Post" ADD CONSTRAINT "Post_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "general"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_blog"."Media" ADD CONSTRAINT "Media_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "pure_blog"."Post"("post_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_blog"."Media" ADD CONSTRAINT "Media_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "general"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_blog"."Media" ADD CONSTRAINT "Media_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "general"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_blog"."Comment" ADD CONSTRAINT "Comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "pure_blog"."Post"("post_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_blog"."Comment" ADD CONSTRAINT "Comment_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "general"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_blog"."Comment" ADD CONSTRAINT "Comment_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "general"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_blog"."Sub_Category" ADD CONSTRAINT "Sub_Category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "pure_blog"."Category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_blog"."Sub_Category" ADD CONSTRAINT "Sub_Category_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "general"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_blog"."Sub_Category" ADD CONSTRAINT "Sub_Category_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "general"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_blog"."Category" ADD CONSTRAINT "Category_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "general"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_blog"."Category" ADD CONSTRAINT "Category_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "general"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_blog"."Post_X_Sub_Category" ADD CONSTRAINT "Post_X_Sub_Category_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "pure_blog"."Post"("post_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_blog"."Post_X_Sub_Category" ADD CONSTRAINT "Post_X_Sub_Category_sub_category_id_fkey" FOREIGN KEY ("sub_category_id") REFERENCES "pure_blog"."Sub_Category"("sub_category_id") ON DELETE RESTRICT ON UPDATE CASCADE;
