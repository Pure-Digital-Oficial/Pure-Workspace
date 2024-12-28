import { z } from 'zod';

export const createPlaylistSchema = {
  input: z.object({
    name: z.string().min(1),
  }),
  loggedUserId: z.string().min(1),
  playlistCategoryId: z.string().min(1),
  companyId: z.string().min(1),
};
