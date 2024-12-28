import { z } from 'zod';

export const detailsContentFileSchema = {
  id: z.string().min(1),
  loggedUserId: z.string().min(1),
  directoryId: z.string().min(1),
};
