import { z } from 'zod';

export const lisCompaniesByUserIdSchema = {
  loggedUserId: z.string().min(1),
  userId: z.string().min(1),
  filter: z.string().optional(),
  take: z.string().optional(),
  skip: z.string().optional(),
};
