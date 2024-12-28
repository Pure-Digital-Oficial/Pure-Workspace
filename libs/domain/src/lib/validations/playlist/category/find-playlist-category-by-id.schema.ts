import { z } from 'zod';

export const findPlaylistCategoryByIdSchema = {
  id: z.string().min(1),
  loggedUserId: z.string().min(1),
};
