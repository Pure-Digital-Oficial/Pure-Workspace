import { z } from 'zod';

export const addDraftToPostSchema = {
  id: z.string().min(1),
  loggedUserId: z.string().min(1),
};
