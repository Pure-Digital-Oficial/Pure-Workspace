import { AddUserToAnotherCompanyDto } from '@pure-workspace/domain';
import { generalApi } from '../axios-config';

export async function AddUserToAnotherCompanyRequest(
  input: AddUserToAnotherCompanyDto
) {
  const resultId = await generalApi.post<{ userAndCompanyId: string }>(
    `add-user-to-another-company/${input.userId}`,
    null,
    {
      params: {
        loggedUserId: input.loggedUserId,
        companyId: input.companyId,
      },
    }
  );
  return resultId.data;
}
