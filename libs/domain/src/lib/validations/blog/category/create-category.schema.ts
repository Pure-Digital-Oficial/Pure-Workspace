import { z } from 'zod';

export const createCategorySchema = {
  body: z.object({
    name: z.string().min(1),
    description: z.string().min(1),
  }),
  loggedUserId: z.string().min(1),
};
