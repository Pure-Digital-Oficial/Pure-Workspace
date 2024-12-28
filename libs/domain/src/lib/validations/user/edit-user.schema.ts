import { z } from 'zod';

export const editUserSchema = {
  id: z.string().min(1),
  name: z.string().min(1).max(50),
  birthDate: z.string().optional(),
};
