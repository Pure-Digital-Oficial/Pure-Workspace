import { z } from 'zod';

export const authSchema = {
  email: z.string().email(),
  password: z.string().min(3),
};
