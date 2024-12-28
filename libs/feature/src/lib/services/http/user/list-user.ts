import { ListUserDto, ListUserResponseDto } from '@pure-workspace/domain';
import { generalApi } from '../axios-config';

export async function ListUserRequest(input: ListUserDto) {
  const skip = input?.skip || 0;
  const take = input?.take || 4;
  const result = await generalApi.get<ListUserResponseDto>('list-user', {
    params: {
      filter: input.filter,
      loggedUserId: input.loggedUserId,
      skip,
      take,
    },
  });
  return result.data;
}
