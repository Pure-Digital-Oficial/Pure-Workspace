-- CreateEnum
CREATE TYPE "general"."ContactStatus" AS ENUM ('SENDING', 'IN_PROGRESS', 'ERROR', 'COMPLETED');

-- CreateTable
CREATE TABLE "general"."Contact" (
    "contact_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "app_id" TEXT NOT NULL,
    "status" "general"."ContactStatus" NOT NULL DEFAULT 'SENDING',
    "sending" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sending_at" TIMESTAMP(3),

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("contact_id")
);

-- AddForeignKey
ALTER TABLE "general"."Contact" ADD CONSTRAINT "Contact_app_id_fkey" FOREIGN KEY ("app_id") REFERENCES "general"."Application"("app_id") ON DELETE RESTRICT ON UPDATE CASCADE;
