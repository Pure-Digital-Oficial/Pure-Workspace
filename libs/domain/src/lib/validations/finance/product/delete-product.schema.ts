import { z } from 'zod';

export const deleteProductSchema = {
  productId: z.string().min(1),
  loggedUserId: z.string().min(1),
};
