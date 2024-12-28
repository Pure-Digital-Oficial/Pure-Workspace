import { AddFileToPlaylistDto } from '@pure-workspace/domain';
import { pureTvApi } from '../axios-config';

export async function AddFileToPlaylistRequest(input: AddFileToPlaylistDto) {
  const result = await pureTvApi.post(
    'add-file-to-playlist',
    {
      filesId: input.filesId,
    },
    {
      params: {
        loggedUserId: input.loggedUserId,
        playlistId: input.playlistId,
      },
    }
  );
  return result.data;
}
