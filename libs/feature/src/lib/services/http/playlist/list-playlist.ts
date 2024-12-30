import {
  ListPlaylistDto,
  ListPlaylistResponseDto,
} from '@pure-workspace/domain';
import { pureTvApi } from '../axios-config';

export async function ListPlaylistRequest(input: ListPlaylistDto) {
  const skip = input?.skip || 0;
  const take = input?.take || 8;
  const result = await pureTvApi.get<ListPlaylistResponseDto>('list-playlist', {
    params: {
      filter: input.userInput,
      skip: skip,
      take: take,
      loggedUserId: input.loggedUserId,
      companyId: input.companyId,
    },
  });
  return result.data;
}
