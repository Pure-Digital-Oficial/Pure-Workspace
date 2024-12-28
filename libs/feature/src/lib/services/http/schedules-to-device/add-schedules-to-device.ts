import { AddSchedulesToDeviceDto } from '@pure-workspace/domain';
import { pureTvApi } from '../axios-config';

export async function AddSchedulesToDeviceRequest(
  input: AddSchedulesToDeviceDto
) {
  const result = await pureTvApi.post(
    'add-schedules-to-device',
    {
      schedulesIds: input.schedulesIds,
    },
    {
      params: {
        loggedUserId: input.loggedUserId,
        idDevice: input.idDevice,
      },
    }
  );
  return result.data;
}
