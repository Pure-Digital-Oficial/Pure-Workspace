import { z } from 'zod';

export const deleteCategorySchema = {
  id: z.string().min(1),
  loggedUserId: z.string().min(1),
};
