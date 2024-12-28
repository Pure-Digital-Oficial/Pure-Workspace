import { z } from 'zod';

export const editCompanyResponsibleSchema = {
  body: z.object({
    name: z.string().min(1),
    email: z.string().min(1),
    phone: z.string().min(1),
    birthdate: z.string(),
  }),
  loggedUserId: z.string().min(1),
  companyResponsibleId: z.string().min(1),
};
