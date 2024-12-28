import { z } from 'zod';

export const selectCompanySchema = {
  companyId: z.string().min(1),
  loggedUserId: z.string().min(1),
};
