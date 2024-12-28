/*
  Warnings:

  - You are about to drop the column `device_id` on the `Scheduling` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "pure_tv"."Scheduling" DROP CONSTRAINT "Scheduling_device_id_fkey";

-- AlterTable
ALTER TABLE "pure_tv"."Scheduling" DROP COLUMN "device_id";

-- CreateTable
CREATE TABLE "pure_tv"."Scheduling_X_Device" (
    "scheduling_id" TEXT NOT NULL,
    "device_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Scheduling_X_Device_pkey" PRIMARY KEY ("device_id","scheduling_id")
);

-- AddForeignKey
ALTER TABLE "pure_tv"."Scheduling_X_Device" ADD CONSTRAINT "Scheduling_X_Device_scheduling_id_fkey" FOREIGN KEY ("scheduling_id") REFERENCES "pure_tv"."Scheduling"("scheduling_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_tv"."Scheduling_X_Device" ADD CONSTRAINT "Scheduling_X_Device_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "pure_tv"."Device"("device_id") ON DELETE RESTRICT ON UPDATE CASCADE;
