import { z } from 'zod';

export const listContentFileSchema = {
  loggedUserId: z.string().min(1),
  directoryId: z.string().min(1),
  companyId: z.string().min(1),
  filter: z.string().optional(),
  take: z.string().optional(),
  skip: z.string().optional(),
};
