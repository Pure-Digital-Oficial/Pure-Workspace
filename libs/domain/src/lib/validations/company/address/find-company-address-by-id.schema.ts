import { z } from 'zod';

export const findCompanyAddressByIdSchema = {
  loggedUserId: z.string().min(1),
  companyAddressId: z.string().min(1),
};
