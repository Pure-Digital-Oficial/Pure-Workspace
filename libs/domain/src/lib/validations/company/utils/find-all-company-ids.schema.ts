import { z } from 'zod';

export const findAllCompanyIdsSchema = {
  loggedUserId: z.string().min(1),
  companyId: z.string().min(1),
};
