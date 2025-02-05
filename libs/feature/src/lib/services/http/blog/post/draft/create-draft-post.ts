import { CreatePostDto } from '@pure-workspace/domain';
import { pureBlogApi } from '../../../axios-config';

export async function CreateDraftPostRequest(input: CreatePostDto) {
  const result = await pureBlogApi.post<{ postId: string }>(
    'create-draft-post',
    {
      content: input.body.content,
      description: input.body.description,
      title: input.body.title,
      subTitle: input.body.subTitle,
    },
    {
      params: {
        loggedUserId: input.loggedUserId,
        appId: input.appId,
      },
    }
  );
  return result.data;
}
