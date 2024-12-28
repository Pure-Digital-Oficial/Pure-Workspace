import { UpdatePreRegistrationDto } from '@pure-workspace/domain';
import { pureMaketingApi } from '../../axios-config';

export async function UpdatePreRegistrationRequest(
  input: UpdatePreRegistrationDto
) {
  const result = await pureMaketingApi.put<{ preRegisrationId: string }>(
    `update-pre-registration/${input.id || '0'}`,
    {
      branchOfTheCompany: input.branchOfTheCompany,
    }
  );
  return result.data;
}
