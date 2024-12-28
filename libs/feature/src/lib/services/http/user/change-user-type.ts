import { ChangeUserTypeDto } from '@pure-workspace/domain';
import { generalApi } from '../axios-config';

export async function ChangeUserTypeRequest(input: ChangeUserTypeDto) {
  const resultId = await generalApi.put(
    `change-user-type/${input.userId}`,
    {
      type: input.type,
    },
    {
      params: {
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return resultId.data;
}
