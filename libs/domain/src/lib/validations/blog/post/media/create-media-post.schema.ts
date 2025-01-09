import { z } from 'zod';

export const createMediaPostSchema = {
  files: z.any(),
  loggedUserId: z.string().min(1),
  postId: z.string().min(1),
};
