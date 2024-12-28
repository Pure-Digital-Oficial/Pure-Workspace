import { z } from 'zod';

export const changeUserSchema = {
  body: z.object({
    type: z.string().min(1),
  }),
  loggedUserId: z.string().min(1),
  userId: z.string().min(1),
};
