import { z } from 'zod';

export const addPlaylistToSchedulingSchema = {
  body: z.object({
    playlistIds: z.array(z.string()).min(1),
  }),
  loggedUserId: z.string().min(1),
  schedulingId: z.string().min(1),
};
