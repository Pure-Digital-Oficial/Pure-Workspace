import { z } from 'zod';

export const editMediaPostSchema = {
  body: z.object({
    name: z.string().min(1),
  }),
  loggedUserId: z.string().min(1),
  mediaId: z.string().min(1),
};
