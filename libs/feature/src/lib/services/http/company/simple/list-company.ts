import { ListCompanyDto, ListCompanyResponseDto } from '@pure-workspace/domain';
import { generalApi } from '../../axios-config';

export async function ListCompanyRequest(input: ListCompanyDto) {
  const skip = input?.skip || 0;
  const take = input?.take || 8;
  const result = await generalApi.get<ListCompanyResponseDto>('list-company', {
    params: {
      filter: input.filter,
      skip: skip,
      take: take,
      loggedUserId: input.loggedUserId,
    },
  });
  return result.data;
}
