import {
  ListPlaylistDto,
  ListPlaylistResponseDto,
  ListProductDto,
  ListProductResponseDto,
} from '@pure-workspace/domain';
import { pureFinanceApi } from '../../axios-config';

export async function ListProductRequest(input: ListProductDto) {
  const skip = input?.skip || 0;
  const take = input?.take || 8;
  const result = await pureFinanceApi.get<ListProductResponseDto>(
    'list-product',
    {
      params: {
        filter: input.filter,
        skip: skip,
        take: take,
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return result.data;
}
