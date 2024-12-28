import { EditSchedulingDto } from '@pure-workspace/domain';
import { pureTvApi } from '../axios-config';

export async function EditSchedulingRequest(input: EditSchedulingDto) {
  const result = await pureTvApi.put<{ editSchedulingId: string }>(
    `edit-scheduling/${input.id}`,
    {
      name: input.body.name,
      startTime: input.body.startTime,
      endTime: input.body.endTime,
      lopping: input.body.lopping,
      priority: input.body.priority,
    },
    {
      params: {
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return result.data;
}
