import { EditContentFileDto } from '@pure-workspace/domain';
import { pureTvApi } from '../../axios-config';

export async function EditContentFileRequest(input: EditContentFileDto) {
  const result = await pureTvApi.put(
    `edit-content-file/${input.idToEdit}`,
    {
      newFileName: input.newFileName,
    },
    {
      params: {
        loggedUserId: input.loggedUserId,
        directoryId: input.directoryId,
      },
    }
  );
  return result.data;
}
