import { DeleteProductDto } from '@pure-workspace/domain';
import { pureFinanceApi } from '../../axios-config';

export async function DeleteProductRequest(input: DeleteProductDto) {
  const result = await pureFinanceApi.delete(`delete-product/${input.id}`, {
    params: {
      loggedUserId: input.loggedUserId,
    },
  });
  return result.data;
}
