import { z } from 'zod';

export const deletePlaylistToSchedulingSchema = {
  playlistIds: z.array(z.string()).min(1),
  loggedUserId: z.string().min(1),
  schedulingId: z.string().min(1),
};
