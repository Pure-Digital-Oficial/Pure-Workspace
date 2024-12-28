import { z } from 'zod';

export const deletePlaylistCategorySchema = {
  id: z.string().min(1),
  loggedUserId: z.string().min(1),
};
