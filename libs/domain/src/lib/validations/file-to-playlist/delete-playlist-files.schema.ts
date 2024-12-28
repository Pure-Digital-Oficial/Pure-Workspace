import { z } from 'zod';

export const deletePlaylistFilesSchema = {
  body: z.object({
    filesId: z.array(z.string()).min(1),
  }),
  loggedUserId: z.string().min(1),
  playlistId: z.string().min(1),
};
