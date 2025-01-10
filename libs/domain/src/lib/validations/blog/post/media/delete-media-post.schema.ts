import { z } from 'zod';

export const deleteMediaPostSchema = {
  mediaId: z.string().min(1),
  loggedUserId: z.string().min(1),
};
