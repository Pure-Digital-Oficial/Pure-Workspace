import { EditCompanyDataDto } from '@pure-workspace/domain';
import { generalApi } from '../../axios-config';

export async function EditCompanyDataRequest(input: EditCompanyDataDto) {
  const result = await generalApi.put<{ companyDataId: string }>(
    `edit-company-data/${input.companyDataId}`,
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
      },
    }
  );
  return result.data;
}
