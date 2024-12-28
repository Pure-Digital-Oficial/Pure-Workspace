import { LoginResponse, ValidateTokenDto } from '@pure-workspace/domain';
import { generalApi } from '../axios-config';

export async function ValidateTokenRequest(input: ValidateTokenDto) {
  const request = await generalApi.get('auth/validate-token', {
    headers: {
      Authorization: input.token,
    },
    params: {
      loggedUserId: input.loggedUserId,
    },
  });
  return request.data;
}
