import {
  ListSimpleCountryDto,
  ListSimpleCountryResponseDto,
} from '@pure-workspace/domain';
import { generalApi } from '../../axios-config';

export async function ListSimpleCountryRequest(input: ListSimpleCountryDto) {
  const result = await generalApi.get<ListSimpleCountryResponseDto[]>(
    'list-simple-country',
    {
      params: {
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return result.data;
}
