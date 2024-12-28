import { z } from 'zod';

export const createCompanyResponsibleSchema = {
  body: z.object({
    name: z.string().min(1),
    email: z.string().min(1),
    document: z.string().min(1),
    phone: z.string().min(1),
    birthdate: z.string(),
  }),
  loggedUserId: z.string().min(1),
  companyId: z.string().min(1),
};
