import { CreatePreRegistrationDto } from '@pure-workspace/domain';
import { pureMaketingApi } from '../../axios-config';

export async function CreatePreRegistrationRequest(
  input: CreatePreRegistrationDto
) {
  const result = await pureMaketingApi.post<{ preRegisrationId: string }>(
    'create-pre-registration',
    {},
    {
      params: {
        sendingId: input.sendingId,
      },
    }
  );
  return result.data;
}
