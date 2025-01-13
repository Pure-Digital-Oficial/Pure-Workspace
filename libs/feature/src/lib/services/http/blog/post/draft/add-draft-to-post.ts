import { AddDraftToPostDto } from '@pure-workspace/domain';
import { pureBlogApi } from '../../../axios-config';

export async function AddDraftToPostRequest(input: AddDraftToPostDto) {
  const result = await pureBlogApi.post<{ postId: string }>(
    `add-draft-to-post/${input.id}`,
    {
      params: {
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return result.data;
}
