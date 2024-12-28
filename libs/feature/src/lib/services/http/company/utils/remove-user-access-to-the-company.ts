import { RemoveUserAccessToTheCompanyDto } from '@pure-workspace/domain';
import { generalApi } from '../../axios-config';

export async function RemoveUserAccessToTheCompanyRequest(
  input: RemoveUserAccessToTheCompanyDto
) {
  const result = await generalApi.delete<{ companyId: string }>(
    `remove-user-access-to-the-company/${input.userId}`,
    {
      params: {
        loggedUserId: input.loggedUserId,
        companyId: input.companyId,
      },
    }
  );
  return result.data;
}
