import { z } from 'zod';

export const findSimpleCompanyByIdSchema = {
  loggedUserId: z.string().min(1),
  companyId: z.string().min(1),
};
