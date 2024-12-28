import { z } from 'zod';

export const editProductSchema = {
  body: z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    maximumDiscount: z.string().min(1),
    standardPrice: z.string().min(1),
  }),
  productId: z.string().min(1),
  loggedUserId: z.string().min(1),
};
