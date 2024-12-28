/*
  Warnings:

  - You are about to drop the column `ur` on the `Country` table. All the data in the column will be lost.
  - You are about to drop the column `ur` on the `State` table. All the data in the column will be lost.
  - Added the required column `email` to the `Company_Responsible` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Company_Responsible` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uf` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uf` to the `State` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "general"."Company_Responsible" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "general"."Country" DROP COLUMN "ur",
ADD COLUMN     "uf" VARCHAR(2) NOT NULL;

-- AlterTable
ALTER TABLE "general"."State" DROP COLUMN "ur",
ADD COLUMN     "uf" VARCHAR(2) NOT NULL;
