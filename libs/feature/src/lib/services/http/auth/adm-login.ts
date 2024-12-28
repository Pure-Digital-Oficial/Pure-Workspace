import { LoginResponse } from '@pure-workspace/domain';
import { generalApi } from '../axios-config';

export async function AdmLoginRequest(email: string, password: string) {
  const request = await generalApi.post<LoginResponse>('auth/adm-login', {
    email,
    password,
  });
  return request.data;
}
