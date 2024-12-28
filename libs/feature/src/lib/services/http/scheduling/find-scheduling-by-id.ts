import { FindSchedulingByIdDto, Scheduling } from '@pure-workspace/domain';
import { pureTvApi } from '../axios-config';

export async function FindSchedulingByIdRequest(input: FindSchedulingByIdDto) {
  const result = await pureTvApi.get<Scheduling>(
    `find-scheduling-by-id/${input.id}`,
    {
      params: {
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return result.data;
}
