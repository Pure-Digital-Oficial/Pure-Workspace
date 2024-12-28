import { AddPlaylistsToSchedulingDto } from '@pure-workspace/domain';
import { pureTvApi } from '../axios-config';

export async function AddPlaylistToSchedulingRequest(
  input: AddPlaylistsToSchedulingDto
) {
  const result = await pureTvApi.post(
    'add-playlists-to-scheduling',
    {
      playlistIds: input.playlistIds,
    },
    {
      params: {
        loggedUserId: input.loggedUserId,
        schedulingId: input.schedulingId,
      },
    }
  );
  return result.data;
}
