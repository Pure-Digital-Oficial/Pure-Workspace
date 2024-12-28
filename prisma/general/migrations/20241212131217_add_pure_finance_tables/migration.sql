-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "pure_finance";

-- CreateEnum
CREATE TYPE "pure_finance"."SellerModel" AS ENUM ('DEFAULT', 'PATNER', 'OWNER');

-- CreateEnum
CREATE TYPE "pure_finance"."SaleStatus" AS ENUM ('STARTED', 'FINISHED');

-- CreateTable
CREATE TABLE "pure_finance"."Product" (
    "product_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "standard_price" TEXT NOT NULL,
    "maximum_discount" TEXT NOT NULL,
    "status" "general"."Status" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" TEXT NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "pure_finance"."Seller" (
    "seller_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" "general"."Status" NOT NULL DEFAULT 'ACTIVE',
    "models" "pure_finance"."SellerModel" NOT NULL DEFAULT 'DEFAULT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Seller_pkey" PRIMARY KEY ("seller_id")
);

-- CreateTable
CREATE TABLE "pure_finance"."PaymentModel" (
    "payment_model_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "general"."Status" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaymentModel_pkey" PRIMARY KEY ("payment_model_id")
);

-- CreateTable
CREATE TABLE "pure_finance"."Sale" (
    "salle_id" TEXT NOT NULL,
    "seller_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "payment_model_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "status" "pure_finance"."SaleStatus" NOT NULL DEFAULT 'STARTED',
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("salle_id")
);

-- AddForeignKey
ALTER TABLE "pure_finance"."Product" ADD CONSTRAINT "Product_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "general"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_finance"."Product" ADD CONSTRAINT "Product_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "general"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_finance"."Seller" ADD CONSTRAINT "Seller_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "general"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_finance"."PaymentModel" ADD CONSTRAINT "PaymentModel_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "general"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_finance"."Sale" ADD CONSTRAINT "Sale_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "pure_finance"."Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_finance"."Sale" ADD CONSTRAINT "Sale_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "pure_finance"."Seller"("seller_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_finance"."Sale" ADD CONSTRAINT "Sale_payment_model_id_fkey" FOREIGN KEY ("payment_model_id") REFERENCES "pure_finance"."PaymentModel"("payment_model_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_finance"."Sale" ADD CONSTRAINT "Sale_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "general"."Company"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_finance"."Sale" ADD CONSTRAINT "Sale_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "general"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_finance"."Sale" ADD CONSTRAINT "Sale_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "general"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
