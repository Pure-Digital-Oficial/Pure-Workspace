-- AlterTable
ALTER TABLE "general"."Company" ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "status" "general"."Status" NOT NULL DEFAULT 'ACTIVE',
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "general"."Departament" ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "status" "general"."Status" NOT NULL DEFAULT 'ACTIVE',
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "general"."Departament_X_Company" ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "status" "general"."Status" NOT NULL DEFAULT 'ACTIVE',
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "general"."User" ADD COLUMN     "deleted_at" TIMESTAMP(3),
ALTER COLUMN "birth_date" DROP NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "general"."User_X_Departament" ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "status" "general"."Status" NOT NULL DEFAULT 'ACTIVE',
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "general"."User_X_Summons" ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "status" "general"."Status" NOT NULL DEFAULT 'ACTIVE',
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "summons"."Summons" ADD COLUMN     "deleted_at" TIMESTAMP(3),
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
