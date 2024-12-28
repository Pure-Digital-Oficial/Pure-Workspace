import {
  ListContentFileDto,
  ListContentFileResponseDto,
} from '@pure-workspace/domain';
import { pureTvApi } from '../../axios-config';

export async function ListContentFilesRequest(input: ListContentFileDto) {
  const skip = input?.skip || 0;
  const take = input?.take || 8;
  const result = await pureTvApi.get<ListContentFileResponseDto>(
    'list-content-file',
    {
      params: {
        filter: input.userInput,
        skip: skip,
        take: take,
        loggedUserId: input.loggedUserId,
        directoryId: input.directoryId,
        companyId: input.companyId,
      },
    }
  );
  return result.data;
}
