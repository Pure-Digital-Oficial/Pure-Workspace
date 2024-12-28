import {
  ListSimpleDirectoryDto,
  ListSimpleDirectoryResponseDto,
} from '@pure-workspace/domain';
import { pureTvApi } from '../axios-config';

export async function ListSimpleDirectoryRequest(
  input: ListSimpleDirectoryDto
) {
  const skip = input?.skip || 0;
  const take = input?.take || 8;
  const result = await pureTvApi.get<ListSimpleDirectoryResponseDto>(
    'list-simple-directory',
    {
      params: {
        filter: input.userInput,
        skip: skip,
        take: take,
        loggedUserId: input.loggedUserId,
        companyId: input.companyId,
      },
    }
  );
  return result.data;
}
