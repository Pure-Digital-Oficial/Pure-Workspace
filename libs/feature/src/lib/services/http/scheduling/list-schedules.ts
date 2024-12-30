import {
  ListSchedulesDto,
  ListSchedulesReponseDto,
} from '@pure-workspace/domain';
import { pureTvApi } from '../axios-config';

export async function ListSchedulesRequest(input: ListSchedulesDto) {
  const skip = input?.skip || 0;
  const take = input?.take || 6;
  const result = await pureTvApi.get<ListSchedulesReponseDto>(
    'list-schedules',
    {
      params: {
        filter: input.filter,
        skip: skip,
        take: take,
        loggedUserId: input.loggedUserId,
        companyId: input.companyId,
      },
    }
  );
  return result.data;
}
