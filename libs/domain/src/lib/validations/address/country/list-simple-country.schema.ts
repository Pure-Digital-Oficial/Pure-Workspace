import { z } from 'zod';

export const listSimpleCountrySchema = {
  loggedUserId: z.string().min(1),
};
