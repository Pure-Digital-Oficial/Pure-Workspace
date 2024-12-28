import { DeletePlaylistFilesDto } from '@pure-workspace/domain';
import { pureTvApi } from '../axios-config';

export async function DeletePlaylistFilesRequest(
  input: DeletePlaylistFilesDto
) {
  const result = await pureTvApi.delete('delete-playlist-files', {
    data: {
      filesId: input.filesId,
    },
    params: {
      loggedUserId: input.loggedUserId,
      playlistId: input.playlistId,
    },
  });
  return result.data;
}
