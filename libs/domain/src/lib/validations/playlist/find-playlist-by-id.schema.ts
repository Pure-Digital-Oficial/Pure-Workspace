import { z } from 'zod';

export const findPlaylistByIdSchema = {
  id: z.string().min(1),
  loggedUserId: z.string().min(1),
};
