/*
  Warnings:

  - Added the required column `connection_status` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `device_model` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ip_address` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `physical_device_id` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `so_version` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pure_tv"."Device" ADD COLUMN     "connection_status" TEXT NOT NULL,
ADD COLUMN     "device_model" TEXT NOT NULL,
ADD COLUMN     "ip_address" TEXT NOT NULL,
ADD COLUMN     "physical_device_id" TEXT NOT NULL,
ADD COLUMN     "so_version" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "pure_tv"."Location_Device" (
    "location_device_id" TEXT NOT NULL,
    "device_id" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "coutry" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "capture_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Location_Device_pkey" PRIMARY KEY ("location_device_id")
);

-- AddForeignKey
ALTER TABLE "pure_tv"."Device" ADD CONSTRAINT "Device_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "general"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_tv"."Location_Device" ADD CONSTRAINT "Location_Device_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "pure_tv"."Device"("device_id") ON DELETE RESTRICT ON UPDATE CASCADE;
