import { CreateContactUsDto } from '@pure-workspace/domain';
import { generalApi } from '../../axios-config';

export async function CreateContactUsRequest(input: CreateContactUsDto) {
  const result = await generalApi.post<{ contactId: string }>(
    'create-contact-us',
    {
      name: input.body.name,
      description: input.body.description,
      email: input.body.email,
      number: input.body.number,
    },
    {
      params: {
        appId: input.appId,
      },
    }
  );
  return result.data;
}
