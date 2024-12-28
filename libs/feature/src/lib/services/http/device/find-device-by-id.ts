import { Device, FindDeviceByIdDto } from '@pure-workspace/domain';
import { pureTvApi } from '../axios-config';

export async function FindDeviceByIdRequest(input: FindDeviceByIdDto) {
  const result = await pureTvApi.get<Device>(`find-device-by-id/${input.id}`, {
    params: {
      loggedUserId: input.loggedUserId,
    },
  });
  return result.data;
}
