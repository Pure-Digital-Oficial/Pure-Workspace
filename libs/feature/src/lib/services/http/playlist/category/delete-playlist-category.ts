import { DeletePlaylistCategoryDto } from '@pure-workspace/domain';
import { pureTvApi } from '../../axios-config';

export async function DeletePlaylistCategoryRequest(
  input: DeletePlaylistCategoryDto
) {
  const result = await pureTvApi.delete(
    `delete-playlist-category/${input.id}`,
    {
      params: {
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return result.data;
}
