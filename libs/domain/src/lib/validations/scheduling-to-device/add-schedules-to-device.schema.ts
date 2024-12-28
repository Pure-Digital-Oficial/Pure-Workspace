import { z } from 'zod';

export const addSchedulesToDeviceSchema = {
  idDevice: z.string().min(1),
  loggedUserId: z.string().min(1),
  body: z.object({
    schedulesIds: z.array(z.string()).min(1),
  }),
};
