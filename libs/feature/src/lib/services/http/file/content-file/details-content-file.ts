import { ContentFile, DetailsContentFileDto } from '@pure-workspace/domain';
import { pureTvApi } from '../../axios-config';

export async function DetailsContentFileRequest(input: DetailsContentFileDto) {
  const result = await pureTvApi.get<ContentFile>(
    `details-content-file/${input.id}`,
    {
      params: {
        loggedUserId: input.loggedUserId,
        directoryId: input.directoryId,
      },
    }
  );
  return result.data;
}
