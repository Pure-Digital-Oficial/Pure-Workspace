import { EditCompanyDto } from '@pure-workspace/domain';
import { generalApi } from '../../axios-config';

export async function EditCompanyRequest(input: EditCompanyDto) {
  const result = await generalApi.put<{ companyId: string }>(
    `edit-company/${input.companyId}`,
    {
      cnpj: input.body.cnpj,
      socialReason: input.body.socialReason,
      fantasyName: input.body.fantasyName,
    },
    {
      params: {
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return result.data;
}
