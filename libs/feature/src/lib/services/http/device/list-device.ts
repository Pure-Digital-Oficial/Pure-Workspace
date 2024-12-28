import { ListDeviceDto, ListDeviceResponseDto } from '@pure-workspace/domain';
import { pureTvApi } from '../axios-config';

export async function ListDeviceRequest(input: ListDeviceDto) {
  const skip = input?.skip || 0;
  const take = input?.take || 8;
  const result = await pureTvApi.get<ListDeviceResponseDto>('list-device', {
    params: {
      filter: input.filter,
      skip: skip,
      take: take,
      loggedUserId: input.loggedUserId,
      companyId: input.companyId,
    },
  });
  return result.data;
}
