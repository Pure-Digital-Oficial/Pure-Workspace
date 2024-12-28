import {
  FindFilesByPlaylistDto,
  FindFilesByPlaylistResponseDto,
} from '@pure-workspace/domain';
import { pureTvApi } from '../axios-config';

export async function FindFilesByPlaylistRequest(
  input: FindFilesByPlaylistDto
) {
  const skip = input?.skip || 0;
  const take = input?.take || 6;
  const result = await pureTvApi.get<FindFilesByPlaylistResponseDto>(
    `find-files-by-playlist/${input.idPlaylist}`,
    {
      params: {
        loggedUserId: input.loggedUserId,
        skip: skip,
        take: take,
      },
    }
  );
  return result.data;
}
