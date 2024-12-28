-- CreateEnum
CREATE TYPE "general"."AuthStatus" AS ENUM ('GOOGLE', 'DEFAULT');

-- DropIndex
DROP INDEX "general"."Auth_email_key";

-- AlterTable
ALTER TABLE "general"."Auth" ADD COLUMN     "access_token" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "status" "general"."AuthStatus" NOT NULL DEFAULT 'DEFAULT',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "password" DROP NOT NULL;
