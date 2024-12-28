import {
  ListPlaylistBySchedulingIdDto,
  ListPlaylistResponseDto,
} from '@pure-workspace/domain';
import { pureTvApi } from '../axios-config';

export async function ListPlaylistBySchedulingIdRequest(
  input: ListPlaylistBySchedulingIdDto
) {
  const skip = input?.skip || 0;
  const take = input?.take || 6;
  const result = await pureTvApi.get<ListPlaylistResponseDto>(
    `list-playlist-by-scheduling-id/${input.id}`,
    {
      params: {
        filter: input.filter,
        skip: skip,
        take: take,
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return result.data;
}
