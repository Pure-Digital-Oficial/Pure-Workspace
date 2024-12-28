-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "marketing";

-- CreateTable
CREATE TABLE "marketing"."Enterprise_Meling" (
    "enterprise_meling_id" TEXT NOT NULL,
    "name" TEXT,
    "fantasy_name" TEXT,
    "whatsapp" TEXT,
    "ddd" TEXT,
    "email" TEXT,
    "coontact_valid" BOOLEAN,
    "open_date" TIMESTAMP(3),
    "main_activity_code" TEXT,
    "main_activity_description" TEXT,
    "cnpj" TEXT,
    "situation" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "country" TEXT,
    "state" TEXT,
    "region" TEXT,
    "share_capital" TEXT,

    CONSTRAINT "Enterprise_Meling_pkey" PRIMARY KEY ("enterprise_meling_id")
);

-- CreateTable
CREATE TABLE "marketing"."runner" (
    "runner_id" TEXT NOT NULL,
    "runner" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "runner_pkey" PRIMARY KEY ("runner_id")
);

-- CreateTable
CREATE TABLE "marketing"."Sending" (
    "sending_id" TEXT NOT NULL,
    "enterprise_meling_id" TEXT NOT NULL,
    "runner_id" TEXT NOT NULL,
    "sended_email" BOOLEAN NOT NULL,
    "sended_email_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sending_pkey" PRIMARY KEY ("sending_id")
);

-- CreateTable
CREATE TABLE "marketing"."email_return_information" (
    "email_return_information_id" TEXT NOT NULL,
    "sending_id" TEXT NOT NULL,
    "email_opned" BOOLEAN,
    "email_opned_date" TIMESTAMP(3),
    "link_clicked" BOOLEAN,
    "link_clicked_date" TIMESTAMP(3),

    CONSTRAINT "email_return_information_pkey" PRIMARY KEY ("email_return_information_id")
);

-- AddForeignKey
ALTER TABLE "marketing"."Sending" ADD CONSTRAINT "Sending_enterprise_meling_id_fkey" FOREIGN KEY ("enterprise_meling_id") REFERENCES "marketing"."Enterprise_Meling"("enterprise_meling_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketing"."Sending" ADD CONSTRAINT "Sending_runner_id_fkey" FOREIGN KEY ("runner_id") REFERENCES "marketing"."runner"("runner_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketing"."email_return_information" ADD CONSTRAINT "email_return_information_sending_id_fkey" FOREIGN KEY ("sending_id") REFERENCES "marketing"."Sending"("sending_id") ON DELETE RESTRICT ON UPDATE CASCADE;
