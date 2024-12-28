-- AddForeignKey
ALTER TABLE "general"."Confirm_Delete_Company" ADD CONSTRAINT "Confirm_Delete_Company_responsibly_user_fkey" FOREIGN KEY ("responsibly_user") REFERENCES "general"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
