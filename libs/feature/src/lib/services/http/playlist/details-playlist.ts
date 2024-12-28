import { DetailsPlaylistDto, PlaylistResponseDto } from '@pure-workspace/domain';
import { pureTvApi } from '../axios-config';

export async function DetailsPlaylistRequest(input: DetailsPlaylistDto) {
  const result = await pureTvApi.get<PlaylistResponseDto>(
    `details-playlist/${input.playlistId}`,
    {
      params: {
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return result.data;
}
