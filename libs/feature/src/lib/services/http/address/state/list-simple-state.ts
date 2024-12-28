import {
  ListSimpleStateDto,
  ListSimpleStateResponseDto,
} from '@pure-workspace/domain';
import { generalApi } from '../../axios-config';

export async function ListSimpleStateRequest(input: ListSimpleStateDto) {
  const result = await generalApi.get<ListSimpleStateResponseDto[]>(
    'list-simple-state',
    {
      params: {
        loggedUserId: input.loggedUserId,
        countryId: input.countryId,
      },
    }
  );
  return result.data;
}
