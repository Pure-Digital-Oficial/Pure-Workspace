import { DeleteSchedulesToDeviceDto } from '@pure-workspace/domain';
import { pureTvApi } from '../axios-config';

export async function DeleteSchedulesToDeviceRequest(
  input: DeleteSchedulesToDeviceDto
) {
  const result = await pureTvApi.delete(
    `delete-schedules-to-device/${input.idDevice}`,
    {
      data: {
        schedulesIds: input.schedulesIds,
      },
      params: {
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return result.data;
}
