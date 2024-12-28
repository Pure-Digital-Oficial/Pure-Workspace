import { z } from 'zod';

export const findSchedulesByDeviceIdSchema = {
  id: z.string().min(1),
  loggedUserId: z.string().min(1),
};
