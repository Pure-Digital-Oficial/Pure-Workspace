import { z } from 'zod';

export const listSimpleDirectorySchema = {
  filter: z.string().optional(),
  loggedUserId: z.string().min(1),
  companyId: z.string().min(1),
  skip: z.string().optional(),
  take: z.string().optional(),
};
