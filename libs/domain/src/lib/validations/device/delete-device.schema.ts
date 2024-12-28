import { z } from 'zod';

export const deleteDeviceByIdSchema = {
  id: z.string().min(1),
  loggedUserId: z.string().min(1),
};
