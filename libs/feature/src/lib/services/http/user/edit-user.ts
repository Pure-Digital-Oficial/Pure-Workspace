import { EditUserDto } from '@pure-workspace/domain';
import { generalApi } from '../axios-config';

export async function EditUserRequest(input: EditUserDto) {
  const resultId = await generalApi.put(
    'edit-user',
    {
      id: input.body.id,
      name: input.body.name,
      birthDate: input.body.birthDate,
      status: input.body.status,
      type: input.body.type,
    },
    {
      params: {
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return resultId.data;
}
