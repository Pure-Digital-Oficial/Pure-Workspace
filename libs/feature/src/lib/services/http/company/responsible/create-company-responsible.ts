import {
  CreateCompanyDataDto,
  CreateCompanyResponsibleDto,
} from '@pure-workspace/domain';
import { generalApi } from '../../axios-config';

export async function CreateCompanyResponsibleRequest(
  input: CreateCompanyResponsibleDto
) {
  const result = await generalApi.post<{ companyResponsibleId: string }>(
    'create-company-responsible',
    {
      name: input.body.name,
      email: input.body.email,
      document: input.body.document,
      phone: input.body.phone,
      birthdate: input.body.birthdate,
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
