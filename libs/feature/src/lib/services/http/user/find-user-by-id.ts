import { FindUserByIdDto, UserList } from '@pure-workspace/domain';
import { generalApi } from '../axios-config';

export async function FindUserRequest(input: FindUserByIdDto) {
  const resultId = await generalApi.get<UserList>(
    `find-user-by-id/${input.id}`,
    {
      params: {
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return resultId.data;
}
