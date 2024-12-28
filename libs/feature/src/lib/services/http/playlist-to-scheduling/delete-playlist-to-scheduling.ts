import { DeletePlaylistToSchedulingDto } from '@pure-workspace/domain';
import { pureTvApi } from '../axios-config';

export async function DeletePlaylistToSchedulingRequest(
  input: DeletePlaylistToSchedulingDto
) {
  const result = await pureTvApi.delete(
    `delete-playlist-to-scheduling/${input.playlistId}`,
    {
      params: {
        loggedUserId: input.loggedUserId,
        schedulingId: input.schedulingId,
      },
    }
  );
  return result.data;
}
