import {
  AccessToken,
  CreateAuthDto,
  ExternalAuthDto,
} from '@pure-workspace/domain';
import { generalApi } from '../axios-config';

export async function ExternalAuthRequest(input: ExternalAuthDto) {
  const result = await generalApi.post<AccessToken>(
    'external-auth',
    {
      email: input.body.email,
      name: input.body.name,
      photo: input.body.photo,
    },
    {
      params: {
        appId: input.appId,
        externalId: input.externalId,
      },
    }
  );
  return result.data;
}
