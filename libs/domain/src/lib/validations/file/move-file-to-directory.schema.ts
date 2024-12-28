import { z } from 'zod';

export const moveFileToDirectorySchema = {
  id: z.string().min(1),
  loggedUserId: z.string().min(1),
  idToMoveDirectory: z.string().min(1),
};
