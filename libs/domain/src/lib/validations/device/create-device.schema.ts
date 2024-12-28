import { z } from 'zod';

export const createDeviceSchema = {
  input: z.object({
    name: z.string().min(1),
  }),
  loggedUserId: z.string().min(1),
  companyId: z.string().min(1),
};
