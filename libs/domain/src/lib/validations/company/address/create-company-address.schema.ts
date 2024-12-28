import { z } from 'zod';

export const createCompanyAddressSchema = {
  body: z.object({
    district: z.string().min(1),
    street: z.string().min(1),
    number: z.string().min(1),
    complement: z.string().optional(),
    zipcode: z.string().min(1),
    cityId: z.string().min(1),
    stateId: z.string().min(1),
    countryId: z.string().min(1),
  }),
  loggedUserId: z.string().min(1),
  companyId: z.string().min(1),
};
