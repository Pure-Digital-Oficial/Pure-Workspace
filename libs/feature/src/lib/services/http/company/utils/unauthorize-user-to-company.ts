import { UnauthorizeUserToCompanyDto } from '@pure-workspace/domain';
import { generalApi } from '../../axios-config';

export async function UnauthorizeUserToCompanyRequest(
  input: UnauthorizeUserToCompanyDto
) {
  const result = await generalApi.delete<{ userCompanyId: string }>(
    `unauthorize-user-to-company/${input.userId}`,
    {
      params: {
        loggedUserId: input.loggedUserId,
        companyId: input.companyId,
      },
    }
  );
  return result.data;
}
