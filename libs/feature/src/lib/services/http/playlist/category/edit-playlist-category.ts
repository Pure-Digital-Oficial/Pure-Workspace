import { EditPlaylistCategoryDto } from '@pure-workspace/domain';
import { pureTvApi } from '../../axios-config';

export async function EditPlaylistCategoryRequest(
  input: EditPlaylistCategoryDto
) {
  const result = await pureTvApi.put(
    `edit-playlist-category/${input.id}`,
    {
      name: input.body.name,
      description: input.body.description,
    },
    {
      params: {
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return result.data;
}
