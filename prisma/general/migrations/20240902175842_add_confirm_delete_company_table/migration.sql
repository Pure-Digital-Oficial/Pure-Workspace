-- CreateTable
CREATE TABLE "general"."Confirm_Delete_Company" (
    "id" TEXT NOT NULL,
    "responsibly_user" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "description" VARCHAR(1000) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Confirm_Delete_Company_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "general"."Confirm_Delete_Company" ADD CONSTRAINT "Confirm_Delete_Company_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "general"."Company"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;
