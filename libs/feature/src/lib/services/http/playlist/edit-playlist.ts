import { EditPlaylistDto } from '@pure-workspace/domain';
import { pureTvApi } from '../axios-config';

export async function EditPlaylistRequest(input: EditPlaylistDto) {
  const result = await pureTvApi.put(
    `edit-playlist/${input.id}`,
    {
      name: input.body.name,
      playlistCategoryId: input.body.playlistCategoryId,
    },
    {
      params: {
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return result.data;
}
