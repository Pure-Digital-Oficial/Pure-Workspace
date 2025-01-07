import { DeletePostDto } from '@pure-workspace/domain';
import { pureBlogApi } from '../../axios-config';

export async function DeletePostRequest(input: DeletePostDto) {
  const result = await pureBlogApi.delete<{ postId: string }>(
    `delete-post/${input.id}`,
    {
      params: {
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return result.data;
}
