import { z } from 'zod';

export const editPostSchema = {
  body: z.object({
    title: z.string().min(1),
    subTitle: z.string().min(1),
    description: z.string().min(1),
    content: z.string().min(1),
  }),
  loggedUserId: z.string().min(1),
  postId: z.string().min(1),
};
