import { z } from 'zod';

export const deleteCompanyByIdSchema = {
  body: z.object({
    description: z.string().min(1),
  }),
  loggedUserId: z.string().min(1),
  companyId: z.string().min(1),
};
