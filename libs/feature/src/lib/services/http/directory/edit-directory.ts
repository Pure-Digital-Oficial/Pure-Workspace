import { EditDirectoryDto } from '@pure-workspace/domain';
import { pureTvApi } from '../axios-config';

export async function EditDirectoryRequest(input: EditDirectoryDto) {
  const result = await pureTvApi.put(
    `edit-directory/${input.id}`,
    {
      newName: input.newName,
    },
    {
      params: {
        loggedUserId: input.loggedUserId,
      },
    }
  );

  return result.data;
}
