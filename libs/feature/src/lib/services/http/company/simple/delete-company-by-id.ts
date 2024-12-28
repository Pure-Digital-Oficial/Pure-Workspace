import { DeleteCompanyByIdDto } from '@pure-workspace/domain';
import { generalApi } from '../../axios-config';

export async function DeleteCompanyByIdRequest(input: DeleteCompanyByIdDto) {
  const result = await generalApi.delete(
    `delete-company-by-id/${input.companyId}`,
    {
      data: {
        description: input.description,
      },
      params: {
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return result.data;
}
