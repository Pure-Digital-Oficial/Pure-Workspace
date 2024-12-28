import { z } from 'zod';

export const createPaymentModelSchema = {
  body: z.object({
    name: z.string().min(1),
    description: z.string().min(1),
  }),
  loggedUserId: z.string().min(1),
};
