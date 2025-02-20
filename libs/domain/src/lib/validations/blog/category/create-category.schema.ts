import { z } from 'zod';

export const createCategorySchema = {
  name: z.string().min(1),
  description: z.string().min(1),
  file: z.any(),
  loggedUserId: z.string().min(1),
};
