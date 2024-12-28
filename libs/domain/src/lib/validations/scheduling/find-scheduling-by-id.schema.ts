import { z } from 'zod';

export const findSchedulingByIdSchema = {
  id: z.string().min(1),
  loggedUserId: z.string().min(1),
};
