import { MoveFileToDirectoryDto } from '@pure-workspace/domain';
import { pureTvApi } from '../../axios-config';

export async function MoveFileToDirectoryRequest(
  input: MoveFileToDirectoryDto
) {
  const { idToMove, loggedUserId, idToMoveDirectory } = input;
  const result = await pureTvApi.post(
    `move-file-to-directory/${idToMove}`,
    null,
    {
      params: {
        idToMoveDirectory: idToMoveDirectory,
        loggedUserId: loggedUserId,
      },
    }
  );
  return result.data;
}
