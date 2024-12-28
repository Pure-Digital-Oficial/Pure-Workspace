import { z } from 'zod';

export const createDirectorySchema = {
  name: z.string().min(1),
  loggedUserId: z.string().min(1),
};
