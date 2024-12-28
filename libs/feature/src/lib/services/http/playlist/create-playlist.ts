import { CreatePlaylistDto } from '@pure-workspace/domain';
import { pureTvApi } from '../axios-config';

export async function CreatePlaylistRequest(input: CreatePlaylistDto) {
  const result = await pureTvApi.post(
    'create-playlist',
    {
      name: input.name,
    },
    {
      params: {
        loggedUserId: input.loggedUserId,
        playlistCategoryId: input.playlistCategoryId,
        companyId: input.companyId,
      },
    }
  );
  return result.data;
}
