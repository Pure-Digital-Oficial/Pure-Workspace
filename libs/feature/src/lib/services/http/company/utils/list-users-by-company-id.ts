import {
  ListUsersByCompanyIdDto,
  ListUsersByCompanyIdResponseDto,
} from '@pure-workspace/domain';
import { generalApi } from '../../axios-config';

export async function ListUsersByCompanyIdRequest(
  input: ListUsersByCompanyIdDto
) {
  const skip = input?.skip || 0;
  const take = input?.take || 8;
  const result = await generalApi.get<ListUsersByCompanyIdResponseDto>(
    `list-users-by-company-id/${input.companyId}`,
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
