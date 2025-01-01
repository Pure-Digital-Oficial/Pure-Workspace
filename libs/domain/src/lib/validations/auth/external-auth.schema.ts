import { z } from 'zod';

export const externalAuthSchema = {
  appId: z.string().min(1),
  externalId: z.string().min(1),
  email: z.string().email(),
  name: z.string().min(3),
};
