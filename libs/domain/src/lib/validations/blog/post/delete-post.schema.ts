import { z } from 'zod';

export const deletePostSchema = {
  id: z.string().min(1),
  loggedUserId: z.string().min(1),
};
