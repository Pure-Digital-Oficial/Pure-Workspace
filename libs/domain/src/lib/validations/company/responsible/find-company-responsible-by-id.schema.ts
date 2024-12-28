import { z } from 'zod';

export const findCompanyResponsibleByIdSchema = {
  loggedUserId: z.string().min(1),
  companyResponsibleId: z.string().min(1),
};
