import { z } from 'zod';

export const createAuthSchema = {
  userId: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(3),
};
