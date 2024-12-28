import { CreatePlaylistCategoryDto } from '@pure-workspace/domain';
import { pureTvApi } from '../../axios-config';

export async function CreatePlaylistCategoryRequest(
  input: CreatePlaylistCategoryDto
) {
  const result = await pureTvApi.post(
    'create-playlist-category',
    {
      name: input.body.name,
      description: input.body.description,
    },
    {
      params: {
        loggedUserId: input.loggedUserId,
        companyId: input.companyId,
      },
    }
  );
  return result.data;
}
