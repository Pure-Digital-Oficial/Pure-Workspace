import { z } from 'zod';

export const deleteUserByIdSchema = {
  id: z.string().min(1),
  input: z.object({
    description: z.string().min(1),
  }),
  loggedUserId: z.string().min(1),
};
