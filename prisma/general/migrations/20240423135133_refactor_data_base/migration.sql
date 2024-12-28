/*
  Warnings:

  - You are about to drop the column `name` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Summons` table. All the data in the column will be lost.
  - Added the required column `fantasy_name` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `social_reason` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_id` to the `Summons` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "general"."UserType" AS ENUM ('DEFAULT', 'DEFAULT_ADMIN', 'ADMIN');

-- AlterTable
ALTER TABLE "general"."Company" DROP COLUMN "name",
ADD COLUMN     "fantasy_name" VARCHAR(200) NOT NULL,
ADD COLUMN     "social_reason" VARCHAR(200) NOT NULL;

-- AlterTable
ALTER TABLE "general"."User" ADD COLUMN     "type" "general"."UserType" NOT NULL DEFAULT 'DEFAULT';

-- AlterTable
ALTER TABLE "summons"."Summons" DROP COLUMN "status",
ADD COLUMN     "status_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "general"."Company_Data" (
    "company_data_id" TEXT NOT NULL,
    "responsible_email" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "opening" TEXT NOT NULL,
    "port" TEXT NOT NULL,
    "situation" TEXT NOT NULL,
    "legal_natural" TEXT NOT NULL,

    CONSTRAINT "Company_Data_pkey" PRIMARY KEY ("company_data_id")
);

-- CreateTable
CREATE TABLE "general"."Company_Responsible" (
    "company_responsible_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Company_Responsible_pkey" PRIMARY KEY ("company_responsible_id")
);

-- CreateTable
CREATE TABLE "general"."User_X_Company" (
    "user_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "status" "general"."Status" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "User_X_Company_pkey" PRIMARY KEY ("user_id","company_id")
);

-- CreateTable
CREATE TABLE "general"."Company_X_Address" (
    "company_id" TEXT NOT NULL,
    "address_id" TEXT NOT NULL,
    "status" "general"."Status" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Company_X_Address_pkey" PRIMARY KEY ("address_id","company_id")
);

-- CreateTable
CREATE TABLE "general"."Address" (
    "address_id" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "city_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Address_pkey" PRIMARY KEY ("address_id")
);

-- CreateTable
CREATE TABLE "general"."City" (
    "city_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "state_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "City_pkey" PRIMARY KEY ("city_id")
);

-- CreateTable
CREATE TABLE "general"."State" (
    "state_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "coutry_id" TEXT NOT NULL,
    "ur" VARCHAR(2) NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("state_id")
);

-- CreateTable
CREATE TABLE "general"."Country" (
    "country_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ur" VARCHAR(2) NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("country_id")
);

-- CreateTable
CREATE TABLE "summons"."Summons_Status" (
    "summons_status_id" TEXT NOT NULL,
    "status" "summons"."SummonsStatus" NOT NULL DEFAULT 'PENDING',
    "update_user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Summons_Status_pkey" PRIMARY KEY ("summons_status_id")
);

-- AddForeignKey
ALTER TABLE "general"."Company_Data" ADD CONSTRAINT "Company_Data_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "general"."Company"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general"."Company_Responsible" ADD CONSTRAINT "Company_Responsible_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "general"."Company"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general"."User_X_Company" ADD CONSTRAINT "User_X_Company_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "general"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general"."User_X_Company" ADD CONSTRAINT "User_X_Company_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "general"."Company"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general"."Company_X_Address" ADD CONSTRAINT "Company_X_Address_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "general"."Address"("address_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general"."Company_X_Address" ADD CONSTRAINT "Company_X_Address_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "general"."Company"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general"."Address" ADD CONSTRAINT "Address_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "general"."City"("city_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general"."City" ADD CONSTRAINT "City_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "general"."State"("state_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general"."State" ADD CONSTRAINT "State_coutry_id_fkey" FOREIGN KEY ("coutry_id") REFERENCES "general"."Country"("country_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "summons"."Summons" ADD CONSTRAINT "Summons_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "summons"."Summons_Status"("summons_status_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "summons"."Summons_Status" ADD CONSTRAINT "Summons_Status_update_user_id_fkey" FOREIGN KEY ("update_user_id") REFERENCES "general"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
