import { EditCompanyResponsibleDto } from '@pure-workspace/domain';
import { generalApi } from '../../axios-config';

export async function EditCompanyResponsibleRequest(
  input: EditCompanyResponsibleDto
) {
  const result = await generalApi.put<{ companyResponsibleId: string }>(
    `edit-company-responsible/${input.companyResponsibleId}`,
    {
      name: input.body.name,
      email: input.body.email,
      phone: input.body.phone,
      birthdate: input.body.birthdate,
    },
    {
      params: {
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return result.data;
}
