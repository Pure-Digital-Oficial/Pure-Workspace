import { z } from 'zod';

export const consultCompanyByCnpjSchema = {
  cnpj: z.string().min(1),
  loggedUserId: z.string().min(1),
};
