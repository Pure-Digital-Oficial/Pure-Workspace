import { AuthorizeUserToCompanyDto } from '@pure-workspace/domain';
import { generalApi } from '../../axios-config';

export async function AuthorizeUserToCompanyRequest(
  input: AuthorizeUserToCompanyDto
) {
  const result = await generalApi.put<{ userId: string }>(
    `authorize-user-to-company/${input.userId}`,
    null,
    {
      params: {
        loggedUserId: input.loggedUserId,
        companyId: input.companyId,
      },
    }
  );
  return result.data;
}
