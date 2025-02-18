import { z } from 'zod';

export const createSubCategorySchema = {
  loggedUserId: z.string().min(1),
  body: z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    categoryId: z.string().min(1),
  }),
};
