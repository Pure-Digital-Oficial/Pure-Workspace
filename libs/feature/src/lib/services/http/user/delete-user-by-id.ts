import { DeleteUserByIdDto } from '@pure-workspace/domain';
import { generalApi } from '../axios-config';

export async function DeleteUserByIdRequest(input: DeleteUserByIdDto) {
  const resultId = await generalApi.delete(`delete-user-by-id/${input.id}`, {
    params: {
      loggedUserId: input.loggedUser,
    },
    data: {
      description: input.description,
    },
  });
  return resultId.data;
}
