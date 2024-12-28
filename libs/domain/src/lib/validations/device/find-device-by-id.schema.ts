import { z } from 'zod';

export const findDeviceByIdSchema = {
  id: z.string().min(1),
  loggedUserId: z.string().min(1),
};
