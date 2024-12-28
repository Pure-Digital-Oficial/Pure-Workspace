import { z } from 'zod';

export const editPlaylistCategorySchema = {
  id: z.string().min(1),
  loggedUserId: z.string().min(1),
  body: z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(2),
  }),
};
