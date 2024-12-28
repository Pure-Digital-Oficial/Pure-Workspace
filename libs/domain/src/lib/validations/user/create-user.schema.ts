import { z } from 'zod';

export const createUserSchema = {
  name: z.string().min(2).max(50),
  nickname: z.string().min(3).max(50),
  birthDate: z.string().optional(),
};
