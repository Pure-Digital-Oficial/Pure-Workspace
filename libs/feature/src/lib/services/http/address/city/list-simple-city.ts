import { CityResponseDto, ListSimpleCityDto } from '@pure-workspace/domain';
import { generalApi } from '../../axios-config';

export async function ListSimpleCityRequest(input: ListSimpleCityDto) {
  const result = await generalApi.get<CityResponseDto[]>('list-simple-city', {
    params: {
      loggedUserId: input.loggedUserId,
      stateId: input.stateId,
    },
  });
  return result.data;
}
