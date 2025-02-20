import { z } from 'zod';

export const editImageCategorySchema = {
  loggedUserId: z.string().min(1),
  categoryId: z.string().min(1),
  file: z.any(),
};
