import { EditDeviceDto } from '@pure-workspace/domain';
import { pureTvApi } from '../axios-config';

export async function EditDeviceRequest(input: EditDeviceDto) {
  const result = await pureTvApi.put(
    `edit-device/${input.id}`,
    {
      name: input.name,
    },
    {
      params: {
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return result.data;
}
