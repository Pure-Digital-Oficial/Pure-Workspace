import { z } from 'zod';

export const editDirectorySchema = {
  input: z
    .object({
      newName: z.string().min(1),
    })
    .strict(),
  loggedUserId: z.string().min(1),
  id: z.string().min(1),
};
