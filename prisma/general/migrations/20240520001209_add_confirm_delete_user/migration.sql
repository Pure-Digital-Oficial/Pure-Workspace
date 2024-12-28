-- CreateTable
CREATE TABLE "general"."Confirm_Delete_User" (
    "id" TEXT NOT NULL,
    "responsibly_user" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "description" VARCHAR(1000) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Confirm_Delete_User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "general"."Confirm_Delete_User" ADD CONSTRAINT "Confirm_Delete_User_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "general"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
