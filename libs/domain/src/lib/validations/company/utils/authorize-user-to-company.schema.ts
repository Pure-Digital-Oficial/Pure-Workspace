import { z } from 'zod';

export const authorizeUserToCompanySchema = {
  companyId: z.string().min(1),
  userId: z.string().min(1),
  loggedUserId: z.string().min(1),
};
