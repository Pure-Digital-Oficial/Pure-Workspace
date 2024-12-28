import { z } from 'zod';

export const findUnauthorizedUsersByCompanyIdSchema = {
  loggedUserId: z.string().min(1),
  companyId: z.string().min(1),
};
