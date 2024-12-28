import { z } from 'zod';

export const deleteDirectoryByIdSchema = {
  id: z.string().min(1),
  loggedUserId: z.string().min(1),
};
