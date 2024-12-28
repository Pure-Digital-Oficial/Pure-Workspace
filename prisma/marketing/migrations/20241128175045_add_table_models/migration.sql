/*
  Warnings:

  - Added the required column `model_id` to the `Sending` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "marketing"."Sending" ADD COLUMN     "model_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "marketing"."models" (
    "model_id" TEXT NOT NULL,
    "html" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "models_pkey" PRIMARY KEY ("model_id")
);

-- AddForeignKey
ALTER TABLE "marketing"."Sending" ADD CONSTRAINT "Sending_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "marketing"."models"("model_id") ON DELETE RESTRICT ON UPDATE CASCADE;
