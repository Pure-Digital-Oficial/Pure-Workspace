import { z } from 'zod';

export const changeProductStatusSchema = {
  body: z.object({
    status: z.string().min(1),
  }),
  productId: z.string().min(1),
  loggedUserId: z.string().min(1),
};
