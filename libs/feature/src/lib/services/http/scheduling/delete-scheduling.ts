import { DeleteSchedulingDto } from '@pure-workspace/domain';
import { pureTvApi } from '../axios-config';

export async function DeleteSchedulingRequest(input: DeleteSchedulingDto) {
  const result = await pureTvApi.delete(`delete-scheduling/${input.id}`, {
    params: {
      loggedUserId: input.loggedUserId,
    },
  });
  return result.data;
}
