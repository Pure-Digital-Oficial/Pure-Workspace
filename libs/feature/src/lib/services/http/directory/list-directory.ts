import { ListDirectoryDto, ListDirectoryResponseDto } from '@pure-workspace/domain';
import { pureTvApi } from '../axios-config';

export async function ListDirectoryRequest(input: ListDirectoryDto) {
  const skip = input?.skip || 0;
  const take = input?.take || 6;
  const result = await pureTvApi.get<ListDirectoryResponseDto>(
    'list-directory',
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
