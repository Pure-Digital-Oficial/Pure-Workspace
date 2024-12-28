import { DeleteDeviceDto } from '@pure-workspace/domain';
import { pureTvApi } from '../axios-config';

export async function DeleteDeviceRequest(input: DeleteDeviceDto) {
  const result = await pureTvApi.delete(`delete-device/${input.id}`, {
    params: {
      loggedUserId: input.loggedUserId,
    },
  });
  return result.data;
}
