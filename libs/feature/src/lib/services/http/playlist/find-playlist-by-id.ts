import { FindPlaylistByIdDto, PlaylistResponseDto } from '@pure-workspace/domain';
import { pureTvApi } from '../axios-config';

export async function FindPlaylistByIdRequest(input: FindPlaylistByIdDto) {
  const result = await pureTvApi.get<PlaylistResponseDto>(
    `find-playlist-by-id/${input.id}`,
    {
      params: {
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return result.data;
}
