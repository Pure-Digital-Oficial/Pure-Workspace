import { z } from 'zod';

export const listSimpleStateSchema = {
  loggedUserId: z.string().min(1),
  countryId: z.string().min(1),
};
