-- CreateTable
CREATE TABLE "general"."Application" (
    "app_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Application_pkey" PRIMARY KEY ("app_id")
);

-- CreateTable
CREATE TABLE "general"."User_X_Application" (
    "app_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "status" "general"."Status" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "User_X_Application_pkey" PRIMARY KEY ("user_id","app_id")
);

-- AddForeignKey
ALTER TABLE "general"."User_X_Application" ADD CONSTRAINT "User_X_Application_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "general"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general"."User_X_Application" ADD CONSTRAINT "User_X_Application_app_id_fkey" FOREIGN KEY ("app_id") REFERENCES "general"."Application"("app_id") ON DELETE RESTRICT ON UPDATE CASCADE;
