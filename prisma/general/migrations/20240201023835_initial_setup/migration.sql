-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "general";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "summons";

-- CreateEnum
CREATE TYPE "general"."Status" AS ENUM ('ACTIVE', 'INACTIVE', 'BLOCKED');

-- CreateEnum
CREATE TYPE "summons"."SummonsStatus" AS ENUM ('STARTED', 'PENDING', 'PAUSED', 'FINISHED');

-- CreateTable
CREATE TABLE "general"."Auth" (
    "auth_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("auth_id")
);

-- CreateTable
CREATE TABLE "general"."User" (
    "user_id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "nick_name" VARCHAR(100) NOT NULL,
    "status" "general"."Status" NOT NULL DEFAULT 'ACTIVE',
    "birth_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "general"."User_X_Departament" (
    "departament_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_X_Departament_pkey" PRIMARY KEY ("user_id","departament_id")
);

-- CreateTable
CREATE TABLE "general"."Departament" (
    "departament_id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Departament_pkey" PRIMARY KEY ("departament_id")
);

-- CreateTable
CREATE TABLE "general"."Departament_X_Company" (
    "departament_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Departament_X_Company_pkey" PRIMARY KEY ("departament_id","company_id")
);

-- CreateTable
CREATE TABLE "general"."Company" (
    "company_id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "cnpj" VARCHAR(14) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("company_id")
);

-- CreateTable
CREATE TABLE "general"."User_X_Summons" (
    "user_id" TEXT NOT NULL,
    "summons_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_X_Summons_pkey" PRIMARY KEY ("user_id","summons_id")
);

-- CreateTable
CREATE TABLE "summons"."Summons" (
    "summons_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "summons"."SummonsStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Summons_pkey" PRIMARY KEY ("summons_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Auth_email_key" ON "general"."Auth"("email");

-- AddForeignKey
ALTER TABLE "general"."Auth" ADD CONSTRAINT "Auth_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "general"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general"."User_X_Departament" ADD CONSTRAINT "User_X_Departament_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "general"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general"."User_X_Departament" ADD CONSTRAINT "User_X_Departament_departament_id_fkey" FOREIGN KEY ("departament_id") REFERENCES "general"."Departament"("departament_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general"."Departament_X_Company" ADD CONSTRAINT "Departament_X_Company_departament_id_fkey" FOREIGN KEY ("departament_id") REFERENCES "general"."Departament"("departament_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general"."Departament_X_Company" ADD CONSTRAINT "Departament_X_Company_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "general"."Company"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general"."User_X_Summons" ADD CONSTRAINT "User_X_Summons_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "general"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general"."User_X_Summons" ADD CONSTRAINT "User_X_Summons_summons_id_fkey" FOREIGN KEY ("summons_id") REFERENCES "summons"."Summons"("summons_id") ON DELETE RESTRICT ON UPDATE CASCADE;
