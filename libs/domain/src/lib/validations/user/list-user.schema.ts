import { z } from 'zod';

export const listUserSchema = {
  filter: z.string().optional(),
  skip: z.string().optional(),
  take: z.string().optional(),
};
