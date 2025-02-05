import { DeleteMediaPostDto } from '@pure-workspace/domain';
import { pureBlogApi } from '../../../axios-config';

export async function DeleteMediaPostRequest(input: DeleteMediaPostDto) {
  const result = await pureBlogApi.delete<{ mediaPostId: string }>(
    `delete-media-post/${input.mediaId}`,
    {
      params: {
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return result.data;
}
