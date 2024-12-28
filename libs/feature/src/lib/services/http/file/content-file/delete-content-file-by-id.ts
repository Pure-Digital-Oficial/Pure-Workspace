import { DeleteContentFileByIdDto } from '@pure-workspace/domain';
import { pureTvApi } from '../../axios-config';

export async function DeleteContentFileByIdRequest(
  input: DeleteContentFileByIdDto
) {
  const result = await pureTvApi.delete(
    `delete-content-file-by-id/${input.idToDelete}`,
    {
      params: {
        loggedUserId: input.loggedUserId,
        directoryId: input.directoryId,
      },
    }
  );
  return result.data;
}
