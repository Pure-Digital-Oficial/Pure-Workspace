import { z } from 'zod';

export const unauthorizeUserToCompanySchema = {
  companyId: z.string().min(1),
  userId: z.string().min(1),
  loggedUserId: z.string().min(1),
};
