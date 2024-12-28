import { EditProductDto } from '@pure-workspace/domain';
import { pureFinanceApi } from '../../axios-config';

export async function EditProductRequest(input: EditProductDto) {
  const result = await pureFinanceApi.put(
    `edit-product/${input.id}`,
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
