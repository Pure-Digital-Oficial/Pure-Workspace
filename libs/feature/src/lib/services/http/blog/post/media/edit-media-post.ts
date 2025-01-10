import {
  EditCompanyDto,
  EditMediaPostDto,
  EditPostDto,
} from '@pure-workspace/domain';
import { pureBlogApi } from '../../../axios-config';

export async function EditMediaPostRequest(input: EditMediaPostDto) {
  const result = await pureBlogApi.put<{ mediaPostId: string }>(
    `edit-media-post/${input.mediaId}`,
    {
      name: input.name,
    },
    {
      params: {
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return result.data;
}
