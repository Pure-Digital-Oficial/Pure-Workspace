import { z } from 'zod';

export const findUserByIdSchema = {
  id: z.string().min(1),
};
