import { CreateCompanyDto } from '@pure-workspace/domain';
import { generalApi } from '../../axios-config';

export async function CreateCompanyRequest(input: CreateCompanyDto) {
  const result = await generalApi.post<{ companyId: string }>(
    'create-company',
    {
      fantasyName: input.body.fantasyName,
      socialReason: input.body.socialReason,
      cnpj: input.body.cnpj,
    },
    {
      params: {
        loggedUserId: input.loggedUserId,
      },
    }
  );

  return result.data;
}
