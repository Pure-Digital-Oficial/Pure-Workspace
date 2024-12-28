import { z } from 'zod';

export const findFilesByPlaylistSchema = {
  playlistId: z.string().min(1),
  loggedUserId: z.string().min(1),
  take: z.string().optional(),
  skip: z.string().optional(),
};
