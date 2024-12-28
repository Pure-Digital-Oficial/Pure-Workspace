import { CreateSchedulingDto } from '@pure-workspace/domain';
import { pureTvApi } from '../axios-config';

export async function CreateSchedulingRequest(input: CreateSchedulingDto) {
  const result = await pureTvApi.post(
    'create-scheduling',
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
        companyId: input.companyId,
      },
    }
  );
  return result.data;
}
