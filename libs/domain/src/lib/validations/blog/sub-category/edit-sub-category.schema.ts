import { z } from 'zod';

export const editSubCategorySchema = {
  body: z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    categoryId: z.string().min(1),
  }),
  loggedUserId: z.string().min(1),
  subCategoryId: z.string().min(1),
};
