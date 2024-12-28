import { z } from 'zod';

export const listPlaylistBySchedulingIdSchema = {
  filter: z.string().optional(),
  take: z.string().optional(),
  skip: z.string().optional(),
  loggedUserId: z.string().min(1),
  schedulingId: z.string().min(1),
};
