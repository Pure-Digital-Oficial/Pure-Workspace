import { z } from 'zod';

export const createContactUsSchema = {
  body: z.object({
    name: z.string().min(1),
    email: z.string().min(1),
    description: z.string().min(1),
    number: z.string().min(1),
  }),
  appId: z.string().min(1),
};
