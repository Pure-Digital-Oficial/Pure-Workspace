import {
  ListCompaniesByUserIdDto,
  ListCompanyResponseDto,
} from '@pure-workspace/domain';
import { generalApi } from '../axios-config';

export async function ListCompaniesByUserIdRequest(
  input: ListCompaniesByUserIdDto
) {
  const skip = input?.skip || 0;
  const take = input?.take || 6;
  const result = await generalApi.get<ListCompanyResponseDto>(
    `list-companies-by-user-id/${input.userId}`,
    {
      params: {
        filter: input.filter,
        skip: skip,
        take: take,
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return result.data;
}
