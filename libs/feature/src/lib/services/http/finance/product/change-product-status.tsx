import { ChangeProductStatusDto, EditProductDto } from '@pure-workspace/domain';
import { pureFinanceApi } from '../../axios-config';

export async function ChangeProductStatusRequest(
  input: ChangeProductStatusDto
) {
  const result = await pureFinanceApi.put(
    `change-product-status/${input.id}`,
    {
      status: input.status,
    },
    {
      params: {
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return result.data;
}
