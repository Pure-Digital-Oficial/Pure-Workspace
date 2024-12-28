import { z } from 'zod';

export const findCompanyDataByIdSchema = {
  loggedUserId: z.string().min(1),
  companyDataId: z.string().min(1),
};
