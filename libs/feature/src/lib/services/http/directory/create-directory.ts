import { CreateDirectoryDto } from '@pure-workspace/domain';
import { pureTvApi } from '../axios-config';

export async function CreateDirectoryRequest(input: CreateDirectoryDto) {
  const result = await pureTvApi.post<{ directory_id: string }>(
    'create-directory',
    {
      name: input.body.name,
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
