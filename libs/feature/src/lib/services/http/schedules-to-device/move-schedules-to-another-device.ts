import { MoveSchedulesToAnotherDeviceDto } from '@pure-workspace/domain';
import { pureTvApi } from '../axios-config';

export async function MoveSchedulesToAnotherDeviceRequest(
  input: MoveSchedulesToAnotherDeviceDto
) {
  const result = await pureTvApi.put(
    'move-schedules-to-another-device',
    {
      schedulesIds: input.schedulesIds,
    },
    {
      params: {
        loggedUserId: input.loggedUserId,
        oldDeviceId: input.oldDeviceId,
        newDeviceId: input.newDeviceId,
      },
    }
  );
  return result.data;
}
