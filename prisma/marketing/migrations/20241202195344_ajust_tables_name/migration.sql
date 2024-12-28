/*
  Warnings:

  - You are about to drop the `email_return_information` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `models` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pre_registration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `runner` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "marketing"."Sending" DROP CONSTRAINT "Sending_model_id_fkey";

-- DropForeignKey
ALTER TABLE "marketing"."Sending" DROP CONSTRAINT "Sending_runner_id_fkey";

-- DropForeignKey
ALTER TABLE "marketing"."email_return_information" DROP CONSTRAINT "email_return_information_sending_id_fkey";

-- DropTable
DROP TABLE "marketing"."email_return_information";

-- DropTable
DROP TABLE "marketing"."models";

-- DropTable
DROP TABLE "marketing"."pre_registration";

-- DropTable
DROP TABLE "marketing"."runner";

-- CreateTable
CREATE TABLE "marketing"."Runner" (
    "runner_id" TEXT NOT NULL,
    "runner" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Runner_pkey" PRIMARY KEY ("runner_id")
);

-- CreateTable
CREATE TABLE "marketing"."Email_Return_Information" (
    "email_return_information_id" TEXT NOT NULL,
    "sending_id" TEXT NOT NULL,
    "email_opned" BOOLEAN,
    "email_opned_date" TIMESTAMP(3),
    "link_clicked" BOOLEAN,
    "link_clicked_date" TIMESTAMP(3),

    CONSTRAINT "Email_Return_Information_pkey" PRIMARY KEY ("email_return_information_id")
);

-- CreateTable
CREATE TABLE "marketing"."Pre_Registration" (
    "pre_registration_id" TEXT NOT NULL,
    "sending_id" TEXT NOT NULL,
    "step" "marketing"."PreRestrationStep" NOT NULL DEFAULT 'INITIAL',
    "branch_of_the_company" TEXT,
    "completed_questionnaire" BOOLEAN NOT NULL DEFAULT false,
    "pre_registration_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finished_at" TIMESTAMP(3),

    CONSTRAINT "Pre_Registration_pkey" PRIMARY KEY ("pre_registration_id")
);

-- CreateTable
CREATE TABLE "marketing"."Models" (
    "model_id" TEXT NOT NULL,
    "html" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Models_pkey" PRIMARY KEY ("model_id")
);

-- AddForeignKey
ALTER TABLE "marketing"."Sending" ADD CONSTRAINT "Sending_runner_id_fkey" FOREIGN KEY ("runner_id") REFERENCES "marketing"."Runner"("runner_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketing"."Sending" ADD CONSTRAINT "Sending_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "marketing"."Models"("model_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketing"."Email_Return_Information" ADD CONSTRAINT "Email_Return_Information_sending_id_fkey" FOREIGN KEY ("sending_id") REFERENCES "marketing"."Sending"("sending_id") ON DELETE RESTRICT ON UPDATE CASCADE;
