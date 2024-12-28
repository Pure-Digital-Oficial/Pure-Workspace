import { z } from 'zod';

export const createContentFileSchema = {
  files: z.any(),
  loggedUserId: z.string().min(1),
  directoryId: z.string().min(1),
  companyId: z.string().min(1),
};
