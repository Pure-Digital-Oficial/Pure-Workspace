import { CreateCompanyDataDto } from '@pure-workspace/domain';
import { generalApi } from '../../axios-config';

export async function CreateCompanyDataRequest(input: CreateCompanyDataDto) {
  const result = await generalApi.post(
    'create-company-data',
    {
      port: input.body.port,
      opening: input.body.opening,
      situation: input.body.situation,
      legalNature: input.body.legalNature,
      phone: input.body.phone,
      responsibleEmail: input.body.responsibleEmail,
    },
    {
      params: {
        loggedUserId: input.loggedUserId,
        companyId: input.companyId,
      },
    }
  );

  return result.data;
}
