import { z } from 'zod';

export const deletePlaylistSchema = {
  id: z.string().min(1),
  loggedUserId: z.string().min(1),
};
