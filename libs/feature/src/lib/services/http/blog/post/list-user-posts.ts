import { ListPostsDto, ListPostsResponseDto } from '@pure-workspace/domain';
import { pureBlogApi } from '../../axios-config';

export async function ListUserPostsRequest(input: ListPostsDto) {
  const skip = input?.skip || 0;
  const take = input?.take || 8;
  const result = await pureBlogApi.get<ListPostsResponseDto>(
    'list-user-posts',
    {
      params: {
        filter: input.filter,
        skip: skip,
        take: take,
        loggedUserId: input.loggedUserId,
        appId: input.appId,
      },
    }
  );
  return result.data;
}
