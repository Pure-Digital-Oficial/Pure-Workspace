import { SelectCompanyDto } from '@pure-workspace/domain';
import { generalApi } from '../../axios-config';

export async function SelectCompanyRequest(input: SelectCompanyDto) {
  const result = await generalApi.post<{ companyId: string }>(
    `select-company/${input.companyId}`,
    null,
    {
      params: {
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return result.data;
}
