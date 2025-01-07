import { EditCompanyDto, EditPostDto } from '@pure-workspace/domain';
import { pureBlogApi } from '../../axios-config';

export async function EditPostRequest(input: EditPostDto) {
  const result = await pureBlogApi.put<{ postId: string }>(
    `edit-post/${input.id}`,
    {
      content: input.body.content,
      description: input.body.description,
      title: input.body.title,
      subTitle: input.body.subTitle,
    },
    {
      params: {
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return result.data;
}
