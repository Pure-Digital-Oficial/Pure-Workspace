import { z } from 'zod';

export const createPostSchema = {
  body: z.object({
    title: z.string().min(1),
    subTitle: z.string().min(1),
    description: z.string().min(1),
    content: z.string().min(1),
  }),
  loggedUserId: z.string().min(1),
  appId: z.string().min(1),
};
