import {
  ListMediasPostDto,
  ListMediasPostResponseDto,
} from '@pure-workspace/domain';
import { pureBlogApi } from '../../../axios-config';

export async function ListMediasPostRequest(input: ListMediasPostDto) {
  const skip = input?.skip || 0;
  const take = input?.take || 8;
  const result = await pureBlogApi.get<ListMediasPostResponseDto>(
    'list-medias-post',
    {
      params: {
        filter: input.filter,
        skip: skip,
        take: take,
        loggedUserId: input.loggedUserId,
        postId: input.postId,
      },
    }
  );
  return result.data;
}
