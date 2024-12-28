import { z } from 'zod';

export const listSimpleCitySchema = {
  loggedUserId: z.string().min(1),
  stateId: z.string().min(1),
};
