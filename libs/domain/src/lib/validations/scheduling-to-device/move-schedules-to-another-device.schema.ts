import { z } from 'zod';

export const moveSchedulesToAnotherDeviceSchema = {
  oldDeviceId: z.string().min(1),
  newDeviceId: z.string().min(1),
  loggedUserId: z.string().min(1),
  body: z.object({
    schedulesIds: z.array(z.string()).min(1),
  }),
};
