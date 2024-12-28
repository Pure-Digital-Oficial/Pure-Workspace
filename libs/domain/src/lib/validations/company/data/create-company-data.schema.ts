import { z } from 'zod';

export const createCompanyDataSchema = {
  body: z.object({
    port: z.string().min(1),
    opening: z.string().min(1),
    situation: z.string().min(1),
    legalNature: z.string().min(1),
    phone: z.string().min(1),
    responsibleEmail: z.string().min(1),
  }),
  loggedUserId: z.string().min(1),
  companyId: z.string().min(1),
};
