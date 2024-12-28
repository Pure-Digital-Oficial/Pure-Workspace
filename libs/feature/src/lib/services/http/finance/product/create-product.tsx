import { CreatePlaylistDto, CreateProductDto } from '@pure-workspace/domain';
import { pureFinanceApi } from '../../axios-config';

export async function CreateProductRequest(input: CreateProductDto) {
  const result = await pureFinanceApi.post(
    'create-product',
    {
      name: input.body.name,
      description: input.body.description,
      maximumDiscount: input.body.maximumDiscount,
      standardPrice: input.body.standardPrice,
    },
    {
      params: {
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return result.data;
}
