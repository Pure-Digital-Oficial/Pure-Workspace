import { DeleteDraftPostDto } from '@pure-workspace/domain';
import { pureBlogApi } from '../../../axios-config';

export async function DeleteDraftPostRequest(input: DeleteDraftPostDto) {
  const result = await pureBlogApi.delete<{ postId: string }>(
    `delete-draft-post/${input.id}`,
    {
      params: {
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return result.data;
}
