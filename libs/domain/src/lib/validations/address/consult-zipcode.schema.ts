import { z } from 'zod';

export const consultZipcodeSchema = {
  loggedUserId: z.string().min(1),
  zipcode: z.string().min(1),
};
