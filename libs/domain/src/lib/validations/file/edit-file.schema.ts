import { z } from 'zod';

export const editFileSchema = {
  id: z.string().min(1),
  loggedUserId: z.string().min(1),
  directoryId: z.string().min(1),
  input: z.object({
    newFileName: z.string().min(1),
  }),
};
