import { z } from 'zod';

export const createSchedulingSchema = {
  body: z.object({
    name: z.string().min(1),
    startTime: z.string().min(1),
    endTime: z.string().min(1),
    lopping: z.boolean(),
    priority: z.string().min(1),
  }),
  loggedUserId: z.string().min(1),
  companyId: z.string().min(1),
};
