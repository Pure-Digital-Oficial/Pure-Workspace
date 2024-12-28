import {
  ListPlaylistCategoryDto,
  ListPlaylistCategoryReponseDto,
} from '@pure-workspace/domain';
import { pureTvApi } from '../../axios-config';

export async function ListPlaylistCategoryRequest(
  input: ListPlaylistCategoryDto
) {
  const skip = input?.skip || 0;
  const take = input?.take || 6;
  const result = await pureTvApi.get<ListPlaylistCategoryReponseDto>(
    'list-playlist-category',
    {
      params: {
        filter: input.userInput,
        skip: skip,
        take: take,
        companyId: input.companyId,
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return result.data;
}
