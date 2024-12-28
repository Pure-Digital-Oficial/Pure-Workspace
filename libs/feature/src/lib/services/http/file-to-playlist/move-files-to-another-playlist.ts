import { MoveFilesToAnotherPlaylistDto } from '@pure-workspace/domain';
import { pureTvApi } from '../axios-config';

export async function MoveFilesToAnotherPlaylistRequest(
  input: MoveFilesToAnotherPlaylistDto
) {
  const result = await pureTvApi.put(
    'move-files-to-another-playlist',
    {
      filesId: input.filesId,
    },
    {
      params: {
        loggedUserId: input.loggedUserId,
        oldPlaylistId: input.oldPlaylistId,
        newPlaylistId: input.newPlaylistId,
      },
    }
  );
  return result.data;
}
