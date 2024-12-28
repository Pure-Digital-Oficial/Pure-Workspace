/*
  Warnings:

  - You are about to drop the column `connection_status` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `device_model` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `ip_address` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `physical_device_id` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `so_version` on the `Device` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pure_tv"."Device" DROP COLUMN "connection_status",
DROP COLUMN "device_model",
DROP COLUMN "ip_address",
DROP COLUMN "physical_device_id",
DROP COLUMN "so_version";

-- CreateTable
CREATE TABLE "pure_tv"."Device_Data" (
    "device_data_id" TEXT NOT NULL,
    "connection_status" TEXT NOT NULL,
    "device_id" TEXT NOT NULL,
    "ip_address" TEXT NOT NULL,
    "physical_device_id" TEXT NOT NULL,
    "device_model" TEXT NOT NULL,
    "so_version" TEXT NOT NULL,

    CONSTRAINT "Device_Data_pkey" PRIMARY KEY ("device_data_id")
);

-- AddForeignKey
ALTER TABLE "pure_tv"."Device_Data" ADD CONSTRAINT "Device_Data_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "pure_tv"."Device"("device_id") ON DELETE RESTRICT ON UPDATE CASCADE;
