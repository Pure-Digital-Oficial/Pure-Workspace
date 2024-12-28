import { z } from 'zod';

export const deleteSchedulingSchema = {
  id: z.string().min(1),
  loggedUserId: z.string().min(1),
};
